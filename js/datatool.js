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

function rateChangeFun() {
  agencyData = getAgencyData(stateData);

  updateGraph(agencyData);
  table.destroy();
  table = makeTable(agencyData);
}

function crimeChangeFun() {
  updateGraph(agencyData);
}

function stateChangeFun() {
  stateData = getStateData();
  updateAgencies();
  agencyChangeFun();
}

function agencyChangeFun() {
  agencyData = getAgencyData(stateData);
  updateGraph(agencyData);
  updateTable(agencyData);
}



function getStateData() {
  csv_url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper/master/data/offenses/offenses_" +
    state_values[$("#state_dropdown").val()] + ".csv";
  stateData = readCSV(csv_url);
  stateData = stateData.split("\n");
  return stateData;
}

function getAgencyData(stateData) {
  ori = getORI();
  agencyData = stateData.filter(s => s.includes(ori));
  agencyData = data_object_fun(agencyData, headers);

  if ($("#rate").is(':checked')) {
    agencyData = _.map(agencyData, function(currentObject) {
      return countToRate(currentObject);
    });
  }
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


function countToRate(data) {
  data_keys = _.keys(data);
  for (var i = 0; i < data_keys.length; i++) {
    temp_match = data_keys[i].replace(/act_|clr_18_|clr_|unfound_/, "");
    if (temp_match != data_keys[i] &
      temp_match != "officers_assaulted" &
      temp_match != "officers_killed_by_felony") {
      rate_val = data[data_keys[i]] / data.population * 100000;
      rate_val = parseFloat(rate_val).toFixed(2); // Rounds to 2 decimals
      data[data_keys[i]] = rate_val;
      new_key = data_keys[i] + "_rate";
      Object.defineProperty(data, new_key,
        Object.getOwnPropertyDescriptor(data, data_keys[i]));
      delete data[data_keys[i]];
    }
  }
  return data;
}

function exportToCsv() {

  data = agencyData.map(objToString);
  data = data.join("\n");
  data = objToString(_.keys(agencyData[0])) + '\n' + data;
  type = "ucr_offenses_";

  if ($("#rate").is(':checked')) {
    type += "rate_";
  } else {
    type += "count_";
  }

  filename = type +
    agencies[$("#agency_dropdown").val()] + "_" +
    state_values[$("#state_dropdown").val()] + ".csv";


  var blob = new Blob([data], {
    type: 'text/csv;charset=utf-8;'
  });
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
