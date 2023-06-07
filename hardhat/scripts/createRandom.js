const { ethers } = require("hardhat");

const wallet = ethers.Wallet.createRandom();
console.log("Wallet address   : ", wallet.address);
console.log("Wallet privateKey: ", wallet.privateKey);
