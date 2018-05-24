function opentab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function getORI() {
  state = state_values[$("#state_dropdown").val()];
  agency = agencies[$("#agency_dropdown").val()];
  ori = state_agencies.filter(x => x.state === state);
  ori = ori.filter(x => x.agency === agency);

  return ori[0].ori;
}

function getStateAgencies() {
  var state_agencies = $.getJSON({
    url: "state_agencies.json",
    type: 'get',
    dataType: 'json',
    async: false,
    success: function(data) {
      result = data;
    }
  });
  state_agencies = state_agencies.responseJSON;
  return (state_agencies);
}

function getAgenciesInState() {
  state = state_values[$("#state_dropdown").val()];
  agencies = state_agencies.filter(s => s.state === state);
  agencies = agencies.map(function(item) {
    return item.agency;
  });
  agencies.sort(function(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  return agencies;
}

function subsetDataRows(data) {
  ori = getORI();
  data = data.filter(s => s.includes(ori));
  data = data_object_fun(data, headers);
  return data;
}


function updateGraph() {

  finalData = subsetDataRows(data);
  table.destroy();
  table = makeTable(finalData);

  colsToKeep = getCrimeColumns(headers);
  finalData = subsetColumns(finalData, colsToKeep);
  new_title = agencies[$("#agency_dropdown").val()] + ', ';
  new_title += state_values[$("#state_dropdown").val()] + ': ';
  new_title += crime_values[$("#crime_dropdown").val()];



  visibilityVector = [];
  visibilityVector.push($("#actual").is(':checked'));
  visibilityVector.push($("#clearance").is(':checked'));
  visibilityVector.push($("#clearance_under18").is(':checked'));
  visibilityVector.push($("#unfounded").is(':checked'));

  var ylab = '# of Crimes';
  if ($("#rate").is(':checked')) {
    ylab = 'Rate per 100,000 People';
  }

  makeGraph(finalData, ylab, visibilityVector, new_title);
}

function makeGraph(data, ylab, visibilityVector, title) {
  var graph = new Dygraph(document.getElementById("graph"),
    data, {
      animatedZooms: true,
      title: title,
      legend: 'always',
      ylabel: ylab,
      xlabel: ' Year',
      visibility: visibilityVector
    });
  return (graph);
}

function onChangeFun() {
  updateAgencies();
  updateGraph();
}

function updateAgencies() {
  agencies = getAgenciesInState();
  $('#agency_dropdown').empty();
  $.each(agencies, function(val, text) {
    $('#agency_dropdown').append(new Option(text, val));
  });
}

function readCSV(csv) {
  var result = null;
  var scriptUrl = csv;
  $.ajax({
    url: scriptUrl,
    type: 'get',
    dataType: 'html',
    async: false,
    success: function(data) {
      result = data;
    }
  });
  return result;
}


function getCrimeColumns(arr) {
  crime = $('#crime_dropdown').val();
  arr = arr.split(",");
  columnNames = ["year"];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].includes(crime)) {
      columnNames.push(arr[i]);
    }
  }
  return (columnNames);
}

function subsetColumns(data, colsToKeep) {

  data = _.map(data, function(currentObject) {
    return _.pick(currentObject, colsToKeep);
  });
  data = data.map(objToString);
  data = data.join("\n");

  finalData = colsToKeep.toString() + "\n";
  finalData += data;
  return (finalData);
}

function data_object_fun(arr, headers) {
  headers = headers.split(",");
  var jsonObj = [];
  for (var i = 0; i < arr.length; i++) {
    //  console.log(i);
    temp = arr[i];
    var data = temp.split(',');
    var obj = {};
    for (var j = 0; j < data.length; j++) {
      obj[headers[j].trim()] = data[j].trim();
    }
    jsonObj.push(obj);
  }
  return (jsonObj);
}


function objToString(obj) {
  var str = '';
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str += obj[p] + ',';
    }
  }
  str = str.slice(0, -2);
  return str;
}


function makeTable(data) {
  file_name = agencies[$("#agency_dropdown").val()] + "_" +
    state_values[$("#state_dropdown").val()];
  temp = headers.split(",");
  z = [];

  for (var i = 0; i < temp.length; i++) {
    name = temp[i];
    z.push({
      data: temp[i],
      title: temp[i]
    });
  }
  var table = $('#table').DataTable({
    dom: 'lBfrtip',
    data: data,
    columns: z,
    "scrollX": true,
    "stripe": true,
    "hover": true,
    fixedColumns: {
      leftColumns: 2
    },
    buttons: [{
        extend: 'csvHtml5',
        title: file_name
      }
    ]

  });
return table;
}
