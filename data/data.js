var data_sources = [
  "Arrests by Age, Sex, and Race",
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

var crime_state_values = state_values.concat(["United States"])


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
  "automobiles": "Automobiles",
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
  "jewelry_precious_metals": "Jewelry/Precious Metals",
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
  "radios_t_vs_v_c_rs": "Radios/TVs/VCRs",
  "recordings_audio_visual": "Recordings - Audio/Visual",
  "recreational_vehicles": "Recreational Vehicles",
  "recreational_sports_equipment": "Recreational/Sports Equipment",
  "special_category": "Special Category",
  "structures_commercial_business": "Structures - Commercial/Business",
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
  "assault_offenses_aggravated_assault": "Aggravated Assault",
  "animal_cruelty": "Animal Cruelty",
  "arson": "Arson",
  "prostitution_offenses_assisting_or_promoting_prostitution": "Assisting or Promoting Prostitution",
  "gambling_offenses_betting_wagering": "Betting/Wagering",
  "bribery": "Bribery",
  "burglary_breaking_and_entering": "Burglary/Breaking and Entering",
  "counterfeiting_forgery": "Counterfeiting/Forgerty",
  "fraud_offenses_credit_card_atm_fraud": "Credit Card/ATM Fraud",
  "destruction_damage_vandalism_of_property": "Destruction/Damage/Vandalism of Property",
  "drug_narcotic_offenses_drug_equipment_violations": "Drug - Equipment Violations",
  "drug_narcotic_offenses_drug_narcotic_violations": "Drug - Narcotic Violations",
  "embezzlement": "Embezzlement",
  "espionage" : "Espionage",
  "weapon_law_violations_explosives" : "Explosives",
  "commerce_violations_export_violations" : "Export Violations",
  "extortion_blackmail": "Extortion/Blackmail",
  "immigration_violations_false_citizenship" : "False Citizenship",
  "fraud_offenses_false_pretenses_swindle_confidence_game": "False Pretenses/Swindle/Confidence Game",
  "failure_to_appear" : "Failure To Appear",
  "sex_offenses_failure_to_register_as_a_sex_offender" : "Failure To Register As A Sex Offender",
  "commerce_violations_federal_liquor_offenses" : "Federal Liquor Offenses",
  "federal_resource_violations" : "Federal Resource Violations",
  "commerce_violations_federal_tobacco_offenses" : "Federal Tobacco Offenses",
  "fugitive_offenses_flight_to_avoid_deportation" : "Flight To Avoid Deportation",
  "fugitive_offenses_flight_to_avoid_prosecution" : "Flight To Avoid Prosecution",
  "sex_offenses_fondling_incident_liberties_child_molest": "Fondling/Child Molest",
  "gambling_offenses_gambling_equipment_violations": "Gambling - Equipment Violations",
  "fraud_offenses_hacking_computer_invasion": "Hacking/Computer Invasion",
  "fugitive_offenses_harboring_escappee_concealing_from_arrest" : "Harboring Escappee/Concealing From Arrest",
  "human_trafficking_commercial_sex_acts": "Human Trafficking - Commercial Sex Acts",
  "human_trafficking_involuntary_servitude": "Human Trafficking - Involuntary Servitude",
  "fraud_offenses_identity_theft": "Identity Theft",
  "immigration_violations_illegal_entry_into_the_united_states" : "Illegal Entry Into The United States",
  "fraud_offenses_impersonation": "Impersonation",
  "commerce_violations_import_violations" : "Import Violations",
  "sex_offenses_incest": "Incest",
  "assault_offenses_intimidation": "Intimidation",
  "justifiable_homicide_not_a_crime": "Justifiable Homicide",
  "kidnapping_abduction": "Kidnapping/Abduction",
  "fraud_offenses_money_laundering" : "Money Laundering",
  "motor_vehicle_theft": "Motor Vehicle Theft",
  "murder_nonnegligent_manslaughter": "Murder/Nonnegligent Manslaughter",
  "negligent_manslaughter": "Negligent Manslaughter",
  "gambling_offenses_operating_promoting_assisting_gambling": "Operation/Promoting/Assisting Gambling",
  "perjury" : "Perjury",
  "pornography_obscene_material": "Pornography/Obscene Material",
  "prostitutution_offenses_prostitution": "Prostitution",
  "purchasing_prostitution": "Purchasing Prostitution",
  "sex_offenses_rape": "Rape",
  "immigration_violations_re_entry_into_the_united_states" : "Re-Entry Into The United States",
  "robbery": "Robbery",
  "sexual_assault_with_an_object": "Sexual Assault with an Object",
  "assault_offenses_simple_assault": "Simple Assault",
  "immigration_violations_smuggling_aliens" : "Smuggling Aliens",
  "sex_offenses_sodomy": "Sodomy",
  "gambling_offenses_sports_tampering": "Sports Tampering",
  "statutory_rape": "Statutory Rape",
  "stolen_property_offenses_receiving_selling_etc": "Stolen Property - Receiving/Selling/etc.",
  "larceny_theft_offenses_theft" : "Theft",
  "treason" : "Treason",
  "weapon_law_violations_weapon_law_violations": "Weapon Law Violations",
  "fraud_offenses_welfare_fraud": "Welfare Fraud",
  "commerce_violations_wildlife_trafficking" : "Wildlife Trafficking",
  "weapon_law_violations_weapons_of_mass_destruction" : "Weapons of Mass Destruction",
  "weapon_law_violations_violation_of_national_firearm_act_of_1934" : "Violation of National Firearm Act of 1934"
};
nibrs_crime_values["injury_offenses"] = {
  "assault_offenses_aggravated_assault": "Aggravated Assault",
  "extortion_blackmail": "Extortion/Blackmail",
  "sex_offenses_fondling_incident_liberties_child_molest": "Fondling/Child Molest",
  "human_trafficking_commercial_sex_acts": "Human Trafficking - Commercial Sex Acts",
  "human_trafficking_involuntary_servitude": "Human Trafficking - Involuntary Servitude",
  "kidnapping_abduction": "Kidnapping/Abduction",
  "sex_offenses_rape": "Rape",
  "robbery": "Robbery",
  "sexual_assault_with_an_object": "Sexual Assault with an Object",
  "assault_offenses_simple_assault": "Simple Assault",
  "sex_offenses_sodomy": "Sodomy"
};
nibrs_crime_values["subtype_offenses_main"] = {
  "animal_cruelty": "Animal Cruelty",
  "counterfeiting_forgery": "Counterfeiting/Forgery",
  "drug_narcotic_offenses_drug_equipment_violations": "Drug - Equipment Violations",
  "drug_narcotic_offenses_drug_narcotic_violations": "Drug - Narcotic Violations",
  "weapon_law_violations_explosives" : "Explosives",
  "gambling_offenses_gambling_equipment_violations": "Gambling Equipment Violations",
  "fugitive_offenses_harboring_escappee_concealing_from_arrest" : "Harboring Escappee/Concealing From Arrest",
  "stolen_property_offenses_receiving_selling_etc": "Stolen Property Offenses",
  "weapon_law_violations_weapon_law_violations": "Weapon Law Violations",
  "weapon_law_violations_violation_of_national_firearm_act_of_1934" : "Violation of National Firearm Act of 1934",
  "weapon_law_violations_weapons_of_mass_destruction" : "Weapons of Mass Destruction"
};
nibrs_crime_values["subtype_offenses_animal"] = {
  "animal_cruelty": "Animal Cruelty"
};
nibrs_crime_values["gun_offenses"] = {
  "assault_offenses_aggravated_assault": "Aggravated Assault",
  "extortion_blackmail": "Extortion/Blackmail",
  "weapon_law_violations_explosives" : "Explosives",
  "sex_offenses_fondling_incident_liberties_child_molest": "Fondling/Child Molest",
  "human_trafficking_commercial_sex_acts": "Human Trafficking - Commercial Sex Acts",
  "human_trafficking_involuntary_servitude": "Human Trafficking - Involuntary Servitude",
  "justifiable_homicide_not_a_crime": "Justifiable Homicide",
  "kidnapping_abduction": "Kidnapping/Abduction",
  "murder_nonnegligent_manslaughter": "Murder/Nonnegligent Manslaughter",
  "negligent_manslaughter": "Negligent Manslaughter",
  "sex_offenses_rape": "Rape",
  "robbery": "Robbery",
  "sexual_assault_with_an_object": "Sexual Assault with an Object",
  "weapon_law_violations_weapon_law_violations": "Weapon Law Violations",
  "sex_offenses_sodomy": "Sodomy",
  "weapon_law_violations_violation_of_national_firearm_act_of_1934" : "Violation of National Firearm Act of 1934",
  "weapon_law_violations_weapons_of_mass_destruction" : "Weapons of Mass Destruction"

};
nibrs_crime_values["victim_demographics_offenses"] = {
  "assault_offenses_aggravated_assault": "Aggravated Assault",
  "arson": "Arson",
  "bribery": "Bribery",
  "burglary_breaking_and_entering": "Burglary/Breaking and Entering",
  "counterfeiting_forgery": "Counterfeiting/Forgery",
  "fraud_offenses_credit_card_atm_fraud": "Credit Card/ATM Fraud",
  "destruction_damage_vandalism_of_property": "Destruction/Damage/Vandalism of Property",
  "embezzlement": "Embezzlement",
  "extortion_blackmail": "Extortion/Blackmail",
  "fraud_offenses_false_pretenses_swindle_confidence_game": "False Pretenses/Swindle/Confidence Game",
  "failure_to_appear" : "Failure To Appear",
  "federal_resource_violations" : "Federal Resource Violations",
  "fugitive_offenses_flight_to_avoid_deportation" : "Flight To Avoid Deportation",
  "fugitive_offenses_flight_to_avoid_prosecution" : "Flight To Avoid Prosecution",
  "sex_offenses_fondling_incident_liberties_child_molest": "Fondling/Child Molest",
  "fraud_offenses_hacking_computer_invasion": "Hacking/Computer Invasion",
  "human_trafficking_commercial_sex_acts": "Human Trafficking - Commercial Sex Acts",
  "human_trafficking_involuntary_servitude": "Human Trafficking - Involuntary Servitude",
  "fraud_offenses_identity_theft": "Identity Theft",
  "fraud_offenses_impersonation": "Impersonation",
  "sex_offenses_incest": "Incest",
  "assault_offenses_intimidation": "Intimidation",
  "justifiable_homicide_not_a_crime": "Justifiable Homicide",
  "kidnapping_abduction": "Kidnapping/Abduction",
  "motor_vehicle_theft": "Motor Vehicle Theft",
  "fraud_offenses_money_laundering" : "Money Laundering",
  "murder_nonnegligent_manslaughter": "Murder/Nonnegligent Manslaughter",
  "negligent_manslaughter": "Negligent Manslaughter",
  "pocket_picking": "Pocket-Picking",
  "sex_offenses_rape": "Rape",
  "robbery": "Robbery",
  "sexual_assault_with_an_object": "Sexual Assault With an Object",
  "assault_offenses_simple_assault": "Simple Assault",
  "immigration_violations_smuggling_aliens" : "Smuggling Aliens",
  "sex_offenses_sodomy": "Sodomy",
  "statutory_rape": "Statutory Rape",
  "stolen_property_offenses_receiving_selling_etc": "Stolen Property - Receiving/Selling/etc.",
  "theft" : "Theft",
  "fraud_offenses_welfare_fraud": "Welfare Fraud",
  "wire_fraud": "Wire Fraud"
};
nibrs_crime_values["arrestee_offenses"] = {
  "assault_offenses_aggravated_assault": "Aggravated Assault",
  "all_other_offenses": "All Other Offenses",
  "animal_cruelty": "Animal Cruelty",
  "arson": "Arson",
  "prostitution_offenses_assisting_or_promoting_prostitution": "Assisting/Promoting Prostitution",
  "bad_checks": "Bad Checks",
  "bribery": "Bribery",
  "gambling_offenses_betting_wagering": "Betting/Wagering",
  "burglary_breaking_and_entering": "Burglary/Breaking and Entering",
  "counterfeiting_forgery": "Counterfeiting/Forgery",
  "fraud_offenses_credit_card_atm_fraud": "Credit Card/ATM Fraud",
  "curfew_loitering_vagrancy_violations": "Curfew/Loitering/Vagrancy Violations",
  "destruction_damage_vandalism_of_property": "Destruction/Damage/Vandalism of Property",
  "disorderly_conduct": "Disorderly Conduct",
  "driving_under_the_influence": "Driving Under the Influence",
  "drug_narcotic_offenses_drug_equipment_violations": "Drug - Equipment Violations",
  "drug_narcotic_offenses_drug_narcotic_violations": "Drug - Narcotic Violations",
  "drunkenness": "Drunkenness",
  "embezzlement": "Embezzlement",
  "commerce_violations_export_violations" : "Export Violations",
  "espionage" : "Espionage",
  "weapon_law_violations_explosives" : "Explosives",
  "extortion_blackmail": "Extortion/Blackmail",
  "sex_offenses_failure_to_register_as_a_sex_offender" : "Failure To Register As A Sex Offender",
  "immigration_violations_false_citizenship" : "False Citizenship",
  "fraud_offenses_false_pretenses_swindle_confidence_game": "False Pretenses/Swindle/Confidence Game",
  "failure_to_appear" : "Failure To Appear",
  "family_offenses_nonviolent": "Family Offenses Nonviolent",
  "commerce_violations_federal_liquor_offenses" : "Federal Liquor Offenses",
  "commerce_violations_federal_tobacco_offenses" : "Federal Tobacco Offenses",
  "federal_resource_violations" : "Federal Resource Violations",
  "fugitive_offenses_flight_to_avoid_deportation" : "Flight To Avoid Deportation",
  "sex_offenses_fondling_incident_liberties_child_molest": "Fondling/Child Molest",
  "fugitive_offenses_flight_to_avoid_prosecution" : "Flight To Avoid Prosecution",
  "gambling_offenses_gambling_equipment_violations": "Gambling - Equipment Violations",
  "fraud_offenses_hacking_computer_invasion": "Hacking/Computer Invasion",
  "fugitive_offenses_harboring_escappee_concealing_from_arrest" : "Harboring Escappee/Concealing From Arrest",
  "human_trafficking_commercial_sex_acts": "Human Trafficking - Commercial Sex Acts",
  "human_trafficking_involuntary_servitude": "Human Trafficking - Involuntary Servitude",
  "fraud_offenses_identity_theft": "Identity Theft",
  "immigration_violations_illegal_entry_into_the_united_states" : "Illegal Entry Into The United States",
  "commerce_violations_import_violations" : "Import Violations",
  "fraud_offenses_impersonation": "Impersonation",
  "sex_offenses_incest": "Incest",
  "assault_offenses_intimidation": "Intimidation",
  "justifiable_homicide_not_a_crime": "Justifiable Homicide",
  "kidnapping_abduction": "Kidnapping/Abduction",
  "liquor_law_violations": "Liquor Law Violations",
  "motor_vehicle_theft": "Motor Vehicle Theft",
  "fraud_offenses_money_laundering" : "Money Laundering",
  "murder_nonnegligent_manslaughter": "Murder/Nonnegligent Manslaughter",
  "negligent_manslaughter": "Negligent Manslaughter",
  "gambling_offenses_operating_promoting_assisting_gambling": "Gambling - Operating/Promoting/Assisting",
  "peeping_tom": "Peeping Tom",
  "perjury" : "Perjury",
  "pornography_obscene_material": "Pornography/Obscene Material",
  "prostitutution_offenses_prostitution": "Prostitution",
  "purchasing_prostitution": "Purchasing Prostitution",
  "sex_offenses_rape": "Rape",
  "immigration_violations_re_entry_into_the_united_states" : "Re-Entry Into The United States",
  "robbery": "Robbery",
  "runaway": "Runaway",
  "sexual_assault_with_an_object": "Sexual Assault With an Object",
  "shoplifting": "Shoplifting",
  "assault_offenses_simple_assault": "Simple Assault",
  "immigration_violations_smuggling_aliens" : "Smuggling Aliens",
  "sex_offenses_sodomy": "Sodomy",
  "gambling_offenses_sports_tampering": "Sports Tampering",
  "statutory_rape": "Statutory Rape",
  "stolen_property_offenses_receiving_selling_etc": "Stolen Property - Receiving/Selling/etc.",
  "larceny_theft_offenses_theft": "Theft",
  "treason" : "Treason",
  "trespass_of_real_property": "Trespass",
  "weapon_law_violations_weapon_law_violations": "Weapon Law Violations",
  "weapon_law_violations_weapons_of_mass_destruction" : "Weapons of Mass Destruction",
  "fraud_offenses_welfare_fraud": "Welfare Fraud",
  "commerce_violations_wildlife_trafficking" : "Wildlife Trafficking",
  "wire_fraud": "Wire Fraud",
  "weapon_law_violations_violation_of_national_firearm_act_of_1934" : "Violation of National Firearm Act of 1934"
};






agency_desc_vals = {
  "year": "Year",
  "ORI": "ORI",
  "agency": "Agency",
  "state": "State",
  "population": "Population"
};


var hate_bias_motivations = {
  "anti_american_indian_or_native_alaskan": "Anti-American Indian or Native Alaskan",
  "anti_arab": "Anti-Arab",
  "anti_asian": "Anti-Asian",
  "anti_atheism/agnosticism": "Anti-Atheism/Agnosticism",
  "anti_bisexual": "Anti-Bisexual",
  "anti_black": "Anti-Black",
  "anti_buddhist": "Anti-Buddhist",
  "anti_catholic": "Anti-Catholic",
  "anti_eastern_orthodox_greek_russian_etc": "Anti-Eastern Orthodox (Greek, Russian, etc.)",
  "anti_ethnicity_other_than_hispanic": "Anti-Ethnicity Other Than Hispanic",
  "anti_female_homosexual_lesbian": "Anti-Female Homosexual (Lesbian)",
  "anti_female": "Anti-Female",
  "anti_gender_non_conforming": "Anti-Gender Non-Conforming",
  "anti_heterosexual": "Anti-Heterosexual",
  "anti_hindu": "Anti-Hindu",
  "anti_hispanic": "Anti-Hispanic",
  "anti_jehovahs_witness": "Anti-Jevohah's Witness",
  "anti_jewish": "Anti-Jewish",
  "anti_lesbian_gay_bisexual_or_transgender_mixed_group_lgbt": "Anti-Lesbian, Gay, Bisexual, or Transgender (Mixed Group LGBT)",
  "anti_male_homosexual_gay": "Anti-Male Homosexual (Gay)",
  "anti_male": "Anti-Male",
  "anti_mental_disability": "Anti-Mental Disability",
  "anti_mormon": "Anti-Mormon",
  "anti_multi_racial_group": "Anti-Multiple Racial Group",
  "anti_multi_religious_group": "Anti-Multiple Religious Group",
  "anti_muslim": "Anti-Muslim",
  "anti_native_hawaiian_or_other_pacific_islander": "Anti-Native Hawaiian or Other Pacific Islander",
  "anti_other_christian": "Anti-Christian",
  "anti_other_religion": "Anti-Other Religion",
  "anti_physical_disability": "Anti-Physical Disability",
  "anti_protestant": "Anti-Protestant",
  "anti_sikh": "Anti-Sikh",
  "anti_transgender": "Anti-Transgender",
  "anti_white": "Anti-White",
  "anti_total": "Anti-Total"
};

var crime_values = {
  "all_crimes": "All Crimes",
  "arson_all_oth_structures": "Arson - All Other Structures",
  "arson_industrial": "Arson - Industrial Building",
  "arson_other_commercial": "Arson - Other Commercial Building",
  "arson_other_residential": "Arson - Other Residential Building",
  "arson_community_public": "Arson - Public Community Building",
  "arson_single_occupancy": "Arson - Single Occupancy Building",
  "arson_storage": "Arson - Storage Building",
  "arson_other_mobile": "Arson - Other Vehicle",
  "arson_motor_vehicles": "Arson - Motor Vehicle",
  "arson_total_mobile": "Arson - Total Vehicles",
  "arson_total_structures": "Arson - Total Buildings",
  "arson_all_other": "Arson - All Other",
  "arson_grand_total": "Arson - Grand Total",
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

var state_level_crime_values = {
  "assault_aggravated": "Aggravated Assault",
  "burg_total": "Burglary - Total",
  "index_property": "Index - Property",
  "index_violent": "Index - Violent",
  "index_total": "Index - Total",
  "mtr_veh_theft_total": "Motor Vehicle Theft - Total",
  "murder": "Murder",
  "rape_total": "Rape - Total",
  "robbery_total": "Robbery - Total",
  "theft_total": "Theft - Total"
};




var arrest_values = {
  "all_arrests_total": "All Arrests Total",
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
  "gamble_bookmake": "Gambling - Bookmaking",
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
  "juv": "Juvenile",
  "adult": "Adult",
  "tot": "Total",
};

var arrests_breakdown = {
  "Race": "Race",
  "Sex": "Sex",
  "Ethnicity": "Ethnicity"
}
