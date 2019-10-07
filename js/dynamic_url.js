change_url = function(rate = false, subcategory_dropdown = "", subcategory_values = "") {

  new_url = window.location.pathname +
    "#state=" + $("#state_dropdown").children("option:selected").text()

  if ($("#agency_dropdown").length != 0) {
    new_url += "&agency=" + $("#agency_dropdown").children("option:selected").text()
  }
  if ($("#crime_dropdown").length != 0) {
    new_url += "&category=" + $("#crime_dropdown").val()
  }
  if ($("#subcategory_dropdown").length != 0) {
    new_url += "&subcategory=" + $("#subcategory_dropdown").val();
  }
  if ($("#subsubcategory_dropdown").length != 0) {
    new_url += "&subsubcategory=" + $("#subsubcategory_dropdown").val();
  }

  if ($('#rate').length != 0) {
    new_url += "&rate=" + $("#rate").prop("checked");;
  }
  if ($('#monthly').length != 0) {
    new_url += "&monthly=" + $("#monthly").prop("checked");;
  }
  if ($('#checkbox_1').length != 0) {
    new_url += "&checkbox_1=" + $("#checkbox_1").prop("checked");;
  }
  if ($('#checkbox_2').length != 0) {
    new_url += "&checkbox_2=" + $("#checkbox_2").prop("checked");;
  }
  if ($('#checkbox_3').length != 0) {
    new_url += "&checkbox_3=" + $("#checkbox_3").prop("checked");;
  }
  if ($('#checkbox_4').length != 0) {
    new_url += "&checkbox_4=" + $("#checkbox_4").prop("checked");;
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
  monthly_val = find_url_string(split_url, "monthly=")
  checkbox1_val = find_url_string(split_url, "checkbox_1=")
  checkbox2_val = find_url_string(split_url, "checkbox_2=")
  checkbox3_val = find_url_string(split_url, "checkbox_3=")
  checkbox4_val = find_url_string(split_url, "checkbox_4=")

  if (rate_val != "") {
    rate_val = $.parseJSON(rate_val);
    $("#rate").prop("checked", rate_val);
  }
  if (monthly_val != "") {
    monthly_val = $.parseJSON(monthly_val);
    $("#monthly").prop("checked", monthly_val);
  }
  if (checkbox1_val != "") {
    checkbox1_val = $.parseJSON(checkbox1_val);
    $("#checkbox_1").prop("checked", checkbox1_val);
  }
  if (checkbox2_val != "") {
    checkbox2_val = $.parseJSON(checkbox2_val);
    $("#checkbox_2").prop("checked", checkbox2_val);
  }
  if (checkbox3_val != "") {
    checkbox3_val = $.parseJSON(checkbox3_val);
    $("#checkbox_3").prop("checked", checkbox3_val);
  }
  if (checkbox4_val != "") {
    checkbox4_val = $.parseJSON(checkbox4_val);
    $("#checkbox_4").prop("checked", checkbox4_val);
  }

  $("#crime_dropdown").val(category_val);

  if (type == "leoka") {
    toggle_leoka_weapon_display();
    toggle_leoka_employee_sex_display();
    leoka_subcatergory_values = makeLeokaSubcategoriesDropdown();
  }
  if (type == "borderpatrol") {
    subcatergory_keys = makeBorderSubcategoriesDropdown();
    border_states = get_border_states(category_val)
    makeStateDropdown(border_states, 0);
    var states = border_states;
  }
  if (type == "prisoners") {
    if (category_val.includes("_crime")) {
      makeStateDropdown(state_values, 0);
    } else {
      makeStateDropdown(prisoners_state_values, 0);
    }
    prisoner_subcatergory_keys = makePrisonerSubcategoriesDropdown();
    $('.simple-select').trigger('chosen:updated');
  }

  state_values = $('#state_dropdown')[0].options;
  state_values = $.map(state_values, function(elem) {
    return (elem.text);
  });
  console.log(state_values)
  console.log(state_val)
  state_val = _.indexOf(state_values, state_val);
  $('#state_dropdown').val(state_val);

  if (agency_val != "") {
    agencies = updateAgencies(type, state_values);
    agency_val = _.indexOf(agencies, agency_val);
    $('#agency_dropdown').val(agency_val);
  }

  $("#subcategory_dropdown").val(subcategory_val);
  if (type == "prisoners") {
    toggle_prisoners_race_display();
  }
  $("#subsubcategory_dropdown").val(subsubcategory_val);


  $('.simple-select').trigger('chosen:updated');

};
