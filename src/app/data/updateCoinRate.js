// let CoinUsdPrice = 0;

// const getCoinRate = async () => {
//   const response = await fetch(
//     "https://navy.online/marketplace/cronosUsdPrice"
//   );
//   CoinUsdPrice = (await response.json()).usd.toFixed(2);
// };
// getCoinRate();

// const updateCoinRate = async () => {
//   console.log("start");
//   window.setInterval(async function () {
//     getCoinRate();
//   }, 60000);
// };
// updateCoinRate();

const fetchCoinRateUsd = async () => {
  const response = await fetch(
    "https://navy.online/marketplace/cronosUsdPrice"
  );
  return await response.json();
};

export default {
  fetchCoinRateUsd,
};
