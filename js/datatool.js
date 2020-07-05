// Chosen touch support.
    if ($('.chosen-container').length > 0) {
      $('.chosen-container').on('touchstart', function(e){
        e.stopPropagation(); e.preventDefault();
        // Trigger the mousedown event.
        $(this).trigger('mousedown');
      });
    }

function resizeChosen() {
  $(".chosen-container").each(function() {
    $(this).attr('style', 'width: 85%');
  });
}

function disable_animation_on_mobile(graph_obj) {
   if (window.innerWidth <= 800 || window.innerHeight <= 600) {
     graph_obj.options.tooltips.enabled = false;
     graph_obj.options.events = []
   } else {
     graph_obj.options.tooltips.enabled = true;
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

function get_rate_type(type, binary = false) {
  rate_type = "";
  if ($("#rate").is(':checked') || $("#prisoners_rate").is(':checked')) {
    rate_type = "_rate";
  } else if ($("#percent_of_arrests").is(':checked')) {
    rate_type = "_percent_of_arrests";
  } else if ($("#percent_of_all_arrests").is(':checked')) {
    rate_type = "_percent_of_all_arrests";
  } else if (type == "police" && $("#checkbox_4").is(':checked')) {
    rate_type = "_rate_per_officer";
  } else if ($("#prisoners_rate_adult").is(':checked')) {
    rate_type = "_rate_adults";
  } else if ($("#prisoners_rate_18_65").is(':checked')) {
    rate_type = "_rate_age_18_65";
  } else if (type == "death" && $("#checkbox_2").is(':checked')) {
    rate_type = "_rate_age_adjusted";
  } else if (type == "death" && $("#rate").is(':checked')) {
    rate_type = "_crude_rate";
  }
  if (binary) {
    if (rate_type == "") {
      return false;
    } else {
      return true;
    }
  }
  return rate_type;
}


function subsetColumns(data, columns, output, type) {

  rate_type = get_rate_type(type)
  if ((rate_type != "" || (type == "offenses" && $("#clearance_rate").is(":checked"))) && type != "death") {
    columns = _.map(columns, function(x) {
      if (type == "offenses" && $("#clearance_rate").is(":checked") && x.includes("clr_")) {
        return x + "_clearance_rate";
      } else {
        return x + rate_type;
      }
    });
    if (output == "table" && type == "school") {
      columns[0] = "school_name";
      columns[1] = "year";
      columns[2] = "school_unique_ID";
      columns[3] = "number_of_students";
    } else if (output == "table" && type != "prisoners") {
      columns[0] = "agency";
      columns[1] = "year";
      columns[2] = "state";
      columns[3] = "population";
      columns[4] = "ORI";
    } else if (output == "table" && type == "prisoners") {
      columns[0] = "state";
      columns[1] = "year";
    }  else {
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


  if ($("#monthly").is(':checked')) {
    type += "_monthly";
  }


  state = states[$("#state_dropdown").val()];
  state = state.replace(/ /g, "_");
  state = state.replace(/-/g, "_");
  state = state.replace(/___/g, "_");

  if (type == "prisoners") {
    category = $("#crime_dropdown").val();
    category = category.replace(/ /g, "_");
    url += "prisoners/" + state + "_" + category + "_prisoners";
  } else if (["alcohol", "death"].includes(type)) {
    url += type + "/" + state + "_" + type;
  } else if (type == "school") {
    url += type + "/" + state;
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
  if (get_rate_type(type, binary = true) && type != "death") {
    agencyData = _.map(agencyData, function(currentObject) {
      return countToRate(currentObject, type);
    });
  }
  if (type == "offenses" && $("#clearance_rate").is(":checked")) {
    agencyData = _.map(agencyData, function(currentObject) {
      return makeCrimeClearanceRates(currentObject, type);
    });
  }
  return agencyData;
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

  if (get_rate_type(type, binary = true) && type != "death") {
    allAgencyData = _.map(allAgencyData, function(currentObject) {
      return countToRate(currentObject, type);
    });
  }
  if (type == "offenses" && $("#clearance_rate").is(":checked")) {
    allAgencyData = _.map(allAgencyData, function(currentObject) {
      return makeCrimeClearanceRates(currentObject, type);
    });
  }

  tableData = getAgencyData(stateData, headers, colsForTable, type);

  // Removes the total officer column used to make the rate
  if (type == "police" && police_categories[$("#crime_dropdown").val()] != "Police Department Employees") {
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

  if (type == "school") {
    if (output == "graph") {
      columnNames = ["year"];
    } else {
      columnNames = ["school_name", "year", "school_unique_ID", "number_of_students"];
    }
  }


  if (type == "prisoners" && output == "table") {
    columnNames = ["state", "year", "population", "population_male", "population_female",
      "population_adult", "population_female_adult", "population_male_adult",
      "population_aged_18_65", "population_female_aged_18_65", "population_male_aged_18_65"
    ];
    if ($("#crime_dropdown").val() == "race_ethnicity" ||
      $("#crime_dropdown").val().includes("_crime")) {
      race_value = $("#subsubcategory_dropdown").val()

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

  if (["offenses", "death", 'nibrs', "hate", "jail", "school"].includes(type)) {
    crime = $("#crime_dropdown").val();
  } else if (type == "borderpatrol") {
    crime = $("#subcategory_dropdown").val()
  } else if (type == "arrests") {
    crime = $("#crime_dropdown").val();
    if (output == "graph") {
      arrest_category = $("#subcategory_dropdown").val();
    }
  } else if (type == "police") {
    crime = $("#subcategory_dropdown").val()

    if (police_categories[$("#crime_dropdown").val()] == "Officers Assaulted") {
      weapon = $("#subsubcategory_dropdown").val()

      // The total columns have slightly different names than others so this makes them work.
      if (crime == "assaults_with_injury" || crime == "assaults_no_injury") {
        weapon = weapon.replace("assault_", "");
        weapon = weapon.replace("_assaults", "");
      }
      crime = crime + "_" + weapon;
      if (crime == "total_total_assaults") crime = "total_assaults_total";
    }
  } else if (type == "prisoners") {
    crime = $("#subcategory_dropdown").val()
    category = $("#crime_dropdown").val();
    if (category.includes("_crime")) {
      race = $("#subsubcategory_dropdown").val()
      crime += "_" + race;
    }
  }


  if (type == "death" & output == "graph") {
    if ($("#rate").is(':checked')) {
      crime = crime + "_crude_rate";
    } else if ($("#checkbox_2").is(':checked')) {
      crime = crime + "_age_adjusted_rate";
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
      if (headers[n].includes(crime)) {
        columnNames.push(headers[n]);
      }
      if (typeof race != "undefined" && headers[n].match("population" + ".*" + race) !== null) {
        columnNames.push(headers[n]);
      }
    } else if (type == "arrests") {
      if ($("#subsubcategory_dropdown").val() == "Sex") {
        female_arrest = crime + "_tot_female_" + arrest_category;
        male_arrest = crime + "_tot_male_" + arrest_category;
        if (arrest_category == "tot") {
          female_arrest = crime + "_tot_female";
          male_arrest = crime + "_tot_male";
          arrest_category_temp = "arrests";
          total_arrest = crime + "_tot_arrests";
        } else {
          total_arrest = crime + "_tot_" + arrest_category;
        }
        if ([female_arrest, male_arrest, total_arrest].includes(headers[n])) {
          columnNames.push(headers[n]);
        }
      } else {
        amer_ind_arrest = crime + "_" + arrest_category + "_amer_ind";
        asian_arrest = crime + "_" + arrest_category + "_asian";
        black_arrest = crime + "_" + arrest_category + "_black";
        white_arrest = crime + "_" + arrest_category + "_white";
        if (arrest_category == "tot") {
          total_arrest = crime + "_tot_arrests"
        } else {
          total_arrest = crime + "_tot_" + arrest_category;
        }
        if ([amer_ind_arrest, asian_arrest, black_arrest, white_arrest, total_arrest].includes(headers[n])) {
          columnNames.push(headers[n]);
        }
      }

    } else if (type == "borderpatrol") {
      if (headers[n] === crime) {
        columnNames.push(headers[n]);
      }
    } else if (type == "school") {
      bias = "";
      if ($("#crime_dropdown").val() == "hate") {
        bias = "_" + $("#subsubcategory_dropdown").val();
        if ($("#subsubcategory_dropdown").val() == "total") {
          bias = "";
        }
      }
      crime_category = crime + "(_total|.*campus|.*facilities|.*public_property)_" + $("#subcategory_dropdown").val() + bias;
      crime_category = RegExp(crime_category);
      if (headers[n].match(crime_category) != null) {
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

  if (type == "police" && !columnNames.includes("total_employees_officers")) {
    columnNames.push("total_employees_officers");
  }

  if (type == "arrests") {
    index = columnNames.indexOf(total_arrest);
    columnNames.push(columnNames.splice(index, 1)[0]);
  }

  if (type == "school") {
    if (output == "graph") {
      adder = 0;
    } else {
      adder = 3;
    }

    noncampus = columnNames.indexOf(crime + "_noncampus_" + $("#subcategory_dropdown").val() + bias);
    columnNames.move(noncampus, (1 + adder))
    on_campus = columnNames.indexOf(crime + "_on_campus_" + $("#subcategory_dropdown").val() + bias);
    columnNames.move(on_campus, (2 + adder))
    student_housing = columnNames.indexOf(crime + "_on_campus_student_housing_facilities_" + $("#subcategory_dropdown").val() + bias);
    columnNames.move(student_housing, (3 + adder))
    public = columnNames.indexOf(crime + "_public_property_" + $("#subcategory_dropdown").val() + bias);
    columnNames.move(public, (4 + adder))
    total = columnNames.indexOf(crime + "_total_" + $("#subcategory_dropdown").val() + bias);
    columnNames.move(total, (5 + adder))
  }

  if (type == "arrests") {
    columnNames.push("all_arrests_total_tot_arrests")
  }

  return (columnNames);
}

Array.prototype.move = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

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
