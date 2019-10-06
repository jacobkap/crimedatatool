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
  if (!checkIfRateChecked(type)) {
    rate_type = "";
  }


  if (checkIfRateChecked(type) || (type == "crime" && $("#clearance_rate").is(":checked"))) {
    columns = _.map(columns, function(x) {
      if (type == "crime" && $("#clearance_rate").is(":checked") && x.includes("clr_")) {
        return x + "_clearance_rate";
      } else {
        return x + rate_type;
      }
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

function getStateData(type, states) {
  url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper/master/data/";

  if (type == "crime") {
    type = "offenses";
  }
  if (type == "hate") {
    type = "hate_crimes";
  }

  if (["offenses", "arrests", "leoka", "hate_crimes"].includes(type)) {
    if ($("#monthly").is(':checked')) {
      type += "_monthly";
    }
  }


  if (type == "crime_nibrs") {
    type = "nibrs";
  }

  state = states[$("#state_dropdown").val()];
  console.log(state)
  state = state.replace(/ /g, "_");
  state = state.replace(/-/g, "_");
  state = state.replace(/___/g, "_");

  if (type == "prisoners") {
    category = $("#crime_dropdown").val();
    category = category.replace(/ /g, "_");
    url += "prisoners/" + state + "_" + category + "_prisoners";
  } else if (["alcohol", "death"].includes(type)) {
    url += type + "/" + state + "_" + type;
  } else if (["borderpatrol"].includes(type)) {
    category = $("#crime_dropdown").val();
    category = category.replace(/ /g, "_");
    url += type + "/" + category + "_" + state;
  } else {
    agency = agencies[$("#agency_dropdown").val()];
    agency = agency.replace(/ /g, "_");
    agency = agency.replace(/:/g, "_");
    agency = agency.replace(/__/g, "_");
    url += type + "/" + state + "_" + agency;
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
  if (type == "crime" && $("#clearance_rate").is(":checked")) {
    agencyData = _.map(agencyData, function(currentObject) {
      return makeCrimeClearanceRates(currentObject, type);
    });
  }
  return agencyData;
}

function checkIfRateChecked(type) {
  if (["crime", "arrests", "crime_nibrs"].includes(type)) {
    return $("#rate").is(':checked');
  } else if (type == "leoka") {
    return ($("#rate").is(':checked') ||
      $("#leoka_rate_per_officer").is(':checked'));
  } else if (type == "prisoners") {
    return $("#prisoners_rate").is(':checked') || $("#prisoners_rate_adult").is(':checked') || $("#prisoners_rate_18_65").is(':checked');
  }
}

function get_data(type, states) {
  stateData = getStateData(type, states);
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
  if (type == "crime" && $("#clearance_rate").is(":checked")) {
    allAgencyData = _.map(allAgencyData, function(currentObject) {
      return makeCrimeClearanceRates(currentObject, type);
    });
  }

  tableData = getAgencyData(stateData, headers, colsForTable, type);

  // Removes the total officer column used to make the rate
  if (type == "leoka" && leoka_categories[$("#crime_dropdown").val()] != "Police Department Employees") {
    tableData = _.map(tableData, function(x) {
      return _.omit(x, "total_employees_officers");
    });

    index = colsForGraph.indexOf("total_employees_officers");
    colsForGraph.splice(index, 1);
    index = colsForTable.indexOf("total_employees_officers");
    colsForTable.splice(index, 1);
  }

  if (type == "prisoners") {
    cols = [];
    for (var i = 0; i < colsForTable.length; i++) {
      if (!colsForTable[i].includes("population")) {
        cols.push(colsForTable[i]);
      }
    }
    colsForTable = cols;
  }

  return [tableData, colsForGraph, colsForTable, allAgencyData];
}


function getCrimeColumns(headers, type, output) {
  if (type == "alcohol") {
    columnNames = ["year", "number_of_beers", "number_of_shots_liquor", "number_of_glasses_wine", "number_of_drinks_total"];
    if (output == "table") {
      columnNames = ["state"].concat(columnNames);
    }
    return (columnNames);
  }

  headers = headers.split(",");
  if (output == "graph") {
    columnNames = ["year"];
  } else {
    columnNames = ["agency", "year", "state", "population", "ORI"];
  }


  if (type == "prisoners" && output == "table") {
    columnNames = ["state", "year", "population", "population_male", "population_female",
      "population_adult", "population_female_adult", "population_male_adult",
      "population_aged_18_65", "population_female_aged_18_65", "population_male_aged_18_65"
    ];
    if ($("#crime_dropdown").val() == "race_ethnicity" |
      $("#crime_dropdown").val().includes("_crime")) {
      race_value = prisoner_subcatergory_keys[$("#subcategory_dropdown").val()];

      if (prisoner_categories[$("#crime_dropdown").val()].includes("_crime")) {
        race_value = _.keys(prisoners_race)[$("#prisoners_race").val()];
      }
      columnNames = ["state", "year"];
      columnNames.push("population_" + race_value);
      columnNames.push("population_female_" + race_value);
      columnNames.push("population_male_" + race_value);
      columnNames.push("population_adult_" + race_value);
      columnNames.push("population_female_adult_" + race_value);
      columnNames.push("population_male_adult_" + race_value);
      columnNames.push("population_aged_18_65_" + race_value);
      columnNames.push("population_female_aged_18_65_" + race_value);
      columnNames.push("population_male_aged_18_65_" + race_value);
    }
  }

  if (["crime", "death", 'crime_nibrs', "hate", "jail"].includes(type)) {
    crime = $("#crime_dropdown").val();
  } else if (type == "borderpatrol") {
    crime = subcatergory_keys[$("#subcategories").val()];
  } else if (type == "arrests") {
    crime = $("#crime_dropdown").val();
    if (output == "graph") {
      arrest_category = $("#subcategory_dropdown").val();
    }
  } else if (type == "leoka") {
    crime = _.keys(leoka_subcatergory_values)[$("#subcategory_dropdown").val()];

    if (leoka_categories[$("#crime_dropdown").val()] == "Officers Assaulted") {
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
    crime = prisoner_subcatergory_keys[$("#subcategory_dropdown").val()];
    category = $("#crime_dropdown").val();
    if (category.includes("_crime")) {
      race = _.keys(prisoners_race)[$("#prisoners_race").val()];
      crime += "_" + race;
    }
  }


  if (type == "death" & output == "graph") {
    if ($("#rate").is(':checked')) {
      crime = "crude_rate_" + crime;
    } else if ($("#checkbox_2").is(':checked')) {
      crime = "age_adjusted_rate_" + crime;
    } else {
      crime = "deaths_" + crime;
    }
  }
  if (type == "death" & output == "table") {
    columnNames = ["state", "year"];
  }
  if (type == "borderpatrol" & output == "table") {
    columnNames = ["sector", "fiscal_year"];
  }
  if (type == "jail" & output == "table") {
    columnNames = ["state", "year", "county"];
  }




  for (var n = 0; n < headers.length; n++) {
    if (type == "prisoners") {
      if (headers[n].startsWith(crime)) {
        columnNames.push(headers[n]);
      }
      if (typeof race != "undefined" && headers[n].match("population" + ".*" + race) !== null) {
        columnNames.push(headers[n]);
      }
    } else if (type == "arrests") {
      if (headers[n].match(crime + ".*" + arrest_category) !== null) {
        columnNames.push(headers[n]);
      }
      if (arrest_category == "tot_arrests") {
        if (headers[n] == crime + "_tot_adult" || headers[n] == crime + "_tot_juv") {
          columnNames.push(headers[n]);
        }
      }
    } else if (type == "borderpatrol") {
      if (headers[n] === crime) {
        columnNames.push(headers[n]);
      }
    } else {
      if (headers[n].includes(crime)) {
        columnNames.push(headers[n]);
      }
    }
    if (["theft_total", "theft"].includes(crime)) {
      columnNames = columnNames.filter(a => !a.includes('mtr_veh'));
    }
  }

  if (type == "prisoners" && typeof race != "undefined" && race == "total") {
    columnNames = columnNames.concat(["population_adult",
      "population_aged_18_65",
      "population",
      "population_female",
      "population_male",
      "population_female_adult",
      "population_male_adult",
      "population_female_aged_18_65",
      "population_male_aged_18_65"
    ]);
  }

  if (type == "leoka" && leoka_categories[$("#crime_dropdown").val()] != "Police Department Employees") {
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
