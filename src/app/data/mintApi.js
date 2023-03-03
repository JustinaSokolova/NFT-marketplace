const fetchMint = async () => {
  const response = await fetch(
    "https://navy.online/marketplace/mint/6400d38aac3beade1f002ce8"
  );
  return await response.json();
};

export default {
  fetchMint,
};
