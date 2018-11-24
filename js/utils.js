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

  if (checkIfRateChecked(type)) {
      rate_or_count = "rate_";
    } else {
      rate_or_count = "count_";
    }
     if (type == "leoka" && $("#leoka_rate_per_officer").is(':checked') === true) {
      rate_or_count = "rate_per_officer_";
    }

    data = data.map(objToString);
    data = data.join("\n");
    data = objToString(_.keys(tableData[0])) + '\n' + data;


  if (type == "offenses") {
    filename = "ucr_offenses_" + rate_or_count;
    filename += offense_agencies[$("#agency_dropdown").val()] + "_" +
      state_values[$("#state_dropdown").val()] + ".csv";
  } else if (type == "arrests") {
    filename = "ucr_arrests_" + rate_or_count;
    filename += arrest_agencies[$("#arrests_agency_dropdown").val()] + "_" +
      state_values[$("#arrests_state_dropdown").val()] + ".csv";
  } else if (type == "leoka") {
    filename = "ucr_police_" + rate_or_count;
    filename += leoka_agencies[$("#leoka_agency_dropdown").val()] + "_" +
      state_values[$("#leoka_state_dropdown").val()] + ".csv";
  } else if (type == "prisoners") {
    filename = "prisoners_" + rate_or_count;
    filename += prisoners_state_values[$("#prisoners_jurisdictions").val()] + "_" +
      _.values(prisoner_categories)[$("#prisoners_categories").val()] + ".csv";
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
    starter = "murder";
  } else if (type == "arrests") {
    crime = arrest_values;
    starter = "murder";
  } else if (type == "leoka") {
    crime = leoka_categories;
    starter = 2;
  }
  $.each(crime, function(val, text) {
    $(dropdown).append(new Option(text, val));
  });
  $(dropdown).val(starter);
}

function toggle_leoka_weapon_display() {
  if (leoka_categories[$("#leoka_category_dropdown").val()] != "Officers Assaulted") {
    $("#weaponsDiv").hide();
  } else {
    $("#weaponsDiv").show();
  }
}

function makeStateDropdown(dropdown) {
  $.each(state_values, function(val, text) {
    $(dropdown).append(new Option(text, val));
  });
  $(dropdown).val(32); // Sets default to New York
}

function makeJurisdictionDropdown() {
  $.each(prisoners_state_values, function(val, text) {
    $("#prisoners_jurisdictions").append(new Option(text, val));
  });
  $("#prisoners_jurisdictions").val(0); // Sets default to Total Prisoners
}

function makePrisonerCategoriesDropdown() {
  temp = _.values(prisoner_categories);
  $.each(temp, function(val, text) {
    $('#prisoners_categories').append(new Option(text, val));
  });
  $('#prisoners_categories').val(4);
}

function makeLeokaWeaponDropdown() {
  temp = _.values(leoka_weapons);
  $.each(temp, function(val, text) {
    $('#leoka_weapons').append(new Option(text, val));
  });
  $('#leoka_weapons').val(4);
}

function makeLeokaSubcategoriesDropdown() {
  leoka_subcategory_starts = [12, 1, 5];

  $('#leoka_subcategory_dropdown').empty();
  values = leoka_subcategories[$('#leoka_category_dropdown').val()];
  keys   = _.keys(values);
  values = _.values(values);
  $.each(values, function(val, text) {
    $('#leoka_subcategory_dropdown').append(new Option(text, val));
  });
  $('#leoka_subcategory_dropdown').val(leoka_subcategory_starts[$('#leoka_category_dropdown').val()]);

  return([keys, values]);
}

function makePrisonerSubcategoriesDropdown() {
  $('#prisoners_subcategories').empty();
  values = prisoners_subcategory[$('#prisoners_categories').val()];
  keys   = _.keys(values);
  values = _.values(values);
  $.each(values, function(val, text) {
    $('#prisoners_subcategories').append(new Option(text, val));
  });
  $('#prisoners_subcategories').val(0);

  return(keys);
}


function makeArrestCategoriesDropdown() {
  $.each(arrest_categories, function(val, text) {
    $('#arrests_category_dropdown').append(new Option(text, val));
  });
  $('#arrests_category_dropdown').val("tot_arrests");
}

function countToRate(data, per_officer = false) {

  per_officer = $("#leoka_rate_per_officer").is(':checked');
  data_keys = _.keys(data);
if (per_officer === true) {
officer_count = data.total_employees_officers;
}

  for (var i = 0; i < data_keys.length; i++) {
    if (!data_keys[i].includes("agency") &&
      !data_keys[i].includes("year") &&
      !data_keys[i].includes("state") &&
      !data_keys[i].includes("population") &&
      !data_keys[i].includes("ORI")) {
      rate_val = data[data_keys[i]] / data.population * 100000;
      if (per_officer === true) {
       rate_val = data[data_keys[i]] / officer_count;
     }
      rate_val = parseFloat(rate_val).toFixed(2); // Rounds to 2 decimals
      if (!isFinite(rate_val)) {
        rate_val = NaN;
      }
      data[data_keys[i]] = rate_val;
      rate_type = "_rate";
      if (per_officer === true) {
        rate_type = "_rate_per_officer";
      }
      new_key = data_keys[i] + rate_type;
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
  } else if (type == "arrests") {
    url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_data/master/data/";
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
  agencies.sort();
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
