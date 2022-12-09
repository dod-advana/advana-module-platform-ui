import React, { useState, useReducer } from "react";
import styled from "styled-components";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useMatomo } from "@datapunt/matomo-tracker-react";

import { DEFAULT_SEARCH_TYPES } from "./search";
import { FilterOption } from "./FilterOption";

import DashboardIcon from "../images/search/dashboard_icon.png";
import DatabasesIcon from "../images/search/database_icon.png";
import DataSourceIcon from "../images/search/datasource_icon.png";

const FILTER_OPTIONS = [
  { key: "applications", label: "Applications", icon: DashboardIcon, disabled: true },
  { key: "dashboards", label: "Dashboards", icon: DashboardIcon },
  { key: "dataSources", label: "Data Sources", icon: DataSourceIcon },
  { key: "databases", label: "Databases", icon: DatabasesIcon },
  { key: "documentation", label: "Documentation", icon: DashboardIcon, disabled: true },
  { key: "organizations", label: "Organizations", icon: DashboardIcon, disabled: true },
  { key: "services", label: "Services", icon: DashboardIcon, disabled: true },
];

const submit = (data = {}) => {
  const MEGA_MENU_SEARCH_LINK =
    window?.__env__?.REACT_APP_MEGA_MENU_SEARCH_LINK || process.env.REACT_APP_MEGA_MENU_SEARCH_LINK || "/#/search";
  window.open(MEGA_MENU_SEARCH_LINK + "?" + new URLSearchParams(data).toString(), "_blank");
};

const filterReducer = (existing, newFilter) => {
  let copy = { ...existing };

  if (copy[newFilter]) copy[newFilter] = false;
  else copy[newFilter] = true;

  return copy;
};

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 30px 0px 50px 0px;
`;

const FiltersTitle = styled(Typography)`
  letter-spacing: 0;
  margin-top: 30px;
`;

const StyledPaper = styled(Paper)`
  margin: auto 0px;
  width: 100%;
  padding: ${({ $hideBackdrop }) => ($hideBackdrop ? "" : "30px")};
  box-shadow: ${(props) => (props.$hideBackdrop ? "" : "0 12px 14px 0 rgba(0, 0, 0, 0.5)")};
`;

const SearchRow = styled.div`
  display: inline-flex;
  width: 100%;
  margin: auto 0px;
`;

const AdvancedButton = styled(Button)`
  height: 60px;
  width: 240px;
  background-color: #b0bac5;
  border: 2px solid #b0bac5;
  border-radius: 0px;
  font-size: 13px;
  letter-spacing: normal;
  padding: 0px;
  margin: auto 2px auto 0px;
`;

const StyledKeyboardArrowUpIcon = styled(KeyboardArrowUpIcon)`
  font-size: 25;
`;

const StyledKeyboardArrowDownIcon = styled(KeyboardArrowDownIcon)`
  font-size: 25;
`;

const SearchIconButton = styled(Button)`
  height: 60px;
  min-width: 50px;
  border-radius: 0px 5px 5px 0px;
  color: white;
`;

/**
 * SearchBar - Advana Search Bar
 * @param props {@link SearchBarProps}
 */
export const SearchBar = (props) => {
  const [localKeyword, setLocalKeyword] = useState("");
  const [isOptionsOpen, toggleOptionsOpen] = useState(false);
  const [filters, dispatchFilter] = useReducer(filterReducer, DEFAULT_SEARCH_TYPES);

  const onTextChange = (evt) => {
    setLocalKeyword(evt.target.value);
  };

  const InputStyles = {
    backgroundColor: "white",
    borderRadius: "5px 0px 0px 5px",
    height: 60,
    fontSize: 16,
    fontFamily: "Noto Sans",
    color: "#8091A5",
  };
  const { trackSiteSearch } = useMatomo();

  const onSearch = () => {
    //log the key word in Matomo for analytics
    trackSiteSearch({ category: "trackSiteSearch", keyword: localKeyword });

    submit({ keyword: localKeyword, ...(isOptionsOpen ? filters : {}) });
  };

  return (
    <StyledPaper $hideBackdrop={props.hideBackdrop ?? false}>
      <SearchRow>
        <TextField
          data-test-id="search-bar"
          aria-label="search-bar"
          variant="outlined"
          value={localKeyword}
          onChange={onTextChange}
          fullWidth
          placeholder="Find what you're looking for..."
          InputProps={{
            disableunderline: "true",
            style: InputStyles,
          }}
          onKeyPress={(evt) => {
            if (evt.key === "Enter") {
              onSearch();
            }
          }}
        />

        {props.hideAdvancedOptions === undefined && (
          <AdvancedButton
            data-test-id="advanced-button"
            size="large"
            variant="contained"
            onClick={() => {
              toggleOptionsOpen(!isOptionsOpen);
            }}
          >
            Advanced Options
            {isOptionsOpen ? <StyledKeyboardArrowUpIcon /> : <StyledKeyboardArrowDownIcon />}
          </AdvancedButton>
        )}

        <SearchIconButton
          data-test-id="search-button"
          aria-label="search-button"
          size="large"
          variant="contained"
          color="primary"
          onClick={() => {
            onSearch();
          }}
        >
          <i className="fa fa-lg fa-search" />
        </SearchIconButton>
      </SearchRow>

      {isOptionsOpen && (
        <>
          <FiltersTitle variant="h4">Or narrow your search with filters:</FiltersTitle>

          <FiltersContainer>
            {FILTER_OPTIONS.map((filter) => {
              let { key, label, icon, disabled } = filter;

              return (
                <FilterOption
                  key={key + "-filter"}
                  label={label}
                  icon={icon}
                  onClick={() => {
                    dispatchFilter(key);
                  }}
                  selected={filters[key]}
                  disabled={disabled}
                />
              );
            })}
          </FiltersContainer>
        </>
      )}
    </StyledPaper>
  );
};
