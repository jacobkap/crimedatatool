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

function subsetColumns(data, columns, output, type) {
  rate_type = "_rate";
  if (type == "leoka" && $("#leoka_rate_per_officer").is(':checked') === true) {
    rate_type = "_rate_per_officer";
  }


  if (checkIfRateChecked(type)) {
    columns = _.map(columns, function(x) {
      return x + rate_type;
    });

    if (output == "table" && type != "prisoners") {
      columns[0] = "agency";
      columns[1] = "year";
      columns[2] = "state";
      columns[3] = "population";
      columns[4] = "ORI";
    } else if (output == "table" && type == "prisoners") {
      columns[0] = "state";
      columns[1] = "year";
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
    agencies = offense_agencies[$("#agency_dropdown").val()];
    agencies = agencies.replace(/ /g, "_");
    agencies = agencies.replace(/:/g, "_");
    agencies = agencies.replace(/__/g, "_");
    url += "offenses/" + state + "_" + agencies;
  } else if (type == "arrests") {
    state = state_values[$("#arrests_state_dropdown").val()];
    state = state.replace(/ /g, "_");
    agencies = arrest_agencies[$("#arrests_agency_dropdown").val()];
    agencies = agencies.replace(/ /g, "_");
    agencies = agencies.replace(/:/g, "_");
    agencies = agencies.replace(/__/g, "_");
    url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_data/master/data/";
    url += "arrests/" + state + "_" + agencies;
  } else if (type == "leoka") {
    state = state_values[$("#leoka_state_dropdown").val()];
    state = state.replace(/ /g, "_");
    agencies = leoka_agencies[$("#leoka_agency_dropdown").val()];
    agencies = agencies.replace(/ /g, "_");
    agencies = agencies.replace(/:/g, "_");
    agencies = agencies.replace(/__/g, "_");
    url += "leoka/" + state + "_" + agencies;
  } else if (type == "prisoners") {
    state = prisoners_state_values[$("#prisoners_jurisdictions").val()];
    state = state.replace(/ /g, "_");
    temp_cat = _.keys(prisoner_categories);
    category = temp_cat[$("#prisoners_categories").val()];
    category = category.replace(/ /g, "_");
    url += "prisoners/" + state + "_" + category + "_prisoners";
  }
  url += ".csv";
  stateData = readCSV(url);
  stateData = stateData.split("\n");
  return stateData;
}

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

function getAgencyData(stateData, headers, table_headers, type) {
  agencyData = data_object_fun(stateData, headers);

  agencyData.pop();
  agencyData.shift();
  // fixes issue where year 2000 is sometimes set as "2e3"
  for (var i = 0; i < agencyData.length; i++) {
    if (agencyData[i].year == "2e3") {
      agencyData[i].year = "2000";
    }
  }
  agencyData = sortByKey(agencyData, "year");

  agencyData = _.map(agencyData, function(x) {
    return _.pick(x, table_headers);
  });

  if (checkIfRateChecked(type)) {
    agencyData = _.map(agencyData, function(currentObject) {
      return countToRate(currentObject, type);
    });
  }
  return agencyData;
}

function checkIfRateChecked(type) {
  if (type == "offenses") {
    return $("#offenses_rate").is(':checked');
  } else if (type == "arrests") {
    return $("#arrests_rate").is(':checked');
  } else if (type == "leoka") {
    return ($("#leoka_rate").is(':checked') ||
      $("#leoka_rate_per_officer").is(':checked'));
  } else if (type == "prisoners") {
    return $("#prisoners_rate").is(':checked') || $("#prisoners_rate_adult").is(':checked') || $("#prisoners_rate_18_65").is(':checked');
  }
}

function main(type) {
  stateData = getStateData(type);
  headers = stateData[0];
  colsForGraph = getCrimeColumns(headers, type, "graph");

  // Reorder cols for graph to make clearance before clearance 18.
  Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };

  colsForTable = getCrimeColumns(headers, type, "table");
  allAgencyData = data_object_fun(stateData, headers);
  allAgencyData.pop();
  allAgencyData.shift();

  if (checkIfRateChecked(type)) {
    allAgencyData = _.map(allAgencyData, function(currentObject) {
      return countToRate(currentObject, type);
    });
  }

  tableData = getAgencyData(stateData, headers, colsForTable, type);

  // Removes the total officer column used to make the rate
  if (type == "leoka" && leoka_categories[$("#leoka_category_dropdown").val()] != "Police Department Employees") {
    tableData = _.map(tableData, function(x) {
      return _.omit(x, "total_employees_officers");
    });

    index = colsForGraph.indexOf("total_employees_officers");
    colsForGraph.splice(index, 1);
    index = colsForTable.indexOf("total_employees_officers");
    colsForTable.splice(index, 1);
  }

  return [tableData, colsForGraph, colsForTable, allAgencyData];
}


function getCrimeColumns(headers, type, output) {
  headers = headers.split(",");
  if (output == "graph") {
    columnNames = ["year"];
  } else {
    columnNames = ["agency", "year", "state", "population", "ORI"];
  }
  if (type == "prisoners" && output == "table") {
    columnNames = ["state", "year", "population", "population_adult", "population_adult_aged_18_65"];
    if (_.keys(prisoner_categories)[$("#prisoners_categories").val()] == "race_ethnicity") {
    race_value = prisoner_subcatergory_keys[$("#prisoners_subcategories").val()];
    columnNames.push("population_" + race_value);
    columnNames.push("population_adult_" + race_value);
    columnNames.push("population_adult_aged_18_65_" + race_value);
  }
  }

  if (type == "offenses") {
    crime = $("#crime_dropdown").val();
  } else if (type == "arrests") {
    crime = $("#arrests_crime_dropdown").val();
    if (output == "graph") {
      crime += "_" + $("#arrests_category_dropdown").val();
    }
  } else if (type == "leoka") {
    crime = leoka_subcatergory_keys[$("#leoka_subcategory_dropdown").val()];

    if (leoka_categories[$("#leoka_category_dropdown").val()] == "Officers Assaulted") {
      weapon = _.keys(leoka_weapons)[$("#leoka_weapons").val()];

// The total columns have slightly different names than others so this makes them work.
      if (crime == "assaults_with_injury" || crime == "assaults_no_injury") {
        weapon = weapon.replace("assault_", "");
        weapon = weapon.replace("_assaults", "");
      }
      crime = crime + "_" + weapon;
      if (crime == "total_total_assaults") crime = "total_assaults_total";
    }
  } else if (type == "prisoners") {
    crime = prisoner_subcatergory_keys[$("#prisoners_subcategories").val()];

  }

    for (var n = 0; n < headers.length; n++) {
      if (type == "prisoners") {
      if (headers[n].startsWith(crime)) {
        columnNames.push(headers[n]);
      }
    } else {
      if (headers[n].includes(crime)) {
        columnNames.push(headers[n]);
      }
    }
    if (crime === "theft_total") {
      columnNames = columnNames.filter(a => !a.includes('mtr_vhc'));
    }
}

  if (type == "leoka" && leoka_categories[$("#leoka_category_dropdown").val()] != "Police Department Employees") {
    columnNames.push("total_employees_officers");
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
