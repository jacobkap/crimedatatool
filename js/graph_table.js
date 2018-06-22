function updateGraph(div, agencyData, headers, type) {

  colsForGraph = getCrimeColumns(headers, type);
  if ($("#rate").is(':checked')) {
    colsForGraph = _.map(colsForGraph, function(x) {
        return x += "_rate";
    });
    colsForGraph[0] = "year";
  }
  graphData = subsetColumns(agencyData, colsForGraph);
  new_title = agencyData[0].agency + ', ';
  new_title += agencyData[0].state + ': ';
  if (type == "offenses") {
  new_title += crime_values[$("#crime_dropdown").val()];
  }
  if (type == "arrests") {
  new_title += arrest_values[$("#arrests_crime_dropdown").val()];
    new_title += " " + arrest_categories[$("#arrests_category_dropdown").val()];
  }

  if ($("#rate").is(':checked')) {
    new_title += " Rate";
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


  var ylab = '# of Crimes';
  if (type == "arrests") ylab = "# of Arrests";
  if ($("#rate").is(':checked')) {
    ylab = 'Rate per 100,000 People';
  }

  graph = makeGraph(div, graphData, ylab, visibilityVector, new_title);
  return graph;
}

function updateTable(table_name, data) {
  table_name.clear();
  table_name.rows.add(data); // Add new data
  table_name.column('1').order('desc');
  table_name.draw();
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
      xlabel: ' Year',
      visibility: visibilityVector,
      interactionModel: {},
      colors: ['#d7191c', '#7b3294', '#008837', '#0571b0'],
      strokeWidth: 1.3 // Width of lines
    });
  return (new_graph);
}

function fixTableName(name) {
  crime_match = name.replace(/act_|clr_18_|clr_|unfound_/, "");
  if (crime_match == name) {
    name = name.replace(/_/g, " ");
    name = name.replace(/^\w/, c => c.toUpperCase());
    return name;
  }
  crime_match_regex = new RegExp(crime_match);
  name = name.replace(/act_/, "Actual ");
  name = name.replace(/clr_18_/, "Clearance Under Age 18 ");
  name = name.replace(/clr_/, "Clearance ");
  name = name.replace(/unfound_/, "Unfounded ");
  name = name.replace(crime_match_regex, crime_values[crime_match]);

  if ($("#rate").is(':checked')) {
    name += " Rate";
  }
  return name;
}

function fixTableDataName(name) {
  crime_match = name.replace(/act_|clr_18_|clr_|unfound_/, "");
  if (crime_match != name) {
    if ($("#rate").is(':checked')) {
      name += "_rate";
    }
  }
  return name;
}

function makeTable(div, data, headers) {
  file_name = agencies[$("#agency_dropdown").val()] + "_" +
    state_values[$("#state_dropdown").val()];
  temp = headers.split(",");
  z = [];

  for (var i = 0; i < temp.length; i++) {
    label_name = fixTableName(temp[i]);
    data_name = fixTableDataName(temp[i]);
    z.push({
      data: data_name,
      title: label_name,
      className: "dt-head-left dt-body-right"
    });
  }
  var table = $(div).DataTable({
    data: data,
    columns: z,
    "scrollX": true,
    "sScrollX": "100%",
    "stripe": true,
    "hover": true,
    "ordering": true,
    "order": [1, "desc"],
    fixedColumns: {
      leftColumns: 2
    }

  });
  return table;
}
