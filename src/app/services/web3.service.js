import Web3, { givenProvider } from "web3";
import { ethers } from "ethers";

const web3 = new Web3(givenProvider);

let MetamaskAvailable = false;

async function IsMetamaskInstalled() {
  if (typeof window.ethereum !== "undefined") {
    MetamaskAvailable = true;
    changeNetworkToTestCronosIfNeeded();
  } else {
    alert("MetaMask not installed!");
  }
}

export async function AddressSignatureMetamask() {
  IsMetamaskInstalled();
  if (MetamaskAvailable) {
    await changeNetworkToTestCronosIfNeeded();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const accounts = await provider.listAccounts();
    const ethAddress = accounts[0];

    const signedMessage = await signer.signMessage(
      "Navy.online wants to use your address: " +
        ethAddress +
        " for authentication"
    );
    return { ethAddress, signedMessage };
  } else {
    alert("MetaMask not installed!");
  }
}

async function changeNetworkToTestCronosIfNeeded() {
  const testCronosChainId = 338;
  if (window.ethereum.networkVersion !== testCronosChainId) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(testCronosChainId) }],
      });
    } catch (err) {
      if (err.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Cronos Testnet",
              chainId: web3.utils.toHex(testCronosChainId),
              nativeCurrency: { name: "tCRO", decimals: 18, symbol: "tCRO" },
              rpcUrls: ["https://evm-t3.cronos.org/"],
            },
          ],
        });
      }
    }
  }
}
