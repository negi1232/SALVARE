import { salvare_address } from "./config";
import { ethers } from "ethers";
import salvare_abi_json from "./salvare_abi.json";
import salvare_data from "./contracts-data/mumbai/SALVARE-data.json";

const { ethereum } = window;

// function Contracts_MetaMask(){
const salvare_abi = salvare_abi_json.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const SALVARE_Contract = new ethers.Contract(
  salvare_data[0].address,
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

        const messageHash = ethers.utils.solidityKeccak256(
          ["string"],
          [message]
        );
        const messageHashBinary = ethers.utils.arrayify(messageHash);
        const signature = await signer.signMessage(messageHashBinary);

        const { v, r, s } = ethers.utils.splitSignature(signature);

        console.log(message);

        console.log("Signature:", signature);
        console.log("v:", v);
        console.log("r:", r);
        console.log("s:", s);

        setJson({
          public_address: account,
          messageHash: messageHash,
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
  async getTrashCans() {
    try {
      if (ethereum) {
        return await SALVARE_Contract.getTrashCans();
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getIsWorking() {
    try {
      if (ethereum) {
        const accounts = await provider.listAccounts();
        const account = accounts[0];
        return await SALVARE_Contract.getWork(account);
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  }

  //event StartWork(address indexed worker, uint256 indexed id);
  async event_start_work(id, setId) {
    //emitを受け取る準備
    const start_work_filters = SALVARE_Contract.filters["StartWork"];
    console.log("start_work_filters");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];
    console.log(provider.off(start_work_filters(account, id)));
    console.log(provider.listeners(start_work_filters(account, id)));

    console.log(account, id);
    provider.once(start_work_filters(account, id), (event) => {
      console.log("hit");
      //idを設定
      setId(parseInt(event.topics[2]));
    });
  }
  async stop_event_start_work(id) {
    const start_work_filters = SALVARE_Contract.filters["StartWork"];
    console.log("event_create_quiz");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];
    console.log(provider.off(start_work_filters(account, id)));
    console.log(provider.listeners(start_work_filters(account, id)));
  }
  async event_transfer(setId) {
    //emitを受け取る準備
    const transfer_filters = SALVARE_Contract.filters["Transfer"];
    console.log("transfer_filters");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];
    console.log(provider.off(transfer_filters(account)));
    console.log(provider.listeners(transfer_filters(account)));

    provider.once(transfer_filters(null, account, null), (event) => {
      console.log("hit");
      //idを設定
      setId(0);
    });
  }
  // fetch one's account amount of balance
  async fetchAccountBalance() {
    try {
      if (ethereum) {
        const accounts = await provider.listAccounts();
        const account = accounts[0];
        return await SALVARE_Contract.balanceOf(account);
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export { Contracts_MetaMask };
