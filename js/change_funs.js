function crimeBoxesUpdate() {

  offenses_graph.data.datasets[0].hidden = !$("#actual").is(':checked');
  offenses_graph.data.datasets[1].hidden = !$("#clearance").is(':checked');
  offenses_graph.data.datasets[2].hidden = !$("#clearance_under18").is(':checked');
  offenses_graph.data.datasets[3].hidden = !$("#unfounded").is(':checked');

  offenses_graph.update();
}

function rateChangeFun() {
  offenses_agencyChangeFun("graph");
}

function offenses_stateChangeFun() {
  offense_agencies = updateAgencies("crime", offenses_largest_agency, "#agency_dropdown", state_dropdown, "offenses");
  offenses_agencyChangeFun();
}

function offenses_agencyChangeFun(graph_div) {
  main_results = main("offenses", "#state_dropdown", "#crime_dropdown");
  table_data = main_results[0];
  graph_headers = main_results[1];
  table_headers = main_results[2];
  offenses_graph.destroy();
  offenses_graph = makeGraph(table_data, ctx_results, graph_headers);
  crimeBoxesUpdate();
  table.destroy();
  table = makeTable("#table", table_data, table_headers, "offenses");
}

function offenses_crimeChangeFun() {
  offenses_agencyChangeFun("graph");
}

function arrests_agencyChangeFun() {
  main_results = main("arrest", "#arrests_state_dropdown", "#arrests_crime_dropdown");
  arrests_table_data = main_results[0];
  arrests_graph_headers = main_results[1];
  arrests_table_headers = main_results[2];
  arrests_graph.destroy();
  arrests_graph = makeGraph(arrests_table_data, ctx_arrests, arrests_graph_headers, "arrests");
  arrests_table.destroy();
  arrests_table = makeTable("#arrests_table", arrests_table_data, arrests_table_headers, "arrests");
}

function arrests_categoryChangeFun() {
  arrests_agencyChangeFun();
}

function arrests_stateChangeFun() {
  arrest_agencies = updateAgencies("arrest", arrests_largest_agency, "#arrests_agency_dropdown", "#arrests_state_dropdown");
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

  leoka_graph.destroy();
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
