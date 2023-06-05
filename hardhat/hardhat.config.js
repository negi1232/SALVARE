require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    // polygon: {
    //   url: process.env.POLYGON_ALCHEMY_KEY,
    //   accounts: [process.env.TEST_PRIVATE_KEY],
    // },
    // mumbai: {
    //   url: process.env.MUMBAI_ALCHEMY_KEY,
    //   accounts: [process.env.TEST_PRIVATE_KEY],
    // },
    local: {
      url: "http://localhost:8545",
      accounts: [process.env.LOCAL_PRIVATE_KEY],
    },
  },
  // etherscan: {
  //   apiKey: {
  //     polygonMumbai: process.env.POLYGONSCAN_API_KEY,
  //     polygon: process.env.POLYGONSCAN_API_KEY,
  //   },
  // },
};
