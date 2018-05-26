function updateGraph(agencyData) {


  colsToKeep = getCrimeColumns(headers);
  finalData = subsetColumns(agencyData, colsToKeep);
  new_title = agencies[$("#agency_dropdown").val()] + ', ';
  new_title += state_values[$("#state_dropdown").val()] + ': ';
  new_title += crime_values[$("#crime_dropdown").val()];

  if ($("#rate").is(':checked')) {
    new_title += " Rate";
  }


  finalData = finalData.replace(/clr_18.*,/, "Clearance Under Age 18,");
  finalData = finalData.replace(/act.*,clr/, "Actual,clr");
  finalData = finalData.replace(/clr_.*,/, "Clearance,");
  finalData = finalData.replace(/unfound.*\n/, "Unfounded,\n");


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

function updateTable(data) {
  table.clear();
  table.rows.add(data); // Add new data
  table.column( '1' ).order( 'desc' );
  table.draw();

}


function makeGraph(data, ylab, visibilityVector, title) {
  var graph = new Dygraph(document.getElementById("graph"),
    data, {
      title: title,
      labelsSeparateLines: true,
      legend: 'always',
      ylabel: ylab,
      xlabel: ' Year',
      visibility: visibilityVector,
      showRangeSelector: true,
      colors: ['#d7191c', '#7b3294', '#008837', '#0571b0'],
      strokeWidth: 1.3 // Width of lines
    });
  return (graph);
}

function makeTable(data) {
  file_name = agencies[$("#agency_dropdown").val()] + "_" +
    state_values[$("#state_dropdown").val()];
  temp = headers.split(",");
  z = [];

  for (var i = 0; i < temp.length; i++) {
    name = temp[i];
    z.push({
      data: temp[i],
      title: temp[i]
    });
  }
  var table = $('#table').DataTable({
    data: data,
    columns: z,
    "scrollX": true,
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
