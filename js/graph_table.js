function getTitle(data, type) {
  title = data[0].agency + ', ';
  title += data[0].state + ': ';
  if (type == "offenses") {
    title += crime_values[$("#crime_dropdown").val()];
  } else if (type == "arrest") {
    title += arrest_values[$("#arrests_crime_dropdown").val()];
    title += " " + arrest_categories[$("#arrests_category_dropdown").val()];
  } else if (type == "leoka") {
    title += leoka_values[$("#leoka_category_dropdown").val()];
  }

  if ($("#rate").is(':checked')) {
    title += " Rate";
  }
  return title;
}

function updateGraph(div, agencyData, headers, type) {
  colsForGraph = getCrimeColumns(headers, type, "graph");

  graphData = subsetColumns(agencyData, colsForGraph, "graph");
  title = getTitle(agencyData, type);

  var ylab = '# of Crimes';
  if (type == "arrests") ylab = "# of Arrests";
  if ($("#rate").is(':checked')) {
    ylab = 'Rate per 100,000 People';
  }

  graphData = graphData.replace(/clr_18.*,/, "Clearance Under Age 18,");
  graphData = graphData.replace(/act.*,clr/, "Actual,clr");
  graphData = graphData.replace(/clr_.*,Clear/, "Clearance,Clear");
  graphData = graphData.replace(/unfound.*\n/, "Unfounded\n");

  visibilityVector = [true, false, false, false];

  if (type == "offenses") {
    visibilityVector = [];
    visibilityVector.push($("#actual").is(':checked'));
    visibilityVector.push($("#clearance").is(':checked'));
    visibilityVector.push($("#clearance_under18").is(':checked'));
    visibilityVector.push($("#unfounded").is(':checked'));
  }

  if (type == "leoka") {
    ylab = "";
  }


  temp_graph = makeGraph(div, graphData, ylab, visibilityVector, title);
  return temp_graph;
}

function updateGraphVisibility(graph) {
  visibilityVector = [];
  visibilityVector.push($("#actual").is(':checked'));
  visibilityVector.push($("#clearance").is(':checked'));
  visibilityVector.push($("#clearance_under18").is(':checked'));
  visibilityVector.push($("#unfounded").is(':checked'));

  graph.updateOptions({
    visibility: visibilityVector
  });
}


function makeGraph(div, data, ylab, visibilityVector, title) {
  new_graph = new Dygraph(document.getElementById(div),
    data, {
      title: title,
      drawGrid: true,
      independentTicks: true,
      labelsSeparateLines: true,
      legend: 'always',
      ylabel: ylab,
      includeZero: true,
      xlabel: ' Year',
      visibility: visibilityVector,
      interactionModel: {},
      colors: ['#d7191c', '#7b3294', '#008837', '#0571b0'],
      strokeWidth: 1.3 // Width of lines
    });
  return (new_graph);
}

function fixTableName(name, type) {
  crime_match = name.replace(/act_|clr_18_|clr_|unfound_/, "");
  if (!crime_match.includes("officer") && crime_match == name) {
    name = name.replace(/_/g, " ");
    name = name.replace(/^\w/, c => c.toUpperCase());
    return name;
  }
  crime_match_regex = new RegExp(crime_match);
  name = name.replace(/act_/, "Actual ");
  name = name.replace(/clr_18_/, "Clearance Under Age 18 ");
  name = name.replace(/clr_/, "Clearance ");
  name = name.replace(/unfound_/, "Unfounded ");
  if (type == "offenses") {
    //offenses_data_names = _.keys(crime_values);
  //  offenses_value_names = _.values(crime_values);
  //  name = offenses_value_names[_.indexOf(offenses_value_names, name)];

    name = name.replace(crime_match_regex, crime_values[crime_match]);
  } else if (type == "arrests") {
    real_name = name;
    name = name.replace(/ tot.*/g, "");
    arrests_data_names = _.keys(arrest_values);
    arrests_value_names = _.values(arrest_values);
    name = arrests_value_names[_.indexOf(arrests_value_names, name)];
  } else if (type == "leoka") {
    leoka_data_names = _.keys(leoka_values);
    leoka_value_names = _.values(leoka_values);
    name = leoka_value_names[_.indexOf(leoka_data_names, name)];
  }

  if ($("#rate").is(':checked')) {
    name += " Rate";
  }
  return name;
}

function fixTableDataName(name) {
  crime_match = name.replace(/act_|clr_18_|clr_|unfound_/, "");
  if (crime_match != name || crime_match.includes("officer")) {
    if ($("#rate").is(':checked')) {
      name += "_rate";
    }
  }
  return name;
}

function makeTable(div, data, headers, type) {
  data = subsetColumns(data, headers, "table");

  z = [];

  for (var i = 0; i < headers.length; i++) {
    label_name = fixTableName(headers[i], type);
    data_name = fixTableDataName(headers[i]);
    z.push({
      data: data_name,
      title: label_name,
      className: "dt-head-left dt-body-right"
    });
  }
  temp_table = $(div).DataTable({
    data: data,
    columns: z,
    "scrollX": true,
    "sScrollXInner": "100%",
    "sScrollX": "100%",
    "stripe": true,
    "hover": true,
    "ordering": true,
    "order": [1, "desc"],
    fixedColumns: {
      leftColumns: 2
    }

  });
  return temp_table;
}
