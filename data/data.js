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

alcohol_categories = {
  "number_of_beers": "Beers",
  "number_of_shots_liquor": "Shots of Liquor",
  "number_of_glasses_wine": "Glasses of Wine",
  "number_of_drinks_total": "Total Drinks"
};

death_categories = {
  "alcohol_all_other": "Alcohol All Other",
  "alcohol_overdose": "Alcohol Overdose",
  "alcohol_total": "Alcohol Total",
  "drugs_all_other": "Drugs All Other",
  "drugs_and_alcohol_total": "Drugs and Alcohol Total",
  "drugs_overdose_homicide": "Drug Overdose Homicide",
  "drugs_overdose_suicide": "Drug Overdose Suicide",
  "drugs_overdose_undetermined": "Drug Overdose Undetermined",
  "drugs_overdose_unintentional": "Drug Overdose Unintentional",
  "drugs_total": "Drugs Total",
  "total_homicide": "Homicide",
  "total_suicide": "Suicide",
  "total_undetermined": "Undetermined",
  "total_unintentional": "Unintentional"
};

prisoners_state_values = ["US Prison Total", "Federal Prison Total", "State Prison Total"];
prisoners_state_values = prisoners_state_values.concat(state_values);

alcohol_state_values = ["US Total", "West Region", "South Region",  "Midwest Region", "Northeast Region"];
alcohol_state_values = alcohol_state_values.concat(state_values);

var prisoner_categories = {
  "custody": "Prisoners in Custody",
  "custody_crime": "Prisoners in Custody - Most Serious Charge",
  "jurisdiction": "Prisoners in Jurisdiction",
  "race_ethnicity": "Race/Ethnicity",
  "admission": "Admissions",
  "admissions_crime": "Admissions - Most Serious Charge",
  "release": "Releases",
  "releases_crime": "Releases - Most Serious Charge",
  "capacity": "Prison Capacity",
  "noncitizen_juvenile": "Non-Citizen/Juvenile Prisoners",
  "death": "Prisoner Deaths",
  "aids": "Prisoners with HIV/AIDS"
};

prison_crimes = {
  "aggravated_or_simple_assault": "Assault - Aggravated or Simple",
  "burglary": "Burglary",
  "drugs": "Drugs - Possession, Distribution, Trafficking, etc.",
  "fraud": "Fraud",
  "motor_vehicle_theft": "Motor Vehicle Theft",
  "murder": "Murder",
  "negligent_manslaughter": "Negligent Manslaughter",
  "other_property_offenses": "Other Property Offenses",
  "other_unknown": "Other or Unknown",
  "other_violent_offenses": "Other Violent Offenses",
  "public_order": "Public Order",
  "rape_or_sexual_assault": "Rape or Sexual Assault",
  "robbery": "Robbery",
  "theft": "Theft",
  "total": "Total Offenses",
};

prisoners_race = {
  "black": "Black",
  "hispanic": "Hispanic/Latino",
  "other_or_unknown": "Other/Unknown",
  "white": "White",
  "total": "Total"
};

var prisoners_subcategory = [{
    "custody_unsentenced": "Unsentenced or <1 Year Sentence Prisoners",
    "total_under_custody": "Total Prisoners",
    "custody_public_prisons": "In Public Prison",
    "custody_private_prison": "In Private Prison"
  },
  prison_crimes,
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
    "hispanic": "Hispanic/Latino",
    "other_or_unknown": "Other/Unknown",
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
  prison_crimes,
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

  prison_crimes,
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
  "assault_aggravated": "Aggravated Assault",
  "assault_total": "Assault - Total",
  "assault_with_a_gun": "Assault -  Gun",
  "assault_with_a_knife": "Assault - Knife",
  "assault_other_weapon": "Assault - Other Weapon",
  "assault_simple": "Assault - Simple Assault",
  "assault_unarmed": "Assault - Unarmed",
  "burg_total": "Burglary - Total",
  "burg_attempted": "Burglary - Attempted",
  "burg_force_entry": "Burglary - Forcible Entry",
  "burg_nonforce_entry": "Burglary - Nonforcible Entry",
  "index_property": "Index - Property",
  "index_violent": "Index - Violent",
  "index_total": "Index - Total",
  "mtr_veh_theft_total": "Motor Vehicle Theft - Total",
  "mtr_veh_theft_car": "Motor Vehicle Theft - Auto",
  "mtr_veh_theft_other": "Motor Vehicle Theft - Other Vehicle",
  "mtr_veh_theft_truck": "Motor Vehicle Theft - Truck/Bus",
  "manslaughter": "Manslaughter",
  "murder": "Murder",
  "officers_assaulted": "Officers Assaulted",
  "officers_killed_by_accident": "Officers Killed by Accident",
  "officers_killed_by_felony": "Officers Killed by Felony",
  "rape_total": "Rape - Total",
  "rape_attempted": "Rape - Attempted",
  "rape_by_force": "Rape - Forcible",
  "robbery_total": "Robbery - Total",
  "robbery_with_a_gun": "Robbery -  Gun",
  "robbery_with_a_knife": "Robbery - Knife",
  "robbery_other_weapon": "Robbery - Other Weapon",
  "robbery_unarmed": "Robbery - Unarmed",
  "theft_total": "Theft - Total"
};

var arrest_values = {
  "all_other": "All Other Non-Traffic",
  "agg_assault": "Aggravated Assault",
  "oth_assault": "Assault - Other",
  "arson": "Arson",
  "burglary": "Burglary",
  "curfew_loiter": "Curfew",
  "disorder_cond": "Disorderly Conduct",
  "total_drug": "Drugs - Total Drugs",
  "poss_drug_total": "Drugs - Possess Total",
  "poss_synth_narc": "Drugs - Possess Synthetic Narcotic",
  "poss_cannabis": "Drugs - Possess Cannabis",
  "poss_heroin_coke": "Drugs - Possess Heroin or Cocaine",
  "poss_other_drug": "Drugs - Possess Other Drug",
  "sale_drug_total": "Drugs - Sale Total",
  "sale_synth_narc": "Drugs - Sale Synthetic Narcotic",
  "sale_cannabis": "Drugs - Sale Cannabis",
  "sale_heroin_coke": "Drugs - Sale Heroin or Cocaine",
  "sale_other_drug": "Drugs - Sale Other Drug",
  "drunkenness": "Drunkenness",
  "dui": "DUI",
  "embezzlement": "Embezzlement",
  "family_off": "Family Offenses",
  "forgery": "Forgery",
  "fraud": "Fraud",
  "gamble_total": "Gambling - Total",
  "gamble_bookmaker": "Gambling - Bookmaking",
  "gamble_lottery": "Gambling - Numbers/Lottery",
  "gamble_other": "Gambling - Other",
  "liquor": "Liquor Laws",
  "manslaught_neg": "Manslaughter by Negligence",
  "mtr_veh_theft": "Motor Vehicle Theft",
  "murder": "Murder",
  "prostitution": "Prostitution",
  "rape": "Rape",
  "robbery": "Robbery",
  "runaways": "Runaway",
  "oth_sex_off": "Sex Offense - Other",
  "stolen_prop": "Stolen Property",
  "suspicion": "Suspicion",
  "theft": "Theft",
  "vagrancy": "Vagrancy",
  "vandalism": "Vandalism",
  "weapons": "Weapons Offenses"
};

var leoka_weapons = {
  "assault_gun": "Gun",
  "assault_knife": "Knife",
  "assault_oth_weap": "Other Weapon",
  "assault_unarmed": "Unarmed",
  "total_assaults": "Total"
};

var leoka_categories = [
  "Officers Assaulted",
  "Officers Killed",
  "Police Department Employees"
];

leoka_subcategories = [{
    "ambush": "Ambush",
    "burglary": "Burglary",
    "deranged": "Handling Person with Mental Illness",
    "disturbance": "Disturbance (fight, domestic violence, etc.)",
    "oth_arrest": "Attempt to Make Other Arrest",
    "prisoner": "Custody of Prisoner",
    "riot": "Civil Disorder (riot)",
    "robbery": "Robbery",
    "susp_pers": "Suspicious Person",
    "traffic": "Traffic Stop",
    "assaults_with_injury": "Total Assaults - With Injury",
    "assaults_no_injury": "Total Assaults - Without Injury",
    "total": "Total Assaults",
  },
  {
    "officers_killed_by_accident": "Killed by Accident",
    "officers_killed_by_felony": "Killed by Felony"
  },
  {
    "employees_civilians": "Civilians",
    "employees_officers": "Officers",
    "employees_total": "Total Employees",
  }
];


var arrest_categories = {
  "tot_arrests": "Total",
  "tot_male": "Total Male",
  "tot_female": "Total Female",

  // Race
  "amer_ind": "American Indian",
  "asian": "Asian",
  "black": "Black",
  "white": "White",
};
