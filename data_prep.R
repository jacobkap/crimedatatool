setwd("C:/Users/user/Dropbox/R_project/crime_data/clean_data/offenses_known")
load("ucr_offenses_known_yearly_1960_2016.rda")
setwd("C:/Users/user/Dropbox/crimedatatool/data")
library(readr)
library(jsonlite)
library(dplyr)
ucr <- read_csv("ucr2.csv")

state_agencies <-
  ucr %>%
  select(state, agency, ori) %>%
  distinct(state, agency, ori)
state_agencies <- toJSON(state_agencies)
write(state_agencies, "state_agencies.json")

ucr_test <-
  ucr %>%
  filter(year > 1990) %>%
  select(agency,
         year,
         state,
         population,
         state,
         ori,
         everything())
write_csv(ucr_test, path = "ucr_test.csv")
