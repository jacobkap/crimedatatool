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
  }

  if (type == "nibrs" && $("#percent_of_crimes").is(':checked')) {
    rate_type = "_percent";
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
  if (output == "table" && type != "prisoners") {
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

function getStateData(type, states) {
  url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper/master/data/";
  if (type == "nibrs") {
    url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper_nibrs/master/data/";
    if ($("#category_dropdown").val() == "property") {
          type = "nibrs_property";
    }
  }

  if ($("#monthly").is(':checked')) {
    type += "_monthly";
  }


  state = states[$("#state_dropdown").val()];
  state = state.replace(/ /g, "_");
  state = state.replace(/-/g, "_");
  state = state.replace(/___/g, "_");


    agency = agencies[$("#agency_dropdown").val()];
    agency = agency.replace(/ /g, "_");
    agency = agency.replace(/:/g, "_");
    agency = agency.replace(/__/g, "_");
    url += type + "/" + state + "_" + agency;

  url += ".csv";
  if (type == "nibrs" | type == 'nibrs_property') {
    url = url.replace(/["()]/g, "");
  }

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



  if (type == "nibrs") {
    crime = $("#crime_dropdown").val();
    if ($('#category_dropdown').val() != "property") {
    columnNames.push($("#category_dropdown").val() + "_" + crime);
  }
    category_value = $("#category_dropdown").val()

    if ($('#subcategory_dropdown').val() == "gun") {
      columnNames.push(category_value + "_no_gun_" + crime);
      columnNames.push(category_value + "_handgun_" + crime);
      columnNames.push(category_value + "_other_unknown_gun_" + crime);
    }
    if ($('#category_dropdown').val() == "property" & $('#subcategory_dropdown').val() == "total") {
      columnNames.push("burned_" + crime);
      columnNames.push("counterfeited_" + crime);
      columnNames.push("destroyed_" + crime);
      columnNames.push("recovered_" + crime);
      columnNames.push("seized_" + crime);
      columnNames.push("stolen_" + crime);
    }
    if ($('#category_dropdown').val() == "property" & $('#subcategory_dropdown').val() == "value_mean") {
      columnNames.push("burned_mean_value_" + crime);
      columnNames.push("counterfeited_mean_value_" + crime);
      columnNames.push("destroyed_mean_value_" + crime);
      columnNames.push("recovered_mean_value_" + crime);
      columnNames.push("seized_mean_value_" + crime);
      columnNames.push("stolen_mean_value_" + crime);
    }
    if ($('#category_dropdown').val() == "property" & $('#subcategory_dropdown').val() == "value_median") {
      columnNames.push("burned_median_value_" + crime);
      columnNames.push("counterfeited_median_value_" + crime);
      columnNames.push("destroyed_median_value_" + crime);
      columnNames.push("recovered_median_value_" + crime);
      columnNames.push("seized_median_value_" + crime);
      columnNames.push("stolen_median_value_" + crime);
    }
    if ($('#category_dropdown').val() == "property" & $('#subcategory_dropdown').val() == "drugs") {
      columnNames.push("drugs_" + crime);
    }
    if ($('#subcategory_dropdown').val() == "location") {
      columnNames.push(category_value + "_bar_nightclub_" + crime);
      columnNames.push(category_value + "_home_" + crime);
      columnNames.push(category_value + "_other_unknown_location_" + crime);
      columnNames.push(category_value + "_outside_" + crime);
      columnNames.push(category_value + "_school_" + crime);
    }
    if ($('#subcategory_dropdown').val() == "clearance") {
      columnNames.push(category_value + "_cleared_by_arrest_" + crime);
      columnNames.push(category_value + "_death_of_suspect_" + crime);
      columnNames.push(category_value + "_extradition_denied_" + crime);
      columnNames.push(category_value + "_juvenile_no_custody_" + crime);
      columnNames.push(category_value + "_prosecution_declined_" + crime);
      columnNames.push(category_value + "_victim_refused_to_cooperate_" + crime);
    }
    if ($('#subcategory_dropdown').val() == "subtype" && $("#crime_dropdown").val() != "animal_cruelty") {
      columnNames.push(category_value + "_buy_possess_consume_" + crime);
      columnNames.push(category_value + "_sell_create_assist_" + crime);
    }
    if ($('#subcategory_dropdown').val() == "subtype" && $("#crime_dropdown").val() == "animal_cruelty") {
      columnNames.push(category_value + "_abuse_torture_" + crime);
      columnNames.push(category_value + "_animal_fighting_" + crime);
      columnNames.push(category_value + "_bestiality_" + crime);
      columnNames.push(category_value + "_neglect_" + crime);
    }
    if ($('#subcategory_dropdown').val() == "relationship") {
      columnNames.push(category_value + "_intimate_partner_" + crime);
      columnNames.push(category_value + "_other_family_" + crime);
      columnNames.push(category_value + "_other_relationship_" + crime);
      columnNames.push(category_value + "_stranger_" + crime);
      columnNames.push(category_value + "_unknown_relationship_" + crime);
    }
    if ($('#subcategory_dropdown').val() == "injury") {
      columnNames.push(category_value + "_no_injury_" + crime);
      columnNames.push(category_value + "_minor_injury_" + crime);
      columnNames.push(category_value + "_serious_injury_" + crime);
    }
    if ($('#subcategory_dropdown').val() == "arrest_type") {
      columnNames.push(category_value + "_on_view_arrest_" + crime);
      columnNames.push(category_value + "_summoned_cited_" + crime);
      columnNames.push(category_value + "_taken_into_custody_" + crime);
    }
    if ($('#subcategory_dropdown').val() == "sex") {
      columnNames.push(category_value + "_female_" + crime);
      columnNames.push(category_value + "_male_" + crime);
      if ($('#category_dropdown').val() != "arrestee") {
        columnNames.push(category_value + "_unknown_sex_" + crime);
      }
    }
    if ($('#subcategory_dropdown').val() == "race") {
      columnNames.push(category_value + "_asian_" + crime);
      columnNames.push(category_value + "_american_indian_" + crime);
      columnNames.push(category_value + "_black_" + crime);
      columnNames.push(category_value + "_white_" + crime);
      if ($('#category_dropdown').val() != "arrestee") {
        columnNames.push(category_value + "_unknown_race_" + crime);
      }
    }
    if ($('#subcategory_dropdown').val() == "age") {
      columnNames.push(category_value + "_adult_" + crime);
      columnNames.push(category_value + "_juvenile_" + crime);
      columnNames.push(category_value + "_unknown_age_" + crime);
    }
    if ($('#subcategory_dropdown').val() == "ethnicity") {
      columnNames.push(category_value + "_hispanic_" + crime);
      columnNames.push(category_value + "_not_hispanic_" + crime);
      if ($('#category_dropdown').val() != "arrestee") {
        columnNames.push(category_value + "_unknown_ethnicity_" + crime);
      }
    }
    crime = "hellodarknessmyoldfriend"
  }

  if (["offenses", "death", "hate", "jail", "school"].includes(type)) {
    crime = $("#crime_dropdown").val();
  }  else if (type == "arrests") {
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
  }



  for (var n = 0; n < headers.length; n++) {
   if (type == "arrests") {
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
      } else if ($("#subsubcategory_dropdown").val() == "Race") {
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
      } else if ($("#subsubcategory_dropdown").val() == "Ethnicity") {
        hispanic_arrest = crime + "_" + arrest_category + "_hispanic";
        nonhispanic_arrest = crime + "_" + arrest_category + "_non_hisp";
        if (arrest_category == "tot") {
          total_arrest = crime + "_tot_arrests"
        } else {
          total_arrest = crime + "_tot_" + arrest_category;
        }
        if ([hispanic_arrest, nonhispanic_arrest, total_arrest].includes(headers[n])) {
          columnNames.push(headers[n]);
        }
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

  if (type == "police" && !columnNames.includes("total_employees_officers")) {
    columnNames.push("total_employees_officers");
  }

  if (type == "arrests") {
    index = columnNames.indexOf(total_arrest);
    columnNames.push(columnNames.splice(index, 1)[0]);
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
