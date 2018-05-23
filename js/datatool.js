function opentab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function getORI() {
  state = state_values[$("#state_dropdown").val()];
  agency = agencies[$("#agency_dropdown").val()];
  ori = state_agencies.filter(x => x.state === state);
  ori = ori.filter(x => x.agency === agency);

  return ori[0].ori;
}

function getStateAgencies() {
  var state_agencies =  $.getJSON({
    url: "state_agencies.json",
    type: 'get',
    dataType: 'json',
    async: false,
    success: function(data) {
      result = data;
    }
  });
  state_agencies = state_agencies.responseJSON;
  return(state_agencies);
}

function getAgenciesInState() {
  state = state_values[$("#state_dropdown").val()];
  agencies = state_agencies.filter(s => s.state === state);
  agencies = agencies.map(function(item) {
     return item["agency"];
   });
   agencies.sort(function(a, b){
     if(a < b) return -1;
     if(a > b) return 1;
     return 0;
 });
return agencies;
}

function subsetDataRows(data) {
          ori = getORI();
          data = data.filter(s => s.includes(ori));
          data = data_object_fun(data, headers);
          return data;
}


function updateGraph() {

  finalData = subsetDataRows(data);

  colsToKeep = getCrimeColumns(headers);
  finalData = subsetColumns(finalData, colsToKeep);
  new_title = agencies[$("#agency_dropdown").val()] + ', ';
  new_title += state_values[$("#state_dropdown").val()] + ': ';
  new_title += crime_values[$("#crime_dropdown").val()];



  visibilityVector = [];
  visibilityVector.push($("#actual").is(':checked'));
  visibilityVector.push($("#clearance").is(':checked'));
  visibilityVector.push($("#clearance_under18").is(':checked'));
  visibilityVector.push($("#unfounded").is(':checked'));

  var ylab = '# of Crimes';
  if ($("#rate").is(':checked')) {
    ylab = 'Rate per 100,000 People';
  }

  makeGraph(finalData, ylab, visibilityVector, new_title);
}

function makeGraph(data, ylab, visibilityVector, title) {
  var graph = new Dygraph(document.getElementById("main"),
  data, {
animatedZooms: true,
title: title,
legend: 'always',
ylabel: ylab,
xlabel: ' Year',
visibility: visibilityVector
});
return(graph);
}

function onChangeFun() {
    updateAgencies();
    updateGraph();
}

function updateAgencies() {
  agencies = getAgenciesInState();
  $('#agency_dropdown').empty();
  $.each(agencies, function(val, text) {
      $('#agency_dropdown').append( new Option(text,val) );
  });
}

function readCSV(csv) {
  var result = null;
  var scriptUrl = csv;
  $.ajax({
    url: scriptUrl,
    type: 'get',
    dataType: 'html',
    async: false,
    success: function(data) {
      result = data;
    }
  });
  return result;
}


function getCrimeColumns(arr) {
  crime = $('#crime_dropdown').val();
  arr = arr.split(",");
  columnNames = ["year"];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].includes(crime)) {
      columnNames.push(arr[i]);
    }
  }
  return (columnNames);
}

function subsetColumns(data, colsToKeep) {

  data = _.map(data, function(currentObject) {
          return _.pick(currentObject, colsToKeep);
            });
  data = data.map(objToString);
  data = data.join("\n");

  finalData = colsToKeep.toString() + "\n";
  finalData += data;
  return(finalData);
}

function data_object_fun(arr, headers) {
  headers = headers.split(",");
  var jsonObj = [];
  for (var i = 0; i < arr.length; i++) {
    //  console.log(i);
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


function objToString(obj) {
  var str = '';
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str += obj[p] + ',';
    }
  }
  str = str.slice(0, -2);
  return str;
}



var state_values = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District Of Columbia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];

var crime_values = {
  "murder": "Murder",
  "manslaughter": "Manslaughter",
  "rape_total": "Rape Total",
  "force_rape": "Forcible Rape",
  "att_rape": "Attempted Rape",
  "robbery_total": "Robbery Total",
  "gun_robbery": "Robbery -  Gun",
  "knife_robbery": "Robbery - Knife",
  "oth_weap_robbery": "Robbery - Other Weapon",
  "strong_arm_robbery": "Robbery - Strong Arm",
  "assault_total": "Assault Total",
  "agg_assault": "Aggravated Assault",
  "gun_assault": "Assault -  Gun",
  "knife_assault": "Assault - Knife",
  "oth_weap_assault": "Assault - Other Weapon",
  "hand_feet_assault": "Assault - Strong Arm",
  "simple_assault": "Simple Assault",
  "burglary_total": "Burglary Total",
  "burg_force_entry": "Burglary - Forcible Entry",
  "burg_no_force_entry": "Burglary - Nonforcible Entry",
  "att_burglary": "Attempted",
  "larceny_total": "Larceny Total",
  "mtr_vhc_theft_total": "Motor Vehicle Theft",
  "auto_theft": "Auto Theft",
  "truck_bus_theft": "Truck/Bus Theft",
  "oth_vhc_theft": "Other Vehicle Theft",
  "officers_kill_by_acc": "Officers Killed by Accident",
  "officers_kill_by_fel": "Officers Killed by Felony",
  "officers_assaulted": "Officers Assaulted"
};
