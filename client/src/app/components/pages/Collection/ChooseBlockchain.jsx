import React from "react";

import { Box } from "@mui/material";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import { cronosIcon } from "../../ui/CronosIcon";
import { venomIcon } from "../../ui/VenomIcon";

const ChooseBlockchain = ({ selectedBlockchain, onButtonSelectBlockchain }) => {
  const blockchainType = [
    {
      value: "venom",
      label: "Venom",
      icon: venomIcon,
    },
    {
      value: "cronos",
      label: "Cronos",
      icon: cronosIcon,
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "24px",
        mb: "24px",
        ml: "24px",
      }}
    >
      <Box sx={{ typography: "body1" }}>Choose blockchain:</Box>
      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="text button group"
      >
        {blockchainType.map((type) => (
          <Button
            variant={selectedBlockchain === type.value ? "outlined" : "text"}
            key={`btn_${type.label}`}
            onClick={() => onButtonSelectBlockchain(type.value)}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {type.icon}
              {type.label}
            </Box>
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default ChooseBlockchain;
