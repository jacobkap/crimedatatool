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

  data = tableData.map(objToString);
  data = data.join("\n");
  data = objToString(_.keys(tableData[0])) + '\n' + data;
  offense_type = "ucr_offenses_";

  if ($("#rate").is(':checked')) {
    offense_type += "rate_";
  } else {
    offense_type += "count_";
  }

if (type == "offenses") {
  filename = offense_type;
}
if (type == "arrests") {
  filename = "ucr_arrests_";
}
  filename += agencies[$("#agency_dropdown").val()] + "_" +
    state_values[$("#state_dropdown").val()] + ".csv";


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

function makeCrimeDropdown() {
  $.each(crime_values, function(val, text) {
    $('#crime_dropdown').append(new Option(text, val));
  });
  $("#crime_dropdown").val("aggravated_assault");
}

function makeStateDropdown(dropdown) {
  $.each(state_values, function(val, text) {
      $(dropdown).append( new Option(text,val) );
  });
  $(dropdown).val(4); // Sets default to the Great State of
                             // California
}

function countToRate(data) {
  data_keys = _.keys(data);
  for (var i = 0; i < data_keys.length; i++) {
    temp_match = data_keys[i].replace(/act_|clr_18_|clr_|unfound_/, "");
    if (temp_match != data_keys[i] &
      temp_match != "officers_assaulted" &
      temp_match != "officers_killed_by_felony") {
      rate_val = data[data_keys[i]] / data.population * 100000;
      rate_val = parseFloat(rate_val).toFixed(2); // Rounds to 2 decimals
      data[data_keys[i]] = rate_val;
      new_key = data_keys[i] + "_rate";
      Object.defineProperty(data, new_key,
        Object.getOwnPropertyDescriptor(data, data_keys[i]));
      delete data[data_keys[i]];
    }
  }
  return data;
}
