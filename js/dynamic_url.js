change_url = function(type) {

  new_url = window.location.pathname +
    "#state=" + $("#state_dropdown").children("option:selected").text()

  dropdowns = ["#agency_dropdown", "#crime_dropdown", "#subcategory_dropdown",
    "#subsubcategory_dropdown", '#rate', '#percent_of_arrests',
    '#monthly', '#checkbox_1', '#checkbox_2', '#checkbox_3',
    '#checkbox_4', '#checkbox_5', '#checkbox_6',
    "#prisoners_rate", "#prisoners_rate_adult", "#prisoners_rate_18_65", "#percent_of_crimes",
  ]
  dropdown_labels = ["&agency=", "&category=", "&subcategory=", "&subsubcategory=",
    "&rate=", "&percent=", "&monthly=", "&checkbox_1=", "&checkbox_2=",
    "&checkbox_3=", "&checkbox_4=", "&checkbox_5=", "&checkbox_6=",
    "&prisoners_rate_val=", "&prisoners_rate_adult=", "&prisoners_rate_18_65=", "&percent_of_crimes="
  ]
  dropdown_type = ["text_selected", "value", "value", "value", "checked",
    "checked", "checked", "checked", "checked", "checked", "checked", "checked", "checked",
    "checked", "checked", "checked", "checked"
  ]

  if (type == "nibrs") {
    dropdowns[2] = "#category_dropdown"
    dropdowns[3] = "#subcategory_dropdown"
  }

  for (var i = 0; i < dropdowns.length; i++) {
    if ($(dropdowns[i]).length != 0) {
      if (dropdown_type[i] == "text_selected") {
        new_url += dropdown_labels[i] + $(dropdowns[i]).children("option:selected").text();
      } else if (dropdown_type[i] == "value") {
        new_url += dropdown_labels[i] + $(dropdowns[i]).val();
      } else {
        new_url += dropdown_labels[i] + $(dropdowns[i]).prop("checked");
      }
    }
  }
  window.history.pushState("", 'Title', new_url);
  return (new_url);
};


find_url_string = function(url, string) {
  final = split_url[split_url.findIndex(element => element.includes(string))];
  if (final === undefined) final = "";
  final = final.replace(string, "");
  final = final.replace("#", "");
  final = final.replace(/%20/g, " ");
  return (final);
}

get_border_states = function(crime) {
  if (["sector_profile", "family", "staffing"].includes(crime)) {
    border_states = border_sectors;
  } else if (["southwest_apprehensions", "southwest_deaths"].includes(crime)) {
    border_states = southwest_border_sectors;
  } else if (["seizures"].includes(crime)) {
    border_states = border_regions;
  } else if (["nationwide"].includes(crime)) {
    border_states = nationwide_only;
  }
  return (border_states)
}

change_data_from_url = function(type) {
  url = window.location.hash;
  split_url = url.split("&");


  state_val = find_url_string(split_url, "state=")
  agency_val = find_url_string(split_url, "agency=")
  category_val = find_url_string(split_url, "category=")
  subcategory_val = find_url_string(split_url, "subcategory=")
  subsubcategory_val = find_url_string(split_url, "subsubcategory=")
  rate_val = find_url_string(split_url, "rate=")
  percent_val = find_url_string(split_url, "percent=")
  monthly_val = find_url_string(split_url, "monthly=")
  checkbox1_val = find_url_string(split_url, "checkbox_1=")
  checkbox2_val = find_url_string(split_url, "checkbox_2=")
  checkbox3_val = find_url_string(split_url, "checkbox_3=")
  checkbox4_val = find_url_string(split_url, "checkbox_4=")
  checkbox5_val = find_url_string(split_url, "checkbox_5=")
  checkbox6_val = find_url_string(split_url, "checkbox_6=")
  prisoners_rate_val = find_url_string(split_url, "prisoners_rate_val=")
  prisoners_rate_adult_val = find_url_string(split_url, "prisoners_rate_adult=")
  prisoners_rate_18_65_val = find_url_string(split_url, "prisoners_rate_18_65=")
  percent_of_crimes_val = find_url_string(split_url, "percent_of_crimes=")

  checkbox = [rate_val, percent_val, monthly_val, checkbox1_val, checkbox2_val, checkbox3_val,
    checkbox4_val, checkbox5_val, checkbox6_val, prisoners_rate_val,
    prisoners_rate_adult_val, prisoners_rate_18_65_val, percent_of_crimes_val
  ];
  checkbox_div = ["#rate", "#percent", "#monthly", "#checkbox_1", "#checkbox_2", "#checkbox_3",
    "#checkbox_4", "#checkbox_5", "#checkbox6", "#prisoners_rate_val",
    "#prisoners_rate_adult", "#prisoners_rate_18_65", "#percent_of_crimes"
  ];
  for (var i = 0; i < checkbox.length; i++) {
    if (checkbox[i].length != 0) {
      temp = $.parseJSON(checkbox[i]);
      $(checkbox_div[i]).prop("checked", temp);
    }
  }

  if (type == "nibrs") {
    make_dropdown("#category_dropdown", nibrs_categories, subcategory_val);
    make_dropdown("#subcategory_dropdown", nibrs_subcategories[subcategory_val], subsubcategory_val);
    toggle_nibrs_display();
    current_crime = category_val
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

    $("#crime_dropdown").empty();
    $.each(nibrs_crimes_temp, function(val, text) {
      $("#crime_dropdown").append(new Option(text, val));
    });
    if (_.keys(nibrs_crimes_temp).includes(current_crime)) {
      make_dropdown('#crime_dropdown', nibrs_crimes_temp, current_crime)
    } else {
      make_dropdown('#crime_dropdown', nibrs_crimes_temp, _.keys(nibrs_crimes_temp)[0])
    }
    $("#checkbox_1").prop("checked", $.parseJSON(checkbox1_val .toLowerCase()))
    $("#checkbox_2").prop("checked", $.parseJSON(checkbox2_val .toLowerCase()))
    $("#checkbox_3").prop("checked", $.parseJSON(checkbox3_val .toLowerCase()))
    $("#checkbox_4").prop("checked", $.parseJSON(checkbox4_val .toLowerCase()))
    $("#checkbox_5").prop("checked", $.parseJSON(checkbox5_val .toLowerCase()))
    $("#checkbox_6").prop("checked", $.parseJSON(checkbox6_val .toLowerCase()))
  }

  if (type == "police") {
    toggle_display("#weaponsDiv", [0]);
    toggle_display("#policeSex", [2]);
    make_dropdown('#subcategory_dropdown', police_subcategories[$('#crime_dropdown').val()], [12, 1, 1], '#crime_dropdown');
    police_subcatergory_values = police_subcategories[$('#crime_dropdown').val()]
  }
  if (type == "borderpatrol") {
    make_dropdown('#subcategory_dropdown', border_subcategories[$('#crime_dropdown').val()], border_categories_starts[$('#crime_dropdown').val()], '#crime_dropdown')
    border_states = get_border_states(category_val)
    make_dropdown('#state_dropdown', border_states, 0)
    var states = border_states;
  }
  if (type == "prisoners") {
    if (category_val.includes("_crime")) {
      make_dropdown('#state_dropdown', state_values, 0)
    } else {
      make_dropdown('#state_dropdown', prisoners_state_values, 0)
    }
    make_dropdown('#subcategory_dropdown', prisoners_subcategory[$('#crime_dropdown').val()], prisoner_subcategory_starts[$('#crime_dropdown').val()], '#crime_dropdown')
    make_dropdown("#subsubcategory_dropdown", prisoners_race, "total")
    toggle_display("#prisoners_race_div", ["custody_crime", "admissions_crime", "releases_crime"])
  }
  if (type == "police") {
    toggle_display("#weaponsDiv", ["officers_assaulted"]);
    toggle_display("#policeSex", ["employees"]);
  }
  if (type == "school") {
    make_dropdown('#subcategory_dropdown', school_subcategories[$('#crime_dropdown').val()], school_categories_starts[$('#crime_dropdown').val()], '#crime_dropdown')
    make_dropdown("#subsubcategory_dropdown", school_bias_motivations, "total")
    toggle_display("#school_bias_div", ["hate"])
  }

  state_values = $('#state_dropdown')[0].options;
  state_values = $.map(state_values, function(elem) {
    return (elem.text);
  });
  state_val = _.indexOf(state_values, state_val);
  $('#state_dropdown').val(state_val);

  if (agency_val != "") {
    agencies = updateAgencies(type, state_values);
    agency_val = _.indexOf(agencies, agency_val);
    $('#agency_dropdown').val(agency_val);
  }

  if (type == "prisoners") {
    toggle_display("#subsubcategory_dropdown_div", [1, 5])
  }
  $('.simple-select').trigger('chosen:updated');
};
