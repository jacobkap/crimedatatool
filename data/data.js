default_table_headers = [
  "agency",
  "year",
  "state",
  "population",
  "ORI"
];

var state_values = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];

agency_desc_vals = {
  "year": "Year",
  "ORI": "ORI",
  "agency": "Agency",
  "state": "State",
  "population": "Population"
};

prisoners_state_values = ["US Prison Total", "Federal Prison Total", "State Prison Total"];
prisoners_state_values = prisoners_state_values.concat(state_values);

var prisoner_categories = {
  "custody" : "Prisoners in Custody",
  "jurisdiction" : "Prisoners in Jurisdiction",
  "race_ethnicity" : "Race/Ethnicity",
  "admission" :  "Admissions",
  "release" : "Releases",
  "capacity" : "Prison Capacity",
  "noncitizen_juvenile" : "Non-Citizen/Juvenile Prisoners",
  "death" : "Prisoner Deaths",
  "aids" : "Prisoners with HIV/AIDS"
};

var prisoners_subcategory = [{
    "custody_unsentenced": "Unsentenced or <1 Year Sentence Prisoners",
    "total_under_custody": "Total Prisoners",
    "custody_public_prisons": "In Public Prison",
    "custody_private_prison": "In Private Prison"
  },

  {
    "jurisdiction_housed_in_local_facility": "In Local Facility",
    "local_facilities_solely_to_ease_prison_crowding": "In Local Facility to Ease Prison Overcrowding",
    "jurisdiction_private_prison_in_state": "In Private Prison In-State",
    "jurisdiction_private_prison_out_of_state": "In Private Prison Out-of-State",
    "total_under_jurisdiction": "Total Prisoners",
    "jurisdiction_unsentenced": "Unsentenced or <1 Year Sentence Prisoners"
  },

  // Race/ethnicity
  {
    "american_indian": "American Indian",
    "asian": "Asian",
    "black": "Black",
    "hispanic_or_latino": "Hispanic/Latino",
    "native_hawaiian": "Native Hawaiian",
    "additional_other_categories_for_race": "Other",
    "two_or_more_races": "Two or More Races",
    "unknown_race": "Unknown",
    "white": "White"
  },

  // Admissions
  {
    "awol_returns_with_or_without_new_sentences": "AWOL Returns",
    "escapee_returns_with_or_without_new_sentences": "Escapee Returns",
    "new_court_commitments": "New Court Commitment",
    "other_conditional_release_violators_admitted_with_new_sentence": "Other Conditional Release Violators With New Sentence",
    "other_conditional_release_violators_admitted_without_new_sentence": "Other Conditional Release Violators Without New Sentence",
    "other_admissions": "Other Admissions",
    "parole_violators_with_new_sentence": "Parole Violators With New Sentence",
    "parole_violators_without_new_sentence": "Parole Violators Without New Sentence",
    "returns_from_appeal_or_bond": "Returns From Appeal or Bond",
    "total_admissions": "Total Admissions",
    "transfers_admitted_from_other_jurisdictions": "Transfers From Other Jurisdiction"
  },

  // Releases
  {
    "awol_release": "AWOL Released",
    "conditional_release_probations": "Conditional Release Probation",
    "discretionary_parole": "Discretionary Parole",
    "escape_from_confinement": "Escaped from Confinement",
    "unconditional_release_expirations_of_sentence": "Expiration of Sentence",
    "other_conditional_release": "Other Conditional Release",
    "other_unconditional_release": "Other Unconditional Release",
    "release_to_appeal_or_bond": "Release to Appeal or Bond",
    "unconditional_release_commutations": "Sentence Commuted",
    "supervised_mandatory_release": "Supervised Mandatory Release",
    "total_releases": "Total Released",
    "transfers_to_other_jurisdictions": "Transferred to Other Jurisdiction"
  },

  // Capacity
  {
    "design_capacity": "Design Capacity of Prisons",
    "operational_capacity": "Operational Capacity of Prisons",
    "rated_capacity": "Rated Capacity of Prisons"
  },


  // Minors and non-citizens
  {
    "in_custody_not_us_citizens": "Not U.S. Citizen",
    "in_custody_under_18_years_of_age": "Under 18 Years of Age"
  },

  // Death
  {
    "deaths_from_accidental_injury_to_self": "Accidental Injury to Self",
    "deaths_from_aids": "AIDS",
    "deaths_caused_by_another_person": "Caused by Another Person",
    "deaths_from_execution": "Execution",
    "deaths_from_illness_or_natural_cause": "Illness or Natural Cause",
    "deaths_from_homicide_by_other_inmates": "Murder by Other Inmates",
    "deaths_from_other_homicide": "Other Murder",
    "deaths_from_suicide": "Suicide",
    "total_deaths": "Total Deaths"
  },

  // HIV/AIDS
  {
    "asymptomatic_hiv_positive": "Asymptomatic HIV Positive",
    "confirmed_to_have_aids": "Confirmed to have AIDS",
    "infected_with_lesser_forms_of_symptomatic_hiv_disease": "Infected with Lesser Forms of Symptomatic HIV",
    "total_in_custody_hiv_positive_or_with_aids": "Total Prisoners With HIV or Aids"
  }
];

var crime_values = {
  "all_crimes": "All Crimes",
  "aggravated_assault": "Aggravated Assault",
  "assault_total": "Assault - Total",
  "gun_assault": "Assault -  Gun",
  "knife_assault": "Assault - Knife",
  "other_weapon_assault": "Assault - Other Weapon",
  "simple_assault": "Assault - Simple Assault",
  "hand_feet_assault": "Assault - Strong Arm",
  "burglary_total": "Burglary - Total",
  "attempted_burglary": "Burglary - Attempted",
  "burg_force_entry": "Burglary - Forcible Entry",
  "burg_no_force_entry": "Burglary - Nonforcible Entry",
  "mtr_vhc_theft_total": "Motor Vehicle Theft - Total",
  "auto_theft": "Motor Vehicle Theft - Auto",
  "other_vhc_theft": "Motor Vehicle Theft - Other Vehicle",
  "truck_bus_theft": "Motor Vehicle Theft - Truck/Bus",
  "manslaughter": "Manslaughter",
  "murder": "Murder",
  "officers_assaulted": "Officers Assaulted",
  "officers_killed_by_accident": "Officers Killed by Accident",
  "officers_killed_by_felony": "Officers Killed by Felony",
  "rape_total": "Rape - Total",
  "attempted_rape": "Rape - Attempted",
  "force_rape": "Rape - Forcible",
  "robbery_total": "Robbery Total",
  "gun_robbery": "Robbery -  Gun",
  "knife_robbery": "Robbery - Knife",
  "other_weapon_robbery": "Robbery - Other Weapon",
  "strong_arm_robbery": "Robbery - Strong Arm",
  "theft_total": "Theft - Total"
};

var arrest_values = {
  "agg_assault": "Aggravated Assault",
  "oth_assault": "Assault - Other",
  "arson": "Arson",
  "burglary": "Burglary",
  "curfew": "Curfew",
  "disorder_cond": "Disorderly Conduct",
  "total_drug": "Drugs - Total Drugs",
  "poss_drug": "Drugs - Possess Total",
  "poss_synth_narc": "Drugs - Possess Synthetic Narcotic",
  "poss_cannabis": "Drugs - Possess Cannabis",
  "poss_heroin_coke": "Drugs - Possess Heroin or Cocaine",
  "poss_oth_drug": "Drugs - Possess Other Drug",
  "sale_drug": "Drugs - Sale Total",
  "sale_synth_narc": "Drugs - Sale Synthetic Narcotic",
  "sale_cannabis": "Drugs - Sale Cannabis",
  "sale_heroin_coke": "Drugs - Sale Heroin or Cocaine",
  "sale_oth_drug": "Drugs - Sale Other Drug",
  "drunkenness": "Drunkenness",
  "dui": "DUI",
  "embezzlement": "Embezzlement",
  "family_offenses": "Family Offenses",
  "forgery": "Forgery",
  "fraud": "Fraud",
  "total_gambling": "Gambling - Total",
  "bookmaking": "Gambling - Bookmaking",
  "number_lottery": "Gambling - Numbers/Lottery",
  "oth_gambling": "Gambling - Other",
  "liquor": "Liquor",
  "manslaught_neg": "Manslaughter by Negligence",
  "mtr_veh_theft": "Motor Vehicle Theft",
  "murder": "Murder",
  "oth_non_traffic": "Other Non-Traffic",
  "prostitution": "Prostitution",
  "rape": "Rape",
  "robbery": "Robbery",
  "runaway": "Runaway",
  "oth_sex_off": "Sex Offense - Other",
  "stolen_property": "Stolen Property",
  "suspicion": "Suspicion",
  "theft": "Theft",
  "vagrancy": "Vagrancy",
  "vandalism": "Vandalism",
  "weapons": "Weapons Offenses"
};

var leoka_weapons = {
  "assault_gun" : "Gun",
  "assault_knife" : "Knife",
  "assault_oth_weap" : "Other Weapon",
  "assault_unarmed" : "Unarmed",
  "total_assaults" : "Total"
};

var leoka_categories = [
  "Officers Assaulted",
  "Officers Killed",
  "Police Department Employees"
];

leoka_subcategories = [
  {
    "ambush" : "Ambush",
    "burglary" : "Burglary",
    "deranged" : "Handling Person with Mental Illness",
    "disturbance" : "Disturbance (fight, domestic violence, etc.)",
    "oth_arrest" : "Attempt to Make Other Arrest",
    "prisoner" : "Custody of Prisoner",
    "riot" : "Civil Disorder (riot)",
    "robbery" : "Robbery",
    "susp_pers" : "Suspicious Person",
    "traffic" : "Traffic Stop",
    "assaults_with_injury" : "Total Assaults - With Injury",
    "assaults_no_injury" : "Total Assaults - Without Injury",
    "total" : "Total Assaults",
  },
  {
    "officers_killed_by_accident" : "Killed by Accident",
    "officers_killed_by_felony" : "Killed by Felony"
  },
  {
    "employees_civilians" : "Civilians",
  //  "male_employees_civilians" : "Civilians - Male",
  //  "total_employees_civilians" : "Civilians - Total",

    "employees_officers" : "Officers",
//    "male_employees_officers" : "Officers - Male",
//    "total_employees_officers" : "Officers - Total",

    "employees_total" : "Total Employees",
  //  "male_employees_total" : "Total Employees - Male",
  //  "total_employees_total" : "Total Employees - Total",
  }
];


var leoka_values = {
  "ambush_total_assault": "Assault - Ambush",
  "att_oth_arrest_total_assault": "Assault - Attempted Other Arrest",
  "burglary_total_assault": "Assault - Burglary",
  "civil_disorder_total_assault": "Assault - Civil Disorder",
  "cust_prisoners_total_assault": "Assault - Custody of Prisoner",
  "deranged_total_assault": "Assault - Deranged Offender",
  "disturbance_total_assault": "Assault - Disturbance",
  "all_oth_total_assault": "Assault - Other Scenario",
  "robbery_total_assault": "Assault - Robbery",
  "susp_pers_total_assault": "Assault - Suspicious Person",
  "traffic_total_assault": "Assault - Traffic",

  "total_civilians": "Civilians - Total",
  "female_employees_civilians": "Civilians - Female",
  "male_employees_civilians": "Civilians - Male",

  "assault_injury_total": "Assault With Injury - Total",
  "assault_injury_gun": "Assault With Injury - Gun Used",
  "assault_injury_knife": "Assault With Injury - Knife Used",
  "assault_injury_hand_feet": "Assault With Injury - Unarmed Offender",
  "assault_injury_other": "Assault With Injury - Other Weapon",

  "assault_no_injury_total": "Assault Without Injury - Total",
  "assault_no_injury_gun": "Assault Without Injury - Gun Used",
  "assault_no_injury_knife": "Assault Without Injury - Knife Used",
  "assault_no_injury_hand_feet": "Assault Without Injury - Unarmed Offender",
  "assault_no_injury_other": "Assault Without Injury - Other Weapon",

  "officers_killed_accident": "Officers Killed by Accident",
  "officers_killed_felony": "Officers Killed by Felony",
  "total_officers": "Police Officers - Total",
  "female_employees_officers": "Police Officers - Female",
  "male_employees_officers": "Police Officers - Male",

  "total_assault_total": "Total Assault - Total",
  "total_assault_gun": "Total Assault - Gun Used",
  "total_assault_knife": "Total Assault - Knife Used",
  "total_assault_hand_feet": "Total Assault - Unarmed Offender",
  "total_assault_other": "Total Assault - Other Weapon",

};

var arrest_categories = {
  "tot_arrests": "Total Arrests",
  "tot_adult": "Total Adult",
  "tot_juv": "Total Juvenile",
  "tot_male": "Total Male",
  "tot_female": "Total Female",
  "tot_male_adult": "Male Adult",
  "tot_male_juv": "Male Juvenile",
  "tot_female_adult": "Female Adult",
  "tot_female_juv": "Female Juvenile",

  // Race
  "adult_amer_indian": "American Indian Adult",
  "adult_asian": "Asian Adult",
  "adult_black": "Black Adult",
  "adult_white": "White Adult",

  "juv_amer_indian": "American Indian Juvenile",
  "juv_asian": "Asian Juvenile",
  "juv_white": "White Juvenile",
  "juv_black": "Black Juvenile"
  /*
   "male_under_10": "Male under age 10",
   "male_10_12": "Male aged 10-12",
   "male_13_14": "Male aged 13-14",
   "male_15": "Male aged 15",
   "male_16": "Male aged 16",
   "male_17": "Male aged 17",
   "male_18": "Male aged 18",
   "male_19": "Male aged 19",
   "male_20": "Male aged 20",
   "male_21": "Male aged 21",
   "male_22": "Male aged 22",
   "male_23": "Male aged 23",
   "male_24": "Male aged 24",
   "male_25_29": "Male aged 25-29",
   "male_30_34": "Male aged 30-24",
   "male_35_39": "Male aged 35-39",
   "male_40_44": "Male aged 40-44",
   "male_45_49": "Male aged 45-49",
   "male_50_54": "Male aged 50-54",
   "male_55_59": "Male aged 55-59",
   "male_60_64": "Male aged 60-64",
   "male_over_64": "Male over age 64",
   "female_under_10": "Female under age 10",
   "female_10_12": "Female aged 10-12",
   "female_13_14": "Female aged 13-14",
   "female_15": "Female aged 15",
   "female_16": "Female aged 16",
   "female_17": "Female aged 17",
   "female_18": "Female aged 18",
   "female_19": "Female aged 19",
   "female_20": "Female aged 20",
   "female_21": "Female aged 21",
   "female_22": "Female aged 22",
   "female_23": "Female aged 23",
   "female_24": "Female aged 24",
   "female_25_29": "Female aged 25-29",
   "female_30_34": "Female aged 30-34",
   "female_35_39": "Female aged 35-39",
   "female_40_44": "Female aged 40-44",
   "female_45_49": "Female aged 45-49",
   "female_50_54": "Female aged 50-54",
   "female_55_59": "Female aged 55-59",
   "female_60_64": "Female aged 60-64",
   "female_over_64": "Female over age 64",
   */
};
