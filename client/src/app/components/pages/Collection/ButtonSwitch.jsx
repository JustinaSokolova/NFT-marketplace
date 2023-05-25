import React from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const ButtonSwitch = ({ stateSwitch, onMarketStateChange }) => {
  return (
    <FormGroup sx={{ ml: "24px", mr: "24px" }}>
      <FormControlLabel
        control={
          <Switch
            checked={stateSwitch.isSale}
            onChange={onMarketStateChange}
            name="isSale"
          />
        }
        label="Buy Now"
        labelPlacement="start"
      />
    </FormGroup>
  );
};

export default ButtonSwitch;
