import { Box } from "@mui/material";
import React from "react";
import ButtonSwitch from "./ButtonSwitch";
import FilterSelect from "./FilterSelect";
import ButtonFilterClear from "./ButtonFilterClear";
import PriceFilter from "./PriceFilter";

const FilterGroup = ({
  filterNames,
  rarityList,
  onFilterChange,
  onHandleClear,
  stateSwitch,
  onMarketStateChange,
  priceOrder,
  onChangePrice,
}) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FilterSelect
            filterNames={filterNames}
            rarityList={rarityList}
            onFilterChange={onFilterChange}
          />
          <ButtonSwitch
            stateSwitch={stateSwitch}
            onMarketStateChange={onMarketStateChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <PriceFilter onChangePrice={onChangePrice} priceOrder={priceOrder} />
          <ButtonFilterClear onHandleClear={onHandleClear} />
        </Box>
      </Box>
    </>
  );
};

export default FilterGroup;
