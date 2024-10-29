

function get_rate_type(type, binary = false) {
  rate_type = "";
  if ($("#rate").is(':checked')) {
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

  rate_type = get_rate_type(type)
  if ((rate_type != "" || (type == "offenses" && $("#clearance_rate").is(":checked")))) {
    columns = _.map(columns, function(x) {
      if (type == "offenses" && $("#clearance_rate").is(":checked") && x.includes("clr_")) {
        return x + "_clearance_rate";
      } else {
        return x + rate_type;
      }
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

function getStateData(type, states) {
  // Define the base URL based on type
  let baseUrl = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper/master/data/";
  if (type === "nibrs") {
    baseUrl = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper_nibrs/master/data/";
    if ($("#category_dropdown").val() === "property") {
      type = "nibrs_property";
    }
  }

  // Append "_monthly" if the checkbox is checked
  if ($("#monthly").is(":checked")) {
    type += "_monthly";
  }

  // Cache jQuery selectors for state and agency dropdowns
  const stateValue = states[$("#state_dropdown").val()];
  const agencyValue = agencies[$("#agency_dropdown").val()];

  // Clean up the state and agency names using a single regex
  const state = stateValue.replace(/[\s-]+/g, "_").replace(/___/g, "_");
  const agency = agencyValue.replace(/[\s:]+/g, "_").replace(/__/g, "_");

  // Construct the URL
  let url = `${baseUrl}${type}/${state}_${agency}.csv`;

  // Clean up the URL if it's NIBRS data
  if (type === "nibrs" || type === "nibrs_property") {
    url = url.replace(/["()]/g, "");
  }

  // Fetch and process the CSV data
  let stateData = readCSV(url);
  stateData = stateData.split("\n");

  return stateData;
}

function sortByKey(array, key) {
  return array.sort((a, b) => a[key].localeCompare(b[key]));
}

function getAgencyData(stateData, headers, table_headers, type) {
  // Get agency data and clean unnecessary rows
  let agencyData = data_object_fun(stateData, headers);
  agencyData = agencyData.slice(1, -1); // Removes the first and last element

  // Fix year format issue where '2e3' should be '2000' and sort by year
  agencyData = agencyData.map(entry => {
    if (entry.year === "2e3") {
      entry.year = "2000";
    }
    return entry;
  });

  agencyData = sortByKey(agencyData, "year");

  // Pick only the relevant table headers
  agencyData = agencyData.map(entry => _.pick(entry, table_headers));

  // Cache the result of the rate type check
  const isRateType = get_rate_type(type, true);

  // Apply rate conversion if necessary
  if (isRateType) {
    agencyData = agencyData.map(currentObject => countToRate(currentObject, type));
  }

  // Apply crime clearance rate logic if applicable
  if (type === "offenses" && $("#clearance_rate").is(":checked")) {
    agencyData = agencyData.map(currentObject => makeCrimeClearanceRates(currentObject, type));
  }

  return agencyData;
}


function get_data(type, states) {
  let stateData = getStateData(type, states);
  let headers = stateData[0];
  let colsForGraph = getCrimeColumns(headers, type, "graph");
  let colsForTable = getCrimeColumns(headers, type, "table");

  // Move 'clearance' column before 'clearance 18' if necessary
  const moveElement = (arr, from, to) => arr.splice(to, 0, arr.splice(from, 1)[0]);

  // Get all agency data, removing first and last elements
  let allAgencyData = data_object_fun(stateData, headers).slice(1, -1);

  const isRateType = get_rate_type(type, true);

  // Apply rate conversions if necessary
  if (isRateType) {
    allAgencyData = allAgencyData.map(currentObject => countToRate(currentObject, type));
  }

  // Apply clearance rate calculation if necessary
  if (type === "offenses" && $("#clearance_rate").is(":checked")) {
    allAgencyData = allAgencyData.map(currentObject => makeCrimeClearanceRates(currentObject, type));
  }

  // Get the final table data
  let tableData = getAgencyData(stateData, headers, colsForTable, type);

  // Cache dropdown value for police category
  const crimeDropdownValue = $("#crime_dropdown").val();

  // Remove total officer column if necessary
  if (type === "police" && police_categories[crimeDropdownValue] !== "Police Department Employees") {
    tableData = tableData.map(x => _.omit(x, "total_employees_officers"));

    // Remove total_employees_officers from both colsForGraph and colsForTable
    const removeColumn = (arr, column) => {
      const index = arr.indexOf(column);
      if (index !== -1) arr.splice(index, 1);
    };

    removeColumn(colsForGraph, "total_employees_officers");
    removeColumn(colsForTable, "total_employees_officers");
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

  if (["offenses", "arson"].includes(type)) {
    crime = $("#crime_dropdown").val();
  }  else if (type == "hate") {
        crime = $("#crime_dropdown").val();
        actual_crime = $("#hate_crime_dropdown").val();
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
        female_arrest = crime + "_total_female_" + arrest_category;
        male_arrest = crime + "_total_male_" + arrest_category;
        if (arrest_category == "total") {
          female_arrest = crime + "_total_female";
          male_arrest = crime + "_total_male";
          arrest_category_temp = "arrests";
          total_arrest = crime + "_total_arrests";
        } else {
          total_arrest = crime + "_total_" + arrest_category;
        }
        if ([female_arrest, male_arrest, total_arrest].includes(headers[n])) {
          columnNames.push(headers[n]);
        }
      } else if ($("#subsubcategory_dropdown").val() == "Race") {
        american_indian_arrest = crime + "_" + arrest_category + "_american_indian";
        asian_arrest = crime + "_" + arrest_category + "_asian";
        black_arrest = crime + "_" + arrest_category + "_black";
        white_arrest = crime + "_" + arrest_category + "_white";
        if (arrest_category == "total") {
          total_arrest = crime + "_total_arrests"
        } else {
          total_arrest = crime + "_total_" + arrest_category;
        }
        if ([american_indian_arrest, asian_arrest, black_arrest, white_arrest, total_arrest].includes(headers[n])) {
          columnNames.push(headers[n]);
        }
      } else if ($("#subsubcategory_dropdown").val() == "Ethnicity") {
        hispanic_arrest = crime + "_" + arrest_category + "_hispanic";
        nonhispanic_arrest = crime + "_" + arrest_category + "_non_hispanic";
        if (arrest_category == "total") {
          total_arrest = crime + "_total_arrests"
        } else {
          total_arrest = crime + "_total_" + arrest_category;
        }
        if ([hispanic_arrest, nonhispanic_arrest, total_arrest].includes(headers[n])) {
          columnNames.push(headers[n]);
        }
      }
    } else if (type == "hate") {
      if (headers[n].includes(crime + "_" + actual_crime)) {
        columnNames.push(headers[n]);
      }
    } else {
      if (headers[n].includes(crime)) {
        columnNames.push(headers[n]);
      }
    }
    if (["theft_total", "theft"].includes(crime)) {
      columnNames = columnNames.filter(a => !a.includes('motor_vehicle'));
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
    columnNames.push("all_arrests_total_total_arrests")
  }

  return (columnNames);
}
function data_object_fun(arr, headers) {
  // Trim and split headers once
  headers = headers.split(",").map(header => header.trim());

  // Map over the array to create the objects
  return arr.map(row => {
    const data = row.split(",").map(item => item.trim());

    // Use reduce to create the object
    return headers.reduce((obj, header, index) => {
      obj[header] = data[index];
      return obj;
    }, {});
  });
}
