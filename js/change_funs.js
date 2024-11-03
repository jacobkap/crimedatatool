function checkboxesUpdate(type, always_on_box, crimes) {
    if (type != "nibrs") {
      if (type == "arrests" & $("#subsubcategory_dropdown").val() == "Race") {
        always_on_box = "#checkbox_5"
      }
  if (!$("#checkbox_1").is(':checked') &&
    !$("#checkbox_2").is(':checked') &&
    !$("#checkbox_3").is(':checked') &&
    !$("#checkbox_4").is(':checked')) {
    $(always_on_box).prop("checked", true);
  }
}

  if (type == "nibrs") {
    if ($('#category_dropdown').val() == "property") {
      always_on_box = "#checkbox_6";
    }
    if (!$("#checkbox_1").is(':checked') &&
      !$("#checkbox_2").is(':checked') &&
      !$("#checkbox_3").is(':checked') &&
      !$("#checkbox_4").is(':checked') &&
      !$("#checkbox_5").is(':checked') &&
      !$("#checkbox_6").is(':checked')) {
      $(always_on_box).prop("checked", true);
}

      nibrs_crimes_temp = nibrs_crime_values["offense"]
      if ($('#category_dropdown').val() == "victim") {
        nibrs_crimes_temp = nibrs_crime_values["victim_demographics_offenses"]
      }
      if ($('#category_dropdown').val() == "property") {
        nibrs_crimes_temp = nibrs_property_values
      }
      if ($('#category_dropdown').val() == "property" & $('#subcategory_dropdown').val() == "drugs") {
        nibrs_crimes_temp = nibrs_property_drugs_values
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

  if (["offenses", "arson"].includes(type)) {
    agencyChangeFun(type, state_values);
  } else if (type == "nibrs") {
    remake_graph(type, nibrs_crimes_temp)
  } else {
    remake_graph(type, crimes);
  }
  //change_url(type)
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
  agencyChangeFun('nibrs', state_values, nibrs_crime_values['offense']);
}

function toggle_display(div, match_value) {
  if (match_value.includes($("#crime_dropdown").val())) {
    $(div).show();
  } else {
    $(div).hide();
  }
}


function rateBoxesChange(dropdown_to_turnoff, type, states, crimes) {
  $(dropdown_to_turnoff).prop("checked", false);
  agencyChangeFun(type, states, crimes);
}

function stateChangeFun(type, states, crimes) {
  updateAgencies(type, states);
  agencyChangeFun(type, states, crimes);
}


function leoka_categoryChangeFun() {
  make_dropdown('#subcategory_dropdown', leoka_subcategories[$('#crime_dropdown').val()], leoka_categories_starts[$('#crime_dropdown').val()], '#crime_dropdown');
//  toggle_display("#weaponsDiv", ["officers_assaulted"]);
//  toggle_display("#leokaSex", ["employees"]);
toggle_leoka_display()
  agencyChangeFun('leoka', state_values, leoka_categories);
}

function arrest_subsubcategoryChangeFun() {
  toggle_arrest_display();
  agencyChangeFun('arrests', state_values);
}




function nibrcategoryChange() {
  if ($('#category_dropdown').val() == "property") {
    $("#percent_of_crimes").prop("checked", false);
    $("#checkbox_1").prop("checked", false);
    $("#checkbox_6").prop("checked", true);
  }
  make_dropdown("#subcategory_dropdown", nibrs_subcategories[$('#category_dropdown').val()], nibrs_starts[$('#category_dropdown').val()]);
  nibrsubcategoryChange();
}

function nibrsubcategoryChange() {


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
  if ($('#category_dropdown').val() == "property") {
    nibrs_crimes_temp = nibrs_property_values
  }
  if ($('#category_dropdown').val() == "property" & $('#subcategory_dropdown').val() == "drugs") {
    nibrs_crimes_temp = nibrs_property_drugs_values
  }
  if ($('#subcategory_dropdown').val() == "gun") {
    nibrs_crimes_temp = nibrs_crime_values["gun_offenses"]
  }
  if ($('#subcategory_dropdown').val() == "subtype") {
    nibrs_crimes_temp = nibrs_crime_values["subtype_offenses_main"]
  }

  // Use a document fragment to batch DOM updates
  const $dropdown = $("#crime_dropdown");
  $dropdown.empty();  // Clear existing options

  const fragment = document.createDocumentFragment();  // Create a document fragment

  Object.entries(nibrs_crimes_temp).forEach(([text, val]) => {
    const option = new Option(val, text);  // Create a new option element
    fragment.appendChild(option);  // Append the option to the fragment
  });

  $dropdown.append(fragment);  // Append the fragment to the dropdown in one go

  if (_.keys(nibrs_crimes_temp).includes(current_crime)) {
    make_dropdown('#crime_dropdown', nibrs_crimes_temp, current_crime)
  } else if ($('#category_dropdown').val() == "property" & $('#subcategory_dropdown').val() != "drugs") {
        make_dropdown('#crime_dropdown', nibrs_crimes_temp, "money")
  }  else if ($('#category_dropdown').val() == "property" & $('#subcategory_dropdown').val() == "drugs") {
        make_dropdown('#crime_dropdown', nibrs_crimes_temp, "marijuana")
  } else {
    make_dropdown('#crime_dropdown', nibrs_crimes_temp, _.keys(nibrs_crimes_temp)[0])
  }
  toggle_nibrs_display();
  agencyChangeFun('nibrs', state_values, nibrs_crimes_temp);


}


function agencyChangeFun(type, states, crimes) {
  if (["offenses", "arson"].includes(type)) {
    if ($("#clearance_rate").is(":checked")) {
      $("#checkbox_2+span").text("% Cleared - Total");
      $("#checkbox_3+span").text("% Cleared - All Under Age 18");
    } else {
      $("#checkbox_2+span").text("Offenses Cleared - Total");
      $("#checkbox_3+span").text("Offenses Cleared - All Under Age 18");
    }

    agency = $("#agency_dropdown").children("option:selected").text()

      crimes = crime_values;
      $("#agency_level_boxes").show();
    }



  main_results = get_data(type, states);

  table_data = main_results[0];
  graph_headers = main_results[1];
  table_headers = main_results[2];
  all_data = main_results[3];

  remake_graph(type, crimes);

//  if (type == "offenses" && $("#clearance_rate").is(":checked") && ($("#checkbox_2").is(":checked") || $("#checkbox_3").is(":checked"))) {
//    addYAxis();
//  }

  table.destroy();
  $('#table').empty();
  table = makeTable(type);
  //change_url(type)

if (type == "nibrs" && $("#subcategory_dropdown").val() == "subtype") {
    toggle_nibrs_display();
}

}

function remake_graph(type, crimes) {
  $('#graph').remove();
  $('.main').prepend('<canvas id="graph" style="width:95%;height:500px;"></canvas>');
  ctx = document.getElementById("graph").getContext('2d');
  graph = makeGraph(type, crimes);
}
