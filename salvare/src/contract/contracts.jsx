import { chainId, rpc, salvare_address } from "./config";
import { BigNumber, ethers } from "ethers";
import salvare_abi_json from "./salvare_abi.json";

const { ethereum } = window;

// function Contracts_MetaMask(){
const salvare_abi = salvare_abi_json.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const SALVARE_Contract = new ethers.Contract(
  salvare_address,
  salvare_abi,
  signer
);

class Contracts_MetaMask {
  async get_chain_id() {
    const chainId = await provider.getNetwork();

    return chainId["chainId"];
  }

  async isMetaMaskConnected() {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_accounts" });
    return accounts && accounts.length > 0;
  }

  async connectWallet() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    window.location.reload();
  }

  async change_network() {
    const networkParam = {
      chainId: "0x13881",
      chainName: "Mumbai Testnet",
      nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
      rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    };
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [networkParam],
    });
    window.location.reload();
  }
  async get_address() {
    try {
      if (ethereum) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        return accounts[0];
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async sign(message, setJson) {
    try {
      if (ethereum) {
        const accounts = await provider.listAccounts();
        const account = accounts[0];

        // // 署名するメッセージ
        // const message = 'Hello, world!';

        // メッセージの署名
        // const signature = await provider.getSigner(account).signMessage(message);
        const messageHash = ethers.utils.solidityKeccak256(
          ["string"],
          [message]
        );
        const messageHashBinary = ethers.utils.arrayify(messageHash);
        const signature = await signer.signMessage(messageHashBinary);

        console.log("Signature:", signature);
        const { v, r, s } = ethers.utils.splitSignature(signature);
        console.log("v:", v);
        console.log("r:", r);
        console.log("s:", s);

        setJson({
          public_address: account,
          message: message,
          signature: signature,
          v: v,
          r: r,
          s: s,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async get_garbage_can(id) {
    try {
      if (ethereum) {
        return await SALVARE_Contract.get_garbage_can(id);
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export { Contracts_MetaMask };
