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

change_data_from_url = function(type, subcategory_dropdown = "", subcategory_values = "") {
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

  $("#subcategory_dropdown").val(subcategory_val);
  $("#subcategory_dropdown").trigger("chosen:updated");

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
