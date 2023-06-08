const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

const setupFixtures = async (name, symbol, startTime) => {
  let deployer,
    worker1,
    worker2,
    robot1,
    robot2,
    robot3,
    robot4,
    robot5,
    robot6,
    recyclingCenter1,
    recyclingCenter2;
  let Registry, registry, CJPY, cJPY, TicketNFT, ticketNFT, POAP, poap;

  [
    deployer,
    worker1,
    worker2,
    robot1,
    robot2,
    robot3,
    robot4,
    robot5,
    robot6,
    recyclingCenter1,
    recyclingCenter2,
  ] = await ethers.getSigners();

  SalvareNFT = await ethers.getContractFactory("SalvareNFT");
  salvareNFT = await SalvareNFT.deploy();
  await salvareNFT.deployed();

  return {
    salvareNFT,
    deployer,
    worker1,
    worker2,
    robot1,
    robot2,
    robot3,
    robot4,
    robot5,
    robot6,
    recyclingCenter1,
    recyclingCenter2,
  };
};
// ----------------------------------------------------------

describe("Deploy", function () {
  describe("Initializing Contract", function () {
    let fixtures;
    beforeEach(async function () {
      fixtures = await setupFixtures();
    });

    it("Should correctly initialize the contract", async function () {
      const {
        salvareNFT,
        deployer,
        worker1,
        worker2,
        robot1,
        robot2,
        robot3,
        robot4,
        robot5,
        robot6,
        recyclingCenter1,
        recyclingCenter2,
      } = fixtures;
    });

    it("Should initialize workerToWork", async function () {
      const { salvareNFT, worker1, worker2 } = fixtures;
    });
  });
});
