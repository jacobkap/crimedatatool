function ks() {
/*
$("body").hide();
  var password_given = localStorage.getItem("password_given");
  if (password_given === false | password_given === null) {
        var testPassword = window.prompt("Site down for maintenance");
        if (testPassword === "houdini") {
            $("body").show();
            localStorage.setItem("password_given", true);
        } else {
            location.reload();
        }
      } else {
        $("body").show();
      }
      */
}

function highlight_current_page() {
  page = window.location.pathname
  page = page.replace(/.html/g, "");
  page = page.replace(/\//g, "");
  console.log(page)
  $('a[href*=' + page + ']').css({'color' : 'red'});
  $('a[href*=' + page + ']').text(page);
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

function exportToCsv(tableData, type, states) {
  if (type == "prisoners" && $("#crime_dropdown").val().includes("_crime")) {
    states = state_values;
  }
  if (type == "prisoners" && !$("#crime_dropdown").val().includes("_crime")) {
    states = prisoners_state_values;
  }

  data = tableData.reverse();

  rate_or_count = "count_";
  if (checkIfRateChecked(type)) {
    rate_or_count = "rate_";
  }

    if (["death", "alcohol"].includes(type)) {
      rate_or_count = "";
    }


  if (type == "leoka" && $("#leoka_rate_per_officer").is(':checked') === true) {
    rate_or_count = "rate_per_officer_";
  }
  if (type == "leoka") {
    type = "police";
  }

  data = data.map(objToString);
  data = data.join("\n");
  data = objToString(_.keys(tableData[0])) + '\n' + data;

  filename = "jacobdkaplan_" + type + "_" + rate_or_count;
  if (!["prisoners", "death", "alcohol", "borderpatrol"].includes(type)) {
    filename += agencies[$("#agency_dropdown").val()] + "_";
  }

  filename += states[$("#state_dropdown").val()];

  if (type == "prisoners") {
    filename += "_" + prisoner_categories[$("#crime_dropdown").val()];
  }

  if (type == "borderpatrol") {
    filename += "_" + border_categories[$("#crime_dropdown").val()];
  }

  if (type == "jail") {
    filename = "jacobdkaplan.com_" + jail_state_values[$("#state_dropdown").val()] + "_" + agencies[$("#agency_dropdown").val()] + "_jail";
  }

  filename += ".csv";

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



function makeCrimeDropdown(values, starter) {
  $.each(values, function(val, text) {
    $("#crime_dropdown").append(new Option(text, val));
  });
  $("#crime_dropdown").val(starter);
}

function toggle_leoka_weapon_display() {
  if (leoka_categories[$("#crime_dropdown").val()] != "Officers Assaulted") {
    $("#weaponsDiv").hide();
  } else {
    $("#weaponsDiv").show();
  }
}

function toggle_prisoners_race_display() {
  if (!$("#crime_dropdown").val().includes("_crime")) {
    $("#prisoners_race_div").hide();
  } else {
    $("#prisoners_race_div").show();
  }
}

function toggle_leoka_employee_sex_display() {
  if (leoka_categories[$("#crime_dropdown").val()] != "Police Department Employees") {
    $("#policeSex").hide();
  } else {
    $("#policeSex").show();
  }
}

function makeStateDropdown(states, default_value) {
  $('#state_dropdown').empty();
  $.each(states, function(val, text) {
    $("#state_dropdown").append(new Option(text, val));
  });
  $("#state_dropdown").val(default_value);
}

function makeLeokaWeaponDropdown() {
  temp = _.values(leoka_weapons);
  $.each(temp, function(val, text) {
    $('#leoka_weapons').append(new Option(text, val));
  });
  $('#leoka_weapons').val(4);
}

function makeLeokaSubcategoriesDropdown() {
  leoka_subcategory_starts = [12, 1, 1];

  $('#subcategory_dropdown').empty();
  values = leoka_subcategories[$('#crime_dropdown').val()];
  $.each(_.values(values), function(val, text) {
    $('#subcategory_dropdown').append(new Option(text, val));
  });
  $('#subcategory_dropdown').val(leoka_subcategory_starts[$('#crime_dropdown').val()]);

  return (values);
}

function makePrisonersRaceDropdown() {
  temp = _.values(prisoners_race);
  $.each(temp, function(val, text) {
    $('#prisoners_race').append(new Option(text, val));
  });
  $('#prisoners_race').val(4);
}

function makePrisonerSubcategoriesDropdown() {
  prisoner_subcategory_starts = [1, 5, 4, 0, 9, 5, 10, 5, 1, 0, 8, 3];
  category_index_num = _.indexOf(_.keys(prisoner_categories), $('#crime_dropdown').val());
  $('#subcategory_dropdown').empty();
  values = prisoners_subcategory[category_index_num];
  keys = _.keys(values);
  values = _.values(values);
  $.each(values, function(val, text) {
    $('#subcategory_dropdown').append(new Option(text, val));
  });
  $('#subcategory_dropdown').val(prisoner_subcategory_starts[category_index_num]);

  return (keys);
}

function makeBorderSubcategoriesDropdown() {
  subcategory_starts = [7, 0, 2, 0, 9, 0, 0];
  category_index_num = _.indexOf(_.keys(border_categories), $('#crime_dropdown').val());
  $('#subcategories').empty();
  values = border_subcategories[category_index_num];
  keys = _.keys(values);
  values = _.values(values);
  $.each(values, function(val, text) {
    $('#subcategories').append(new Option(text, val));
  });
  $('#subcategories').val(subcategory_starts[category_index_num]);

  return (keys);
}


function makeArrestCategoriesDropdown() {
  $.each(arrest_categories, function(val, text) {
    $('#subcategory_dropdown').append(new Option(text, val));
  });
  $('#subcategory_dropdown').val("tot_arrests");
}

function countToRate(data, type, per_officer = false) {

  per_officer = $("#leoka_rate_per_officer").is(':checked');
  data_keys = _.keys(data);
  population_column = "population";
  if (per_officer === true) {
    population_column = "total_employees_officers";
  }
  if (type == "prisoners") {
    total_population_column = "population";
    female_population_column = "population_female";
    male_population_column = "population_male";
    if ($("#prisoners_rate_adult").is(':checked')) {
      total_population_column = "population_adult";
      female_population_column = "population_female_adult";
      male_population_column = "population_male_adult";
    } else if ($("#prisoners_rate_18_65").is(':checked')) {
      total_population_column = "population_aged_18_65";
      female_population_column = "population_female_aged_18_65";
      male_population_column = "population_male_aged_18_65";
    }

    if (prisoner_categories[$("#crime_dropdown").val()] == "Race/Ethnicity" ||
      prisoner_categories[$("#crime_dropdown").val()].includes("_crime")) {
      race_value = prisoner_subcatergory_keys[$("#subcategory_dropdown").val()];

      if (prisoner_categories[$("#crime_dropdown").val()].includes("_crime")) {
        race_value = _.keys(prisoners_race)[$("#prisoners_race").val()];
      }
      if (race_value != "total") {
        total_population_column += "_" + race_value;
        female_population_column += "_" + race_value;
        male_population_column += "_" + race_value;
      }
    }
  }


  for (var i = 0; i < data_keys.length; i++) {
    if (!data_keys[i].includes("agency") &&
      data_keys[i] !== "year" &&
      !data_keys[i].includes("state") &&
      !data_keys[i].includes("population") &&
      !data_keys[i].includes("ORI")) {

      if (type == "prisoners") {
        if (data_keys[i].includes("_female")) {
          population_column = female_population_column;
        } else if (data_keys[i].includes("_male")) {
          population_column = male_population_column;
        } else {
          population_column = total_population_column;
        }
        rate_val = data[data_keys[i]] / data[population_column] * 100;
        rate_val = parseFloat(rate_val).toFixed(2);
      } else {

        rate_val = data[data_keys[i]] / data[population_column];
        if (population_column !== "total_employees_officers") {
          rate_val = rate_val * 100000;
        }
        rate_val = parseFloat(rate_val).toFixed(2); // Rounds to 2 decimals
      }
      if (!isFinite(rate_val)) {
        rate_val = NaN;
      }
      data[data_keys[i]] = rate_val;
      rate_type = "_rate";
      if (per_officer === true) {
        rate_type = "_rate_per_officer";
      }
      new_key = data_keys[i] + rate_type;
      Object.defineProperty(data, new_key,
        Object.getOwnPropertyDescriptor(data, data_keys[i]));
      delete data[data_keys[i]];
    }
  }
  return data;
}


function makeCrimeClearanceRates(data) {

  data_keys = _.keys(data);
  clearance_starters = ["tot_clr", "clr_18"];

  crime_column = data_keys.filter(function(element) {
    return element.includes("actual");
  });

  for (var i = 0; i < crime_column.length; i++) {
    for (var n = 0; n < clearance_starters.length; n++) {
        rate_val = data[crime_column[i].replace("actual", clearance_starters[n])] / data[crime_column[i]];
        rate_val = parseFloat(rate_val).toFixed(2); // Rounds to 2 decimals

      if (!isFinite(rate_val)) {
        rate_val = NaN;
      }
      data[crime_column[i].replace("actual", clearance_starters[n])] = rate_val * 100;
      rate_type = "_clearance_rate";

      new_key = crime_column[i].replace("actual", clearance_starters[n]) + rate_type;
      new_key = new_key.replace("_rate_clearance", "_clearance");
      Object.defineProperty(data, new_key,
        Object.getOwnPropertyDescriptor(data,crime_column[i].replace("actual", clearance_starters[n])));
      delete data[crime_column[i].replace("actual", clearance_starters[n])];

//    }
  }
}
  return data;
}


function getStateAgencies(type, states = state_values, largest_agencies = false) {
  url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper/master/data/";

  if (type == "crime") {
      type = "offenses";
  }
  if (type == "hate") {
      type = "hate_crimes";
  }

  if(["offenses", "arrests", "leoka"].includes(type)) {
    if ($("#monthly").is(':checked')) {
      type += "_monthly";
    }
  }


  if (type == "crime_nibrs") {
    type = "nibrs";
  }
  url += type + "/";
  final_url = url + states[$("#state_dropdown").val()] + "_agency_choices.json";
  if (largest_agencies === true) {
    final_url = url + "largest_agency_choices.json";
  }
  var state_agencies = $.getJSON({
    url: final_url,
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

function updateAgencies(type, states) {
  agencies = getStateAgencies(type, states);
  agencies.sort();
  $("#agency_dropdown").empty();
  $.each(agencies, function(val, text) {
    $("#agency_dropdown").append(new Option(text, val));
  });
  largest_agency_temp = states[$("#state_dropdown").val()];
  largest_agency_temp = _.filter(largest_agency, function(x) {
    return x.state == largest_agency_temp;
  });
  largest_agency_temp = largest_agency_temp[0].agency;
  largest_agency_temp = _.indexOf(agencies, largest_agency_temp);
  $("#agency_dropdown").val(largest_agency_temp);
  return agencies;
}

function main(type, states, state_default, crimes, crime_starter) {
  $('.simple-select').chosen();
  resizeChosen();
  ctx = document.getElementById("graph").getContext('2d');
  makeStateDropdown(states, state_default);

  if (type == "arrests") {
    makeArrestCategoriesDropdown();
  }
  if (type == "jail") {
    crimes = crimes[$("#state_dropdown").val()]
  }
  if (!["alcohol", "prisoners", "death", "borderpatrol"].includes(type)) {
    makeCrimeDropdown(crimes, crime_starter);
    largest_agency = getStateAgencies(type, states, true);
    agencies = updateAgencies(type, states);
  }
  if (["death"].includes(type)) {
    makeCrimeDropdown(crimes, crime_starter);
  }
  if (type == "prisoners") {
    makeCrimeDropdown(crimes, crime_starter);
    prisoner_subcatergory_keys = makePrisonerSubcategoriesDropdown();
    makePrisonersRaceDropdown();
    toggle_prisoners_race_display();
  }
  if (type == "borderpatrol") {
    makeCrimeDropdown(crimes, crime_starter);
    subcatergory_keys = makeBorderSubcategoriesDropdown();
  }
  if (type == "leoka") {
    makeLeokaWeaponDropdown();
    toggle_leoka_weapon_display();
    $("#policeSex").show();
    leoka_subcatergory_values = makeLeokaSubcategoriesDropdown();
  }

  $('.simple-select').trigger('chosen:updated');


    if (window.location.hash == "") {
      change_url()
    } else {
    change_data_from_url(type);

  }



  main_results  = get_data(type, states);
  table_data    = main_results[0];
  graph_headers = main_results[1];
  table_headers = main_results[2];
  all_data      = main_results[3];

  graph = makeGraph(type, crimes);
  $("#graph").ready($("#loader").hide());
  table = makeTable(type);




  jQuery(window).on('resize', resizeChosen);

}
