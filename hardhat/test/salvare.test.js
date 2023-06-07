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

    it("Should initialize workerToWork", async function () {
      const { salvare, worker1, worker2 } = fixtures;

      const workerToWork1 = await salvare.getWork(worker1.address);
      const workerToWork2 = await salvare.getWork(worker2.address);
      expect(workerToWork1.id).to.equal(0);
      expect(workerToWork2.id).to.equal(0);
      expect(workerToWork1.gram).to.equal(0);
      expect(workerToWork2.gram).to.equal(0);
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
      const { salvare, robot1 } = fixtures;

      const trashCans = await salvare.getTrashCans();

      expect(trashCans[1].id).to.equal(1);
      expect(trashCans[1].trashCanOwner).to.equal(
        "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
      );
      expect(await trashCans[1].trashCan).to.equal(
        ethers.constants.AddressZero
      );
      expect(trashCans[1].trashCanLocationAddress).to.equal("渋谷 ハチ公前");
      expect(trashCans[1].trashCanLocationImage).to.equal(
        "https://cdn.discordapp.com/attachments/1087354845675126786/1115645639053807738/image.png"
      );
      expect(trashCans[1].trashCanLatitude).to.equal(
        ethers.BigNumber.from((3565834639713606).toString())
      );
      expect(await trashCans[1].trashCanLongitude).to.equal(
        ethers.BigNumber.from((13970303583403240).toString())
      );
      expect(trashCans[1].trashCanAmount).to.equal(10000);
      expect(trashCans[1].trashCanMaxAmount).to.equal(20000);
      expect(trashCans[1].trashCanReward).to.equal(0);

      const recyclingCenterData = await trashCans[1].recyclingCenter;
      expect();
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

  describe("startWork", function () {
    let fixtures;
    beforeEach(async function () {
      fixtures = await setupFixtures();
    });

    it("Should correctly start work", async function () {
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

      let workerToWork1;
      workerToWork1 = await salvare.getWork(worker1.address);
      expect(workerToWork1.id).to.equal(0);
      expect(workerToWork1.gram).to.equal(0);

      const amountOfTrash = 1000;

      const message = "Hello, world!";
      const messageHash = ethers.utils.solidityKeccak256(["string"], [message]);
      const messageHashBinary = ethers.utils.arrayify(messageHash);
      const signature = await worker1.signMessage(messageHashBinary);

      expect(
        await salvare.connect(robot1).startWork(1000, messageHash, signature, 1)
      ).not.to.be.reverted;

      workerToWork1 = await salvare.getWork(worker1.address);
      expect(workerToWork1.id).to.equal(1);
      expect(workerToWork1.gram).to.equal(amountOfTrash);
    });
  });

  describe("doneWork", function () {
    let fixtures;
    beforeEach(async function () {
      fixtures = await setupFixtures();
    });

    it("Should correctly done work", async function () {
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

      const message = "Hello, world!";
      const messageHash = ethers.utils.solidityKeccak256(["string"], [message]);
      const messageHashBinary = ethers.utils.arrayify(messageHash);
      const signature = await worker1.signMessage(messageHashBinary);

      expect(
        await salvare.connect(robot1).startWork(1000, messageHash, signature, 1)
      ).not.to.be.reverted;

      expect(
        await salvare
          .connect(recyclingCenter1)
          .doneWork(950, messageHash, signature)
      ).not.to.be.reverted;
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
