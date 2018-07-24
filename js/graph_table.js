function allowSaveGraph() {
  var url = myLine.toBase64Image();
}



function getGraphDataset(tableData, colsForGraph, type) {
  if (checkIfRateChecked(type)) {
    colsForGraph = _.map(colsForGraph, function(x) {
      return x + "_rate";
    });
    colsForGraph[0] = "year";
  }

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
    if (checkIfRateChecked(type)) {
      yaxis_label = 'Rate per 100,000 Population';
    }
    legend_display = true;
  } else if (type == "arrests") {
    yaxis_label = "# of Arrests";
    if (checkIfRateChecked(type)) {
      yaxis_label = 'Rate per 100,000 Population';
    }
    legend_display = false;
  } else if (type == "leoka") {
    yaxis_label = "# of People";
    if (colsForGraph[1].includes("killed")) {
      yaxis_label = "# of Officer Deaths";
    } else if (colsForGraph[1].includes("assault")) {
      yaxis_label = "# of Assaults";
    }
    if (checkIfRateChecked(type)) {
      yaxis_label = 'Rate per 100,000 Population';
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

  if (checkIfRateChecked(type)) {
    title += " Rate";
  }
  return title;
}

function fixTableName(name, type) {
    temp_name = name;
//    console.log(name);
    name = name.replace(/_rate/g, "");
  if (type == "offenses") {
    temp1 = name.replace(/act_.*/, "Actual ");
    temp2 = name.replace(/clr_18_.*/, "Clearance Under Age 18 ");
    temp3 = name.replace(/clr_[a-z].*/, "Clearance ");
    temp4 = name.replace(/unfound_.*/, "Unfounded ");
    name = name.replace(/act_|clr_18_|clr_|unfound_/, "");
    name = crime_values[name];
    if (temp1 != temp_name) name = temp1 + name;
    if (temp2 != temp_name) name = temp2 + name;
    if (temp3 != temp_name) name = temp3 + name;
    if (temp4 != temp_name) name = temp4 + name;
  } else if (type == "arrests") {
    tot_section = name.replace(/.*_tot/g, "tot");
    name = name.replace(/_tot.*/g, "");
    name = arrest_values[name];
    tot_section = arrest_categories[tot_section];
    if (tot_section !== undefined) name = name + " " + tot_section;
  } else if (type == "leoka") {
    name = leoka_values[name];
  }

if (name === undefined) {
  name = temp_name.replace(/^\w/, c => c.toUpperCase());
}

  if (checkIfRateChecked(type) &&
    !name.includes("Agency") &&
    !name.includes("Year") &&
    !name.includes("State") &&
    !name.includes("Population") &&
    !name.includes("ORI")) {
    name += " Rate";
  }
  return name;
}

function fixTableDataName(name, type) {
  if (!name.includes("agency") &&
    !name.includes("year") &&
    !name.includes("state") &&
    !name.includes("population") &&
    !name.includes("ORI")) {
    if (checkIfRateChecked(type)) {
      name += "_rate";
    }
  }
  return name;
}

function makeTable(div, data, headers, type) {
  data = subsetColumns(data, headers, "table", type);

  data_keys = _.keys(data[0]);
  data_keys = data_keys.filter(function(a) {
    return a !== 'agency' && a !== 'year' &&
      a !== 'state' && a !== 'ORI';
  });
  for (var m = 0; m < data.length; m++) {
    for (n = 0; n < data_keys.length; n++) {
      data[m][data_keys[n]] = parseFloat(data[m][data_keys[n]]).toLocaleString();
    }
  }

  z = [];

  for (var i = 0; i < headers.length; i++) {
    label_name = fixTableName(headers[i], type);
    data_name = fixTableDataName(headers[i], type);
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
