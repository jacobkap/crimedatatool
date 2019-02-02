function allowSaveGraph() {
  var url = myLine.toBase64Image();
}



function getGraphDataset(tableData, colsForGraph, type) {
  rate_type = "_rate";
  if (!checkIfRateChecked(type)) {
    rate_type = "";
  }
  checkbox_names = ["Actual Offenses", "Total Offenses Cleared", "Offenses Cleared Involving Only Persons Under age 18", "Unfounded Offenses"];
  if (type == "alcohol") {
    checkbox_names = _.values(alcohol_categories);
  }
  if (["prisoners", "leoka"].includes(type)) {
    checkbox_names = ["Female", "Male", "Total"];
  }
  if (type == "arrests") {
    checkbox_names = ["Adult", "Juvenile", "Total"];
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

  if (["crime", "alcohol", "prisoners", "arrests"].includes(type) || type == "leoka" &
    leoka_categories[$("#crime_dropdown").val()] == "Police Department Employees") {

    final_data = [
      makeGraphObjects(data1, "#7570b3", checkbox_names[0]),
      makeGraphObjects(data2, "#ef8a62", checkbox_names[1]),
      makeGraphObjects(data3, "#67a9cf", checkbox_names[2]),
      makeGraphObjects(data4, "#2166ac", checkbox_names[3])
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

    final_data = [makeGraphObjects(data1, "#7570b3", colsForGraph[1])];
    final_data[0].hidden = false;
  }
  return final_data;

}


function makeGraphObjects(data, color, label) {
  obj = {
    borderColor: color,
    backgroundColor: color,
    fill: false,
    label: label,
    data: data,
    onAnimationComplete: allowSaveGraph,
    hidden: true,
    yAxisID: "A",
    position: "left"
    //  radius: 0 // Removes dots
  };
  return obj;
}

function makeGraph(type) {
  title = getTitle(table_data, type);
  yaxis_label = "";
  if (type == "crime") {
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
  graph_datasets = getGraphDataset(table_data, graph_headers, type);
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

  opts = {
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
    options: opts
  });

  return (myLineChart);

}

function getTitle(data, type) {
  title = data[0].agency + ', ';
  title += data[0].state + ': ';
  subtitle = "";
  if (type == "crime") {
    subtitle = crime_values[$("#crime_dropdown").val()];
  } else if (type == "arrests") {
    subtitle = arrest_values[$("#crime_dropdown").val()];
    subtitle += ": " + arrest_categories[$("#arrests_category_dropdown").val()];
    subtitle += " - Arrests";
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
  }

  title = [title, subtitle];
  return title;
}

function fixTableName(name, type) {
  temp_name = name;
  name = name.replace(/_rate/g, "");
  name = name.replace(/_clearance/g, "");
  if (type == "crime") {
    temp1 = name.replace(/actual_.*/, "Actual ");
    if ($("#clearance_rate").is(":checked")) {
      temp2 = name.replace(/clr_18_.*/, "Clearance Rate Under Age 18 - ");
      temp3 = name.replace(/tot_clr_[a-z].*/, "Clearance Rate - ");

  } else {
    temp2 = name.replace(/clr_18_.*/, "Clearance Under Age 18 ");
    temp3 = name.replace(/tot_clr_[a-z].*/, "Clearance ");
  }
    temp4 = name.replace(/unfound_.*/, "Unfounded ");
    name = name.replace(/actual_|clr_18_|tot_clr_|unfound_/, "");
    name = crime_values[name];
    if (temp1 != temp_name) name = temp1 + name;
    if (temp2 != temp_name) name = temp2 + name;
    if (temp3 != temp_name) name = temp3 + name;
    if (temp4 != temp_name) name = temp4 + name;
  } else if (type == "arrests" && !default_table_headers.includes(name)) {

    temp_name = name;
    name = arrest_values[$("#crime_dropdown").val()];
    temp_name = temp_name.replace($("#crime_dropdown").val() + "_", "");
    temp_name = temp_name.replace(/_/g, " ");
    temp_name = temp_name.replace("tot", "total");
    temp_name = temp_name.replace("juv", "juvenile");
    temp_name = temp_name.replace("amer ind", "American Indian");
    temp_name = toTitleCase(temp_name);
    name = name + " " + temp_name;

  } else if (type == "leoka" && !default_table_headers.includes(name)) {
    temp_name = name;
    category_index_num = _.indexOf(_.keys(leoka_categories), $("#crime_dropdown").val());
    crime_val = _.keys(leoka_subcategories[category_index_num])[$("#leoka_subcategory_dropdown").val()];
    name = _.values(leoka_subcategories[category_index_num])[_.indexOf(_.keys(leoka_subcategories[category_index_num]), crime_val)];

    temp_name = temp_name.replace(crime_val + "_", "");
    temp_name = temp_name.replace(/_/g, " ");

    temp_name = toTitleCase(temp_name);
    if ($("#crime_dropdown").val() === "0") {
      name = name + " " + temp_name;
    } else {
      name = temp_name;
    }
  } else if (type == "prisoners") {
    if (!["state", "year"].includes(name)) {
      category_index_num = _.indexOf(_.keys(prisoner_categories), $("#crime_dropdown").val());
      if ($("#crime_dropdown").val().includes("_crime")) {
        temp_name = name;
        crime_val = _.keys(prisoners_subcategory[category_index_num])[$("#prisoners_subcategories").val()];
        name = _.values(prisoners_subcategory[category_index_num])[_.indexOf(_.keys(prisoners_subcategory[category_index_num]), crime_val)];
        temp_name = temp_name.replace(crime_val + "_", "");
        temp_name = temp_name.replace(/_/g, " ");
        temp_name = temp_name.replace("total total", "total");

        temp_name = toTitleCase(temp_name);

        name = name + " " + temp_name;
      } else {
        temp1 = name.replace(/.*_female/, " Female");
        temp2 = name.replace(/.*_male/, " Male");
        temp3 = name.replace(/.*_total/, " Total");
        name = name.replace(/_total|_female|_male/, "");
        name = prisoners_subcategory[category_index_num][name];
        if (temp1 != temp_name) name += temp1;
        if (temp2 != temp_name) name += temp2;
        if (temp3 != temp_name) name += temp3;
      }
    }
  } else if (type == "alcohol") {
    name = alcohol_categories[name];
  } else if (type == "death") {
    temp_name = name;
    temp1 = name.replace(/deaths_.*/, "Deaths ");
    temp2 = name.replace(/crude.*/, "Crude Rate ");
    temp3 = name.replace(/age_adjusted.*/, "Age-Adjusted Rate ");
    name = name.replace(/deaths_|crude_|age_adjusted_/, "");
    name = death_categories[name];
    if (temp1 != temp_name) name = temp1 + name;
    if (temp2 != temp_name) name = temp2 + name;
    if (temp3 != temp_name) name = temp3 + name;
  }

  if (name === undefined || default_table_headers.includes(name)) {
    name = temp_name.replace(/^\w/, c => c.toUpperCase());
  }

  if (checkIfRateChecked(type) &&
    !name.includes("Agency") &&
    !name.startsWith("Year") &&
    !name.includes("State") &&
    !name.includes("Population") &&
    !name.includes("ORI")) {
      console.log(name)
    if (type == "crime" && $("#clearance_rate").is(":checked") && name.includes("Clear")) {
    } else {
    name += " Rate";
  }
  console.log(name)
    if (type == "leoka" && $("#leoka_rate_per_officer").is(':checked')) {
      name += " per Officer";
    }
  }
  return name;
}

function fixTableDataName(name, type) {
  rate_type = "_rate";
  if (type == "leoka" && $("#leoka_rate_per_officer").is(':checked') === true) {
    rate_type = "_rate_per_officer";
  }

  if (!name.includes("agency") &&
    !name.startsWith("year") &&
    !name.includes("state") &&
    !name.includes("population") &&
    !name.includes("ORI")) {
    if (checkIfRateChecked(type)) {
        name += rate_type;
      }
    if (type == "crime" && $("#clearance_rate").is(":checked") && name.includes("clr_")) {
        name += "_clearance_rate";
        name = name.replace("_rate_clearance", "_clearance");
    }

  }
  return name;
}

function makeTable(type) {
  data = subsetColumns(table_data, table_headers, "table", type);

  data_keys = _.keys(data[0]);
  data_keys = data_keys.filter(function(a) {
    return a !== 'agency' && a !== 'year' &&
      a !== 'state' && a !== 'ORI';
  });

  // Adds commas in numbers to make it easier to read!
  for (var m = 0; m < data.length; m++) {
    for (n = 0; n < data_keys.length; n++) {
      data[m][data_keys[n]] = parseFloat(data[m][data_keys[n]]).toLocaleString();
    }
  }

  // Makes real (as they appear in the data) names and pretty names
  // as they will appear in the table.
  table_columns = [];
  for (var i = 0; i < table_headers.length; i++) {
    label_name = fixTableName(table_headers[i], type);
    data_name = fixTableDataName(table_headers[i], type);
    table_columns.push({
      data: data_name,
      title: label_name,
      className: "dt-head-left dt-body-left"
    });
  }

  temp_table = $("#table").DataTable({
    data: data,
    columns: table_columns,
    "scrollX": true,
    "sScrollXInner": "100%",
    "sScrollX": "100%",
    "stripe": true,
    "hover": true,
    "lengthChange": true,
    "paging": true,
    "searching": true,
    "pageLength": 25,
    "ordering": true,
    "order": [1, "desc"],
    "fixedHeader": true,
    fixedColumns: {
      leftColumns: 2
    }
  });
  return temp_table;
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
