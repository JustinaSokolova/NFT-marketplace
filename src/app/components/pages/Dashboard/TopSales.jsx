import React, { useState, useEffect } from "react";
import topSalesNftService from "../../../services/topSalesNft.service";
import SliderComp from "../../common/SliderComp";

const TopSales = () => {
  const [topSalesData, setTopSalesData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const monthTime = 30;
  const weekTime = 7;
  const dayTime = 1;

  async function getSalesList(value) {
    try {
      const content = await topSalesNftService.get(value);
      setTopSalesData(content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSalesList(monthTime);
  }, []);

  return !isLoading ? <SliderComp props={topSalesData} /> : "Loading";
};
export default TopSales;
