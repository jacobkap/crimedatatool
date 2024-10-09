function fixTableName(name, type) {
  temp_name = name;
  name = name.replace(/_rate/g, "");
  name = name.replace(/_percent/g, "");
  name = name.replace(/_clearance/g, "");
  name = name.replace(/_percent_of_arrests/g, "");
  name = name.replace(/_non_hisp/g, " Non-Hispanic");


  if (type == "offenses") {
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

    if (name == "all_arrests_total_tot_arrests") {
      name = "All Arrests Total in Agency"
    } else {
    temp_name = name;
    name = arrest_values[$("#crime_dropdown").val()];
    temp_name = temp_name.replace($("#crime_dropdown").val() + "_", "");
    temp_name = temp_name.replace(/_/g, " ");
    temp_name = temp_name.replace("tot", "total");
    temp_name = temp_name.replace("juv", "juvenile");
    temp_name = temp_name.replace("amer ind", "American Indian");
    temp_name = toTitleCase(temp_name);
    name = name + " " + temp_name;
  }

  } else if (type == "police" && !default_table_headers.includes(name)) {
    temp_name = name;
    category_index_num = _.indexOf(_.keys(police_categories), $("#crime_dropdown").val());
    crime_val = _.keys(police_subcategories[category_index_num])[$("#subcategory_dropdown").val()];
    name = _.values(police_subcategories[category_index_num])[_.indexOf(_.keys(police_subcategories[category_index_num]), crime_val)];

    temp_name = temp_name.replace(crime_val + "_", "");
    temp_name = temp_name.replace(/_/g, " ");

    temp_name = toTitleCase(temp_name);
    if ($("#crime_dropdown").val() === "0") {
      name = name + " " + temp_name;
    } else {
      name = temp_name;
    }
  } else if (type == "hate") {
    name = name.replace(/_/g, " ");
    name = toTitleCase(name);
  } else if (type == "nibrs") {
    if ($("#rate").is(':checked')) {
      name = name.replace(/_rate/g, "");
    }
    if ($("#percent_of_crimes").is(':checked')) {
      name = name.replace(/_percent/g, "");
    }
    name = nibrs_crime_values[name];
  }

  if (name === undefined || default_table_headers.includes(name)) {
    name = temp_name.replace(/_/g, " ");
    name = name.replace(/^\w| \w/g, c => c.toUpperCase());
  }

  if (get_rate_type(type, binary = true) && !["Agency", "State", "Population", "ORI"].includes(name) &&
    !name.startsWith("Year")) {

    if (type == "offenses" && $("#clearance_rate").is(":checked") && name.includes("Clear")) {} else if (type == "arrests" && $("#percent_of_arrests").is(':checked')) {
      name += " % of Arrests";
    } else if (type == "police" && $("#checkbox_4").is(':checked')) {
      name += " per Officer";
    }  else if (type == "nibrs" && $("#percent_of_crimes").is(':checked')) {
      name += " %";
    } else if (type == "arrests" && $("#percent_of_all_arrests").is(':checked')) {
      name += " % of All Arrests for All Crimes";
    } else {
      name += " Rate";
    }
  }
      name = name.replace(/hispanic/, "Hispanic");
  return name;
}

function fixTableDataName(name, type) {
  rate_type = get_rate_type(type);
  if (!["ORI", "agency", "state", "population"].includes(name) &&
    !name.startsWith("year") &&
    !name.startsWith("county")) {
    if (get_rate_type(type, binary = true)) {
      name += rate_type;
    }
    if (type == "offenses" && $("#clearance_rate").is(":checked") && name.includes("clr_")) {
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
    return !["agency", "year", "state", "ORI", "county"].includes(a);
  });
  // Adds commas in numbers to make it easier to read!
  for (var m = 0; m < data.length; m++) {
    for (n = 0; n < data_keys.length; n++) {
      data[m][data_keys[n]] = parseFloat(data[m][data_keys[n]]).toLocaleString();

      if (data[m][data_keys[n]] == "NaN") {
        data[m][data_keys[n]] = ""
      }
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
      className: "dt-head-left dt-body-right"
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
    "searching": false,
    "pageLength": 25,
    "ordering": true,
    "order": [1, "desc"],
    "fixedHeader": true,
    "render": function(data) {
      if (typeof(data) == "undefined") {
        return "tbd"
      } else {
        return data
      }
    },
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
