function allowSaveGraph() {
  var url = myLine.toBase64Image();
}



function getGraphDataset(tableData, colsForGraph, type, crimes) {

  if (type == "borderpatrol") {
    colsForGraph[0] = "fiscal_year"
  }

  rate_type = "_rate";
  if (!checkIfRateChecked(type)) {
    rate_type = "";
  }
  checkbox_names = ["Actual Offenses",
    "Total Offenses Cleared",
    "Offenses Cleared Involving Only Persons Under age 18",
    "Unfounded Offenses"
  ];
  if (type == "alcohol") {
    checkbox_names = _.values(alcohol_categories);
  }
  if (["prisoners", "leoka"].includes(type)) {
    checkbox_names = ["Female", "Male", "Total"];
  }
  if (type == "arrests") {
    checkbox_names = ["Adult", "Juvenile", "Total"];
  }
  if (type == "hate") {
    checkbox_names = ["Violent", "Nonviolent", "Total"];
  }
  if (type == "leoka" && $("#leoka_rate_per_officer").is(':checked') === true) {
    rate_type = "_rate_per_officer";
  }

  if (checkIfRateChecked(type) || (type == "crime" && $("#clearance_rate").is(":checked"))) {
    colsForGraph = _.map(colsForGraph, function(x) {
      if (type == "crime" && $("#clearance_rate").is(":checked") && x.includes("clr_")) {
        return x + "_clearance_rate";
      } else {
        return x + rate_type;
      }
    });
    colsForGraph[0] = "year";
  }

  data = _.map(tableData, function(currentObject) {
    return _.pick(currentObject, colsForGraph);
  });

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

  if (["crime", "alcohol", "prisoners", "arrests", "hate"].includes(type) || type == "leoka" &
    leoka_categories[$("#crime_dropdown").val()] == "Police Department Employees") {

    final_data = [
      makeGraphObjects(data1, "#ca0020", checkbox_names[0]),
      makeGraphObjects(data2, "#f4a582", checkbox_names[1]),
      makeGraphObjects(data3, "#92c5de", checkbox_names[2]),
      makeGraphObjects(data4, "#0571b0", checkbox_names[3])
    ];
    final_data[0].hidden = false;
    final_data[1].hidden = false;
    final_data[2].hidden = false;
    final_data[3].hidden = false;


    if (!$("#checkbox_1").is(':checked')) {
      final_data = _.filter(final_data, function(x) {
        return x.label != checkbox_names[0];
      });
    }
    if (!$("#checkbox_2").is(':checked')) {
      final_data = _.filter(final_data, function(x) {
        return x.label != checkbox_names[1];
      });
    }
    if (!$("#checkbox_3").is(':checked')) {
      final_data = _.filter(final_data, function(x) {
        return x.label != checkbox_names[2];
      });
    }
    if (!$("#checkbox_4").is(':checked')) {
      final_data = _.filter(final_data, function(x) {
        return x.label != checkbox_names[3];
      });
    }

  } else {
    years = [];
    data1 = [];

    for (var n = 0; n < data.length; n++) {
      years.push(data[n][colsForGraph[0]]);
      data1.push(data[n][colsForGraph[1]]);
    }

    label = colsForGraph[1]
    label = label.replace(/deaths_/g, "");

    if (type == "borderpatrol") {
      label = values[$("#subcategories").val()]
    } else if (type == "jail") {
      label = jail_categories[$("#state_dropdown").val()][label]
    } else if (type == "crime_nibrs" && $("#rate").is(':checked')) {
      label = label.replace(/_rate/g, "");
      label = crimes[label]
      label += " Rate"
      // Temp fix since crimes variable doesn't exist and is causing issues for POLICE page
    } else if (type != 'leoka') {
      label = crimes[label]
    }
    final_data = [makeGraphObjects(data1, "#ca0020", label)];
    final_data[0].hidden = false;
  }
  return final_data;

}


function makeGraphObjects(data, color, label) {

  for (var j = 0; j < data.length; j++) {
    if (data[j] == "") {
      data[j] = null;
    }
  }

  obj = {
    borderColor: color,
    borderWidth: 1.6,
    backgroundColor: color,
    fill: false,
    label: label,
    data: data,
    onAnimationComplete: allowSaveGraph,
    hidden: true,
    yAxisID: "A",
    position: "left",
    spanGaps: false,
    radius: 1.5 // Dot size
  };
  return obj;
}

function makeGraph(type, crimes) {
  title = getTitle(table_data, type);
  yaxis_label = "";
  if (["crime", "crime_nibrs"].includes(type)) {
    yaxis_label = '# of Crimes';
    if (checkIfRateChecked(type)) {
      yaxis_label = 'Rate per 100,000 Population';
    }
  } else if (type == "arrests") {
    yaxis_label = "# of Arrests";
    if (checkIfRateChecked(type)) {
      yaxis_label = 'Rate per 100,000 Population';
    }
  } else if (type == "leoka") {
    yaxis_label = "# of People";
    if (graph_headers[1].includes("killed")) {
      yaxis_label = "# of Officer Deaths";
    } else if (graph_headers[1].includes("assault")) {
      yaxis_label = "# of Assaults";
    }
    if (checkIfRateChecked(type)) {
      yaxis_label = 'Rate per 100,000 Population';
    }
    if ($("#leoka_rate_per_officer").is(':checked')) {
      yaxis_label = "Rate per Officer";
    }
  } else if (type == "prisoners") {
    yaxis_label = "# of Prisoners";
    if (checkIfRateChecked(type)) {
      yaxis_label = '% of Population';
      if ($("#prisoners_rate_adult").is(':checked')) {
        yaxis_label = '% of Adult Population';
      } else if ($("#prisoners_rate_18_65").is(':checked')) {
        yaxis_label = '% of Population Aged 18-65';
      }
    }
  } else if (type == "alcohol") {
    yaxis_label = "# of Drinks";
  } else if (type == "death") {
    yaxis_label = "# of Deaths";
    if ($("#checkbox_1").is(':checked')) {
      yaxis_label = 'Deaths per 100,000 population';
    } else if ($("#checkbox_2").is(':checked')) {
      yaxis_label = 'Age-Adjusted Deaths per 100,000 population';
    }
  }
  graph_datasets = getGraphDataset(table_data, graph_headers, type, crimes);

  if (type == "crime" && $("#clearance_rate").is(":checked")) {
    cleared_data = [];
    _.each(graph_datasets, function(x) {
      if (x.label.includes("Clear")) {
        cleared_data.push(x);
      }
    });
    not_cleared_data = [];
    _.each(graph_datasets, function(x) {
      if (!x.label.includes("Clear")) {
        not_cleared_data.push(x);
      }
    });
    graph_datasets = not_cleared_data;

  }

  xaxis_label = "Year";
  if (type == "borderpatrol") {
    xaxis_label = "Fiscal Year";
  }

  if (["crime", "arrests", "leoka"].includes(type)) {
    if ($("#monthly").is(':checked')) {
      xaxis_label = "Year-Month"
    }
  }

  if (["jail"].includes(type)) {
    xaxis_label = "Year-Month"
  }

  opts = {
    spanGaps: false,
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
          labelString: xaxis_label
        },
        type: 'time',
        time: {
          displayFormats: {
            quarter: 'MMM YYYY'
          }
        }
      }],
      yAxes: [{
        id: "A",
        position: "left",
        ticks: {
          beginAtZero: true,
          userCallback: function(value, index, values) {
            value = value.toLocaleString();
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
    //  responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(tooltipItems, table_data) {
          value = tooltipItems.yLabel;
          value = value.toLocaleString();
          value = table_data.datasets[tooltipItems.datasetIndex].label + ": " + value;
          return value;
        }
      }
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    plugins: {
      zoom: {
        zoom: {
          drag: true,
          enabled: false,
          mode: 'x'
        }
      }
    }


  };



  myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: graph_datasets
    },
    options: opts
  });
  return (myLineChart);
}




function addYAxis() {
  opts.scales.yAxes.push({
    id: "B",
    position: "right",
    scaleLabel: {
      fontSize: 22,
      fontColor: "#000000",
      display: true,
      labelString: "% of Crimes Cleared"
    },
    ticks: {
      beginAtZero: true,
      userCallback: function(value, index, values) {
        value = value.toLocaleString() + "%";
        return value;
      },
      fontSize: 14
    },
  });
  for (var i = 0; i < cleared_data.length; i++) {

    cleared_data[i].yAxisID = "B";
    cleared_data[i].label = cleared_data[i].label.replace("Total Offenses Cleared", "% Cleared - Total");
    cleared_data[i].label = cleared_data[i].label.replace("Offenses Cleared Involving Only Persons Under age 18", "% Cleared - All Under Age 18");
    graph_datasets.push(cleared_data[i]);

  }
  graph.destroy();
  ctx = document.getElementById("graph").getContext('2d');

  myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: graph_datasets
    },
    spanGaps: false,
    tooltips: {
      enabled: false
    },
    options: opts
  });

  return (myLineChart);

}

function getTitle(data, type) {
  title = data[0].agency + ', ';
  if (type != "crime" || !$("#agency_dropdown").children("option:selected").text().includes("Estimate")) {
    title += data[0].state + ': ';

  }
  subtitle = "";
  if (type == "crime") {
    subtitle = crime_values[$("#crime_dropdown").val()];
  } else if (type == "arrests") {
    subtitle = arrest_values[$("#crime_dropdown").val()];
    subtitle += ": " + arrest_categories[$("#arrests_category_dropdown").val()];
    subtitle += " - Arrests";
  } else if (type == "borderpatrol") {
    title = border_states[$("#state_dropdown").val()];
    subtitle = border_categories[$("#crime_dropdown").val()];
    subtitle = subtitle + ", " + values[$("#subcategories").val()]
  } else if (type == "jail") {
    title = jail_state_values[$("#state_dropdown").val()];
    title += ", " + agencies[$("#agency_dropdown").val()] + " County Jail";
    subtitle = jail_categories[$("#state_dropdown").val()][$("#crime_dropdown").val()];
  } else if (type == "leoka") {
    subtitle = leoka_categories[$("#crime_dropdown").val()];
    subtitle += ": " + _.values(leoka_subcatergory_values)[$("#leoka_subcategory_dropdown").val()];

    if (leoka_categories[$("#crime_dropdown").val()] == "Officers Assaulted") {
      weapon = _.values(leoka_weapons)[$("#leoka_weapons").val()];
      subtitle = subtitle + " - " + weapon;
    }

  } else if (type == "prisoners") {
    title = data[0].state + ' Prisons: ';
    subtitle = prisoner_categories[$("#crime_dropdown").val()] + ": ";
    name = prisoner_subcatergory_keys[$("#prisoners_subcategories").val()];
    category_index_num = _.indexOf(_.keys(prisoner_categories), $('#crime_dropdown').val());
    subtitle += prisoners_subcategory[category_index_num][name];

    if (_.keys(prisoner_categories)[category_index_num].includes("_crime")) {
      subtitle += ", Race: " + _.values(prisoners_race)[$("#prisoners_race").val()];
    }
  } else if (type == "alcohol") {
    title = data[0].state + ' Alcohol Consumption: ';
    subtitle = "Annual per capita (population aged 14+) ";
  } else if (type == "death") {
    title = data[0].state;
    subtitle = "Cause of Death: " + death_categories[$("#crime_dropdown").val()];
  } else if (type == "hate") {
    subtitle = "Hate Crime, Bias Motivation: " + hate_bias_motivations[$("#crime_dropdown").val()];
  }


  title = [title, subtitle];
  return title;
}
