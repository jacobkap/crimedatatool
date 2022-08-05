function checkboxesUpdate(type, always_on_box, crimes) {
  if (!$("#checkbox_1").is(':checked') &&
    !$("#checkbox_2").is(':checked') &&
    !$("#checkbox_3").is(':checked') &&
    !$("#checkbox_4").is(':checked')) {
    $(always_on_box).prop("checked", true);
  }

  if (type == "nibrs") {
    if (!$("#checkbox_1").is(':checked') &&
      !$("#checkbox_2").is(':checked') &&
      !$("#checkbox_3").is(':checked') &&
      !$("#checkbox_4").is(':checked') &&
      !$("#checkbox_5").is(':checked') &&
      !$("#checkbox_6").is(':checked')) {
      $(always_on_box).prop("checked", true);


      nibrs_crimes_temp = nibrs_crime_values["offense"]
      if ($('#category_dropdown').val() == "victim") {
        nibrs_crimes_temp = nibrs_crime_values["victim_demographics_offenses"]
      }
      if ($('#subcategory_dropdown').val() == "injury") {
        nibrs_crimes_temp = nibrs_crime_values["injury_offenses"]
      }
      if ($('#category_dropdown').val() == "arrestee") {
        nibrs_crimes_temp = nibrs_crime_values["arrestee_offenses"]
      }
      if ($('#category_dropdown').val() == "offense") {
        nibrs_crimes_temp = nibrs_crime_values["offense"]
      }
      if ($('#subcategory_dropdown').val() == "gun") {
        nibrs_crimes_temp = nibrs_crime_values["gun_offenses"]
      }
    }
  }

  if (["death", "offenses"].includes(type)) {
    agencyChangeFun(type, state_values);
  } else if (type == "nibrs") {
    remake_graph(type, nibrs_crimes_temp)
  } else {
    remake_graph(type, crimes);
  }
  change_url(type)
}

function prisonersPopBoxChange(box_to_check) {
  box_status = $(box_to_check).prop("checked");
  $("#prisoners_rate").prop("checked", false);
  $("#prisoners_rate_adult").prop("checked", false);
  $("#prisoners_rate_18_65").prop("checked", false);

  $(box_to_check).prop("checked", box_status);
  agencyChangeFun('prisoners', prisoners_state_values, prisoner_categories);
}


function arrestsPopBoxChange(box_to_check) {
  box_status = $(box_to_check).prop("checked");
  $("#percent_of_arrests").prop("checked", false);
  $("#rate").prop("checked", false);
  $("#percent_of_all_arrests").prop("checked", false);

  $(box_to_check).prop("checked", box_status);
  agencyChangeFun("arrests", state_values, arrest_values);
}

function nibrsPopBoxChange(box_to_check) {
  box_status = $(box_to_check).prop("checked");
  $("#percent_of_crimes").prop("checked", false);
  $("#rate").prop("checked", false);

  $(box_to_check).prop("checked", box_status);
  agencyChangeFun('nibrs', nibrs_state_values, nibrs_crime_values['offense']);
}


function rateBoxesChange(dropdown_to_turnoff, type, states, crimes) {
  $(dropdown_to_turnoff).prop("checked", false);
  agencyChangeFun(type, states, crimes);
}

function stateChangeFun(type, states, crimes) {
  updateAgencies(type, states);
  agencyChangeFun(type, states, crimes);
}

function jailStateChange(type, states, crimes) {
  crimes = crimes[states[$("#state_dropdown").val()]]
  default_starter = ["avg_daily_pop_total_jurisdiction", "average_daily_population", "total_population"]
  default_starter = default_starter[$("#state_dropdown").val()]
  $('#crime_dropdown').empty();
  make_dropdown("#crime_dropdown", crimes, default_starter)

  agencies = updateAgencies(type, states);
  agencyChangeFun('jail', jail_state_values, jail_categories)
}

function police_categoryChangeFun() {
  make_dropdown('#subcategory_dropdown', police_subcategories[$('#crime_dropdown').val()], police_categories_starts[$('#crime_dropdown').val()], '#crime_dropdown');
  toggle_display("#weaponsDiv", ["officers_assaulted"]);
  toggle_display("#policeSex", ["employees"]);
  agencyChangeFun('police', state_values, police_categories);
}

function arrest_subsubcategoryChangeFun() {
  toggle_arrest_display();
  agencyChangeFun('arrests', state_values);
}



function school_category_change() {
  make_dropdown('#subcategory_dropdown', school_subcategories[$('#crime_dropdown').val()], school_categories_starts[$('#crime_dropdown').val()], '#crime_dropdown')
  toggle_display("#school_bias_div", ["hate"])
  agencyChangeFun('school', school_state_values);
}

function borderCategoryChange(type, states, crimes) {
  make_dropdown('#subcategory_dropdown', border_subcategories[$('#crime_dropdown').val()], border_categories_starts[$('#crime_dropdown').val()], '#crime_dropdown')
  border_states = get_border_states($("#crime_dropdown").val());
  make_dropdown('#state_dropdown', border_states, 0);
  agencyChangeFun('borderpatrol', border_states, border_categories);
}

function nibrcategoryChange() {
  make_dropdown("#subcategory_dropdown", nibrs_subcategories[$('#category_dropdown').val()], nibrs_starts[$('#category_dropdown').val()]);
  nibrsubcategoryChange();
}

function nibrsubcategoryChange() {

  toggle_nibrs_display();
  current_crime = $('#crime_dropdown').val()
  nibrs_crimes_temp = nibrs_crime_values["offense"]
  if ($('#category_dropdown').val() == "victim") {
    nibrs_crimes_temp = nibrs_crime_values["victim_demographics_offenses"]
  }
  if ($('#subcategory_dropdown').val() == "injury") {
    nibrs_crimes_temp = nibrs_crime_values["injury_offenses"]
  }
  if ($('#category_dropdown').val() == "arrestee") {
    nibrs_crimes_temp = nibrs_crime_values["arrestee_offenses"]
  }
  if ($('#category_dropdown').val() == "offense") {
    nibrs_crimes_temp = nibrs_crime_values["offense"]
  }
  if ($('#subcategory_dropdown').val() == "gun") {
    nibrs_crimes_temp = nibrs_crime_values["gun_offenses"]
  }

  $("#crime_dropdown").empty();
  $.each(nibrs_crimes_temp, function(val, text) {
    $("#crime_dropdown").append(new Option(text, val));
  });
  if (_.keys(nibrs_crimes_temp).includes(current_crime)) {
    make_dropdown('#crime_dropdown', nibrs_crimes_temp, current_crime)
  } else {
    make_dropdown('#crime_dropdown', nibrs_crimes_temp, _.keys(nibrs_crimes_temp)[0])
  }
  agencyChangeFun('nibrs', nibrs_state_values, nibrs_crimes_temp);
}

function prisonerCategoryChange(current_category) {
  toggle_display("#subsubcategory_dropdown_div", [1, 5])
  make_dropdown('#subcategory_dropdown', prisoners_subcategory[$('#crime_dropdown').val()], prisoner_subcategory_starts[$('#crime_dropdown').val()], '#crime_dropdown')
  toggle_display("#prisoners_race_div", ["custody_crime", "admissions_crime", "releases_crime"])

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
    make_dropdown('#state_dropdown', state_values, default_value)
    agencyChangeFun('prisoners', state_values);

  } else if (!$("#crime_dropdown").val().includes("_crime") & current_category.includes("_crime")) {
    // If possible, keep same state when switching data sets.
    current_state = state_values[$("#state_dropdown").val()];
    default_value = _.indexOf(prisoners_state_values, current_state);
    make_dropdown('#state_dropdown', prisoners_state_values, default_value)
    agencyChangeFun('prisoners', prisoners_state_values);

  } else {
    agencyChangeFun('prisoners', prisoners_state_values);
  }
  current_category = $("#crime_dropdown").val();
  return (current_category);
}


function agencyChangeFun(type, states, crimes) {

  if (type == "offenses") {
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

  if (type == "offenses" && $("#clearance_rate").is(":checked") && ($("#checkbox_2").is(":checked") || $("#checkbox_3").is(":checked"))) {
    addYAxis();
  }

  table.destroy();
  $('#table').empty();
  table = makeTable(type);
  change_url(type)
  $('.simple-select').trigger('chosen:updated');
}

function remake_graph(type, crimes) {
  $('#graph').remove();
  $('.main').prepend('<canvas id="graph" style="width:95%;height:500px;"></canvas>');
  ctx = document.getElementById("graph").getContext('2d');
  graph = makeGraph(type, crimes);
}
