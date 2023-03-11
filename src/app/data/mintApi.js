const fetchMint = async () => {
  const response = await fetch(
    "https://navy.online/marketplace/mint/6408e2c549f305b32d8ff1f4"
  );
  return await response.json();
};

export default {
  fetchMint,
};
