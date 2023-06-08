const { ethers, run, network } = require("hardhat");
const fs = require("fs");

const { TEST_NET_CHAIN_ID } = require("../helpers/constants");

async function main() {
  const network = await ethers.provider.getNetwork();
  console.log("network chainId:", network.chainId);
  console.log("network name:", network.name);

  let salvareNFT;

  // Deploy SalvareNFT contract
  const SalvareNFT = await ethers.getContractFactory("SalvareNFT");
  salvareNFT = await SalvareNFT.deploy();
  await salvareNFT.deployed();
  console.log("salvareNFT deployed to:", salvareNFT.address);

  if (network.chainId === TEST_NET_CHAIN_ID) {
    console.log("Start verifying contracts...");

    console.log("Waiting for 10 seconds before verification...");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log("==========================");
    console.log("Verifying SalvareNFT...");
    try {
      await run("verify:verify", {
        address: salvareNFT.address,
        constructorArguments: [],
      });
    } catch (e) {
      console.log("Failed to verify SalvareNFT");
      console.log(e);
    }

    console.log("==========================");
  }

  console.log("Recording SalvareNFT...");
  recording("SalvareNFT", salvareNFT);
}

const recording = async (contractName, contract) => {
  let data;
  let networkName = network.name ? network.name : "undefined";
  try {
    data = JSON.parse(
      fs.readFileSync(
        `./contracts-data/${networkName}/${contractName}-data.json`
      )
    );
  } catch (e) {
    data = [];
  }

  now = new Date();
  const dateTimeJpn =
    now.getFullYear() +
    "/" +
    now.getMonth() +
    "/" +
    now.getDate() +
    "/" +
    now.getHours() +
    ":" +
    now.getMinutes() +
    ":" +
    now.getSeconds();

  await data.unshift({
    name: contractName,
    address: contract.address,
    time: dateTimeJpn,
  });

  fs.writeFileSync(
    `./contracts-data/${networkName}/${contractName}-data.json`,
    JSON.stringify(data, null, 2)
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
