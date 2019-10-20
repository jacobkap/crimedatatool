function ks(active = "no") {
  if (active == "yes") {
    $("body").hide();
    var password_given = localStorage.getItem("password_given");
    if (password_given === false | password_given === null) {
      var testPassword = window.prompt("Page down for maintenance");
      if (testPassword === "houdini") {
        $("body").show();
        localStorage.setItem("password_given", true);
      } else {
        location.reload();
      }
    } else {
      $("body").show();
    }
  }
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


  if (get_rate_type(type, binary = true)) {
    rate_or_count = "rate_";
  }
  if (["death", "alcohol"].includes(type)) {
    rate_or_count = "";
  }
  if (type == "police" && $("#checkbox_4").is(':checked')) {
    rate_or_count = "rate_per_officer_";
  }
  if (type == "arrests" && $("#percent_of_arrests").is(':checked')) {
    rate_or_count = "_percent_of_arrests";
  }

  data = data.map(objToString);
  data = data.join("\n");
  data = objToString(_.keys(tableData[0])) + '\n' + data;

  filename = "jacobdkaplan.com_" + type + "_" + rate_or_count;
  if (!["prisoners", "death", "alcohol", "borderpatrol", "school"].includes(type)) {
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

function make_dropdown(dropdown_id, dropdown_values, starter, starter_div) {
  $(dropdown_id).empty();
  $.each(dropdown_values, function(val, text) {
    $(dropdown_id).append(new Option(text, val));
  });

  if (Array.isArray(starter)) {
    starter = starter[$(starter_div).val()]
  }

  $(dropdown_id).val(starter);
}


function toggle_display(div, match_value) {
  if (match_value.includes($("#crime_dropdown").val())) {
    $(div).show();
  } else {
    $(div).hide();
  }
}

function toggle_arrest_display() {
  if ($("#subsubcategory_dropdown").val() == "Sex") {
    breakdown_name.innerText = "Sex:";
    $("#race").hide();
    $("label[for='checkbox_1']").html("Female")
    $("label[for='checkbox_2']").html("Male")
    $("label[for='checkbox_3']").html("Total")
    $("#checkbox_1").prop("checked", false);
    $("#checkbox_2").prop("checked", false);
    $("#checkbox_3").prop("checked", true);
    $("#checkbox_4").prop("checked", false);
    $("#checkbox_5").prop("checked", false);
  } else {
    breakdown_name.innerText = "Race:";
    $("#race").show();
    $("label[for='checkbox_1']").html("American Indian")
    $("label[for='checkbox_2']").html("Asian")
    $("label[for='checkbox_3']").html("Black")

    $("#checkbox_1").prop("checked", false);
    $("#checkbox_2").prop("checked", false);
    $("#checkbox_3").prop("checked", false);
    $("#checkbox_4").prop("checked", false);
    $("#checkbox_5").prop("checked", true);
  }
}

function countToRate(data, type, per_officer = false) {

  per_officer = $("#checkbox_4").is(':checked');
  data_keys = _.keys(data);
  population_column = "population";
  if (per_officer && type == "police") {
    population_column = "total_employees_officers";
  }
  if (type == "school") {
    population_column = "number_of_students";
  }
  if (type == "arrests" && $("#percent_of_arrests").is(':checked')) {
    population_column = $("#crime_dropdown").val() + "_tot_" + $("#subcategory_dropdown").val();
    if ($("#subcategory_dropdown").val() == "tot") {
      population_column = $("#crime_dropdown").val() + "_tot_arrests";
    }
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
      prisoner_categories[$("#crime_dropdown").val()].includes("Charge")) {
      race_value = $("#subsubcategory_dropdown").val()

      if (race_value != "total") {
        total_population_column += "_" + race_value;
        female_population_column += "_" + race_value;
        male_population_column += "_" + race_value;
      }
    }
  }


  for (var i = 0; i < data_keys.length; i++) {
    if (!["agency", "year", "state", "population", "ORI", "school_name", "school_unique_id", "number_of_students"].includes(data_keys[i]) && !data_keys[i].startsWith("population_")) {

      if (type == "prisoners") {
        if (data_keys[i].includes("_female")) {
          population_column = female_population_column;
        } else if (data_keys[i].includes("_male")) {
          population_column = male_population_column;
        } else {
          population_column = total_population_column;
        }
        rate_val = data[data_keys[i]] / data[population_column] * 100000;
      } else if (type == "arrests" && $("#percent_of_arrests").is(':checked')) {
        rate_val = data[data_keys[i]] / data[population_column] * 100;
      } else {
        rate_val = data[data_keys[i]] / data[population_column];
        if (type != "school" && population_column !== "total_employees_officers") {
          rate_val = rate_val * 100000;
        }
        if (type == "school") {
          rate_val = rate_val * 1000

        }
      }
      rate_val = parseFloat(rate_val).toFixed(2); // Rounds to 2 decimals
      if (!isFinite(rate_val) | data[data_keys[i]] == "") {
        rate_val = NaN;
      }
      data[data_keys[i]] = rate_val;
      rate_type = get_rate_type(type);

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
        Object.getOwnPropertyDescriptor(data, crime_column[i].replace("actual", clearance_starters[n])));
      delete data[crime_column[i].replace("actual", clearance_starters[n])];

    }
  }
  return data;
}


function getStateAgencies(type, states = state_values, largest_agencies = false) {
  url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper/master/data/";

  if ($("#monthly").is(':checked')) {
    type += "_monthly";
  }

  url += type + "/";
  if (type == "school") {
    final_url = url + "agency_choices.json";
  } else {
    final_url = url + states[$("#state_dropdown").val()] + "_agency_choices.json";
  }
  if (largest_agencies) {
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
  make_dropdown('#state_dropdown', states, state_default)

  if (type == "arrests") {
    make_dropdown("#subcategory_dropdown", arrest_age_categories, "tot")
    make_dropdown("#subsubcategory_dropdown", arrests_breakdown, "Race")
    toggle_arrest_display();
  }
  if (type == "jail") {
    crimes = crimes[states[$("#state_dropdown").val()]]
  }
  if (!["alcohol", "prisoners", "death", "borderpatrol", "school"].includes(type)) {
    make_dropdown("#crime_dropdown", crimes, crime_starter);
    largest_agency = getStateAgencies(type, states, true);
    if (type != "school") {
    agencies = updateAgencies(type, states);
  }
  }
  if (type == "death") {
    make_dropdown("#crime_dropdown", crimes, crime_starter);
  }
  if (type == "prisoners") {
    make_dropdown("#crime_dropdown", crimes, crime_starter);
    make_dropdown('#subcategory_dropdown', prisoners_subcategory[$('#crime_dropdown').val()], prisoner_subcategory_starts[$('#crime_dropdown').val()], '#crime_dropdown')
    make_dropdown("#subsubcategory_dropdown", prisoners_race, "total")
    toggle_display("#prisoners_race_div", ["custody_crime", "admissions_crime", "releases_crime"])
  }
  if (type == "borderpatrol") {
    make_dropdown("#crime_dropdown", crimes, crime_starter);
    make_dropdown('#subcategory_dropdown', border_subcategories[$('#crime_dropdown').val()], border_categories_starts[$('#crime_dropdown').val()], '#crime_dropdown')
  }
  if (type == "school") {
    make_dropdown("#crime_dropdown", crimes, crime_starter);
    make_dropdown('#subcategory_dropdown', school_subcategories[$('#crime_dropdown').val()], school_categories_starts[$('#crime_dropdown').val()], '#crime_dropdown')
    make_dropdown("#subsubcategory_dropdown", school_bias_motivations, "total")
    toggle_display("#school_bias_div", ["hate"])
  }
  if (type == "police") {
    make_dropdown('#subcategory_dropdown', police_subcategories[$('#crime_dropdown').val()], police_categories_starts[$('#crime_dropdown').val()], '#crime_dropdown');
    make_dropdown("#subsubcategory_dropdown", police_weapons, "total_assaults");
    toggle_display("#weaponsDiv", ["officers_assaulted"]);
    $("#policeSex").show();
  }

  $('.simple-select').trigger('chosen:updated');


  if (window.location.hash == "") {
    change_url()
  } else {
    change_data_from_url(type);
  }

  if (type == "borderpatrol") {
    states = get_border_states($("#crime_dropdown").val())
  }

  if (type == "prisoners") {
    if ($("#crime_dropdown").val().includes("_crime")) {
      states = state_values
    } else {
      states = prisoners_state_values
    }
  }
  main_results = get_data(type, states);
  table_data = main_results[0];
  graph_headers = main_results[1];
  table_headers = main_results[2];
  all_data = main_results[3];

  graph = makeGraph(type, crimes);
  $("#graph").ready($("#loader").hide());
  table = makeTable(type);

  jQuery(window).on('resize', resizeChosen);
}
