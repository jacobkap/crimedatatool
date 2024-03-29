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
  "prisoners": "# of Prisoners",
  "prisoners_rate": "Rate per 100,000 Population",
  "prisoners_rate_adults": "Rate per 100,000 Adults",
  "prisoners_rate_age_18_65": "Rate per 100,000 Aged 18-65",
  "alcohol": "# of Drinks",
  "hate": "# of Incidents",
  "school": "# of Incidents",
  "school_rate": "Rate per 1,000 Students",
  "borderpatrol": "",
  "death": "# of Deaths",
  "death_rate": "Deaths per 100,000 population",
  "death_rate_age_adjusted": "Age-Adjusted Deaths per 100,000 population"
}


var border_sectors = [
  "Nationwide - Total",
  "Coastal Border - Total",
  "Miami",
  "New Orleans",
  "Ramey",
  "Northern Border - Total",
  "Blaine",
  "Buffalo",
  "Detroit",
  "Grand Forks",
  "Havre",
  "Houlton",
  "Spokane",
  "Southwest Border - Total",
  "Big Bend",
  "Del Rio",
  "El Centro",
  "El Paso",
  "Laredo",
  "Rio Grande Valley",
  "San Diego",
  "Swanton",
  "Tucson",
  "Yuma"
];


var southwest_border_sectors = [
  "Southwest Border - Total",
  "Big Bend",
  "Del Rio",
  "El Centro",
  "El Paso",
  "Laredo",
  "Rio Grande Valley",
  "San Diego",
  "Swanton",
  "Tucson",
  "Yuma"
];

var border_regions = [
  "Nationwide - Total",
  "Coastal Border - Total",
  "Northern Border - Total",
  "Southwest Border - Total",
];

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

var jail_state_values = [
  "California",
  "Illinois",
  "Texas"
];

var nibrs_state_values = state_values

var border_categories = {
  "seizures": "Apprehensions and Seizures",
  "staffing": "Border Patrol Staffing",
  "family": "Family and Unaccompanied Children Apprehensions",
  "nationwide": "Nationwide Apprehensions",
  "sector_profile": "Sector Profile",
  "southwest_apprehensions": "Southwest Border Apprehensions",
  "southwest_deaths": "Southwest Border Deaths",
};

var jail_categories = []
jail_categories["California"] = {
  "adp_of_maximum_security_inmates": "Average Daily Population - Maximum Security Inmates",
  "adp_of_medium_security_inmates": "Average Daily Population - Medium Security Inmates",
  "adp_of_minimum_security_inmates": "Average Daily Population - Minimum Security Inmates",
  "avg_daily_pop_sentenced_female": "Average Daily Population - Sentenced Female",
  "avg_daily_pop_sentenced_male": "Average Daily Population - Sentenced Male",
  "avg_daily_pop_unsentenced_female": "Average Daily Population - Unsentenced Female",
  "avg_daily_pop_unsentenced_male": "Average Daily Population - Unsentenced Male",
  "avg_daily_pop_total_jurisdiction": "Average Daily Population - Total Jurisdiction",
  "avg_fed_inmate_housed_contract": "Average Daily Population - Federal Inmate Housed on Contract",
  "avg_felony_inmate_sentenced": "Average Daily Population - Felony Inmate Sentenced",
  "avg_felony_inmate_total": "Average Daily Population - Felony Inmate Total",
  "avg_felony_inmate_unsentenced": "Average Daily Population - Felony Inmate Unsentenced",
  "avg_inmate_get_sick_bed": "Average Daily Population - Inmate Get Sick Bed",
  "avg_inmate_in_hospital": "Average Daily Population - Inmate In Hospital",
  "avg_inmate_need_reg_med_attent": "Average Daily Population - Inmate Need Regular Medical Attention",
  "avg_inmate_not_assign_housing": "Average Daily Population - Inmate Not Assigned Housing",
  "avg_inmate_wait_transport_prison": "Average Daily Population - Inmate Wait Transport Prison",
  "avg_inmates_get_medical_bed": "Average Daily Population - Inmates Get Medical Bed",
  "avg_inmates_get_mental_heath_bed": "Average Daily Population - Inmates Get Mental Heath Bed",
  "avg_inmates_need_reg_ment_health": "Average Daily Population - Inmates Need Regular Mental Health Attention",
  "avg_local_inmate_housed_contract": "Average Daily Population - Local Inmate Housed Contract",
  "avg_misdemean_inmate_sentenced": "Average Daily Population - Misdemeanant Inmate Sentenced",
  "avg_misdemean_inmate_unsentenced": "Average Daily Population - Misdemeanant Inmate Unsentenced",
  "avg_misdemean_inmate_total": "Average Daily Population - Misdemeanant Inmate Total",
  "avg_own_inmate_housed_elsewhere": "Average Daily Population - Own Inmate Housed Elsewhere",
  "avg_state_inmate_housed_contract": "Average Daily Population - State Inmate Housed Contract",
  "highest_inmate_count": "Highest Inmate Count",
  "mental_heath_case_open_end_month": "Number of Mental Heath Case Open End Month",
  "num_dental_encounters": "Number of Dental Encounters",
  "num_doctor_occurrences": "Number of Doctor Occurrences",
  "num_inmate_get_mental_heath_bed": "Number of Inmate Get Mental Heath Bed",
  "num_inmate_get_psych_meds": "Number of Inmate Get Psych Meds",
  "num_inmates_seen_sick_call": "Number of Inmates Seen Sick Call",
  "num_new_mental_health_cases": "Number of New Mental Health Cases",
  "num_offsite_medical_appointment": "Number of Offsite Medical Appointment",
  "tot_pretrial_release_lack_bed": "Total Pretrial Release Lack Bed",
  "tot_sentenced_release_lack_bed": "Total Sentenced Release Lack Bed",
  "total_juv_in_custody": "Total Juveniles In Custody",
  "total_num_persons_booked": "Total Number of Persons Booked into Jail"
}
jail_categories["Illinois"] = {
  "number_of_inmates_booked": "Total Number of Persons Booked into Jail",
  "average_daily_population": "Average Daily Population - Total Jurisdiction"
}
jail_categories["Texas"] = {
  "available_beds": "Available Beds",
  "immigrant_detainer_cost_in_dollars": "Immigrant Detainer Cost In Dollars",
  "num_bench_warrants": "Number of Bench Warrants",
  "num_convicted_felons": "Number of Convicted Felons",
  "num_convicted_felony_sentenced_jail": "Number of Convicted - Felony Sentenced to Jail",
  "num_convicted_misdemeanor": "Number of Convicted - Misdemeanor",
  "num_convicted_state_jail_felons_to_county_jail_time": "Number of Convicted - State Jail Felons to County Jail Time",
  "num_convicted_state_jail_felons_to_state_jail_time": "Number of Convicted - State Jail Felons to State Jail Time",
  "num_federal": "Number of Federal Inmates",
  "num_of_immigrant_detainer_inmate_days": "Number of Immigrant Detainer Inmate Days",
  "num_of_immigrant_detainer_inmates": "Number of Immigrant Detainer Inmates",
  "num_parole_violators": "Number of Parole Violators",
  "num_parole_violators_new_charge": "Number of Parole Violators With a New Charge",
  "num_pregnant_women": "Number of Pregnant Women",
  "num_pretrial_felons": "Number of Pretrial Felons",
  "num_pretrial_misdemeanor": "Number of Pretrial Misdemeanants",
  "num_pretrial_state_jail_felons": "Number of Pretrial State Jail Felons",
  "percent_of_capacity": "Percent of Capacity",
  "total_capacity": "Total Capacity",
  "total_contract": "Total Contract",
  "total_local": "Total Local",
  "total_others": "Total Others",
  "total_population": "Total Inmate Population"
}

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




var border_categories_starts = {
  "seizures": "heroin_ounces",
  "staffing": "number_of_agents",
  "family": "unaccompanied_child_apprehension",
  "nationwide": "total_apprehensions",
  "sector_profile": "cocaine_pounds",
  "southwest_apprehensions": "total_apprehensions",
  "southwest_deaths": "deaths"
};
var border_subcategories = []
border_subcategories["seizures"] = {
  "ammunition_rounds": "Ammunition (Rounds)",
  "other_than_mexican_apprehensions": "Apprehensions (Other than Mexicans)",
  "apprehensions": "Apprehensions - Total",
  "cocaine_pounds": "Cocaine (in Pounds)",
  "cocaine_seizures": "Cocaine (# of Seizures)",
  "ecstasy_pounds": "Ecstasy (in Pounds)",
  "ecstasy_seizures": "Ecstasy (# of Seizures)",
  "heroin_ounces": "Heroin (in Ounces)",
  "heroin_seizures": "Heroin (# of Seizures)",
  "marijuana_pounds": "Marijuana (in Pounds)",
  "marijuana_seizures": "Marijuana (# of Seizures)",
  "methamphetamine_pounds": "Methamphetamine (in Pounds)",
  "methamphetamine_seizures": "Methamphetamine (# of Seizures)",
  "other_drugs_pounds": "Other Drugs (in Pounds)",
  "other_drugs_seizures": "Other Drugs (# of Seizures)",
  "firearms": "Firearms",
  "conveyances": "Conveyances",
  "currency_in_dollars": "Currency (in Dollars)"
}
border_subcategories["staffing"] = {
  "number_of_agents": "Number of Agents"
}
border_subcategories["family"] = {
  "total_apprehensions": "Apprehensions - Total",
  "family_apprehensions": "Apprehensions - Family",
  "unaccompanied_child_apprehension": "Apprehensions - Unaccompanied Juveniles"
}
border_subcategories["nationwide"] = {
  "total_apprehensions": "Total Apprehensions"
}
border_subcategories["sector_profile"] = {
  "assaults": "Assaults",
  "accompanied_juveniles": "Apprehensions - Accompanied Juveniles",
  "unaccompanied_juveniles": "Apprehensions - Unaccompanied Juveniles",
  "female_apprehensions": "Apprehensions - Females",
  "male_apprehensions": "Apprehensions - Males",
  "other_than_mexican_apprehensions": "Apprehensions - Other than Mexican",
  "total_juveniles": "Apprehensions - Total Juveniles",
  "total_adults": "Apprehensions - Total Adults",
  "total_apprehensions": "Apprehensions - Total",
  "cocaine_pounds": "Cocaine Seizures (in Pounds)",
  "marijuana_pounds": "Marijuana Seizures (in Pounds)",
  "deaths": "Deaths (Southwest Border Only)",
  "accepted_prosecutions": "Number of Accepted Prosecutions",
  "number_of_agents": "Number of CBP Agents",
  "rescues": "Rescues (Southwest Border Only)"
}
border_subcategories["southwest_apprehensions"] = {
  "total_apprehensions": "Apprehensions - Total"
}
border_subcategories["southwest_deaths"] = {
  "deaths": "Deaths"
}


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

alcohol_state_values = ["US Total", "West Region", "South Region", "Midwest Region", "Northeast Region"];
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

prisoner_subcategory_starts = {
  "custody": "total_under_custody",
  "custody_crime": "murder",
  "jurisdiction": "total_under_jurisdiction",
  "race_ethnicity": "american_indian",
  "admission": "total_admissions",
  "admissions_crime": "murder",
  "release": "total_releases",
  "releases_crime": "murder",
  "capacity": "operational_capacity",
  "noncitizen_juvenile": "in_custody_not_us_citizens",
  "death": "total_deaths",
  "aids": "total_in_custody_hiv_positive_or_with_aids"
}
var prisoners_subcategory = []
prisoners_subcategory["custody"] = {
  "custody_unsentenced": "Unsentenced or <1 Year Sentence Prisoners",
  "total_under_custody": "Total Prisoners",
  "custody_public_prisons": "In Public Prison",
  "custody_private_prison": "In Private Prison"
}
prisoners_subcategory["custody_crime"] = prison_crimes
prisoners_subcategory["jurisdiction"] = {
  "jurisdiction_housed_in_local_facility": "In Local Facility",
  "local_facilities_solely_to_ease_prison_crowding": "In Local Facility to Ease Prison Overcrowding",
  "jurisdiction_private_prison_in_state": "In Private Prison In-State",
  "jurisdiction_private_prison_out_of_state": "In Private Prison Out-of-State",
  "total_under_jurisdiction": "Total Prisoners",
  "jurisdiction_unsentenced": "Unsentenced or <1 Year Sentence Prisoners"
}
prisoners_subcategory["race_ethnicity"] = {
  "american_indian": "American Indian",
  "asian": "Asian",
  "black": "Black",
  "hispanic": "Hispanic/Latino",
  "other_or_unknown": "Other/Unknown",
  "white": "White"
}
prisoners_subcategory["admission"] = {
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
}
prisoners_subcategory["admissions_crime"] = prison_crimes
prisoners_subcategory["release"] = {
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
}
prisoners_subcategory["releases_crime"] = prison_crimes
prisoners_subcategory["capacity"] = {
  "design_capacity": "Design Capacity of Prisons",
  "operational_capacity": "Operational Capacity of Prisons",
  "rated_capacity": "Rated Capacity of Prisons"
}
prisoners_subcategory["noncitizen_juvenile"] = {
  "in_custody_not_us_citizens": "Not U.S. Citizen",
  "in_custody_under_18_years_of_age": "Under 18 Years of Age"
}
prisoners_subcategory["death"] = {
  "deaths_from_accidental_injury_to_self": "Accidental Injury to Self",
  "deaths_from_aids": "AIDS",
  "deaths_caused_by_another_person": "Caused by Another Person",
  "deaths_from_execution": "Execution",
  "deaths_from_illness_or_natural_cause": "Illness or Natural Cause",
  "deaths_from_homicide_by_other_inmates": "Murder by Other Inmates",
  "deaths_from_other_homicide": "Other Murder",
  "deaths_from_suicide": "Suicide",
  "total_deaths": "Total Deaths"
}
prisoners_subcategory["aids"] = {
  "asymptomatic_hiv_positive": "Asymptomatic HIV Positive",
  "confirmed_to_have_aids": "Confirmed to have AIDS",
  "infected_with_lesser_forms_of_symptomatic_hiv_disease": "Infected with Lesser Forms of Symptomatic HIV",
  "total_in_custody_hiv_positive_or_with_aids": "Total Prisoners With HIV or Aids"
}


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


school_categories = {
  "arrests": "Arrests",
  "crimes": "Crimes",
  "discipline": "Referred for Disciplinary Actions",
  "hate": "Hate Crimes",
  "vawa": "Violence Against Women Act"
}

var school_categories_starts = {
  "arrests": "drug_law_violations",
  "crimes": "sex_offenses_total",
  "discipline": "drug_law_violations",
  "hate": "total",
  "vawa": "domestic_violence"
};

school_subcategories = [];
school_subcategories["arrests"] = {
  "drug_law_violations": "Drug Law Violations",
  "illegal_weapons_possession": "Illegal Weapon Possession",
  "liquor_law_violations": "Liquor Law Violations",
  "total": "Total"
};
school_subcategories["crimes"] = {
  "aggravated_assault": "Assault - Aggravated",
  "arson": "Arson",
  "burglary": "Burglary",
  "fondling": "Fondling",
  "incest": "Incest",
  "motor_vehicle_theft": "Motor Vehicle Theft",
  "murder_non_negligent_manslaughter": "Murder and Non-Negligent Manslaughter",
  "negligent_manslaughter": "Negligent Manslaughter",
  "rape": "Rape",
  "robbery": "Robbery",
  "sex_offenses_forcible": "Sex Offenses - Forcible",
  "sex_offenses_non_forcible": "Sex Offenses - Non-Forcible",
  "sex_offenses_total": "Sex Offenses - Total",
  "statutory_rape": "Statutory Rape",
  "total": "Total"
};
school_subcategories["discipline"] = {
  "drug_law_violations": "Drug Law Violations",
  "illegal_weapons_possession": "Illegal Weapon Possession",
  "liquor_law_violations": "Liquor Law Violations",
  "total": "Total"
};
school_subcategories["hate"] = {
  "aggravated_assault": "Assault - Aggravated",
  "simple_assault": "Assault - Simple",
  "arson": "Arson",
  "burglary": "Burglary",
  "destruction_damage_vandalism_of_property": "Vandalism/Destruction of Property",
  "fondling": "Fondling",
  "incest": "Incest",
  "intimidation": "Intimidation",
  "larceny_theft": "Theft",
  "motor_vehicle_theft": "Motor Vehicle Theft",
  "murder_non_negligent_manslaughter": "Murder and Non-Negligent Manslaughter",
  "rape": "Rape",
  "robbery": "Robbery",
  "sex_offenses_forcible": "Sex Offenses - Forcible",
  "sex_offenses_non_forcible": "Sex Offenses - Non-Forcible",
  "sex_offenses_total": "Sex Offenses - Total",
  "statutory_rape": "Statutory Rape",
  "total": "Total"
};
school_subcategories["vawa"] = {
  "dating_violence": "Dating Violence",
  "domestic_violence": "Domestic Violence",
  "stalking": "Stalking",
  "total": "Total"
};

school_bias_motivations = {
  "disability": "Anti-Disability",
  "ethnicity": "Anti-Ethnicity",
  "ethnicity_national_origin": "Anti-Ethnicity or Anti-National Origin",
  "gender": "Anti-Gender",
  "gender_identity": "Anti-Gender Identity",
  "national_origin": "Anti-National Origin",
  "race": "Anti-Race",
  "religion": "Anti-Religion",
  "sexual_orientation": "Anti-Sexual Orientation",
  "total": "Anti-Total"
};

school_locations = {
  "on_campus": "On Campus - Total",
  "on_campus_student_housing_facilities": "On Campus - Student Housing",
  "noncampus": "Not on Campus",
  "public_property": "Public Property",
  "total": "Total"
}
