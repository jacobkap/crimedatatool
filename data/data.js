var data_sources = [
  "Arrests by Age, Sex, and Race",
  "Arson",
  "Hate Crime Statistics",
  "Law Enforcement Officers Killed and Assaulted (LEOKA)",
  "National Incident-Based Reporting System (NIBRS)",
  "Offenses Known and Clearances by Arrest"
];

default_table_headers = [
  "agency",
  "year",
  "state",
  "population",
  "ORI",
  "school_name",
  "school_unique_ID",
  "number_of_students"
];

yaxis_labels = {
  "offenses": "# of Crimes",
  "nibrs": "# of Crimes",
  "offenses_rate": "Rate per 100,000 Population",
  "nibrs_rate": "Rate per 100,000 Population",
  "arrests": "# of Arrests",
  "arrests_rate": "Rate per 100,000 Population",
  "arrests_percent_of_arrests": "% of Arrests",
  "arrests_percent_of_all_arrests": "% of All Arrests for All Crimes",
  "police": "# of People",
  "police_rate": "Rate per 100,000 Population",
  "police_rate_per_officer": "Rate per Officer",
  "hate": "# of Incidents",
}




var nationwide_only = [
  "Nationwide - Total"
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

var crime_state_values = state_values
var nibrs_state_values = state_values


var nibrs_starts = {
  "offense": "total",
  "offender": "sex",
  "victim": "injury",
  "arrestee": "arrest_type",
  "property": "total"
}

nibrs_categories = {
  "offense": "Offense",
  "offender": "Offender",
  "victim": "Victim",
  "arrestee": "Arrestee",
  "property": "Property",
}

var nibrs_subcategories = []
nibrs_subcategories["offense"] = {
  "total": "Total",
  "clearance": "Clearance",
  "gun": "Gun Involved",
  "location": "Location",
  "subtype": "Subtype"
}
nibrs_subcategories["offender"] = {
  "total": "Total",
  "age": "Age",
  "race": "Race",
  "sex": "Sex"
}
nibrs_subcategories["victim"] = {
  "total": "Total",
  "age": "Age",
  "ethnicity": "Ethnicity",
  "injury": "Injury",
  "race": "Race",
  "relationship": "Relationship",
  "sex": "Sex"
}
nibrs_subcategories["arrestee"] = {
  "total": "Total",
  "age": "Age",
  "arrest_type": "Arrest Type",
  "ethnicity": "Ethnicity",
  "race": "Race",
  "sex": "Sex"
}
nibrs_subcategories["property"] = {
  "total": "Total",
  "value_mean": "Average Value (Mean)",
  "value_median": "Average Value (Median)",
  "drugs": "Drugs Seized"
}

nibrs_property_drugs_values = {
  "amphetamines_methamphetamines": "Amphetamines/Methamphetamines",
  "barbiturates": "Barbiturates",
  "cocaine": "Cocaine (not Crack)",
  "crack_cocaine": "Crack Cocaine",
  "hashish": "Hashish",
  "heroin": "Heroin",
  "lsd": "LSD",
  "marijuana": "Marijuana",
  "morphine": "Morphine",
  "opium": "Opium",
  "other_depressants": "Other Depressants",
  "other_drugs": "Other Drugs",
  "other_hallucinogrens": "Other Hallucinogens",
  "other_narcotics": "Other Narcotics",
  "other_stimulants": "Other Stimulants",
  "pcp": "PCP",
  "unknown_type_drug": "Unknown Drug Type"
}

nibrs_property_values = {
  "aircraft": "Aircraft",
  "aircraft_parts_accessories": "Aircraft Parts/Accessories",
  "alcohol": "Alcohol",
  "artistic_supplies_accessories": "Artistic Supplies/Accessories",
  "automobile": "Automobiles",
  "bicycles": "Bicycles",
  "building_materials": "Building Materials",
  "buses": "Buses",
  "camping_hunting_fishing_equipment_supplies": "Camping/Hunting/Fishing Equipment/Supplies",
  "chemicals": "Chemicals",
  "clothes_furs": "Clothes/Furs",
  "collections_collectibles": "Collections/Collectibles",
  "computer_hardware_software": "Computer Hardware/Software",
  "consumable_goods": "Consumable Goods",
  "credit_debit_cards": "Credit/Debit Cards",
  "crops": "Crops",
  "documents_personal_or_business": "Documents - Personal or Business",
  "drug_narcotic_equipment": "Drug/Narcotic Equipment",
  "drugs_narcotics": "Drugs/Narcotics",
  "explosives": "Explosives",
  "farm_equipment": "Farm Equipment",
  "firearm_accessories": "Firearm Accessories",
  "firearms": "Firearms",
  "fuel": "Fuel",
  "gambling_equipment": "Gambling Equipment",
  "heavy_construction_industrial_equipment": "Heavy Construction/Industrial Equipment",
  "household_goods": "Household Goods",
  "identity_intangible": "Identity - Intangible",
  "identity_documents": "Indentity Documents",
  "jewelry_precious_metals_gems": "Jewelry/Precious Metals",
  "law_enforcement_equipment": "Law Enforcement Equipment",
  "lawn_yard_garden_equipment": "Lawn/Yard/Garden Equipment",
  "livestock": "Livestock",
  "logging_equipment": "Logging Equipment",
  "medical_medical_lab_equipment": "Medical/medical lab equipment",
  "merchandise": "Merchandise",
  "metals_non_precious": "Metals, Non-precious",
  "money": "Money",
  "musical_instruments": "Musical Instruments",
  "negotiable_instruments": "Negotiable Instruments",
  "nonnegotiable_instruments": "Nonnegotiable Instruments",
  "office_type_equipment": "Office-type Equipment",
  "other": "Other",
  "other_motor_vehicles": "Other Motor Vehicles",
  "pending_inventory_of_property": "Pending Inventory (of property)",
  "pets": "Pets",
  "photographic_optical_equipment": "Photographic Equipement",
  "portible_electronic_communications": "Portible Electronic Communications",
  "purses_handbags_wallets": "Purses/Handbags/Wallets",
  "radios_tv_vcr_dvd_players": "Radios/TVs/VCRs",
  "recordings_audio_visual": "Recordings - Audio/Visual",
  "recreational_vehicles": "Recreational Vehicles",
  "recreational_sports_equipment": "Recreational/Sports Equipment",
  "special_category": "Special Category",
  "structures_other_commercial_business": "Structures - Commercial/Business",
  "structures_industrial_manufacturing": "Structures - Industrial Manufacturing",
  "structures_other": "Structures - Other",
  "structures_other_dwellings": "Structures-  Other Dwellings",
  "structures_public_community": "Structures - Public/Community",
  "structures_single_occupancy_dwellings": "Structures - Single Occupancy Dwellings",
  "structures_storage": "Structures - Storage",
  "tools_power_hand": "Tools - Power/Hand",
  "trailers": "Trailers",
  "trucks": "Trucks",
  "vehicle_parts_accessories": "Vehicle Parts/Accessories",
  "watercraft": "Watercraft",
  "watercraft_equipment_parts_accessories": "Watercraft Equipment/Parts/Accessories",
  "weapons_other": "Weapons - Other"
}

var nibrs_crime_values = []
nibrs_crime_values["offense"] = {

  "animal_cruelty": "Animal Cruelty",
  "arson": "Arson",
  "assault_offenses_aggravated_assault": "Assault Offenses - Aggravated Assault",
  "assault_offenses_intimidation": "Assault Offenses - Intimidation",
  "assault_offenses_simple_assault": "Assault Offenses - Simple Assault",
  "bribery": "Bribery",
  "burglary_breaking_and_entering": "Burglary/Breaking and Entering",
  "counterfeiting_forgery": "Counterfeiting/Forgery",
  "commerce_violations_export_violations" : "Commerce Violations - Export Violations",
  "commerce_violations_federal_liquor_offenses" : "Commerce Violations - Federal Liquor Offenses",
  "commerce_violations_federal_tobacco_offenses" : "Commerce Violations - Federal Tobacco Offenses",
    "commerce_violations_import_violations" : "Commerce Violations - Import Violations",
  "commerce_violations_wildlife_trafficking" : "Commerce Violations - Wildlife Trafficking",
  "drug_narcotic_offenses_drug_equipment_violations": "Drug Offenses - Equipment Violations",
  "drug_narcotic_offenses_drug_narcotic_violations": "Drug Offenses - Narcotic Violations",
  "destruction_damage_vandalism_of_property": "Destruction/Damage/Vandalism of Property",
    "embezzlement": "Embezzlement",
    "espionage" : "Espionage",
    "extortion_blackmail": "Extortion/Blackmail",
  "failure_to_appear" : "Failure To Appear",
    "federal_resource_violations" : "Federal Resource Violations",
  "fugitive_offenses_flight_to_avoid_deportation" : "Fugitive Offenses - Flight To Avoid Deportation",
  "fugitive_offenses_flight_to_avoid_prosecution" : "Fugitive Offenses - Flight To Avoid Prosecution",
  "fugitive_offenses_harboring_escappee_concealing_from_arrest" : "Fugitive Offenses - Harboring Escappee/Concealing From Arrest",
  "fraud_offenses_credit_card_atm_fraud": "Fraud Offenses - Credit Card/ATM Fraud",
  "fraud_offenses_false_pretenses_swindle_confidence_game": "Fraud Offenses - False Pretenses/Swindle/Confidence Game",
  "fraud_offenses_hacking_computer_invasion": "Fraud Offenses - Hacking/Computer Invasion",
  "fraud_offenses_identity_theft": "Fraud Offenses - Identity Theft",
  "fraud_offenses_impersonation": "Fraud Offenses - Impersonation",
  "fraud_offenses_money_laundering" : "Fraud Offenses - Money Laundering",
  "fraud_offenses_welfare_fraud": "Fraud Offenses - Welfare Fraud",
  "fraud_offenses_wire_fraud": "Fraud Offenses - Wire Fraud",
  "gambling_offenses_gambling_equipment_violations": "Gambling Offenses - Equipment Violations",
  "gambling_offenses_betting_wagering": "Gambling Offenses - Betting/Wagering",
  "gambling_offenses_operating_promoting_assisting_gambling": "Gambling Offenses - Operation/Promoting/Assisting Gambling",
  "gambling_offenses_sports_tampering": "Gambling Offenses - Sports Tampering",
 "justifiable_homicide_not_a_crime": "Homicide Offenses - Justifiable Homicide",
 "murder_nonnegligent_manslaughter": "Homicide Offenses - Murder/Nonnegligent Manslaughter",
 "negligent_manslaughter": "Homicide Offenses - Negligent Manslaughter",
 "human_trafficking_commercial_sex_acts": "Human Trafficking - Commercial Sex Acts",
 "human_trafficking_involuntary_servitude": "Human Trafficking - Involuntary Servitude",
  "immigration_violations_false_citizenship" : "Immigration Violations - False Citizenship",
  "immigration_violations_illegal_entry_into_the_united_states" : "Immigration Violations - Illegal Entry Into The United States",
  "immigration_violations_re_entry_into_the_united_states" : "Immigration Violations - Re-Entry Into The United States",
  "immigration_violations_smuggling_aliens" : "Immigration Violations - Smuggling Aliens",
  "kidnapping_abduction": "Kidnapping/Abduction",
  "perjury" : "Perjury",
  "pornography_obscene_material": "Pornography/Obscene Material",
    "prostitution_offenses_assisting_or_promoting_prostitution": "Prostitution Offenses - Assisting or Promoting Prostitution",
  "prostitutution_offenses_prostitution": "Prostitution Offenses - Prostitution",
  "prostitution_offenses_purchasing_prostitution": "Prostitution Offenses - Purchasing Prostitution",
  "robbery": "Robbery",
  "sex_offenses_failure_to_register_as_a_sex_offender" : "Sex Offenses - Failure To Register As A Sex Offender",
  "sex_offenses_fondling_indecent_liberties_child_molest": "Sex Offenses - Fondling/Child Molest",
  "sex_offenses_incest": "Sex Offenses - Incest",
  "sex_offenses_rape": "Sex Offenses - Rape",
  "sex_offenses_sexual_assault_with_an_object": "Sex Offenses - Sexual Assault with an Object",
  "sex_offenses_sodomy": "Sex Offenses - Sodomy",
  "sex_offenses_statutory_rape": "Sex Offenses - Statutory Rape",
  "stolen_property_offenses_receiving_selling_etc": "Stolen Property - Receiving/Selling/etc.",
  "theft" : "Theft",
  "treason" : "Treason",
  "motor_vehicle_theft": "Motor Vehicle Theft",
  "weapon_law_violations_explosives" : "Weapon Law Offenses - Explosives",
  "weapon_law_violations_violation_of_national_firearm_act_of_1934" : "Weapon Law Offenses - Violation of National Firearm Act of 1934",
  "weapon_law_violations_weapon_law_violations": "Weapon Law Offenses - Weapon Law Violations",
  "weapon_law_violations_weapons_of_mass_destruction" : "Weapon Law Offenses - Weapons of Mass Destruction"
};
nibrs_crime_values["injury_offenses"] = {

  "assault_offenses_aggravated_assault": "Assault Offenses - Aggravated Assault",
  "assault_offenses_simple_assault": "Assault Offenses - Simple Assault",
  "extortion_blackmail": "Extortion/Blackmail",
  "human_trafficking_commercial_sex_acts": "Human Trafficking - Commercial Sex Acts",
  "human_trafficking_involuntary_servitude": "Human Trafficking - Involuntary Servitude",
  "kidnapping_abduction": "Kidnapping/Abduction",
  "robbery": "Robbery",
  "sex_offenses_fondling_indecent_liberties_child_molest": "Sex Offenses - Fondling/Child Molest",
  "sex_offenses_rape": "Sex Offenses - Rape",
  "sex_offenses_sexual_assault_with_an_object": "Sex Offenses - Sexual Assault with an Object",
  "sex_offenses_sodomy": "Sex Offenses - Sodomy"

};
nibrs_crime_values["subtype_offenses_main"] = {
  "animal_cruelty": "Animal Cruelty",
  "counterfeiting_forgery": "Counterfeiting/Forgery",
  "commerce_violations_export_violations" : "Commerce Violations - Export Violations",
  "commerce_violations_federal_liquor_offenses" : "Commerce Violations - Federal Liquor Offenses",
  "commerce_violations_federal_tobacco_offenses" : "Commerce Violations - Federal Tobacco Offenses",
    "commerce_violations_import_violations" : "Commerce Offenses - Import Violations",
  "commerce_violations_wildlife_trafficking" : "Commerce Violations - Wildlife Trafficking",
  "drug_narcotic_offenses_drug_equipment_violations": "Drug Offenses - Equipment Violations",
  "fugitive_offenses_harboring_escappee_concealing_from_arrest" : "Fugitive Offenses - Harboring Escappee/Concealing From Arrest",
  "stolen_property_offenses_receiving_selling_etc": "Stolen Property - Receiving/Selling/etc.",
  "gambling_offenses_gambling_equipment_violations": "Gambling Offenses - Equipment Violations",
  "weapon_law_violations_explosives" : "Weapon Law Offenses - Explosives",
  "weapon_law_violations_violation_of_national_firearm_act_of_1934" : "Weapon Law Offenses - Violation of National Firearm Act of 1934",
  "weapon_law_violations_weapon_law_violations": "Weapon Law Offenses - Weapon Law Violations"
};
nibrs_crime_values["subtype_offenses_animal"] = {
  "animal_cruelty": "Animal Cruelty"
};
nibrs_crime_values["gun_offenses"] = {
  "assault_offenses_aggravated_assault": "Assault Offenses - Aggravated Assault",
  "extortion_blackmail": "Extortion/Blackmail",
  "human_trafficking_commercial_sex_acts": "Human Trafficking - Commercial Sex Acts",
  "human_trafficking_involuntary_servitude": "Human Trafficking - Involuntary Servitude",
  "justifiable_homicide_not_a_crime": "Homicide Offenses - Justifiable Homicide",
  "murder_nonnegligent_manslaughter": "Homicide Offenses - Murder/Nonnegligent Manslaughter",
  "negligent_manslaughter": "Homicide Offenses - Negligent Manslaughter",
    "kidnapping_abduction": "Kidnapping/Abduction",
      "robbery": "Robbery",
  "sex_offenses_fondling_indecent_liberties_child_molest": "Sex Offenses - Fondling/Child Molest",
  "sex_offenses_rape": "Sex Offenses - Rape",
  "sex_offenses_sexual_assault_with_an_object": "Sex Offenses - Sexual Assault with an Object",
  "sex_offenses_sodomy": "Sex Offenses - Sodomy",
  "weapon_law_violations_explosives" : "Weapon Law Offenses - Explosives",
  "weapon_law_violations_violation_of_national_firearm_act_of_1934" : "Weapon Law Offenses - Violation of National Firearm Act of 1934",
  "weapon_law_violations_weapon_law_violations": "Weapon Law Offenses - Weapon Law Violations"


};
nibrs_crime_values["victim_demographics_offenses"] = {
  "arson": "Arson",
  "assault_offenses_aggravated_assault": "Assault Offenses - Aggravated Assault",
  "assault_offenses_intimidation": "Assault Offenses - Intimidation",
  "assault_offenses_simple_assault": "Assault Offenses - Simple Assault",
  "bribery": "Bribery",
  "burglary_breaking_and_entering": "Burglary/Breaking and Entering",
  "counterfeiting_forgery": "Counterfeiting/Forgery",
  "destruction_damage_vandalism_of_property": "Destruction/Damage/Vandalism of Property",
  "embezzlement": "Embezzlement",
  "extortion_blackmail": "Extortion/Blackmail",
  "fraud_offenses_credit_card_atm_fraud": "Fraud Offenses - Credit Card/ATM Fraud",
  "fraud_offenses_false_pretenses_swindle_confidence_game": "Fraud Offenses - False Pretenses/Swindle/Confidence Game",
  "fraud_offenses_hacking_computer_invasion": "Fraud Offenses - Hacking/Computer Invasion",
  "fraud_offenses_identity_theft": "Fraud Offenses - Identity Theft",
  "fraud_offenses_impersonation": "Fraud Offenses - Impersonation",
  "fraud_offenses_money_laundering" : "Fraud Offenses - Money Laundering",
  "fraud_offenses_welfare_fraud": "Fraud Offenses - Welfare Fraud",
  "fraud_offenses_wire_fraud": "Fraud Offenses - Wire Fraud",
  "human_trafficking_commercial_sex_acts": "Human Trafficking - Commercial Sex Acts",
  "human_trafficking_involuntary_servitude": "Human Trafficking - Involuntary Servitude",
    "justifiable_homicide_not_a_crime": "Homicide Offenses - Justifiable Homicide",
    "murder_nonnegligent_manslaughter": "Homicide Offenses - Murder/Nonnegligent Manslaughter",
    "negligent_manslaughter": "Homicide Offenses - Negligent Manslaughter",
  "kidnapping_abduction": "Kidnapping/Abduction",
  "motor_vehicle_theft": "Motor Vehicle Theft",
  "robbery": "Robbery",
  "sex_offenses_failure_to_register_as_a_sex_offender" : "Sex Offenses - Failure To Register As A Sex Offender",
  "sex_offenses_fondling_indecent_liberties_child_molest": "Sex Offenses - Fondling/Child Molest",
  "sex_offenses_incest": "Sex Offenses - Incest",
  "sex_offenses_rape": "Sex Offenses - Rape",
  "sex_offenses_sexual_assault_with_an_object": "Sex Offenses - Sexual Assault with an Object",
  "sex_offenses_sodomy": "Sex Offenses - Sodomy",
  "sex_offenses_statutory_rape": "Sex Offenses - Statutory Rape",
  "stolen_property_offenses_receiving_selling_etc": "Stolen Property - Receiving/Selling/etc.",
"theft" : "Theft"
};
nibrs_crime_values["arrestee_offenses"] = {
  "all_other_offenses": "All Other Offenses",
  "animal_cruelty": "Animal Cruelty",
  "arson": "Arson",
  "assault_offenses_aggravated_assault": "Assault Offenses - Aggravated Assault",
  "assault_offenses_intimidation": "Assault Offenses - Intimidation",
  "assault_offenses_simple_assault": "Assault Offenses - Simple Assault",
  "bad_checks": "Bad Checks",
  "bond_default_failure_to_appear" : "Bond Default - Failure to Appear",
  "bribery": "Bribery",
  "burglary_breaking_and_entering": "Burglary/Breaking and Entering",
  "commerce_violations_federal_liquor_offenses" : "Commerce Violations - Federal Liquor Offenses",
  "commerce_violations_wildlife_trafficking" : "Commerce Violations - Wildlife Trafficking",
    "counterfeiting_forgery": "Counterfeiting/Forgery",
    "curfew_loitering_vagrancy_violations": "Curfew/Loitering/Vagrancy Violations",
    "destruction_damage_vandalism_of_property": "Destruction/Damage/Vandalism of Property",
    "disorderly_conduct": "Disorderly Conduct",
    "driving_under_the_influence": "Driving Under the Influence",
    "drug_narcotic_offenses_drug_equipment_violations": "Drug Offenses - Equipment Violations",
    "drug_narcotic_offenses_drug_narcotic_violations": "Drug Offenses - Narcotic Violations",
    "drunkenness": "Drunkenness",
    "embezzlement": "Embezzlement",
    "espionage" : "Espionage",
    "extortion_blackmail": "Extortion/Blackmail",
    "family_offenses_nonviolent": "Family Offenses Nonviolent",
  "fraud_offenses_credit_card_atm_fraud": "Fraud Offenses - Credit Card/ATM Fraud",
  "fraud_offenses_false_pretenses_swindle_confidence_game": "Fraud Offenses - False Pretenses/Swindle/Confidence Game",
  "fraud_offenses_hacking_computer_invasion": "Fraud Offenses - Hacking/Computer Invasion",
  "fraud_offenses_identity_theft": "Fraud Offenses - Identity Theft",
  "fraud_offenses_impersonation": "Fraud Offenses - Impersonation",
  "fraud_offenses_money_laundering" : "Fraud Offenses - Money Laundering",
  "fraud_offenses_welfare_fraud": "Fraud Offenses - Welfare Fraud",
  "fraud_offenses_wire_fraud": "Fraud Offenses - Wire Fraud",
  "fugitive_offenses_flight_to_avoid_deportation" : "Fugitive Offenses - Flight To Avoid Deportation",
  "fugitive_offenses_flight_to_avoid_prosecution" : "Fugitive Offenses - Flight To Avoid Prosecution",
  "fugitive_offenses_harboring_escappee_concealing_from_arrest" : "Fugitive Offenses - Harboring Escappee/Concealing From Arrest",
  "gambling_offenses_gambling_equipment_violations": "Gambling Offenses - Equipment Violations",
  "gambling_offenses_betting_wagering": "Gambling Offenses - Betting/Wagering",
  "gambling_offenses_operating_promoting_assisting_gambling": "Gambling Offenses - Operation/Promoting/Assisting Gambling",
  "gambling_offenses_sports_tampering": "Gambling Offenses - Sports Tampering",
  "justifiable_homicide_not_a_crime": "Homicide Offenses - Justifiable Homicide",
  "murder_nonnegligent_manslaughter": "Homicide Offenses - Murder/Nonnegligent Manslaughter",
  "negligent_manslaughter": "Homicide Offenses - Negligent Manslaughter",
  "human_trafficking_commercial_sex_acts": "Human Trafficking - Commercial Sex Acts",
  "human_trafficking_involuntary_servitude": "Human Trafficking - Involuntary Servitude",
  "immigration_violations_illegal_entry_into_the_united_states" : "Immigration Violations - Illegal Entry Into The United States",
  "kidnapping_abduction": "Kidnapping/Abduction",
    "liquor_law_violations": "Liquor Law Violations",
"motor_vehicle_theft": "Motor Vehicle Theft",
  "peeping_tom": "Peeping Tom",
  "perjury" : "Perjury",
  "pornography_obscene_material": "Pornography/Obscene Material",
  "prostitution_offenses_assisting_or_promoting_prostitution": "Prostitution Offenses - Assisting or Promoting Prostitution",
"prostitution_offenses_prostitution": "Prostitution Offenses - Prostitution",
"prostitution_offenses_purchasing_prostitution": "Prostitution Offenses - Purchasing Prostitution",
  "robbery": "Robbery",
  "runaway": "Runaway",
  "sex_offenses_failure_to_register_as_a_sex_offender" : "Sex Offenses - Failure To Register As A Sex Offender",
  "sex_offenses_fondling_indecent_liberties_child_molest": "Sex Offenses - Fondling/Child Molest",
  "sex_offenses_incest": "Sex Offenses - Incest",
  "sex_offenses_rape": "Sex Offenses - Rape",
  "sex_offenses_sexual_assault_with_an_object": "Sex Offenses - Sexual Assault with an Object",
  "sex_offenses_sodomy": "Sex Offenses - Sodomy",
  "sex_offenses_statutory_rape": "Sex Offenses - Statutory Rape",
  "stolen_property_offenses_receiving_selling_etc": "Stolen Property - Receiving/Selling/etc.",
  "theft": "Theft",
  "trespass_of_real_property": "Trespass",
  "weapon_law_violations_explosives" : "Weapon Law Offenses - Explosives",
  "weapon_law_violations_violation_of_national_firearm_act_of_1934" : "Weapon Law Offenses - Violation of National Firearm Act of 1934",
  "weapon_law_violations_weapon_law_violations": "Weapon Law Offenses - Weapon Law Violations",
  "weapon_law_violations_weapons_of_mass_destruction" : "Weapon Law Offenses - Weapons of Mass Destruction"
};






agency_desc_vals = {
  "year": "Year",
  "ORI": "ORI",
  "agency": "Agency",
  "state": "State",
  "population": "Population"
};

var hate_offenses = {
"arson"  : "Arson",
"assault" : "Assault",
"bribery": "Bribery",
"burglary_breaking_and_entering": "Burglary/Breaking and Entering",
"drug_offense": "Drug Offenses",
"extortion_blackmail": "Extortion/Blackmail",
"fraud": "Fraud",
"gambling_offenses": "Gambling Offenses",
"human_trafficking": "Human Trafficking",
"kidnapping_abduction": "Kidnapping/Abduction",
"motor_vehicle_theft": "Motor Vehicle Theft",
"murder_nonnegligent_manslaughter": "Murder/Nonnegligent Manslaughter",
"negligent_manslaughter": "Negligent Manslaughter",
"pornography_obscene material": "Pornography/Obscene Material",
"prostitution": "Prostitution",
"robbery": "Robbery",
"sex_offenses": "Sex Offenses",
"stolen_property_offenses": "Stolen Property Offenses",
"theft": "Theft",
"weapon_law_violations": "Weapon Law Violations"
}


var hate_bias_motivations = {
  "anti_american_indian_or_native_alaskan": "Anti-American Indian or Native Alaskan",
  "anti_arab": "Anti-Arab",
  "anti_asian": "Anti-Asian",
  "anti_atheism_agnosticism": "Anti-Atheism/Agnosticism",
  "anti_bisexual": "Anti-Bisexual",
  "anti_black": "Anti-Black",
  "anti_buddhist": "Anti-Buddhist",
  "anti_catholic": "Anti-Catholic",
  "anti_eastern_orthodox_greek_russian_other": "Anti-Eastern Orthodox (Greek, Russian, etc.)",
  "anti_other_race_ethnicity_ancestry_or_national_origin": "Anti-Ethnicity Other Than Hispanic",
  "anti_lesbian_female": "Anti-Female Homosexual (Lesbian)",
  "anti_female": "Anti-Female",
  "anti_gender_non_conforming": "Anti-Gender Non-Conforming",
  "anti_heterosexual": "Anti-Heterosexual",
  "anti_hindu": "Anti-Hindu",
  "anti_hispanic_or_latino": "Anti-Hispanic",
  "anti_jehovahs_witness": "Anti-Jevohah's Witness",
  "anti_jewish": "Anti-Jewish",
  "anti_lesbian_gay_bisexual_or_transgender_mixed_group": "Anti-Lesbian, Gay, Bisexual, or Transgender (Mixed Group LGBT)",
  "anti_gay_male": "Anti-Male Homosexual (Gay)",
  "anti_male": "Anti-Male",
  "anti_mental_disability": "Anti-Mental Disability",
  "anti_church_of_jesus_christ_mormon": "Anti-Mormon",
  "anti_multiple_races_group": "Anti-Multiple Racial Group",
  "anti_multiple_religions_group": "Anti-Multiple Religious Group",
  "anti_islamic_muslim": "Anti-Muslim",
  "anti_native_hawaiian_or_other_pacific_islander": "Anti-Native Hawaiian or Other Pacific Islander",
  "anti_other_christian": "Anti-Christian",
  "anti_other_religion": "Anti-Other Religion",
  "anti_physical_disability": "Anti-Physical Disability",
  "anti_protestant": "Anti-Protestant",
  "anti_sikh": "Anti-Sikh",
  "anti_transgender": "Anti-Transgender",
  "anti_white": "Anti-White"
};

var crime_values = {
  "all_crimes": "All Crimes",
  "assault_aggravated": "Aggravated Assault",
  "assault_total": "Assault - Total",
  "assault_with_a_gun": "Assault -  Gun",
  "assault_with_a_knife": "Assault - Knife",
  "assault_other_weapon": "Assault - Other Weapon",
  "assault_simple": "Assault - Simple Assault",
  "assault_unarmed": "Assault - Unarmed",
  "burglary_total": "Burglary - Total",
  "burglary_attempted": "Burglary - Attempted",
  "burglary_force_entry": "Burglary - Forcible Entry",
  "burglary_nonforce_entry": "Burglary - Nonforcible Entry",
  "motor_vehicle_theft_total": "Motor Vehicle Theft - Total",
  "motor_vehicle_theft_car": "Motor Vehicle Theft - Auto",
  "motor_vehicle_theft_other": "Motor Vehicle Theft - Other Vehicle",
  "motor_vehicle_theft_truck": "Motor Vehicle Theft - Truck/Bus",
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


var arson_values = {
  "grand_total"      : "Grand Total",
"total_mobile"  : "Motor Vehicles: Total",
"motor_vehicles"  : "Motor Vehicles: Motor Vehicles",
"other_mobile"      : "Motor Vehicles: Other Mobile",
"total_structures"  : "Structures: Total",
"community_public" : "Structures: Community/Public",
"industrial"        : "Structures: Industrial",
"single_occupancy"  : "Structures: Single Occupancy",
"storage"    : "Structures: Storage",
"other_commercial"  : "Structures: Other Commercial",
"other_residential" : "Structures: Other Residential",
"all_other_structures"  : "Structures: All Other Structures",
"all_other_arsons" : "All Other Arsons"
}

var arrest_values = {
  "all_arrests_total": "All Arrests Total",
  "all_other_offenses_excluding_traffic": "All Other Non-Traffic",
  "aggravated_assault": "Aggravated Assault",
  "other_assault": "Assault - Other",
  "arson": "Arson",
  "burglary": "Burglary",
  "curfew_loitering": "Curfew",
  "disorderly_conduct": "Disorderly Conduct",
  "drug_total_drug": "Drugs - Total Drugs",
  "drug_possess_drug_total": "Drugs - Possess Total",
  "drug_possess_synthetic_narcotics": "Drugs - Possess Synthetic Narcotic",
  "drug_possess_marijuana": "Drugs - Possess Marijuana",
  "drug_possess_opium_and_cocaine_and_derivatives_including_heroin": "Drugs - Possess Heroin or Cocaine",
  "drug_possess_other_drug": "Drugs - Possess Other Drug",
  "drug_sale_drug_total": "Drugs - Sale Total",
  "drug_sale_synthetic_narcotics": "Drugs - Sale Synthetic Narcotic",
  "drug_sale_marijuana": "Drugs - Sale Marijuana",
  "drug_sale_opium_and_cocaine_and_derivatives_including_heroin": "Drugs - Sale Heroin or Cocaine",
  "drug_sale_other_drug": "Drugs - Sale Other Drug",
  "drunkenness": "Drunkenness",
  "dui": "DUI",
  "embezzlement": "Embezzlement",
  "family_offenses": "Family Offenses",
  "forgery_and_counterfeiting": "Forgery",
  "fraud": "Fraud",
  "gambling_total": "Gambling - Total",
  "gambling_bookmaking_horse_and_sport_book": "Gambling - Bookmaking",
  "gambling_number_and_lottery": "Gambling - Numbers/Lottery",
  "gambling_other": "Gambling - Other",
  "human_trafficking_commercial_sex_acts": "Human Trafficking - Commercial Sex Acts",
  "human_trafficking_involuntary_servitude": "Human Trafficking - Involuntary Servitude",
  "liquor_laws": "Liquor Laws",
  "negligent_manslaughter": "Manslaughter by Negligence",
  "motor_vehicle_theft": "Motor Vehicle Theft",
  "murder_and_nonnegligent_manslaughter": "Murder/Nonnegligent Manslaughter",
  "prostitution_and_commercialized_vice_assisting_or_promoting_prostitution": "Prostitution - Assisting or Promoting",
  "prostitution_and_commercialized_vice_prostitution": "Prostitution - Prostitution",
  "prostitution_and_commercialized_vice_purchasing_prostitution": "Prostitution - Purchasing",
  "prostitution_and_commercialized_vice": "Prostitution - Total",
  "rape": "Rape",
  "robbery": "Robbery",
  "runaways": "Runaway",
  "other_sex_offenses": "Sex Offense - Other",
  "stolen_property_buying_receiving_possessing": "Stolen Property",
  "suspicion": "Suspicion",
  "theft": "Theft",
  "vagrancy": "Vagrancy",
  "vandalism": "Vandalism",
  "weapons_carrying_possessing_etc": "Weapons Offenses"
};

var police_weapons = {
  "assault_gun": "Gun",
  "assault_knife": "Knife",
  "assault_oth_weap": "Other Weapon",
  "assault_unarmed": "Unarmed",
  "total_assaults": "Total"
};

var police_categories = {
  "officers_assaulted": "Officers Assaulted",
  "officers_killed": "Officers Killed",
  "employees": "Police Department Employees"
};

var police_categories_starts = {
  "officers_assaulted": "total",
  "officers_killed": "officers_killed_by_felony",
  "employees": "employees_total"
};

police_subcategories = [];
police_subcategories["officers_assaulted"] = {
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
}
police_subcategories["officers_killed"] = {
  "officers_killed_by_accident": "Killed by Accident",
  "officers_killed_by_felony": "Killed by Felony"
}
police_subcategories["employees"] = {
  "employees_civilians": "Civilians",
  "employees_officers": "Officers",
  "employees_total": "Total Employees",
}

var arrest_age_categories = {
  "juvenile": "Juvenile",
  "adult": "Adult",
  "total": "Total",
};

var arrests_breakdown = {
  "Race": "Race",
  "Sex": "Sex",
  "Ethnicity": "Ethnicity"
}
