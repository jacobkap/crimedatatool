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



function getStateData(type) {
  url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper/master/data/";
  if (type == "offenses") {
    state = state_values[$("#state_dropdown").val()];
    state = state.replace(/ /g, "_");
    state = state.replace(" ", "_");
    agencies = offense_agencies[$("#agency_dropdown").val()];
    agencies = agencies.replace(/ /g, "_");
    agencies = agencies.replace(/:/g, "_");
    agencies = agencies.replace(/__/g, "_");
    url += "offenses/" + state + "_" + agencies;
  } else if (type == "arrest") {
    state = state_values[$("#arrests_state_dropdown").val()];
    state = state.replace(/ /g, "_");
    state = state.replace(" ", "_");
    agencies = arrest_agencies[$("#arrests_agency_dropdown").val()];
    agencies = agencies.replace(/ /g, "_");
    agencies = agencies.replace(/:/g, "_");
    agencies = agencies.replace(/__/g, "_");
    url += "arrests/" + state + "_" + agencies;
  } else if (type == "leoka") {
    state = state_values[$("#leoka_state_dropdown").val()];
    state = state.replace(/ /g, "_");
    state = state.replace(" ", "_");
    agencies = leoka_agencies[$("#leoka_agency_dropdown").val()];
    agencies = agencies.replace(/ /g, "_");
    agencies = agencies.replace(/:/g, "_");
    agencies = agencies.replace(/__/g, "_");
    url += "leoka/" + state + "_" + agencies;
  }
  url += ".csv";
  stateData = readCSV(url);
  stateData = stateData.split("\n");
  return stateData;
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function getAgencyData(stateData, headers) {
  agencyData = data_object_fun(stateData, headers);
  agencyData.pop();
  agencyData.shift();
  agencyData = sortByKey(agencyData, "year");

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


  return [tableData, colsForGraph, colsForTable];
}


function getCrimeColumns(headers, type, output) {
  headers = headers.split(",");
  if (output == "graph") {
    columnNames = ["year"];
  } else {
    columnNames = ["agency", "year", "state", "population", "ORI"];
  }
  if (type == "offenses") {
    crime = $("#crime_dropdown").val();
  } else if (type == "arrest") {
    crime = $("#arrests_crime_dropdown").val();
    if (output == "graph") {
      crime += "_" + $("#arrests_category_dropdown").val();
    }} else if (type == "leoka") {
      crime = $("#leoka_category_dropdown").val();
    }


if (type == "leoka") {
  for (var i = 0; i < headers.length; i++) {
    if (headers[i] === crime) {
      columnNames.push(headers[i]);
    }
  }
} else {
  for (var n = 0; n < headers.length; n++) {
    if (headers[n].includes(crime)) {
      columnNames.push(headers[n]);
    }
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
