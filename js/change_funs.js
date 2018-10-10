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

  $('#graph').remove();
  $('.main').prepend('<canvas id="graph" style="width:95%;height:500px;"></canvas>');
  ctx_results = document.getElementById("graph").getContext('2d');
  offenses_graph = makeGraph(table_data, ctx_results, graph_headers, "offenses");
  table.destroy();
  table = makeTable("#table", table_data, table_headers, "offenses");
  crimeBoxesUpdate();
  change_url();
}

function offenses_crimeChangeFun() {
  offenses_agencyChangeFun();
}

function arrests_agencyChangeFun() {
  main_results = main("arrests", "#arrests_state_dropdown", "#arrests_crime_dropdown");
  arrests_table_data = main_results[0];
  arrests_graph_headers = main_results[1];
  arrests_table_headers = main_results[2];

  $('#arrests_graph').remove();
  $('.main').prepend('<canvas id="arrests_graph" style="width:95%;height:500px;"></canvas>');
  ctx_arrests = document.getElementById("arrests_graph").getContext('2d');
  arrests_graph = makeGraph(arrests_table_data, ctx_arrests, arrests_graph_headers, "arrests");
  arrests_table.destroy();
  arrests_table = makeTable("#arrests_table", arrests_table_data, arrests_table_headers, "arrests");
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

  $('#leoka_graph').remove();
  $('.main').prepend('<canvas id="leoka_graph" style="width:95%;height:500px;"></canvas>');
  ctx_leoka = document.getElementById("leoka_graph").getContext('2d');
  leoka_graph = makeGraph(leoka_table_data, ctx_leoka, leoka_graph_headers, "leoka");
  arrests_table.destroy();
  arrests_table = makeTable("#leoka_table", leoka_table_data, leoka_table_headers, "leoka");
}

function leoka_stateChangeFun() {
  leoka_agencies = updateAgencies("leoka", leoka_largest_agency, "#leoka_agency_dropdown", "#leoka_state_dropdown");
  leoka_agencyChangeFun();
}

function leoka_categoryChangeFun() {
  leoka_agencyChangeFun();
}
