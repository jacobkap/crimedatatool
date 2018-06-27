function rateChangeFun() {
  offenses_agencyChangeFun("graph");
}

function offenses_stateChangeFun() {
  offense_agencies = updateAgencies("crime", offenses_largest_agency, "#agency_dropdown", state_dropdown);
  offenses_agencyChangeFun("graph");
}

function offenses_agencyChangeFun(graph_div) {
  main_results = main("offenses", "#state_dropdown", "#crime_dropdown");
  table_data = main_results[0];
  offenses_graph_data = main_results[1];
  offenses_headers = main_results[2];
  table_headers = main_results[3];
  offenses_graph = updateGraph('graph', table_data, offenses_headers, "offenses");
  table.destroy();
  table = makeTable("#table", table_data, table_headers);
}

function offenses_crimeChangeFun() {
  offenses_agencyChangeFun("graph");
}

function arrests_agencyChangeFun() {
  arrests_main_results = main("arrest", "#arrests_state_dropdown", "#arrests_crime_dropdown");
  arrests_table_data = arrests_main_results[0];
  arrests_graph_data = arrests_main_results[1];
  arrests_headers = arrests_main_results[2];
  arrest_table_headers = arrests_main_results[3];
  arrests_graph = updateGraph('arrests_graph', arrests_table_data, arrests_headers, "arrest");
  arrests_table.destroy();
  arrests_table = makeTable("#arrests_table", arrests_table_data, arrest_table_headers);
}

function arrests_categoryChangeFun() {
  arrests_agencyChangeFun();
}

function arrests_stateChangeFun() {
  arrest_agencies = updateAgencies("arrest", arrests_largest_agency, "#arrests_agency_dropdown", "#arrests_state_dropdown");
  arrests_agencyChangeFun("arrests_graph");
}

function arrests_crimeChangeFun() {
  arrests_agencyChangeFun("arrests_graph");
}


function leoka_agencyChangeFun() {
  main_results = main("leoka",
    "#leoka_state_dropdown",
    "#leoka_state_dropdown");
  leoka_table_data = main_results[0];
  leoka_graph_data = main_results[1];
  leoka_headers = main_results[2];
  leoka_table_headers = main_results[3];
  ylab = '# of ';
  visibilityVector = [true];
  title = "";
  leoka_graph = updateGraph("leoka_graph", leoka_table_data, leoka_headers, "leoka");
  arrests_table.destroy();
  arrests_table = makeTable("#leoka_table", leoka_table_data, leoka_table_headers);
}

function leoka_stateChangeFun() {
  leoka_agencies = updateAgencies("leoka", leoka_largest_agency, "#leoka_agency_dropdown", "#leoka_state_dropdown");
  leoka_agencyChangeFun("leoka_graph");
}

function leoka_categoryChangeFun() {
  leoka_agencyChangeFun("leoka_graph");
}
