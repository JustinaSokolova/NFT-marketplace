import Web3, { givenProvider } from "web3";
const web3 = new Web3(givenProvider);

export async function ConnectMetamask() {
  if (typeof window.ethereum !== "undefined") {
    alert("MetaMask is installed!");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const myAddress = accounts[0];
    console.log(myAddress);
  } else {
    alert("MetaMask not installed!");
  }
}
