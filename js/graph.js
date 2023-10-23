function allowSaveGraph() {
  var url = myLine.toBase64Image();
}

function getGraphDataset(tableData, colsForGraph, type, crimes) {
  if (type == "borderpatrol") {
    colsForGraph[0] = "fiscal_year"
  }

  if (type == "prisoners" && $("#crime_dropdown").val() == "race_ethnicity") {
    temp_graph_headers = []
    for (var m = 0; m < colsForGraph.length; m++) {
      if (!colsForGraph[m].startsWith("population")) {
        temp_graph_headers.push(colsForGraph[m])
      }
    }
    colsForGraph = temp_graph_headers
  }

  rate_type = "_rate";
  if (!get_rate_type(type, binary = true)) {
    rate_type = "";
  }
  if (type == "police" && $("#checkbox_4").is(':checked')) {
    rate_type = "_rate_per_officer";
  }
  if (type == "arrests" && $("#percent_of_arrests").is(':checked')) {
    rate_type = "_percent_of_arrests";
  }
  if (type == "arrests" && $("#percent_of_all_arrests").is(':checked')) {
    rate_type = "_percent_of_all_arrests";
  }
  if (type == "nibrs" && $("#percent_of_crimes").is(':checked')) {
    rate_type = "_percent";
  }
  checkbox_names = ["Actual Offenses",
    "Total Offenses Cleared",
    "Offenses Cleared Involving Only Persons Under age 18",
    "Unfounded Offenses"
  ];
  if (type == "alcohol") {
    checkbox_names = _.values(alcohol_categories);
  }
  if (["prisoners", "police"].includes(type)) {
    checkbox_names = ["Female", "Male", "Total"];
  }
  if (type == "arrests") {
    if ($("#subsubcategory_dropdown").val() == "Sex") {
      checkbox_names = ["Female", "Male", "Total"];
    } else if ($("#subsubcategory_dropdown").val() == "Race") {
      checkbox_names = ["American Indian", "Asian", "Black", "White", "Total"];
    } else if ($("#subsubcategory_dropdown").val() == "Ethnicity") {
      checkbox_names = ["Hispanic", "Non-Hispanic", "Total"];
    }
  }
  if (type == "hate") {
    checkbox_names = ["Violent", "Nonviolent", "Total"];
  }
  if (type == "school") {
    checkbox_names = ["Not on Campus", "On Campus - Total", "On Campus - Student Housing", "Public Property", "Total"];
  }


  if (type == "nibrs") {
    if ($("#subcategory_dropdown").val() == "sex") {
      checkbox_names = ["Total", "Female", "Male", "Unknown"];
    } else if ($("#subcategory_dropdown").val() == "race") {
      checkbox_names = ["Total", "Asian", "American Indian", "Black", "White", "Unknown"];
    } else if ($("#subcategory_dropdown").val() == "ethnicity") {
      checkbox_names = ["Total", "Hispanic", "Non-Hispanic", "Unknown"];
    } else if ($("#subcategory_dropdown").val() == "age") {
      checkbox_names = ["Total", "Adult", "Minor (<18 years)", "Unknown"];
    } else if ($("#subcategory_dropdown").val() == "injury") {
      checkbox_names = ["Total", "No Injury", "Minor Injury", "Serious Injury"];
    } else if ($("#subcategory_dropdown").val() == "subtype" && $("#crime_dropdown").val() != "animal_cruelty") {
      checkbox_names = ["Total", "Buy/Possess/Consume", "Sell/Create/Operate"];
    } else if ($("#subcategory_dropdown").val() == "subtype" && $("#crime_dropdown").val() == "animal_cruelty") {
      checkbox_names = ["Total", "Abuse/Torture", "Animal Fighting", "Bestiality", "Neglect"];
    } else if ($("#subcategory_dropdown").val() == "relationship") {
      checkbox_names = ["Total", "Intimdate Partner (include exes)", "Other Family", "Other", "Stranger", "Unknown"];
    } else if ($("#subcategory_dropdown").val() == "location") {
      checkbox_names = ["Total", "Bar/Nightclub", "Home", "Other/Unknown", "Outside", "School"];
    } else if ($("#subcategory_dropdown").val() == "gun") {
      checkbox_names = ["Total", "Gun Not Used", "Handgun used", "Other/Unknown Type Gun Used"];
    } else if ($("#subcategory_dropdown").val() == "arrest_type") {
      checkbox_names = ["Total", "On-View", "Summoned/Cited", "Taken Into Custody"];
    } else if ($("#subcategory_dropdown").val() == "clearance") {
      checkbox_names = ["Total", "Cleared by Arrest", "Death of Suspect", "Extradition Denied",
        "Juvenile/No Custody", "Prosecution Denied", "Victim Refused to Cooperate"
      ];
    } else if ($("#subcategory_dropdown").val() == "total" && $("#category_dropdown").val() != "property") {
      checkbox_names = ["Total"];
    } else if ($("#subcategory_dropdown").val() == "sex" && $("#category_dropdown").val() == "arrestee") {
      checkbox_names = ["Total", "Female", "Male"];
    } else if ($("#subcategory_dropdown").val() == "race" && $("#category_dropdown").val() == "arrestee") {
      checkbox_names = ["Total", "Asian", "American Indian", "Black", "White"];
    } else if ($("#subcategory_dropdown").val() == "ethnicity" && $("#category_dropdown").val() == "arrestee") {
      checkbox_names = ["Total", "Hispanic", "Non-Hispanic"];
    } else if ($("#category_dropdown").val() == "property" & $("#subcategory_dropdown").val() != "drugs") {
      checkbox_names = ["Burned", "Counterfeited/Forged", "Destroyed/Damaged/Vandalized", "Recovered", "Seized", "Stolen/Robbed/Defrauded/Etc."];
    } else if ($("#category_dropdown").val() == "property" & $("#subcategory_dropdown").val() == "drugs") {
      checkbox_names = ["Total Incidents With Drug Seized"];
    }
  }

  if ((get_rate_type(type, binary = true) || (type == "offenses" && $("#clearance_rate").is(":checked"))) && type != "death") {
    colsForGraph = _.map(colsForGraph, function(x) {
      if (type == "offenses" && $("#clearance_rate").is(":checked") && x.includes("clr_")) {
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
  data5 = [];
  data6 = [];
  data7 = [];

  for (var i = 0; i < data.length; i++) {
    years.push(data[i][colsForGraph[0]]);
    data1.push(data[i][colsForGraph[1]]);
    data2.push(data[i][colsForGraph[2]]);
    data3.push(data[i][colsForGraph[3]]);
    data4.push(data[i][colsForGraph[4]]);
    data5.push(data[i][colsForGraph[5]]);
    data6.push(data[i][colsForGraph[6]]);
    data7.push(data[i][colsForGraph[7]]);
  }

  if (["offenses", "alcohol", "prisoners", "arrests", "hate", "school", "nibrs"].includes(type) || type == "police" &
    police_categories[$("#crime_dropdown").val()] == "Police Department Employees") {

    final_data = [
      makeGraphObjects(data1, "#ca0020", checkbox_names[0]),
      makeGraphObjects(data2, "#f4a582", checkbox_names[1]),
      makeGraphObjects(data3, "#92c5de", checkbox_names[2]),
      makeGraphObjects(data4, "#0571b0", checkbox_names[3]),
      makeGraphObjects(data5, "#008837", checkbox_names[4]),
      makeGraphObjects(data6, "#000000", checkbox_names[5]),
      makeGraphObjects(data7, "#800080", checkbox_names[6])
    ];
    for (var i = 0; i < 7; i++) {
      final_data[i].hidden = false;
    }
    for (var i = 0; i < 7; i++) {
      if (!$("#checkbox_" + (i + 1)).is(':checked')) {
        final_data = _.filter(final_data, function(x) {
          return x.label != checkbox_names[i];
        });
      }
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
    label = label.replace(/_age_adjusted_rate/g, "");
    label = label.replace(/_crude_rate/g, "");

    if (type == "police") {
      crimes = police_subcategories[$("#crime_dropdown").val()];
    }
    if (type == "borderpatrol") {
      label = border_subcategories[$("#crime_dropdown").val()][$("#subcategory_dropdown").val()]
    } else if (type == "jail") {
      label = jail_categories[jail_state_values[$("#state_dropdown").val()]][label]
    } else if (type == "nibrs" && $("#rate").is(':checked')) {
      label = label.replace(/_rate/g, "");
      label = label.replace(/_percent/g, "");
      label = crimes[label]
      label += " Rate"
      // Temp fix since crimes variable doesn't exist and is causing issues for POLICE page
    } else if (type == "police" && ["officers_assaulted", "officers_killed"].includes($("#crime_dropdown").val())) {
      label = label.replace(/_rate/g, "");
      label = label.replace(/_per_officer/g, "");
      weapon = $("#subsubcategory_dropdown").val();
      if (weapon == "total_assaults") {
        weapon = "assaults_total"
      }
      label = label.replace("_" + weapon, "");
      if (weapon == "assaults_total") {
        weapon = "Total"
      } else {
        weapon = police_weapons[weapon];
      }
      label = crimes[label] + " " + weapon
    } else {
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
  rate_val = get_rate_type(type)
  yaxis_label = yaxis_labels[type + rate_val];


  if (type == "police" && rate_val == "") {
    if ($("#crime_dropdown").val().includes("killed")) {
      yaxis_label = "# of Officer Deaths";
    } else if ($("#crime_dropdown").val().includes("assault")) {
      yaxis_label = "# of Assaults";
    }
  }
  if (type == "nibrs") {
    if ($("#category_dropdown").val().includes("offense")) {
      yaxis_label = "# of Offenses";
    }
    if ($("#category_dropdown").val().includes("offender")) {
      yaxis_label = "# of Offenders";
    }
    if ($("#category_dropdown").val().includes("arrestee")) {
      yaxis_label = "# of Arrestees";
    }
    if ($("#category_dropdown").val().includes("victim")) {
      yaxis_label = "# of Victims";
    }
    if ($("#category_dropdown").val() == "property") {
      yaxis_label = "# of Incidents";
    }
    if ($("#category_dropdown").val() == "property" & $("#subcategory_dropdown").val() == "value_mean") {
      yaxis_label = "Mean Value (Inflation-Adjusted 2022 Dollars)";
    }
    if ($("#category_dropdown").val() == "property" & $("#subcategory_dropdown").val() == "value_median") {
      yaxis_label = "Median Value (Inflation-Adjusted 2022 Dollars)";
    }
    if ($("#rate").is(":checked")) {
      yaxis_label = "Rate per 100k Population"
    }
    if ($("#percent_of_crimes").is(":checked")) {
      if ($("#category_dropdown").val().includes("offense")) {
        yaxis_label = "% of Offenses";
      }
      if ($("#category_dropdown").val().includes("offender")) {
        yaxis_label = "% of Offenders";
      }
      if ($("#category_dropdown").val().includes("arrestee")) {
        yaxis_label = "% of Arrestees";
      }
      if ($("#category_dropdown").val().includes("victim")) {
        yaxis_label = "% of Victims";
      }
    }
  }

  graph_datasets = getGraphDataset(table_data, graph_headers, type, crimes);
  if (type == "offenses" && $("#clearance_rate").is(":checked")) {
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
  if (type == "jail" || $("#monthly").is(':checked')) {
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
  disable_animation_on_mobile(myLineChart);

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
  title = data[0].agency;
  if (type != "offenses" || !$("#agency_dropdown").children("option:selected").text().includes("Estimate")) {
    title += ", " + data[0].state + ': ';

  }
  subtitle = "";
  if (type == "offenses") {
    subtitle = crime_values[$("#crime_dropdown").val()];
  } else if (type == "arrests") {
    subtitle = arrest_values[$("#crime_dropdown").val()];
    subtitle = "Arrests for: " + subtitle + ", Breakdown: " + arrests_breakdown[$("#subsubcategory_dropdown").val()] + ", Age: " +
      arrest_age_categories[$("#subcategory_dropdown").val()];
  } else if (type == "nibrs") {
    subtitle = nibrs_crime_values["arrestee_offenses"][$("#crime_dropdown").val()]
    subtitle = nibrs_categories[$("#category_dropdown").val()] + "s, " + subtitle
    if ($("#category_dropdown").val() == "property") {
      subtitle = "Property Data: " + nibrs_property_values[$("#crime_dropdown").val()];
    }
  } else if (type == "school") {
    title = school_state_values[$("#state_dropdown").val()];
    subtitle = school_categories[$("#crime_dropdown").val()];
    subtitle += ": " + school_subcategories[$("#crime_dropdown").val()][$("#subcategory_dropdown").val()]
    if ($("#crime_dropdown").val() == "hate") {
      subtitle += ", Bias Motivation: " + school_bias_motivations[$("#subsubcategory_dropdown").val()]
    }
  } else if (type == "borderpatrol") {
    title = border_states[$("#state_dropdown").val()];
    subtitle = border_categories[$("#crime_dropdown").val()];
    subtitle = subtitle + ", " + border_subcategories[$("#crime_dropdown").val()][$("#subcategory_dropdown").val()]
  } else if (type == "jail") {
    title = jail_state_values[$("#state_dropdown").val()];
    title += ", " + agencies[$("#agency_dropdown").val()] + " County Jail";
    subtitle = jail_categories[jail_state_values[$("#state_dropdown").val()]][$("#crime_dropdown").val()];
  } else if (type == "police") {
    subtitle = police_categories[$("#crime_dropdown").val()];
    subtitle += ": " + police_subcategories[$("#crime_dropdown").val()][$("#subcategory_dropdown").val()]

    if (police_categories[$("#crime_dropdown").val()] == "Officers Assaulted") {
      weapon = _.values(police_weapons)[$("#subsubcategory_dropdown").val()];
      subtitle = subtitle + " - " + weapon;
    }

  } else if (type == "prisoners") {
    title = data[0].state + ' Prisons: ';
    subtitle = prisoner_categories[$("#crime_dropdown").val()] + ": ";
    subtitle += prisoners_subcategory[$("#crime_dropdown").val()][$("#subcategory_dropdown").val()]

    if ($("#subcategory_dropdown").val().includes("_crime")) {
      subtitle += ", Race: " + prisoners_race[$("#subsubcategory_dropdown").val()]
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


  title = [title, subtitle, "Source: Dr Jacob Kaplan's https://crimedatatool.com/"];
  return title;
}
