function checkboxesUpdate(type, always_on_box) {
  if (!$("#checkbox_1").is(':checked') &&
    !$("#checkbox_2").is(':checked') &&
    !$("#checkbox_3").is(':checked') &&
    !$("#checkbox_4").is(':checked')) {
    $(always_on_box).prop("checked", true);
  }
  if (type == "death") {
    agencyChangeFun('death', state_values);
  } else {
  remake_graph(type);
}
}

function remake_graph(type) {
  $('#graph').remove();
  $('.main').prepend('<canvas id="graph" style="width:95%;height:500px;"></canvas>');
  ctx = document.getElementById("graph").getContext('2d');
  graph = makeGraph(type);
}

function prisonersPopBoxChange(box_to_check) {
  box_status = $(box_to_check).prop("checked");
  $("#prisoners_rate").prop("checked", false);
  $("#prisoners_rate_adult").prop("checked", false);
  $("#prisoners_rate_18_65").prop("checked", false);

  $(box_to_check).prop("checked", box_status);
  agencyChangeFun('prisoners', prisoners_state_values);
}


function rateBoxesChange(dropdown_to_turnoff, type, states) {
  $(dropdown_to_turnoff).prop("checked", false);
    agencyChangeFun(type, states);
}

function stateChangeFun(type, states) {
  agencies = updateAgencies(type);
  $('.simple-select').trigger('chosen:updated');
  agencyChangeFun(type, states);
}

function leoka_categoryChangeFun() {
  leoka_subcatergory_values = makeLeokaSubcategoriesDropdown();
  $('.simple-select').trigger('chosen:updated');
  toggle_leoka_weapon_display();
  toggle_leoka_employee_sex_display();
  agencyChangeFun('leoka', state_values);
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
  return(current_category);
}


function agencyChangeFun(type, states) {
  if (type == "prisoners" && $("#crime_dropdown").val().includes("_crime")) {
      main_results = get_data(type, state_values);
  } else {
  main_results = get_data(type, states);
}
  table_data = main_results[0];
  graph_headers = main_results[1];
  table_headers = main_results[2];
  all_data = main_results[3];

  remake_graph(type);
  table.destroy();
  $('#table').empty();
  table = makeTable(type);

  //  change_url("#leoka_state_dropdown", "#leoka_agency_dropdown", "#leoka_category_dropdown", "#leoka_rate", leoka_agencies, leoka_categories, "#leoka_subcategory_dropdown", leoka_subcatergory_values);
}
