change_url = function(state_dropdown, agency_dropdown, category_dropdown, agencies, category_values) {
  state_val = state_values[$(state_dropdown).val()];
  agency_val = agencies[$(agency_dropdown).val()];
  category_val = category_values[$(category_dropdown).val()];


  new_url =  window.location.pathname + "#state=" + state_val + "&agency=" + agency_val + "&category=" + category_val;
  window.history.pushState("", 'Title', new_url);
  return(new_url);
};


change_data_from_url = function() {
  url = window.location.hash;

  split_url = url.split("&");
  state_val = split_url[0].replace("#state=", "");
  agency_val = split_url[1].replace("agency=", "");
  category_val = split_url[2].replace("category=", "");

  state_val = state_val.replace(/%20/g, " ");
  agency_val = agency_val.replace(/%20/g, " ");
  category_val = category_val.replace(/%20/g, " ");

  state_val = _.indexOf(state_values, state_val);
  category_val = _.indexOf(_.values(crime_values), category_val);
  category_val = _.keys(crime_values)[category_val];

  $("#state_dropdown").val(state_val);
  $("#state_dropdown").trigger("chosen:updated");

  offense_agencies = updateAgencies("crime", offenses_largest_agency, "#agency_dropdown", "#state_dropdown");
  agency_val = _.indexOf(offense_agencies, agency_val);
  $("#agency_dropdown").val(agency_val);
  $("#agency_dropdown").trigger("chosen:updated");

  $("#crime_dropdown").val(category_val);
  $("#crime_dropdown").trigger("chosen:updated");
  offenses_agencyChangeFun();

};
