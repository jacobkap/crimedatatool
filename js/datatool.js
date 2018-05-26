function getORI() {
  state = state_values[$("#state_dropdown").val()];
  agency = agencies[$("#agency_dropdown").val()];
  ori = state_agencies.filter(x => x.state === state);
  ori = ori.filter(x => x.agency === agency);
  return ori[0].ori;
}

function objToString(obj) {
  var str = '';
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str += obj[p] + ',';
    }
  }
  console.log(str)
  str = str.slice(0, -1); // Removes comma at end.
  return str;
}

function subsetColumns(data, colsToKeep) {
  data = _.map(data, function(currentObject) {
    return _.pick(currentObject, colsToKeep);
  });
  data = data.map(objToString);
  data = data.join("\n");

  data = colsToKeep.toString() + "\n" + data;

  return (data);
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

function readCSV(csv) {
  var result = null;
  var scriptUrl = csv;
  $.ajax({
    url: scriptUrl,
    type: 'get',
    dataType: 'text',
    async: false,
    success: function(data) {
      result = data;
    }
  });
  return result;
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


function updateAgencies() {
  agencies = getAgenciesInState();
  $('#agency_dropdown').empty();
  $.each(agencies, function(val, text) {
    $('#agency_dropdown').append(new Option(text, val));
  });
    $('#agency_dropdown').val(0);
  $('.simple-select').trigger('chosen:updated');
}




function crimeChangeFun() {
  agencyData = getAgencyData(stateData);
  updateGraph(agencyData);
}

function stateChangeFun() {
  stateData = getStateData();
  updateAgencies();
  agencyChangeFun();
}

function agencyChangeFun() {
  agencyData = getAgencyData(stateData);
  updateTable(agencyData);
  updateGraph(agencyData);
}



function getStateData() {
  csv_url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper/master/data/offenses/offenses_" +
    state_values[$("#state_dropdown").val()] + ".csv";
  console.log(csv_url);
  stateData = readCSV(csv_url);
  stateData = stateData.split("\n");
  return stateData;
}

function getAgencyData(stateData) {
  ori = getORI();
  agencyData = stateData.filter(s => s.includes(ori));
  agencyData = data_object_fun(agencyData, headers);
  return agencyData;
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


function exportToCsv() {

        data = allColsData.map(objToString);
        data = data.join("\n");
        data = headers +'\n' + data;
        filename = "ucr_offenses_" +
        agencies[$("#agency_dropdown").val()] + "_" +
        state_values[$("#state_dropdown").val()] + ".csv";

        var blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
