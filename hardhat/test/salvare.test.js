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
        salvare,
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
  });

  describe("setAmountOfTrash", function () {
    let fixtures;
    beforeEach(async function () {
      fixtures = await setupFixtures();
    });

    it("Should initialize amount of trash", async function () {
      const { salvare, robot1, robot2, robot3, robot4, robot5, robot6 } =
        fixtures;

      await salvare.connect(robot1).setAmountOfTrash(0, 1);
      await salvare.connect(robot2).setAmountOfTrash(0, 2);
      await salvare.connect(robot3).setAmountOfTrash(0, 3);
      await salvare.connect(robot4).setAmountOfTrash(0, 4);
      await salvare.connect(robot5).setAmountOfTrash(0, 5);
      await salvare.connect(robot6).setAmountOfTrash(0, 6);
    });

    it("Should set amount of trash by robot1", async function () {
      const { salvare, robot1 } = fixtures;

      expect(await salvare.connect(robot1).setAmountOfTrash(1001, 1)).not.to.be
        .reverted;

      const trashCans = await salvare.getTrashCans();

      console.log(await salvare.trashCans[1].amountOfTrash);
    });

    it("Should set amount of trash by robot2", async function () {
      const { salvare, robot2 } = fixtures;

      expect(await salvare.connect(robot2).setAmountOfTrash(1002, 2)).not.to.be
        .reverted;
    });

    it("Should set amount of trash by robot3", async function () {
      const { salvare, robot3 } = fixtures;

      expect(await salvare.connect(robot3).setAmountOfTrash(1003, 3)).not.to.be
        .reverted;
    });

    it("Should set amount of trash by robot4", async function () {
      const { salvare, robot4 } = fixtures;

      expect(await salvare.connect(robot4).setAmountOfTrash(1004, 4)).not.to.be
        .reverted;
    });

    it("Should set amount of trash by robot5", async function () {
      const { salvare, robot5 } = fixtures;

      expect(await salvare.connect(robot5).setAmountOfTrash(1005, 5)).not.to.be
        .reverted;
    });

    it("Should set amount of trash by robot6", async function () {
      const { salvare, robot6 } = fixtures;

      expect(await salvare.connect(robot6).setAmountOfTrash(1006, 6)).not.to.be
        .reverted;
    });
  });

  describe("getTrashCans", function () {
    let fixtures;
    beforeEach(async function () {
      fixtures = await setupFixtures();
    });

    it("Should get trash cans", async function () {
      const { salvare, robot1, robot2, robot3, robot4, robot5, robot6 } =
        fixtures;

      const trashCans = await salvare.getTrashCans();
      console.log(trashCans);
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
        robot6,
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

  describe("integration test", function () {
    let fixtures;
    beforeEach(async function () {
      fixtures = await setupFixtures();
    });

    it("integration test 1", async function () {
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
        robot6,
        recyclingCenter1,
        recyclingCenter2,
      } = fixtures;

      const amountOfTrash = 1000;

      await salvare.connect(robot1).setAmountOfTrash(amountOfTrash, 1);
    });
  });
});
