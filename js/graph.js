function allowSaveGraph() {
  var url = myLine.toBase64Image();
}

function getGraphDataset(tableData, colsForGraph, type, crimes) {

  rate_type = "_rate";
  if (!get_rate_type(type, binary = true)) {
    rate_type = "";
  }
  if (type == "leoka" && $("#checkbox_4").is(':checked')) {
    rate_type = "_rate_per_officer";
  } else if (type == "arrests" && $("#percent_of_arrests").is(':checked')) {
    rate_type = "_percent_of_arrests";
  } else if (type == "arrests" && $("#percent_of_all_arrests").is(':checked')) {
    rate_type = "_percent_of_all_arrests";
  } else if (type == "nibrs" && $("#percent_of_crimes").is(':checked')) {
    rate_type = "_percent";
  }
  checkbox_names = ["Actual Offenses",
  "Total Offenses Cleared",
  "Offenses Cleared Involving Only Persons Under age 18",
  "Unfounded Offenses"
];
if (type == "hate") {
  checkbox_names = ["Arson", "Destruction of Property/Vandalism", "Other", "Property/Financial", "Violent", "Total"];
}
if (type == "leoka") {
  checkbox_names = ["Female", "Male", "Total"];
}
if (type == "leoka" & $("#crime_dropdown").val() == "officers_assaulted") {
  checkbox_names = ["Gun", "Knife", "Other Weapon", "Unarmed", "Total"];
}
if (type == "leoka" & $("#crime_dropdown").val() == "officers_killed") {
  checkbox_names = ["Killed by Felony", "Killed by Accident"];
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

if ((get_rate_type(type, binary = true) || (type == "offenses" && $("#clearance_rate").is(":checked")))) {
  colsForGraph = _.map(colsForGraph, function(x) {
    if (type == "offenses" && $("#clearance_rate").is(":checked") && x.includes("clearance")) {
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

if (["offenses", "arrests", "nibrs", "arson", "hate"].includes(type) || type == "leoka") {

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
  label = label.replace(/_age_adjusted_rate/g, "");
  label = label.replace(/_crude_rate/g, "");
  if (type == "leoka") {
    crimes = leoka_subcategories[$("#crime_dropdown").val()];
  }

  if (type == "nibrs" && $("#rate").is(':checked')) {
    label = label.replace(/_rate/g, "");
    label = label.replace(/_percent/g, "");
    label = crimes[label]
    label += " Rate"
    // Temp fix since crimes variable doesn't exist and is causing issues for leoka page
  } else if (type == "leoka" && ["officers_assaulted", "officers_killed"].includes($("#crime_dropdown").val())) {
    label = "Incidents"
  } else if (type == "hate") {
    label = "# of Incidents"
  } else {
    label = crimes[label]
  }
  final_data = [makeGraphObjects(data1, "#ca0020", label)];
  final_data[0].hidden = false;
}
return final_data;

}

function makeGraphObjects(data, color, label) {
  // Replace empty strings with null using map
  const cleanedData = data.map(item => (item === "" ? null : item));

  // Return the object directly
  return {
    borderColor: color,
    borderWidth: 1.6,
    backgroundColor: color,
    fill: false,
    label: label,
    data: cleanedData,
    onAnimationComplete: allowSaveGraph,
    hidden: true,
    position: "left",
    spanGaps: false,
    radius: 1.5, // Dot size
  };
}



function makeGraph(type, crimes) {
  title = getTitle(table_data, type);
  rate_val = get_rate_type(type)
  yaxis_label = yaxis_labels[type + rate_val];


  if (type == "leoka" && rate_val == "") {
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
    const cleared_data = graph_datasets.filter(x => x.label.includes("Clear"));
    const not_cleared_data = graph_datasets.filter(x => !x.label.includes("Clear"));
    graph_datasets = not_cleared_data;
  }

  xaxis_label = "Year";

  opts = {
    watermark: {

      image: "crimedatatool_watermark.jpg",
      x: -333,
      y: 33,
      //    width: 53,
      //        height: 60,
      opacity: 0.75,
      alignToChartArea: true,
      position: "back"

    },
    animation: true,
    responsive: true,
    plugins: {
      title: {
        display: true,
        position: 'top',
        text: title,
        font: {
          size: 22
        },
      }
    },
    scales: {
      x: {
        display: true,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          fontSize: 15
        },
        title: {
          display: true,
          text: xaxis_label,
          font: {
            size: 22,
          },
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yaxis_label,
          font: {
            size: 22,
          },
        }
      }
    },
  };
  Chart.defaults.color = 'black'
  console.log(graph_datasets)
  myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: graph_datasets,
      yAxisID: 'y'
    },
    options: opts
  });
  //  disable_animation_on_mobile(myLineChart);

  return (myLineChart);
}

function addYAxis() {
  opts.scales.y.push({
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
  let title = data[0].agency;

  // Cache DOM values to avoid repeated DOM access
  const selectedCrime = $("#crime_dropdown").val();
  const selectedCategory = $("#category_dropdown").val();
  const selectedSubcategory = $("#subcategory_dropdown").val();
  const selectedSubsubcategory = $("#subsubcategory_dropdown").val();

  // Only append state if it's not an estimate for "offenses"
  if (type !== "offenses" || !$("#agency_dropdown").children("option:selected").text().includes("Estimate")) {
    title += `, ${data[0].state}: `;
  }

  let subtitle = "";

  switch (type) {
    case "offenses":
    subtitle = crime_values[selectedCrime];
    break;
    case "arson":
    subtitle = arson_values[selectedCrime];
    break;

    case "arrests":
    subtitle = `Arrests for: ${arrest_values[selectedCrime]}, Breakdown: ${arrests_breakdown[selectedSubsubcategory]}, Age: ${arrest_age_categories[selectedSubcategory]}`;
    break;

    case "nibrs":
    nibrs_crimes_temp = nibrs_crime_values["offense"]
    if ($('#category_dropdown').val() == "victim") {
      nibrs_crimes_temp = nibrs_crime_values["victim_demographics_offenses"]
    }
    if ($('#category_dropdown').val() == "property") {
      nibrs_crimes_temp = nibrs_property_values
    }
    if ($('#category_dropdown').val() == "property" & $('#subcategory_dropdown').val() == "drugs") {
      nibrs_crimes_temp = nibrs_property_drugs_values
    }
    if ($('#subcategory_dropdown').val() == "injury") {
      nibrs_crimes_temp = nibrs_crime_values["injury_offenses"]
    }
    if ($('#category_dropdown').val() == "arrestee") {
      nibrs_crimes_temp = nibrs_crime_values["arrestee_offenses"]
    }
    if ($('#category_dropdown').val() == "offense") {
      nibrs_crimes_temp = nibrs_crime_values["offense"]
    }
    if ($('#subcategory_dropdown').val() == "gun") {
      nibrs_crimes_temp = nibrs_crime_values["gun_offenses"]
    }


    subtitle = nibrs_crimes_temp[$("#crime_dropdown").val()] + ", " + nibrs_categories[$("#category_dropdown").val()] + " " + nibrs_subcategories[$("#category_dropdown").val()][$("#subcategory_dropdown").val()];

    if (selectedCategory === "property") {
      subtitle = `Property Data: ${nibrs_property_values[selectedCrime]}`;
    }
    break;

    case "leoka":
    subtitle = `${leoka_categories[selectedCrime]}: ${leoka_subcategories[selectedCrime][selectedSubcategory]}`;
    if (leoka_categories[selectedCrime] === "Officers Assaulted") {
      //    const weapon = ", Weapon: " + leoka_weapons[selectedSubsubcategory];
      //    subtitle += `${weapon}`;
    }
    break;

    case "hate":
    subtitle = `Bias Motivation: ${hate_bias_motivations[selectedCrime]}`;
    break;
  }

  return [title, subtitle];
}
