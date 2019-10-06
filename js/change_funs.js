function checkboxesUpdate(type, always_on_box, crimes) {
  if (!$("#checkbox_1").is(':checked') &&
    !$("#checkbox_2").is(':checked') &&
    !$("#checkbox_3").is(':checked') &&
    !$("#checkbox_4").is(':checked')) {
    $(always_on_box).prop("checked", true);
  }
  if (["death", "crime"].includes(type)) {
    agencyChangeFun(type, state_values);
  } else {
    remake_graph(type, crimes);
  }
}

function prisonersPopBoxChange(box_to_check) {
  box_status = $(box_to_check).prop("checked");
  $("#prisoners_rate").prop("checked", false);
  $("#prisoners_rate_adult").prop("checked", false);
  $("#prisoners_rate_18_65").prop("checked", false);

  $(box_to_check).prop("checked", box_status);
  agencyChangeFun('prisoners', prisoners_state_values);
}


function rateBoxesChange(dropdown_to_turnoff, type, states, crimes) {
  $(dropdown_to_turnoff).prop("checked", false);
  agencyChangeFun(type, states, crimes);
}

function stateChangeFun(type, states, crimes) {
  updateAgencies(type, states);
  $('.simple-select').trigger('chosen:updated');
  agencyChangeFun(type, states, crimes);
}

function jailStateChange(type, states, crimes) {
  crimes = crimes[$("#state_dropdown").val()]
  default_starter = ["avg_daily_pop_total_jurisdiction", "average_daily_population", "total_population"]
  default_starter = default_starter[$("#state_dropdown").val()]
  $('#crime_dropdown').empty();
  makeCrimeDropdown(crimes, default_starter)

  agencies = updateAgencies(type, states);
  $('.simple-select').trigger('chosen:updated');
  agencyChangeFun('jail', jail_state_values, jail_categories)
}

function leoka_categoryChangeFun() {
  leoka_subcatergory_values = makeLeokaSubcategoriesDropdown();
  $('.simple-select').trigger('chosen:updated');
  toggle_leoka_weapon_display();
  toggle_leoka_employee_sex_display();
  agencyChangeFun('leoka', state_values, leoka_categories);
}

function borderCategoryChange(type, states, crimes) {
  subcatergory_keys = makeBorderSubcategoriesDropdown();
  if (["sector_profile", "family", "staffing"].includes($("#crime_dropdown").val())) {
    border_states = border_sectors;
  } else if (["southwest_apprehensions", "southwest_deaths"].includes($("#crime_dropdown").val())) {
    border_states = southwest_border_sectors;
  } else if (["seizures"].includes($("#crime_dropdown").val())) {
    border_states = border_regions;
  } else if (["nationwide"].includes($("#crime_dropdown").val())) {
    border_states = nationwide_only;
  }
  makeStateDropdown(border_states, 0);
  $('.simple-select').trigger('chosen:updated');
  agencyChangeFun('borderpatrol', border_states, border_categories);
}

function prisonerCategoryChange(current_category) {
  toggle_prisoners_race_display();
  prisoner_subcatergory_keys = makePrisonerSubcategoriesDropdown();
  $('.simple-select').trigger('chosen:updated');

  // If it's one of the prisoner_crime categories (from national corrections Reporting
  // program), change states since it only has state info, not national-level info.
  if ($("#crime_dropdown").val().includes("_crime") & !current_category.includes("_crime")) {
    // If possible, keep same state when switching data sets.
    if (!["US Prison Total", "Federal Prison Total", "State Prison Total"].includes(prisoners_state_values[$("#state_dropdown").val()])) {
      current_state = prisoners_state_values[$("#state_dropdown").val()];
      default_value = _.indexOf(state_values, current_state);
    } else {
      default_value = 4;
    }
    makeStateDropdown(state_values, default_value);
    agencyChangeFun('prisoners', state_values);
    $('.simple-select').trigger('chosen:updated');
  } else if (!$("#crime_dropdown").val().includes("_crime") & current_category.includes("_crime")) {
    // If possible, keep same state when switching data sets.
    current_state = state_values[$("#state_dropdown").val()];
    default_value = _.indexOf(prisoners_state_values, current_state);
    makeStateDropdown(prisoners_state_values, default_value);
    agencyChangeFun('prisoners', prisoners_state_values);
    $('.simple-select').trigger('chosen:updated');
  } else {
    agencyChangeFun('prisoners', prisoners_state_values);
  }
  current_category = $("#crime_dropdown").val();
  return (current_category);
}


function agencyChangeFun(type, states, crimes) {

  if (type == "crime") {
    if ($("#clearance_rate").is(":checked")) {
      $("#checkbox_2+span").text("% Cleared - Total");
      $("#checkbox_3+span").text("% Cleared - All Under Age 18");
    } else {
      $("#checkbox_2+span").text("Offenses Cleared - Total");
      $("#checkbox_3+span").text("Offenses Cleared - All Under Age 18");
    }


    agency = $("#agency_dropdown").children("option:selected").text()
    if (agency.includes("Estimate")) {
      crimes = state_level_crime_values;
      $("#checkbox_1").prop("checked", true);
      $("#checkbox_2").prop("checked", false);
      $("#checkbox_3").prop("checked", false);
      $("#checkbox_4").prop("checked", false);
      $("#monthly").prop("checked", false);

      $("#agency_level_boxes").hide();
    } else {
      crimes = crime_values;
      $("#agency_level_boxes").show();
    }

  }

  if (type == "prisoners" && $("#crime_dropdown").val().includes("_crime")) {
    main_results = get_data(type, state_values);
  } else {
    main_results = get_data(type, states);
  }
  table_data = main_results[0];
  graph_headers = main_results[1];
  table_headers = main_results[2];
  all_data = main_results[3];

  remake_graph(type, crimes);

  if (type == "crime" && $("#clearance_rate").is(":checked") && ($("#checkbox_2").is(":checked") || $("#checkbox_3").is(":checked"))) {
    addYAxis();
  }

  table.destroy();
  $('#table').empty();
  table = makeTable(type);
  change_url()
}

function remake_graph(type, crimes) {
  $('#graph').remove();
  $('.main').prepend('<canvas id="graph" style="width:95%;height:500px;"></canvas>');
  ctx = document.getElementById("graph").getContext('2d');
  graph = makeGraph(type, crimes);
}
