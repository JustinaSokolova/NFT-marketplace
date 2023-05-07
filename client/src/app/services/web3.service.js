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

export async function ConnectMetamask() {
  IsMetamaskInstalled();
  if (MetamaskAvailable) {
    await changeNetworkToTestCronosIfNeeded();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    const ethAddress = accounts[0];

    return { ethAddress };
  } else {
    alert("MetaMask not installed!");
  }
}

export async function getUserBalance(address) {
  let balance = await web3.eth.getBalance(address);
  balance = Number(web3.utils.fromWei(balance)).toFixed(4);
  return balance;
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

// const CaptainsContractAddress = "0xA7D87Ec62772c3cB9b59de6f4ACa4c8602910bcd";
const CaptainsSaleContractAddress =
  "0x1e5Dd2734C3dcB52b0166dA6FEeF9B74175cEc05";

export async function MintCaptains() {
  IsMetamaskInstalled();
  if (MetamaskAvailable) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const accounts = await provider.listAccounts();
    const ethAddress = accounts[0];
    const saleContract = new web3.eth.Contract(
      SaleContractAbi,
      CaptainsSaleContractAddress
    );
    saleContract.methods
      .mint()
      .send({ from: ethAddress, value: "1000000000000000000" });
  }
}

const SaleContractAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokensTotal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_mintPrice",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "GenerateToken",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "toAddAddresses",
        type: "address[]",
      },
    ],
    name: "addToWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "toAddAddress",
        type: "address",
      },
    ],
    name: "addToWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum CollectionSale.MintState",
        name: "_mintState",
        type: "uint8",
      },
    ],
    name: "changeMintState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "mintPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintState",
    outputs: [
      {
        internalType: "enum CollectionSale.MintState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "toRemoveAddresses",
        type: "address[]",
      },
    ],
    name: "removeFromWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "toRemoveAddress",
        type: "address",
      },
    ],
    name: "removeFromWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokensLeft",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokensTotal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "whitelist",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
