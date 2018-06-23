
function resizeChosen() {
   $(".chosen-container").each(function() {
       $(this).attr('style', 'width: 85%');
   });
}


/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function objToString(obj) {
  var str = '';
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str += obj[p] + ',';
    }
  }
  str = str.slice(0, -1); // Removes comma at end.
  return str;
}

function subsetColumns(data, colsToKeep) {
  data.shift();
  data = _.map(data, function(currentObject) {
    return _.pick(currentObject, colsToKeep);
  });
  data = data.map(objToString);
  data = data.join("\n");

  data = colsToKeep.toString() + "\n" + data;

  return (data);
}

function getStateAgencies(type) {
  url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper/master/data/";
  if (type == "crime") {
    url += "offenses/" + state_values[$("#state_dropdown").val()] + "_agency_choices.json";
  }
  var state_agencies = $.getJSON({
    url: url,
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

function getStateData(type) {
  url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper/master/data/";
  if (type == "offenses") {
    state = state_values[$("#state_dropdown").val()];
    state = state.replace(/ /g,"_");
    agencies = offense_agencies[$("#agency_dropdown").val()];
    agencies = agencies.replace(/ /g,"_");
    agencies = agencies.replace(/:/g,"_");
    agencies = agencies.replace(/__/g,"_");
    state = state.replace(" ", "_");
    url += "offenses/" + state + "_" + agencies;
  }
  if (type == "arrests")  {
    state = state_values[$("#arrests_state_dropdown").val()];
    state = state.replace(" ", "_");
    state = state.replace(" ", "_");
    url += state;
  }
  url +=".csv";
  stateData = readCSV(url);
  stateData = stateData.split("\n");
  return stateData;
}
function getAgencyData(stateData, headers) {
//  agencyData = stateData.filter(s => s.includes(ori));
  agencyData = data_object_fun(stateData, headers);

  if ($("#rate").is(':checked')) {
    agencyData = _.map(agencyData, function(currentObject) {
      return countToRate(currentObject);
    });
  }
  return agencyData;
}

function main(type, state_dropdown, crime_dropdown) {
  stateData = getStateData(type);
  headers = stateData[0];
  colsForGraph = getCrimeColumns(headers, type);

  if (type == "offenses") {
  //  state = state_values[$("#state_dropdown").val()];
//    agency = agencies[$("#agency_dropdown").val()];
//    ori = getORI(offenses_state_agencies, state, agency);
  }
  if (type == "arrests") {
    state = state_values[$("#arrests_state_dropdown").val()];
    agency = agencies[$("#arrests_agency_dropdown").val()];
    ori = getORI(arrests_state_agencies, state, agency);
  }

  tableData = getAgencyData(stateData, headers);
  tableData.pop();
  graphData = subsetColumns(tableData, colsForGraph);
  return [tableData, graphData, headers];
}

function getORI(state_agencies, state, agency) {
  ori = state_agencies.filter(x => x.state === state);
  ori = ori.filter(x => x.agency === agency);
  return ori[0].ori;
}

function getCrimeColumns(arr, type) {
  if (type == "offenses") {
  crime = $("#crime_dropdown").val();
}
if (type == "arrests") {
  crime = $("#arrests_crime_dropdown").val();
  crime += "_" + $("#arrests_category_dropdown").val();
}
  arr = arr.split(",");
  columnNames = ["year"];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].includes(crime)) {
      columnNames.push(arr[i]);
    }
  }
  return (columnNames);
}

function data_object_fun(arr, headers) {
  headers = headers.split(",");
  var jsonObj = [];
  for (var i = 0; i < arr.length; i++) {
    temp = arr[i];
    var data = temp.split(',');
    var obj = {};
    for (var j = 0; j < data.length; j++) {
      obj[headers[j].trim()] = data[j].trim();
    }
    jsonObj.push(obj);
  }
  return (jsonObj);
}
