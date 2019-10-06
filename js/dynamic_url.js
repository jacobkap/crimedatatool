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
  if ($('#rate').length != 0) {
    new_url += "&rate=" + $("#rate").prop("checked");;
  }
  if ($('#monthly').length != 0) {
    new_url += "&monthly=" + $("#monthly").prop("checked");;
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

change_data_from_url = function(type) {
  url = window.location.hash;
  split_url = url.split("&");


  state_val = find_url_string(split_url, "state=")
  agency_val = find_url_string(split_url, "agency=")
  category_val = find_url_string(split_url, "category=")
  subcategory_val = find_url_string(split_url, "subcategory=")
  rate_val = find_url_string(split_url, "rate=")
  monthly_val = find_url_string(split_url, "monthly=")

  if (rate_val != "") {
    rate_val = $.parseJSON(rate_val);
    $("#rate").prop("checked", rate_val);
  }
  if (monthly_val != "") {
    monthly_val = $.parseJSON(monthly_val);
    $("#monthly").prop("checked", monthly_val);
  }

  $("#crime_dropdown").val(category_val);

  if (type == "leoka") {
    toggle_leoka_weapon_display();
    toggle_leoka_employee_sex_display();
    leoka_subcatergory_values = makeLeokaSubcategoriesDropdown();
  }
  if (type == "borderpatrol") {
    subcatergory_keys = makeBorderSubcategoriesDropdown();
    if (["sector_profile", "family", "staffing"].includes(category_val)) {
      border_states = border_sectors;
    } else if (["southwest_apprehensions", "southwest_deaths"].includes(category_val)) {
      border_states = southwest_border_sectors;
    } else if (["seizures"].includes(category_val)) {
      border_states = border_regions;
    } else if (["nationwide"].includes(category_val)) {
      border_states = nationwide_only;
    }
    makeStateDropdown(border_states, 0);
    var states = border_states
  }
  if (type == "prisoners") {
    if (category_val.includes("_crime")) {
      makeStateDropdown(state_values, 0);
    } else {
      makeStateDropdown(prisoners_state_values, 0);
    }
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


  $('.simple-select').trigger('chosen:updated');

};
