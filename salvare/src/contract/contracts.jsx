import { chainId, rpc} from "./config"

import { BigNumber, ethers } from "ethers";

const { ethereum } = window;


// function Contracts_MetaMask(){
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

class Contracts_MetaMask {
    async get_chain_id() {

        const chainId =await provider.getNetwork();

        return chainId["chainId"];

    }

    async isMetaMaskConnected() {
        const {ethereum} = window;
        const accounts = await ethereum.request({method: 'eth_accounts'});
        return accounts && accounts.length > 0;
    }

    async connectWallet () {
		await window.ethereum.request({ method: "eth_requestAccounts" });
        window.location.reload();
	}

    async change_network() {
        const networkParam = {
            chainId: '0x13881',
            chainName: 'Mumbai Testnet',
            nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
            rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
            blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
        };
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [networkParam],
        });
        window.location.reload();

    }

}

export { Contracts_MetaMask };