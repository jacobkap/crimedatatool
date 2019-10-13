change_url = function(rate = false, subcategory_dropdown = "", subcategory_values = "") {

  new_url = window.location.pathname +
    "#state=" + $("#state_dropdown").children("option:selected").text()

  dropdowns = ["#agency_dropdown", "#crime_dropdown", "#subcategory_dropdown",
    "#subsubcategory_dropdown", '#rate', '#percent_of_arrests',
    '#monthly', '#checkbox_1', '#checkbox_2', '#checkbox_3',
    '#checkbox_4', '#checkbox_5'
  ]
  dropdown_labels = ["&agency=", "&category=", "&subcategory=", "&subsubcategory=",
    "&rate=", "&percent=", "&monthly=", "&checkbox_1=", "&checkbox_2=",
    "&checkbox_3=", "&checkbox_4=", "&checkbox_1="
  ]
  dropdown_type = ["text_selected", "value", "value", "value", "checked",
   "checked", "checked", "checked", "checked", "checked", "checked", "checked"]



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

checkbox = [rate_val, percent_val, monthly_val, checkbox1_val, checkbox2_val, checkbox3_val, checkbox4_val, checkbox5_val];
checkbox_div = ["#rate", "#percent_of_arrests", "#monthly", "#checkbox_1", "#checkbox_2", "#checkbox_3", "#checkbox_4", "#checkbox_5"];
  for (var i = 0; i < checkbox.length; i++) {
    if ($(checkbox[i]).length != 0) {
      if (checkbox[i] != "") {
        checkbox[i] = $.parseJSON(checkbox[i]);
        $(checkbox_div[i]).prop("checked", checkbox[i]);
      }
    }
  }
  $("#crime_dropdown").val(category_val);

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
      make_dropdown('#state_dropdown', states, 0)
    } else {
      make_dropdown('#state_dropdown', prisoners_state_values, 0)
    }
    prisoner_subcatergory_keys = makePrisonerSubcategoriesDropdown();
    $('.simple-select').trigger('chosen:updated');
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

  $("#subcategory_dropdown").val(subcategory_val);
  if (type == "prisoners") {
    toggle_display("#subsubcategory_dropdown_div", [1, 5])
  }
  $("#subsubcategory_dropdown").val(subsubcategory_val);
  $('.simple-select').trigger('chosen:updated');
};
