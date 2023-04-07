import React, { useState, useEffect } from "react";
import topSalesNftService from "../../../services/topSalesNft.service";

const TopSales = () => {
  const [topSalesData, settopSalesData] = useState();
  const [isLoading, setLoading] = useState(true);

  const monthTime = 30;
  const weekTime = 7;
  const dayTime = 1;

  async function getSalesList(value) {
    try {
      const content = await topSalesNftService.get(value);
      settopSalesData(content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSalesList(monthTime);
  }, []);

  console.log(topSalesData);

  return <div>TopSales</div>;
};
export default TopSales;
