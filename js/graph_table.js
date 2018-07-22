function allowSaveGraph() {
  var url = myLine.toBase64Image();
}



function getGraphDataset(tableData, colsForGraph, type) {
  data = _.map(tableData, function(currentObject) {
    return _.pick(currentObject, colsForGraph);
  });
  if (type == "offenses") {
    years = [];
    data1 = [];
    data2 = [];
    data3 = [];
    data4 = [];

    for (var i = 0; i < data.length; i++) {
      years.push(data[i][colsForGraph[0]]);
      data1.push(data[i][colsForGraph[1]]);
      data2.push(data[i][colsForGraph[2]]);
      data3.push(data[i][colsForGraph[3]]);
      data4.push(data[i][colsForGraph[4]]);
    }

    final_data = [
      makeGraphObjects(data1, "#ca0020", "Actual Offenses"),
      makeGraphObjects(data2, "#0571b0", "Total Offenses Cleared"),
      makeGraphObjects(data3, "#7b3294", "Offenses Cleared Involving Only Persons Under age 18"),
      makeGraphObjects(data4, "#008837", "Unfounded Offenses")
    ];
    final_data[0].hidden = false;
    final_data[1].hidden = false;
    final_data[2].hidden = false;
    final_data[3].hidden = false;


    if (!$("#actual").is(':checked')) {
      final_data = _.filter(final_data, function(x) {
        return x.label != "Actual Offenses";
      });
    }
    if (!$("#clearance").is(':checked')) {
      final_data = _.filter(final_data, function(x) {
        return x.label != "Total Offenses Cleared";
      });
    }
    if (!$("#clearance_under18").is(':checked')) {
      final_data = _.filter(final_data, function(x) {
        return x.label != "Offenses Cleared Involving Only Persons Under age 18";
      });
    }
    if (!$("#unfounded").is(':checked')) {
      final_data = _.filter(final_data, function(x) {
        return x.label != "Unfounded Offenses";
      });
    }

  } else {
    years = [];
    data1 = [];

    for (var n = 0; n < data.length; n++) {
      years.push(data[n][colsForGraph[0]]);
      data1.push(data[n][colsForGraph[1]]);
    }

    final_data = [makeGraphObjects(data1, "#ca0020", colsForGraph[1])];
    final_data[0].hidden = false;
  }
  return final_data;

}

function makeGraphObjects(data, color, label) {
  obj = {
    borderColor: color,
    fill: false,
    label: label,
    data: data,
    onAnimationComplete: allowSaveGraph,
    hidden: true,
    radius: 0 // Removes dots
  };
  return obj;
}

function makeGraph(data, graph_div, colsForGraph, type) {
  title = getTitle(data, type);

  if (type == "offenses") {
    yaxis_label = '# of Crimes';
    legend_display = true;
  } else if (type == "arrests") {
    yaxis_label = "# of Arrests";
    legend_display = false;
  } else if (type == "leoka") {
    yaxis_label = "# of People";
    if (colsForGraph[1].includes("killed")) {
      yaxis_label = "# of Officer Deaths";
    } else if (colsForGraph[1].includes("assault")) {
      yaxis_label = "# of Assaults";
    }
    legend_display = false;
  }

  graph_datasets = getGraphDataset(data, colsForGraph, type);

  myLineChart = new Chart(graph_div, {
    type: 'line',
    data: {
      labels: years,
      datasets: graph_datasets
    },
    options: {
      legend: {
        display: legend_display
      },
      title: {
        display: true,
        position: 'top',
        text: title,
        fontSize: 22,
        fontColor: "black"
      },
      scales: {
        xAxes: [{
          ticks: {
            maxRotation: 0,
            minRotation: 0,
            autoSkip: true,
            maxTicksLimit: 10,
            fontSize: 14
          },
          scaleLabel: {
            fontSize: 22,
            fontColor: "#000000",
            display: true,
            labelString: "Year"
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            userCallback: function(value, index, values) {
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return value;
            },
            fontSize: 14
          },
          scaleLabel: {
            fontSize: 22,
            fontColor: "#000000",
            display: true,
            labelString: yaxis_label
          }
        }]
      },
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(tooltipItems, data) {
            value = tooltipItems.yLabel;
            value = value.toString();
            value = value.split(/(?=(?:...)*$)/);
            value = value.join(',');
            return value;
          }
        }
      },
      hover: {
        mode: 'nearest',
        intersect: true
      }
    }
  });
  return (myLineChart);
}

function getTitle(data, type) {
  title = data[0].agency + ', ';
  title += data[0].state + ': ';
  if (type == "offenses") {
    title += crime_values[$("#crime_dropdown").val()];
  } else if (type == "arrests") {
    title += arrest_values[$("#arrests_crime_dropdown").val()];
    title += ", " + arrest_categories[$("#arrests_category_dropdown").val()];
  } else if (type == "leoka") {
    title += leoka_values[$("#leoka_category_dropdown").val()];
  }

  if ($("#rate").is(':checked')) {
    title += " Rate";
  }
  return title;
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

  data_keys = _.keys(data[0]);
  data_keys = data_keys.filter(function(a){
    return a !== 'agency' && a !== 'year' &&
           a !== 'state'  && a !== 'ORI';
  });
  for (var m = 0; m < data.length; m++) {
    for (n = 0; n < data_keys.length; n++) {
      data[m][data_keys[n]] = parseFloat(data[m][data_keys[n]]).toLocaleString();
    }
  }

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
    "lengthChange": false,
    "paging": false,
    "searching": false,
    "pageLength": 100,
    "ordering": true,
    "order": [1, "desc"],
    "fixedHeader": true,
    fixedColumns: {
      leftColumns: 2
    }
  });
  return temp_table;
}

function formatNumber(n) {
  return n.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
