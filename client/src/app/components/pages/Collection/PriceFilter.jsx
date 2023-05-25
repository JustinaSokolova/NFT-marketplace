import React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const PriceFilter = ({ priceOrder, onChangePrice }) => {
  return (
    <Box sx={{ minWidth: 200, mr: "24px", ml: "24px" }}>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Price</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={priceOrder}
          label="Price"
          onChange={onChangePrice}
        >
          <MenuItem value="asc">Low to high</MenuItem>
          <MenuItem value="desc">High to low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PriceFilter;
