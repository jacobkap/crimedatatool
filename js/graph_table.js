function updateGraph(agencyData) {


  colsToKeep = getCrimeColumns(headers);
  if ($("#rate").is(':checked')) {
    colsToKeep = _.map(colsToKeep, function(x) {
        return x += "_rate";
    });
    colsToKeep[0] = "year";
  }
  finalData = subsetColumns(agencyData, colsToKeep);
  new_title = agencies[$("#agency_dropdown").val()] + ', ';
  new_title += state_values[$("#state_dropdown").val()] + ': ';
  new_title += crime_values[$("#crime_dropdown").val()];

  if ($("#rate").is(':checked')) {
    new_title += " Rate";
  }


  finalData = finalData.replace(/clr_18.*,/, "Clearance Under Age 18,");
  finalData = finalData.replace(/act.*,clr/, "Actual,clr");
  finalData = finalData.replace(/clr_.*,Clear/, "Clearance,Clear");
  finalData = finalData.replace(/unfound.*\n/, "Unfounded\n");


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
  table.column('1').order('desc');
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

function makeTable(data) {
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
