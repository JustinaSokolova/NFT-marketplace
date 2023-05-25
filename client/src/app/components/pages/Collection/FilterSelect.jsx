import React, { useState } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FilterGroup = ({ filterNames, rarityList, onFilterChange }) => {
  return (
    <div>
      <FormControl sx={{ ml: "24px", width: 340 }}>
        <InputLabel id="demo-multiple-checkbox-label">Rarity</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={rarityList}
          onChange={onFilterChange}
          input={<OutlinedInput label="Rarity" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {filterNames.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={rarityList.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterGroup;
