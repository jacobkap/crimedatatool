function resizeChosen() {
  $(".chosen-container").each(function() {
    $(this).attr('style', 'width: 85%');
  });
}


/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
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

function subsetColumns(data, columns, output) {
  data.shift();
  if ($("#rate").is(':checked')) {
    columns = _.map(columns, function(x) {
      return x + "_rate";
    });
    if (output == "table") {
      columns[0] = "agency";
      columns[1] = "year";
      columns[2] = "state";
      columns[3] = "population";
      columns[4] = "ORI";
    } else {
      columns[0] = "year";
    }

  }

  data = _.map(data, function(currentObject) {
    return _.pick(currentObject, columns);
  });
  if (output == "graph") {
    data = data.map(objToString);
    data = data.join("\n");
    data = columns.toString() + "\n" + data;
  }

  return (data);
}

function getStateAgencies(type) {
  url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper/master/data/";
  if (type == "crime") {
    url += "offenses/" + state_values[$("#state_dropdown").val()] + "_agency_choices.json";
  }
  var state_agencies = $.getJSON({
    url: url,
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
  url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper/master/data/";
  if (type == "offenses") {
    state = state_values[$("#state_dropdown").val()];
    state = state.replace(/ /g, "_");
    agencies = offense_agencies[$("#agency_dropdown").val()];
    agencies = agencies.replace(/ /g, "_");
    agencies = agencies.replace(/:/g, "_");
    agencies = agencies.replace(/__/g, "_");
    state = state.replace(" ", "_");
    url += "offenses/" + state + "_" + agencies;
  }
  if (type == "arrests") {
    state = state_values[$("#arrests_state_dropdown").val()];
    state = state.replace(" ", "_");
    state = state.replace(" ", "_");
    url += state;
  }
  url += ".csv";
  stateData = readCSV(url);
  stateData = stateData.split("\n");
  return stateData;
}

function getAgencyData(stateData, headers) {
  agencyData = data_object_fun(stateData, headers);

  if ($("#rate").is(':checked')) {
    agencyData = _.map(agencyData, function(currentObject) {
      return countToRate(currentObject);
    });
  }
  return agencyData;
}

function main(type, state_dropdown, crime_dropdown) {
  stateData = getStateData(type);
  headers = stateData[0];
  colsForGraph = getCrimeColumns(headers, type, "graph");
  colsForTable = getCrimeColumns(headers, type, "table");


  tableData = getAgencyData(stateData, headers);
  tableData.pop();
  graphData = subsetColumns(tableData, colsForGraph, "graph");

  return [tableData, graphData, headers, colsForTable];
}


function getCrimeColumns(arr, type, output) {
  if (type == "offenses") {
    crime = $("#crime_dropdown").val();
  }
  if (type == "arrests") {
    crime = $("#arrests_crime_dropdown").val();
    crime += "_" + $("#arrests_category_dropdown").val();
  }
  arr = arr.split(",");
  if (output == "graph") {
    columnNames = ["year"];
  } else {
    columnNames = ["agency", "year", "state", "population", "ORI"];
  }
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
