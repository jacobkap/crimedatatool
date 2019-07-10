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
  } else if (type == "crime_nibrs") {
    if ($("#rate").is(':checked')) {
    name = name.replace(/_rate/g, "");
  }
    name = nibrs_crime_values[name];
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
  } else if (type == "borderpatrol") {
    if (name == "sector") {
      name = "Sector";
    } else if (name == "fiscal_year") {
      name = "Fiscal Year";
    } else {
      index_val = keys.findIndex(function(element) {
  return element == name;
});
        name = values[index_val]
      }
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
    if (type == "crime" && $("#clearance_rate").is(":checked") && name.includes("Clear")) {
    } else {
    name += " Rate";
  }
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
      a !== 'state' && a !== 'ORI' && a !== 'sector' && a !== 'fiscal_year';
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
