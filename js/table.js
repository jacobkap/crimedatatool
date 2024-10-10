
function fixTableName(name, type) {
  let temp_name = name;

  // Replace patterns in name
  const replacements = {
    _rate: "",
    _percent: "",
    _clearance: "",
    _percent_of_arrests: "",
    _non_hisp: " Non-Hispanic",
  };

  // Apply string replacements using the defined mapping
  for (const [key, value] of Object.entries(replacements)) {
    name = name.replace(new RegExp(key, 'g'), value);
  }

  // Cache jQuery selectors for dropdown values
  const crimeDropdownVal = $("#crime_dropdown").val();
  const subcategoryDropdownVal = $("#subcategory_dropdown").val();
  const clearanceChecked = $("#clearance_rate").is(":checked");

  if (type === "offenses") {
    const temp1 = name.replace(/actual_.*/, "Actual ");
    const temp2 = name.replace(/clr_18_.*/, clearanceChecked ? "Clearance Rate Under Age 18 - " : "Clearance Under Age 18 ");
    const temp3 = name.replace(/tot_clr_[a-z].*/, clearanceChecked ? "Clearance Rate - " : "Clearance ");
    const temp4 = name.replace(/unfound_.*/, "Unfounded ");

    name = crime_values[name.replace(/actual_|clr_18_|tot_clr_|unfound_/, "")] || name;

    if (temp1 !== temp_name) name = temp1 + name;
    if (temp2 !== temp_name) name = temp2 + name;
    if (temp3 !== temp_name) name = temp3 + name;
    if (temp4 !== temp_name) name = temp4 + name;

  } else if (type === "arrests" && !default_table_headers.includes(name)) {
    if (name === "all_arrests_total_tot_arrests") {
      name = "All Arrests Total in Agency";
    } else {
      let temp_name = name.replace(`${crimeDropdownVal}_`, "").replace(/_/g, " ");
      temp_name = temp_name
        .replace("tot", "total")
        .replace("juv", "juvenile")
        .replace("amer ind", "American Indian");
      name = arrest_values[crimeDropdownVal] + " " + toTitleCase(temp_name);
    }

  } else if (type === "police" && !default_table_headers.includes(name)) {
    const categoryIndexNum = _.indexOf(_.keys(police_categories), crimeDropdownVal);
    const crime_val = _.keys(police_subcategories[categoryIndexNum])[subcategoryDropdownVal];
    name = _.values(police_subcategories[categoryIndexNum])[_.indexOf(_.keys(police_subcategories[categoryIndexNum]), crime_val)];

    let temp_name = name.replace(crime_val + "_", "").replace(/_/g, " ");
    temp_name = toTitleCase(temp_name);

    name = crimeDropdownVal === "0" ? name + " " + temp_name : temp_name;

  } else if (type === "hate") {
    name = toTitleCase(name.replace(/_/g, " "));

  } else if (type === "nibrs") {
    name = nibrs_crime_values[name] || name;
    if ($("#rate").is(":checked")) name = name.replace(/_rate/g, "");
    if ($("#percent_of_crimes").is(":checked")) name = name.replace(/_percent/g, "");
  }

  // Handle undefined or default headers
  if (name === undefined || default_table_headers.includes(name)) {
    name = toTitleCase(temp_name.replace(/_/g, " "));
  }

  // Add appropriate suffix for rate type or percentage
  if (get_rate_type(type, true) && !["Agency", "State", "Population", "ORI"].includes(name) && !name.startsWith("Year")) {
    if (type === "arrests" && $("#percent_of_arrests").is(':checked')) {
      name += " % of Arrests";
    } else if (type === "police" && $("#checkbox_4").is(':checked')) {
      name += " per Officer";
    } else if (type === "nibrs" && $("#percent_of_crimes").is(':checked')) {
      name += " %";
    } else if (type === "arrests" && $("#percent_of_all_arrests").is(':checked')) {
      name += " % of All Arrests for All Crimes";
    } else if (!(type === "offenses" && clearanceChecked && name.includes("Clear"))) {
      name += " Rate";
    }
  }

  name = name.replace(/hispanic/, "Hispanic");

  return name;
}

function fixTableDataName(name, type) {
  const rate_type = get_rate_type(type);
  const isRateType = get_rate_type(type, true); // Cache binary check result

  // Check if the name should have a rate type appended
  if (!["ORI", "agency", "state", "population"].includes(name) &&
      !name.startsWith("year") &&
      !name.startsWith("county")) {

    // Append rate type if applicable
    if (isRateType) {
      name += rate_type;
    }

    // Special handling for offenses clearance rates
    if (type === "offenses" && $("#clearance_rate").is(":checked") && name.includes("clr_")) {
      name += "_clearance_rate";
      name = name.replace("_rate_clearance", "_clearance"); // Ensure proper ordering
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
  const table_columns = table_headers.map(header => {
    const label_name = fixTableName(header, type);
    const data_name = fixTableDataName(header, type);

    return {
      data: data_name,
      title: label_name,
      className: "dt-head-left dt-body-right"
    };
  });



  temp_table = $("#table").DataTable({
    data: data,
    deferRender: true,
    columns: table_columns,
    "scrollX": true,
    "sScrollXInner": "100%",
    "sScrollX": "100%",
    "stripe": true,
    "hover": true,
    "lengthChange": true,
    "paging": true,
    "searching": false,
    "pageLength": 15,
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
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}
