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
    new_url += "&subcategory=" + $("#subcategory_dropdown").children("option:selected").text();
  }
  if ($('#rate').length != 0) {
    new_url += "&rate=" + $("#rate").prop("checked");;
  }



  window.history.pushState("", 'Title', new_url);
  return (new_url);
};


change_data_from_url = function(type, subcategory_dropdown = "", subcategory_values = "") {
  url = window.location.hash;

  split_url = url.split("&");
  state_val = split_url[0].replace("#state=", "");
  agency_val = split_url[1].replace("agency=", "");
  category_val = split_url[2].replace("category=", "");
  if (split_url.length > 4) {
    rate_checked = split_url[4].replace("rate=", "");
    rate_checked = $.parseJSON(rate_checked);
    if (rate_checked === true) {
      $("#rate").prop("checked", rate_checked);
    }
  }

  state_val = state_val.replace(/%20/g, " ");
  agency_val = agency_val.replace(/%20/g, " ");
  category_val = category_val.replace(/%20/g, " ");


  $('#crime_dropdown').val(category_val);
  $('#crime_dropdown').trigger("chosen:updated");

  state_values = $('#state_dropdown')[0].options;
  state_values = $.map(state_values, function(elem) {
    return (elem.text);
  });
  state_val = _.indexOf(state_values, state_val);
  $('#state_dropdown').val(state_val);
  $('#state_dropdown').trigger("chosen:updated");

  if (agency_val != "") {
    agencies = updateAgencies(type, state_values);
    agency_val = _.indexOf(agencies, agency_val);
    $('#agency_dropdown').val(agency_val);
    $('#agency_dropdown').trigger("chosen:updated");
  }

  $("#crime_dropdown").val(category_val);
  $("#crime_dropdown").trigger("chosen:updated");

  if (type == "leoka") {
    leoka_subcatergory_keys = makeLeokaSubcategoriesDropdown();
    leoka_subcatergory_values = leoka_subcatergory_keys[1];
    leoka_subcatergory_keys = leoka_subcatergory_keys[0];
    subcategory_values = leoka_subcatergory_values;
  }

  if (subcategory_dropdown !== "") {
    subcategory_val = split_url[4].replace("subcategory=", "");
    subcategory_val = subcategory_val.replace(/%20/g, " ");
    subcategory_val = _.indexOf(_.values(subcategory_values), subcategory_val);
    subcategory_val = _.keys(subcategory_values)[subcategory_val];
    $(subcategory_dropdown).val(subcategory_val);
    $(subcategory_dropdown).trigger("chosen:updated");
  }



  $('.simple-select').trigger('chosen:updated');

};
