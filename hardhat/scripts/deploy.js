const { ethers, run, network } = require("hardhat");
const fs = require("fs");

const { TEST_NET_CHAIN_ID } = require("../helpers/constants");

async function main() {
  const network = await ethers.provider.getNetwork();
  console.log("network chainId:", network.chainId);
  console.log("network name:", network.name);

  let salvare;

  // Deploy SALVARE contract
  const SALVARE = await ethers.getContractFactory("SALVARE");
  salvare = await SALVARE.deploy();
  await salvare.deployed();
  console.log("SALVARE deployed to:", salvare.address);

  if (network.chainId === TEST_NET_CHAIN_ID) {
    console.log("Start verifying contracts...");

    console.log("Waiting for 10 seconds before verification...");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log("==========================");
    console.log("Verifying SALVARE...");
    try {
      await run("verify:verify", {
        address: salvare.address,
        constructorArguments: [],
      });
    } catch (e) {
      console.log("Failed to verify SALVARE");
      console.log(e);
    }

    console.log("==========================");
  }

  console.log("Recording SALVARE...");
  recording("SALVARE", salvare);
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
