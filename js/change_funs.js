function crimeBoxesUpdate() {
  if (!$("#actual").is(':checked') &&
    !$("#clearance").is(':checked') &&
    !$("#clearance_under18").is(':checked') &&
    !$("#unfounded").is(':checked')) {
    $("#actual").prop("checked", true);
  }

  $('#graph').remove();
  $('.main').prepend('<canvas id="graph" style="width:95%;height:500px;"></canvas>');
  ctx_results = document.getElementById("graph").getContext('2d');
  offenses_graph = makeGraph(table_data, ctx_results, graph_headers, "offenses");
}

function rateChangeFun(type) {
  if (type == "offenses") {
    offenses_agencyChangeFun();
  } else if (type == "arrests") {
    arrests_agencyChangeFun();
  } else if (type == "leoka") {
    leoka_agencyChangeFun();
  }
}

function leokoRateBoxesPop() {
    $("#leoka_rate_per_officer").prop("checked", false);
    rateChangeFun("leoka");
}
function leokoRateBoxesOfficer() {
    $("#leoka_rate").prop("checked", false);
    rateChangeFun("leoka");
}

function offenses_stateChangeFun() {
  offense_agencies = updateAgencies("crime", offenses_largest_agency, "#agency_dropdown", state_dropdown, "offenses");
  offenses_agencyChangeFun();
}

function offenses_agencyChangeFun() {
  main_results = main("offenses", "#state_dropdown", "#crime_dropdown");
  table_data = main_results[0];
  graph_headers = main_results[1];
  table_headers = main_results[2];
  crime_all_data = main_results[3];

  $('#graph').remove();
  $('.main').prepend('<canvas id="graph" style="width:95%;height:500px;"></canvas>');
  ctx_results = document.getElementById("graph").getContext('2d');
  offenses_graph = makeGraph(table_data, ctx_results, graph_headers, "offenses");
  table.destroy();
  table = makeTable("#table", table_data, table_headers, "offenses");
  crimeBoxesUpdate();
  change_url("#state_dropdown", "#agency_dropdown", "#crime_dropdown", "#offenses_rate", offense_agencies, crime_values);
}

function offenses_crimeChangeFun() {
  offenses_agencyChangeFun();
}

function arrests_agencyChangeFun() {
  main_results = main("arrests", "#arrests_state_dropdown", "#arrests_crime_dropdown");
  arrests_table_data = main_results[0];
  arrests_graph_headers = main_results[1];
  arrests_table_headers = main_results[2];
  arrests_all_data = main_results[3];

  $('#arrests_graph').remove();
  $('.main').prepend('<canvas id="arrests_graph" style="width:95%;height:500px;"></canvas>');
  ctx_arrests = document.getElementById("arrests_graph").getContext('2d');
  arrests_graph = makeGraph(arrests_table_data, ctx_arrests, arrests_graph_headers, "arrests");
  arrests_table.destroy();
  arrests_table = makeTable("#arrests_table", arrests_table_data, arrests_table_headers, "arrests");
  change_url("#arrests_state_dropdown", "#arrests_agency_dropdown", "#arrests_crime_dropdown", "#arrests_rate", arrest_agencies, arrest_values);
}

function arrests_categoryChangeFun() {
  arrests_agencyChangeFun();
}

function arrests_stateChangeFun() {
  arrest_agencies = updateAgencies("arrests", arrests_largest_agency, "#arrests_agency_dropdown", "#arrests_state_dropdown");
  arrests_agencyChangeFun();
}

function arrests_crimeChangeFun() {
  arrests_agencyChangeFun();
}


function leoka_agencyChangeFun() {
  main_results = main("leoka", "#leoka_state_dropdown", "#leoka_crime_dropdown");
  leoka_table_data = main_results[0];
  leoka_graph_headers = main_results[1];
  leoka_table_headers = main_results[2];
  leoka_all_data = main_results[3];

  $('#leoka_graph').remove();
  $('.main').prepend('<canvas id="leoka_graph" style="width:95%;height:500px;"></canvas>');
  ctx_leoka = document.getElementById("leoka_graph").getContext('2d');
  leoka_graph = makeGraph(leoka_table_data, ctx_leoka, leoka_graph_headers, "leoka");
  leoka_table.destroy();
  $('#leoka_table').empty();
  leoka_table = makeTable("#leoka_table", leoka_table_data, leoka_table_headers, "leoka");

//  change_url("#leoka_state_dropdown", "#leoka_agency_dropdown", "#leoka_category_dropdown", "#leoka_rate", leoka_agencies, leoka_values);
} //

function leoka_stateChangeFun() {
  leoka_agencies = updateAgencies("leoka", leoka_largest_agency, "#leoka_agency_dropdown", "#leoka_state_dropdown");
  leoka_agencyChangeFun();
}

function leoka_categoryChangeFun() {
  leoka_subcatergory_keys = makeLeokaSubcategoriesDropdown();
  leoka_subcatergory_values = leoka_subcatergory_keys[1];
  leoka_subcatergory_keys = leoka_subcatergory_keys[0];
  $('.simple-select').trigger('chosen:updated');
  toggle_leoka_weapon_display();
  toggle_leoka_employee_sex_display();
  leoka_agencyChangeFun();
}

function policeSexBoxesUpdate() {
  if (!$("#police_female_sex").is(':checked') &&
    !$("#police_male_sex").is(':checked') &&
    !$("#police_total_sex").is(':checked')) {
    $("#police_total_sex").prop("checked", true);
  }

  $('#leoka_graph').remove();
  $('.main').prepend('<canvas id="leoka_graph" style="width:95%;height:500px;"></canvas>');
  ctx_leoka = document.getElementById("leoka_graph").getContext('2d');
  leoka_graph = makeGraph(leoka_table_data, ctx_leoka, leoka_graph_headers, "leoka");
}


function prisonerCategoryChange() {
  prisoner_subcatergory_keys = makePrisonerSubcategoriesDropdown();
  prisonerSubcategoryChange();
  $('.simple-select').trigger('chosen:updated');
}

function prisonerSubcategoryChange() {
  main_results = main("prisoners");
  prisoners_table_data = main_results[0];
  prisoners_graph_headers = main_results[1];
  prisoners_table_headers = main_results[2];
  prisoner_all_data = main_results[3];
  prisoners_graph_headers = prisoners_table_headers;
        prisoners_graph_headers = prisoners_table_headers.slice(1, 6);

  $('#prisoners_graph').remove();
  $('.main').prepend('<canvas id="prisoners_graph" style="width:95%;height:500px;"></canvas>');
  ctx_prisoners = document.getElementById("prisoners_graph").getContext('2d');
  prisoners_graph = makeGraph(prisoners_table_data, ctx_prisoners, prisoners_graph_headers, "prisoners");

  prisoners_table.destroy();
  prisoners_table = makeTable("#prisoners_table", prisoners_table_data, prisoners_table_headers, "prisoners");
}

function prisonerSexChange() {
  prisoners_graph_headers = getCrimeColumns(headers, "prisoners", "graph");

  $('#prisoners_graph').remove();
  $('.main').prepend('<canvas id="prisoners_graph" style="width:95%;height:500px;"></canvas>');
  ctx_prisoners = document.getElementById("prisoners_graph").getContext('2d');
  prisoners_graph = makeGraph(prisoners_table_data, ctx_prisoners, prisoners_graph_headers, "prisoners");
}

function prisonerBoxesUpdate() {
  if (!$("#prisoners_female_sex").is(':checked') &&
    !$("#prisoners_male_sex").is(':checked') &&
    !$("#prisoners_total_sex").is(':checked')) {
    $("#prisoners_total_sex").prop("checked", true);
  }

  $('#prisoners_graph').remove();
  $('.main').prepend('<canvas id="prisoners_graph" style="width:95%;height:500px;"></canvas>');
  ctx_prisoners = document.getElementById("prisoners_graph").getContext('2d');
  prisoners_graph = makeGraph(prisoners_table_data, ctx_prisoners, prisoners_graph_headers, "prisoners");
}



function prisonerJurisdictionChange() {
  prisonerSubcategoryChange();
}
