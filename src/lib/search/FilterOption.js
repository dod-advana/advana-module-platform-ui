import React from "react";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

const Box = styled.div`
  border: 1px solid #e1e8ee;
  border-radius: 6px;
  background-color: ${({ $selected, $disabled }) => ($disabled ? "#E1E8EE" : $selected ? "#13A792" : "white")};
  height: 120px;
  width: 120px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  text-align: center;
  padding: 20px 0px;
  box-shadow: ${({ $selected, $disabled }) => ($disabled ? "" : $selected ? "0 0 6px 0 #9BB0C7" : "")};
`;

const StyledImg = styled.img`
  color: ${({ $selected }) => ($selected ? "white" : "#313541")};
  height: 50px;
  width: 50px;
`;

const StyledTypography = styled(Typography)`
  margin-top: 10px;
  color: ${({ $selected }) => ($selected ? "white" : "#8091A5")};
`;

export const FilterOption = (props) => {
  const { selected, onClick, icon, label, disabled } = props;

  return (
    <Box $disabled={disabled} $selected={selected} onClick={onClick}>
      <StyledImg src={icon} alt={label + " filter option"} $selected={selected} />

      <StyledTypography variant="h6" $selected={selected}>
        {label}
      </StyledTypography>
    </Box>
  );
};
