change_url = function() {
  state_val = state_values[$("#state_dropdown").val()];
  agency_val = offense_agencies[$("#agency_dropdown").val()];
  crime_val = crime_values[$("#crime_dropdown").val()];

  new_url =  "crime.html/state=" + state_val + "&agency=" + agency_val + "&crime=" + crime_val;
  window.history.pushState("", 'Crime', new_url);
  return(new_url);
};


change_data_from_url = function() {
  new_url = window.location.pathname;

  split_url = new_url.split("&");
  state_val =   split_url[0].replace("/state=", "");
  state_val = _.indexOf(state_values, state_val);
  agency_val = split_url[1].replace("agency=", "");
  agency_val = _.indexOf(offense_agencies, agency_val);
  crime_val = split_url[2].replace("crime=", "");
  crime_val = _.indexOf(_.values(crime_values), crime_val);
  crime_val = _.keys(crime_values)[crime_val];

  $("#state_dropdown").val(state_val);
  $("#state_dropdown").trigger("chosen:updated");

  $("#agency_dropdown").val(agency_val);
  $("#agency_dropdown").trigger("chosen:updated");

  $("#crime_dropdown").val(crime_val);
  $("#crime_dropdown").trigger("chosen:updated");

};
