import React from "react";

import { Box } from "@mui/material";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const FilterButtonGroup = ({ title, onButtonSelect, selectedTime }) => {
  const filterTime = [
    {
      value: 1,
      label: "24H",
    },
    {
      value: 7,
      label: "7D",
    },
    {
      value: 30,
      label: "30D",
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "24px",
        mb: "24px",
      }}
    >
      <Box sx={{ typography: "h6" }}>{title}</Box>
      <ButtonGroup
        variant="text"
        color="secondary"
        aria-label="text button group"
      >
        {filterTime.map((time) => (
          <Button
            variant={selectedTime === time.value ? "outlined" : "text"}
            key={`btn_${time.label}`}
            onClick={() => onButtonSelect(time.value)}
          >
            {time.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};
export default FilterButtonGroup;
