import React, { useContext, useEffect, useState } from "react";
import coinUsdRateService from "../services/coinUsdRate.service";
import { toast } from "react-toastify";

const CoinRateContex = React.createContext();

export const useCoinRate = () => {
  return useContext(CoinRateContex);
};

export const CoinRateProvider = ({ children }) => {
  const [сoinUsdPrice, setCoinUsdPrice] = useState({ usd: 0 });
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getCoinRate = async () => {
    try {
      const data = await coinUsdRateService.get();
      setCoinUsdPrice(data);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  useEffect(() => {
    getCoinRate();
  }, []);

  useEffect(() => {
    let id = setInterval(() => {
      getCoinRate();
    }, 60000);
    return () => clearInterval(id);
  });

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <CoinRateContex.Provider value={{ сoinUsdPrice, isLoading }}>
      {children}
    </CoinRateContex.Provider>
  );
};
