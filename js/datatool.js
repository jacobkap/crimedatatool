
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

function getStateAgencies(agency_type) {
  var state_agencies = $.getJSON({
    url: agency_type + ".json",
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

function getStateData(type) {
  csv_url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper/master/data/" +
  type + "/" + type + "_";
  if (type == "offenses") {
    csv_url += state_values[$("#state_dropdown").val()];
  }
  if (type == "arrests")  {
    csv_url += state_values[$("#arrests_state_dropdown").val()];
  }
  csv_url +=".csv";
  stateData = readCSV(csv_url);
  stateData = stateData.split("\n");
  return stateData;
}

function main(type, agencies, state_dropdown, crime_dropdown) {
  stateData = getStateData(type);
  headers = stateData[0];
  colsForGraph = getCrimeColumns(headers, type);

  if (type == "offenses") {
    state = state_values[$("#state_dropdown").val()];
    agency = agencies[$("#agency_dropdown").val()];
    ori = getORI(offenses_state_agencies, state, agency);
  }
  if (type == "arrests") {
    state = state_values[$("#arrests_state_dropdown").val()];
    agency = agencies[$("#arrests_agency_dropdown").val()];
    ori = getORI(arrests_state_agencies, state, agency);
  }

  tableData = getAgencyData(stateData, headers, ori);
  graphData = subsetColumns(tableData, colsForGraph);
  return [tableData, graphData, headers];
}

function getORI(state_agencies, state, agency) {
  ori = state_agencies.filter(x => x.state === state);
  ori = ori.filter(x => x.agency === agency);
  return ori[0].ori;
}

function getCrimeColumns(arr, type) {
  if (type == "offenses") {
  crime = $("#crime_dropdown").val();
}
if (type == "arrests") {
  crime = $("#arrests_crime_dropdown").val();
  crime += "_" + $("#arrests_category_dropdown").val();
}
  arr = arr.split(",");
  columnNames = ["year"];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].includes(crime)) {
      columnNames.push(arr[i]);
    }
  }
  return (columnNames);
}

function getAgencyData(stateData, headers, ori) {
  agencyData = stateData.filter(s => s.includes(ori));
  agencyData = data_object_fun(agencyData, headers);

  if ($("#rate").is(':checked')) {
    agencyData = _.map(agencyData, function(currentObject) {
      return countToRate(currentObject);
    });
  }
  return agencyData;
}

function getAgenciesInState(data, state_dropdown) {
  state = state_values[$(state_dropdown).val()];
  agencies = data.filter(s => s.state === state);
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
