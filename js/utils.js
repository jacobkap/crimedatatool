function readCSV(csv) {
  var result = null;
  var scriptUrl = csv;
  $.ajax({
    url: scriptUrl,
    type: 'get',
    dataType: 'text',
    async: false,
    success: function(data) {
      result = data;
    }
  });
  return result;
}

function exportToCsv(tableData, type) {

  data = tableData.reverse();
  data = data.map(objToString);
  data = data.join("\n");
  data = objToString(_.keys(tableData[0])) + '\n' + data;
  offense_type = "ucr_offenses_";

  if ($("#rate").is(':checked')) {
    offense_type += "rate_";
  } else {
    offense_type += "count_";
  }

  if (type == "offenses") {
    filename = "ucr_" + offense_type;
    filename += offense_agencies[$("#agency_dropdown").val()] + "_" +
      state_values[$("#state_dropdown").val()] + ".csv";
  } else if (type == "arrests") {
    filename = "ucr_arrests_";
    filename += arrest_agencies[$("#arrests_agency_dropdown").val()] + "_" +
      state_values[$("#arrests_state_dropdown").val()] + ".csv";
  } else if (type == "leoka") {
    filename = "ucr_police_";
    filename += leoka_agencies[$("#leoka_agency_dropdown").val()] + "_" +
      state_values[$("#leoka_state_dropdown").val()] + ".csv";
  }



  var blob = new Blob([data], {
    type: 'text/csv;charset=utf-8;'
  });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function makeCrimeDropdown(type, dropdown) {
  if (type == "crime") {
    crime = crime_values;
    starter = "all_crimes";
  } else if (type == "arrest") {
    crime = arrest_values;
    starter = "agg_assault";
  } else if (type == "leoka") {
    crime = leoka_values;
    starter = "total_officers";
  }
  $.each(crime, function(val, text) {
    $(dropdown).append(new Option(text, val));
  });
  $(dropdown).val(starter);
}

function makeStateDropdown(dropdown) {
  $.each(state_values, function(val, text) {
    $(dropdown).append(new Option(text, val));
  });
  $(dropdown).val(4); // Sets default to the Great State of
  // California
}

function makeArrestCategoriesDropdown() {
  $.each(arrest_categories, function(val, text) {
    $('#arrests_category_dropdown').append(new Option(text, val));
  });
  $('#arrests_category_dropdown').val("tot_arrests");
}

function countToRate(data) {
  data_keys = _.keys(data);
  for (var i = 0; i < data_keys.length; i++) {
    temp_match = data_keys[i].replace(/act_|clr_18_|clr_|unfound_/, "");
    if (temp_match != data_keys[i] ||
      temp_match.includes("officer")) {
      rate_val = data[data_keys[i]] / data.population * 100000;
      rate_val = parseFloat(rate_val).toFixed(2); // Rounds to 2 decimals
      if (isNaN(rate_val)) {
        rate_val = 0;
      }
      data[data_keys[i]] = rate_val;
      new_key = data_keys[i] + "_rate";
      Object.defineProperty(data, new_key,
        Object.getOwnPropertyDescriptor(data, data_keys[i]));
      delete data[data_keys[i]];
    }
  }
  return data;
}


function getStateAgencies(type, largest_agencies = false) {
  url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper/master/data/";
  if (type == "crime") {
    url += "offenses/";
    final_url = url + state_values[$("#state_dropdown").val()] + "_agency_choices.json";
  } else if (type == "arrest") {
    url += "arrests/";
    final_url = url + state_values[$("#arrests_state_dropdown").val()] + "_agency_choices.json";
  } else if (type == "leoka") {
    url += "leoka/";
    final_url = url + state_values[$("#leoka_state_dropdown").val()] + "_agency_choices.json";
  }
  if (largest_agencies === true) {
    final_url = url + "largest_agency_choices.json";
  }
  var state_agencies = $.getJSON({
    url: final_url,
    type: 'get',
    dataType: 'json',
    async: false,
    success: function(data) {
      result = data;
    }
  });
  state_agencies = state_agencies.responseJSON;
  return (state_agencies);
}

function updateAgencies(type, largestAgencies, agencyDropdown, stateDropdown) {
  agencies = getStateAgencies(type);
  $(agencyDropdown).empty();
  $.each(agencies, function(val, text) {
    $(agencyDropdown).append(new Option(text, val));
  });
  largest_agency = state_values[$(stateDropdown).val()];
  largest_agency = _.filter(largestAgencies, function(x) {
    return x.state == largest_agency;
  });
  largest_agency = largest_agency[0].agency;
  largest_agency = _.indexOf(agencies, largest_agency);
  $(agencyDropdown).val(largest_agency);
  //$(agencyDropdown).val(0);

  $('.simple-select').trigger('chosen:updated');
  return agencies;
}
