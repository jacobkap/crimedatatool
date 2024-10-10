function ks(active = "no") {
  if (active == "yes") {
    $("body").hide();
    var password_given = localStorage.getItem("password_given");
    if (password_given === false | password_given === null) {
      var testPassword = window.prompt("Page not currently available");
      if (testPassword === "houdini") {
        $("body").show();
        localStorage.setItem("password_given", true);
      } else {
        location.reload();
      }
    } else {
      $("body").show();
    }
  }
}
'[]'

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


function exportToCsv(tableData, type, states) {


  data = tableData.reverse();

  rate_or_count = "count_";


  if (get_rate_type(type, binary = true)) {
    rate_or_count = "rate_";
  }
  if (type == "police" && $("#checkbox_4").is(':checked')) {
    rate_or_count = "rate_per_officer_";
  }
  if (type == "arrests" && $("#percent_of_arrests").is(':checked')) {
    rate_or_count = "_percent_of_arrests";
  }
  if (type == "arrests" && $("#percent_of_all_arrests").is(':checked')) {
    rate_or_count = "_percent_of_all_arrests";
  }
  if (type == "nibrs" && $("#percent_of_crimes").is(':checked')) {
    rate_or_count = "percent_";
  }


  data = data.map(objToString);
  data = data.join("\n");
  data = objToString(_.keys(tableData[0])) + '\n' + data;

  filename = "crimedatatool.com_" + type + "_" + rate_or_count;
    filename += agencies[$("#agency_dropdown").val()] + "_";

  filename += states[$("#state_dropdown").val()];
  filename += ".csv";

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

function make_dropdown(dropdown_id, dropdown_values, starter, starter_div) {
  $(dropdown_id).empty();
  _.each(dropdown_values, function(val, text) {
    $(dropdown_id).append(new Option(val, text));
  });

  if (Array.isArray(starter)) {
    starter = starter[$(starter_div).val()]
  }

  $(dropdown_id).val(starter);
}


function toggle_display(div, match_value) {
  if (match_value.includes($("#crime_dropdown").val())) {
    $(div).show();
  } else {
    $(div).hide();
  }
}




function toggle_nibrs_display() {
  $("h3").eq(2).html("Agency:");
  $("#percent_of_crimes").show();
  $("#rate").show();
  $("label[for='percent_of_crimes']").show()
  $("label[for='percent_of_crimes']").html("% of Crimes")
  $("label[for='rate']").show()
  $("label[for='rate']").html("Rate per 100,000 Population")
  $("#checkbox_1").show();
  $("#checkbox_2").show();
  $("#checkbox_3").show();
  $("#checkbox_4").show();
  $("#checkbox_5").show();
  $("#checkbox_6").show();
  $("#checkbox_7").show();
  $("label[for='checkbox_1']").show()
  $("label[for='checkbox_2']").show()
  $("label[for='checkbox_3']").show()
  $("label[for='checkbox_4']").show()
  $("label[for='checkbox_5']").show()
  $("label[for='checkbox_6']").show()
  $("label[for='checkbox_7']").show()

  $("#checkbox_1").prop("checked", true);
  $("#checkbox_2").prop("checked", false);
  $("#checkbox_3").prop("checked", false);
  $("#checkbox_4").prop("checked", false);
  $("#checkbox_5").prop("checked", false);
  $("#checkbox_6").prop("checked", false);
  $("#checkbox_7").prop("checked", false);

  if ($("#subcategory_dropdown").val() == "gun") {
    $("#checkbox_5").hide();
    $("#checkbox_6").hide();
    $("#checkbox_7").hide();
    $("label[for='checkbox_5']").hide()
    $("label[for='checkbox_6']").hide()
    $("label[for='checkbox_7']").hide()
    $("label[for='checkbox_1']").html("Total")
    $("label[for='checkbox_2']").html("Gun Not Used")
    $("label[for='checkbox_3']").html("Handgun Used")
    $("label[for='checkbox_4']").html("Other/Unknown Type Gun Used")
  } else if ($("#category_dropdown").val() == "property") {
    $("h3").eq(2).html("Property Type:");
    $("#percent_of_crimes").prop("checked", false);
    $("#percent_of_crimes").hide();
    $("label[for='percent_of_crimes']").hide()
    $("#checkbox_7").hide();
    $("label[for='checkbox_7']").hide()
    $("label[for='checkbox_1']").html("Burned")
    $("label[for='checkbox_2']").html("Counterfeited/Forged")
    $("label[for='checkbox_3']").html("Destroyed/Damaged/Vandalized")
    $("label[for='checkbox_4']").html("Recovered")
    $("label[for='checkbox_5']").html("Seized")
    $("label[for='checkbox_6']").html("Stolen/Robbed/Defrauded/Etc.")

    $("#checkbox_1").prop("checked", false);
    $("#checkbox_6").prop("checked", true);


    if ($("#subcategory_dropdown").val() == "value_mean" | $("#subcategory_dropdown").val() == "value_median") {
      $("#rate").prop("checked", false);
      $("#rate").hide();
      $("label[for='rate']").hide()
    }

    if ($("#subcategory_dropdown").val() == "drugs") {
      $("h3").eq(2).html("Drug Type:");
      $("#checkbox_1").prop("checked", true);
      $("#checkbox_6").prop("checked", false);
      $("#checkbox_1").hide();
      $("#checkbox_2").hide();
      $("#checkbox_3").hide();
      $("#checkbox_4").hide();
      $("#checkbox_5").hide();
      $("#checkbox_6").hide();
      $("#checkbox_7").hide();
      $("label[for='checkbox_1']").hide()
      $("label[for='checkbox_2']").hide()
      $("label[for='checkbox_3']").hide()
      $("label[for='checkbox_4']").hide()
      $("label[for='checkbox_5']").hide()
      $("label[for='checkbox_6']").hide()
      $("label[for='checkbox_7']").hide()
    }
  } else if ($("#subcategory_dropdown").val() == "total") {
    $("#checkbox_1").hide();
    $("#checkbox_2").hide();
    $("#checkbox_3").hide();
    $("#checkbox_4").hide();
    $("#checkbox_5").hide();
    $("#checkbox_6").hide();
    $("#checkbox_7").hide();
    $("label[for='checkbox_1']").hide()
    $("label[for='checkbox_2']").hide()
    $("label[for='checkbox_3']").hide()
    $("label[for='checkbox_4']").hide()
    $("label[for='checkbox_5']").hide()
    $("label[for='checkbox_6']").hide()
    $("label[for='checkbox_7']").hide()
  } else if ($("#subcategory_dropdown").val() == "location") {
    $("#checkbox_7").hide();
    $("label[for='checkbox_7']").hide()
    $("label[for='checkbox_1']").html("Total")
    $("label[for='checkbox_2']").html("Bar/Nightclub")
    $("label[for='checkbox_3']").html("Home")
    $("label[for='checkbox_4']").html("Other/Unknown")
    $("label[for='checkbox_5']").html("Outside")
    $("label[for='checkbox_6']").html("School")
  } else if ($("#subcategory_dropdown").val() == "subtype") {

    if ($("#crime_dropdown").val() != "animal_cruelty") {
      $("#checkbox_4").hide();
      $("#checkbox_5").hide();
      $("#checkbox_6").hide();
      $("#checkbox_7").hide();
      $("label[for='checkbox_4']").hide()
      $("label[for='checkbox_5']").hide()
      $("label[for='checkbox_6']").hide()
      $("label[for='checkbox_7']").hide()
      $("label[for='checkbox_1']").html("Total")
      $("label[for='checkbox_2']").html("Buy/Possess/Consume")
      $("label[for='checkbox_3']").html("Sell/Create/Operate")
    } else {
      $("#checkbox_6").hide();
      $("#checkbox_7").hide();
      $("label[for='checkbox_6']").hide()
      $("label[for='checkbox_7']").hide()
      $("label[for='checkbox_2']").html("Abuse/Torture")
      $("label[for='checkbox_3']").html("Animal Fighting")
      $("label[for='checkbox_4']").html("Bestiality")
      $("label[for='checkbox_5']").html("Neglect")
    }
  } else if ($("#subcategory_dropdown").val() == "clearance") {
    $("label[for='checkbox_1']").html("Total")
    $("label[for='checkbox_2']").html("Cleared by Arrest")
    $("label[for='checkbox_3']").html("Death of Suspect")
    $("label[for='checkbox_4']").html("Extradition Denied")
    $("label[for='checkbox_5']").html("Juvenile/No Custody")
    $("label[for='checkbox_6']").html("Prosecution Declined")
    $("label[for='checkbox_7']").html("Victim Refused to Cooperate")
  } else if ($("#subcategory_dropdown").val() == "relationship") {
    $("#checkbox_7").hide();
    $("label[for='checkbox_7']").hide()
    $("label[for='checkbox_1']").html("Total")
    $("label[for='checkbox_2']").html("Intimate Partner")
    $("label[for='checkbox_3']").html("Other Family")
    $("label[for='checkbox_4']").html("Other")
    $("label[for='checkbox_5']").html("Stranger")
    $("label[for='checkbox_6']").html("Unknown")
  } else if ($("#subcategory_dropdown").val() == "race") {
    $("#checkbox_7").hide();
    $("label[for='checkbox_7']").hide()
    $("label[for='checkbox_1']").html("Total")
    $("label[for='checkbox_2']").html("Asian")
    $("label[for='checkbox_3']").html("American Indian")
    $("label[for='checkbox_4']").html("Black")
    $("label[for='checkbox_5']").html("White")
    $("label[for='checkbox_6']").html("Unknown")
    if ($('#category_dropdown').val() == "arrestee") {
      $("#checkbox_6").hide();
      $("#checkbox_7").hide();
      $("label[for='checkbox_6']").hide()
      $("label[for='checkbox_7']").hide()
    }
  } else if ($("#subcategory_dropdown").val() == "ethnicity") {
    $("#checkbox_5").hide();
    $("#checkbox_6").hide();
    $("#checkbox_7").hide();
    $("label[for='checkbox_5']").hide()
    $("label[for='checkbox_6']").hide()
    $("label[for='checkbox_7']").hide()

    $("label[for='checkbox_1']").html("Total")
    $("label[for='checkbox_2']").html("Hispanic")
    $("label[for='checkbox_3']").html("Non-Hispanic")
    $("label[for='checkbox_4']").html("Unknown")
    if ($('#category_dropdown').val() == "arrestee") {
      $("label[for='checkbox_3']").html("Total")
      $("#checkbox_4").hide();
      $("label[for='checkbox_4']").hide()
    }
  } else if ($("#subcategory_dropdown").val() == "sex") {
    $("#checkbox_5").hide();
    $("#checkbox_6").hide();
    $("#checkbox_7").hide();
    $("label[for='checkbox_5']").hide()
    $("label[for='checkbox_6']").hide()
    $("label[for='checkbox_7']").hide()
    $("label[for='checkbox_1']").html("Total")
    $("label[for='checkbox_2']").html("Female")
    $("label[for='checkbox_3']").html("Male")
    $("label[for='checkbox_4']").html("Unknown")

    if ($('#category_dropdown').val() == "arrestee") {
      $("#checkbox_4").hide();
      $("label[for='checkbox_4']").hide()
    }

  } else if ($("#subcategory_dropdown").val() == "injury") {
    $("#checkbox_5").hide();
    $("#checkbox_6").hide();
    $("#checkbox_7").hide();
    $("label[for='checkbox_5']").hide()
    $("label[for='checkbox_6']").hide()
    $("label[for='checkbox_7']").hide()

    $("label[for='checkbox_1']").html("Total")
    $("label[for='checkbox_2']").html("No Injury")
    $("label[for='checkbox_3']").html("Minor Injury")
    $("label[for='checkbox_4']").html("Serious Injury")
  } else if ($("#subcategory_dropdown").val() == "arrest_type") {
    $("#checkbox_5").hide();
    $("label[for='checkbox_5']").hide()
    $("#checkbox_4").show();
    $("label[for='checkbox_4']").show()
    $("label[for='checkbox_1']").html("Total")
    $("label[for='checkbox_2']").html("On-View Arrest")
    $("label[for='checkbox_3']").html("Summoned/Cited")
    $("label[for='checkbox_4']").html("Taken into Custody")


    $("#checkbox_6").hide();
    $("#checkbox_7").hide();
    $("label[for='checkbox_6']").hide()
    $("label[for='checkbox_7']").hide()
  } else if ($("#subcategory_dropdown").val() == "age") {
    $("#checkbox_5").hide();
    $("label[for='checkbox_5']").hide()
    $("#checkbox_4").show();
    $("label[for='checkbox_4']").show()
    $("label[for='checkbox_1']").html("Total")
    $("label[for='checkbox_2']").html("Adult")
    $("label[for='checkbox_3']").html("Minor (<18 years)")
    $("label[for='checkbox_4']").html("Unknown")

    $("#checkbox_6").hide();
    $("#checkbox_7").hide();
    $("label[for='checkbox_6']").hide()
    $("label[for='checkbox_7']").hide()
  }
}

function toggle_arrest_display() {
  if ($("#subsubcategory_dropdown").val() == "Sex") {
    breakdown_name.innerText = "Sex:";
    $("#race").hide();
    $("#ethnicity").hide();
    $("label[for='checkbox_1']").html("Female")
    $("label[for='checkbox_2']").html("Male")
    $("label[for='checkbox_3']").html("Total")
    $("#checkbox_1").prop("checked", false);
    $("#checkbox_2").prop("checked", false);
    $("#checkbox_3").prop("checked", true);
    $("#checkbox_4").prop("checked", false);
    $("#checkbox_5").prop("checked", false);
  } else if ($("#subsubcategory_dropdown").val() == "Race") {
    breakdown_name.innerText = "Race:";
    $("#race").show();
    $("#ethnicity").hide();

    $("label[for='checkbox_1']").html("American Indian")
    $("label[for='checkbox_2']").html("Asian")
    $("label[for='checkbox_3']").html("Black")

    $("#checkbox_1").prop("checked", false);
    $("#checkbox_2").prop("checked", false);
    $("#checkbox_3").prop("checked", false);
    $("#checkbox_4").prop("checked", false);
    $("#checkbox_5").prop("checked", true);
  } else if ($("#subsubcategory_dropdown").val() == "Ethnicity") {
    breakdown_name.innerText = "Ethnicity:";
    $("#race").hide();
    $("#sex").hide();
    $("label[for='checkbox_1']").html("Hispanic")
    $("label[for='checkbox_2']").html("Non-Hispanic")
    $("label[for='checkbox_3']").html("Total")

    $("#checkbox_1").prop("checked", false);
    $("#checkbox_2").prop("checked", false);
    $("#checkbox_3").prop("checked", true);
  }
}

function countToRate(data, type, per_officer = false) {

  per_officer = $("#checkbox_4").is(':checked');
  data_keys = _.keys(data);
  population_column = "population";
  if (per_officer && type == "police") {
    population_column = "total_employees_officers";
  }

  if (type == "arrests" && $("#percent_of_all_arrests").is(':checked')) {
    population_column = "all_arrests_total_tot_arrests";
  }
  if (type == "arrests" && $("#percent_of_arrests").is(':checked')) {
    population_column = $("#crime_dropdown").val() + "_tot_" + $("#subcategory_dropdown").val();
    if ($("#subcategory_dropdown").val() == "tot") {
      population_column = $("#crime_dropdown").val() + "_tot_arrests";
    }
  }

  if (type == "nibrs" && $("#percent_of_crimes").is(':checked')) {
    population_column = data[$("#category_dropdown").val() + "_" + $("#crime_dropdown").val()]
  }
  for (var i = 0; i < data_keys.length; i++) {
    if (!["agency", "year", "state", "population", "ORI", "school_name", "school_unique_ID", "number_of_students"].includes(data_keys[i]) && !data_keys[i].startsWith("population_")) {

 if (type == "arrests" && $("#percent_of_arrests").is(':checked')) {
        rate_val = data[data_keys[i]] / data[population_column] * 100;
      } else if (type == "arrests" && $("#percent_of_all_arrests").is(':checked')) {
        rate_val = data[data_keys[i]] / data[population_column] * 100;
      } else if (type == "nibrs" && $("#percent_of_crimes").is(':checked')) {
        rate_val = data[data_keys[i]] / population_column * 100;
      } else {
        rate_val = data[data_keys[i]] / data[population_column];
        if (type != "school" && population_column !== "total_employees_officers") {
          rate_val = rate_val * 100000;
        }
      }

      rate_val = parseFloat(rate_val).toFixed(2); // Rounds to 2 decimals
      if (!isFinite(rate_val) | data[data_keys[i]] == "") {
        rate_val = NaN;
      }
      data[data_keys[i]] = rate_val;
      rate_type = get_rate_type(type);

      new_key = data_keys[i] + rate_type;
      Object.defineProperty(data, new_key,
        Object.getOwnPropertyDescriptor(data, data_keys[i]));
      delete data[data_keys[i]];
    }
  }
  return data;
}


function makeCrimeClearanceRates(data) {
  data_keys = _.keys(data);
  clearance_starters = ["tot_clr", "clr_18"];

  crime_column = data_keys.filter(function(element) {
    return element.includes("actual");
  });

  for (var i = 0; i < crime_column.length; i++) {
    for (var n = 0; n < clearance_starters.length; n++) {
      rate_val = data[crime_column[i].replace("actual", clearance_starters[n])] / data[crime_column[i]];
      rate_val = parseFloat(rate_val).toFixed(2); // Rounds to 2 decimals

      if (!isFinite(rate_val)) {
        rate_val = NaN;
      }
      data[crime_column[i].replace("actual", clearance_starters[n])] = rate_val * 100;
      rate_type = "_clearance_rate";

      new_key = crime_column[i].replace("actual", clearance_starters[n]) + rate_type;
      new_key = new_key.replace("_rate_clearance", "_clearance");
      Object.defineProperty(data, new_key,
        Object.getOwnPropertyDescriptor(data, crime_column[i].replace("actual", clearance_starters[n])));
      delete data[crime_column[i].replace("actual", clearance_starters[n])];

    }
  }
  return data;
}


function getStateAgencies(type, states = state_values, largest_agencies = false) {
  url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper/master/data/";
  if (type == "nibrs") {
    url = "https://raw.githubusercontent.com/jacobkap/crimedatatool_helper_nibrs/master/data/";
  }
  if ($("#monthly").is(':checked')) {
    type += "_monthly";
  }

  url += type + "/";
    final_url = url + states[$("#state_dropdown").val()] + "_agency_choices.json";

  if (largest_agencies) {
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


function makeDataSourceDropdown() {
  page_temp = window.location.pathname

  $("#data_source").empty();
  _.each(data_sources, function(val, text) {
    $("#data_source").append(new Option(val, text));
  });

  if (page_temp == "/arrest.html" || page_temp == "/E:/Dropbox/crimedatatool/arrest.html") {
      current_page = 0
  }
  if (page_temp == "/hate.html" || page_temp == "/E:/Dropbox/crimedatatool/hate.html") {
      current_page = 1
  }
  if (page_temp == "/police.html" || page_temp == "/E:/Dropbox/crimedatatool/police.html") {
      current_page = 2
  }
  if (page_temp == "/nibrs.html" || page_temp == "/E:/Dropbox/crimedatatool/nibrs.html") {
    current_page = 3
  }


  if (page_temp == "/index.html" || page_temp == "/" || page_temp == "/E:/Dropbox/crimedatatool/" || page_temp == "/E:/Dropbox/crimedatatool/index.html") {
    current_page = 4
  }
    $("#data_source").val(current_page)
}

function updateDataSource() {


  if (data_sources[$("#data_source").val()] == "Offenses Known and Clearances by Arrest") {
    new_url_path = "https://crimedatatool.com/"
  }
  if (data_sources[$("#data_source").val()] == "Hate Crime Statistics") {
    new_url_path = "https://crimedatatool.com/hate.html"
  }
  if (data_sources[$("#data_source").val()] == "Arrests by Age, Sex, and Race") {
      new_url_path = "https://crimedatatool.com/arrest.html"
  }
  if (data_sources[$("#data_source").val()] == "Law Enforcement Officers Killed and Assaulted (LEOKA)") {
    new_url_path = "https://crimedatatool.com/police.html"
  }
  if (data_sources[$("#data_source").val()] == "National Incident-Based Reporting System (NIBRS)") {
    new_url_path = "https://crimedatatool.com/nibrs.html"
  }

current_page = data_sources[$("#data_source").val()]
  page_temp = window.location.pathname
  if (current_page == "Offenses Known and Clearances by Arrest" & !["/index.html", "/"].includes(page_temp)) {
    window.location.href = new_url_path;
  }
  if (current_page == "Hate Crime Statistics" & page_temp != "/hate.html") {
    window.location.href = new_url_path;
  }
  if (current_page == "Arrests by Age, Sex, and Race" & page_temp != "/arrest.html") {
    window.location.href = new_url_path;
  }
  if (current_page == "Law Enforcement Officers Killed and Assaulted (LEOKA)" & page_temp != "/police.html") {
    window.location.href = new_url_path;
  }
  if (current_page == "National Incident-Based Reporting System (NIBRS)" & page_temp != "/nibrs.html") {
    window.location.href = new_url_path;
  }
   makeDataSourceDropdown()
}


function updateAgencies(type, states) {
  agencies = getStateAgencies(type, states);
  agencies.sort();
  $("#agency_dropdown").empty();
  _.each(agencies, function(val, text) {
    $("#agency_dropdown").append(new Option(val, text));
  });
  largest_agency_temp = states[$("#state_dropdown").val()];
  largest_agency_temp = _.filter(largest_agency, function(x) {
    return x.state == largest_agency_temp;
  });
  largest_agency_temp = largest_agency_temp[0].agency;
  largest_agency_temp = _.indexOf(agencies, largest_agency_temp);
  $("#agency_dropdown").val(largest_agency_temp);
  return agencies;
}



function main(type, states, state_default, crimes, crime_starter) {

  state_default = Math.floor(Math.random()*states.length)
  makeDataSourceDropdown()
  ctx = document.getElementById("graph").getContext('2d');
  make_dropdown('#state_dropdown', states, state_default)
  if (type == "arrests") {
    make_dropdown("#subcategory_dropdown", arrest_age_categories, "tot")
    make_dropdown("#subsubcategory_dropdown", arrests_breakdown, "Race")
    toggle_arrest_display();
  }
  if (type == "nibrs") {
    make_dropdown('#category_dropdown', nibrs_categories, "offense")
    make_dropdown("#subcategory_dropdown", nibrs_subcategories[$('#category_dropdown').val()], nibrs_starts[$('#category_dropdown').val()])
    toggle_nibrs_display()
  }
            console.time()
    make_dropdown("#crime_dropdown", crimes, crime_starter);
    largest_agency = getStateAgencies(type, states, true);
        console.timeLog()

      agencies = updateAgencies(type, states);
  if (type == "police") {
    make_dropdown('#subcategory_dropdown', police_subcategories[$('#crime_dropdown').val()], police_categories_starts[$('#crime_dropdown').val()], '#crime_dropdown');
    make_dropdown("#subsubcategory_dropdown", police_weapons, "total_assaults");
    toggle_display("#weaponsDiv", ["officers_assaulted"]);
    $("#policeSex").show();
  }


//  if (window.location.hash == "") {
//    change_url(type)
  //} else {
  //  change_data_from_url(type);
  //}

  main_results = get_data(type, states);
    console.time()
  table_data = main_results[0];
  graph_headers = main_results[1];
  table_headers = main_results[2];
  all_data = main_results[3];
    console.timeLog()
    console.time()
  graph = makeGraph(type, crimes);
  table = makeTable(type);
    console.timeLog()
  makeDataSourceDropdown()
}
