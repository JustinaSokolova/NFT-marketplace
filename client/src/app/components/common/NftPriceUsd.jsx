import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import { useCoinRate } from "../../hooks/useCoinRate";

const NftPriceUsd = ({ price }) => {
  const { сoinUsdPrice, isLoading } = useCoinRate();

  const mintPriceUsd = "$" + (price * сoinUsdPrice.usd).toFixed(2);
  return (
    !isLoading && (
      <Box
        sx={{
          typography: "body2",
          fontWeight: "bold",
          color: "secondary.main",
        }}
      >
        {mintPriceUsd}
      </Box>
    )
  );
};

NftPriceUsd.propTypes = {
  price: PropTypes.number,
};

export default NftPriceUsd;
