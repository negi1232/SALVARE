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
    garbageStation1,
    garbageStation2;
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
    garbageStation1,
    garbageStation2,
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
    garbageStation1,
    garbageStation2,
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
        garbageStation1,
        garbageStation2,
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
        garbageStation1,
        garbageStation2,
      } = fixtures;

      const message = "Hello, world!";
      const messageHash = ethers.utils.hashMessage(message);
      const messageBytes = ethers.utils.toUtf8Bytes(
        "\x19Ethereum Signed Message:\n32"
      );
      const totalMessage = ethers.utils.concat([messageBytes, messageHash]);

      const totalMessageHash = ethers.utils.keccak256(totalMessage);

      // totalMessageHash is hashed again before passed to salvare.verifySignature
      const hashOfTotalMessageHash = ethers.utils.keccak256(totalMessageHash);

      const sig = await deployer.signMessage(
        ethers.utils.arrayify(totalMessageHash)
      );

      // Convert the signature to bytes
      const signatureBytes = ethers.utils.arrayify(sig);

      const recoveredAddress = await salvare.verifySignature(
        totalMessageHash,
        signatureBytes
      );
      const ethersRecoveredAddress = ethers.utils.verifyMessage(
        ethers.utils.arrayify(totalMessageHash),
        sig
      );
      console.log("deployer.address:       ", deployer.address);
      console.log("recoveredAddress:       ", recoveredAddress);
      console.log("ethersRecoveredAddress: ", ethersRecoveredAddress);

      expect(recoveredAddress).to.equal(deployer.address);
      expect(ethersRecoveredAddress).to.equal(deployer.address);
    });
  });
});
