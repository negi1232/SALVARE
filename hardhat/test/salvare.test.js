const { expect } = require("chai");
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
    recyclingCenter1,
    recyclingCenter2,
  ] = await ethers.getSigners();

  Salvare = await ethers.getContractFactory("SALVARE");
  salvare = await Salvare.deploy();
  await salvare.deployed();

  return {
    salvare,
    deployer,
    worker1,
    worker2,
    robot1,
    robot2,
    robot3,
    robot4,
    robot5,
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
        salvare,
        deployer,
        worker1,
        worker2,
        robot1,
        robot2,
        robot3,
        robot4,
        robot5,
        recyclingCenter1,
        recyclingCenter2,
      } = fixtures;
    });
  });

  describe("verifySignature", function () {
    let fixtures;
    beforeEach(async function () {
      fixtures = await setupFixtures();
    });
    it("Should correctly verify the signature", async function () {
      const {
        salvare,
        deployer,
        worker1,
        worker2,
        robot1,
        robot2,
        robot3,
        robot4,
        robot5,
        recyclingCenter1,
        recyclingCenter2,
      } = fixtures;

      const message = "Hello, world!";
      const messageHash = ethers.utils.solidityKeccak256(["string"], [message]);
      const messageHashBinary = ethers.utils.arrayify(messageHash);
      const signature = await deployer.signMessage(messageHashBinary);
      const ethersRecoveredAddress = ethers.utils.verifyMessage(
        messageHashBinary,
        signature
      );

      // // Ethers.jsとECDSA.solで同様に署名検証できるかを確認しました。
      // const recoveredAddress = await salvare.verifySignature(
      //   messageHash,
      //   signature
      // );
      // console.log("deployer.address:       ", deployer.address);
      // console.log("recoveredAddress:       ", recoveredAddress);
      // console.log("ethersRecoveredAddress: ", ethersRecoveredAddress);

      // expect(recoveredAddress).to.equal(deployer.address);
      expect(ethersRecoveredAddress).to.equal(deployer.address);
    });
  });
});
