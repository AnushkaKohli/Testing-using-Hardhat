require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.19",
  networks: { 
    sepolia: { 
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`, 
      accounts: [`${process.env.SEPOLIA_PRIVATE_KEY}`], 
    }, 
  },
};
// Lock with 0.001ETH and unlock timestamp 1705298718 deployed to 0xD98796dffA010747180f8E6be684DB827BBfbC5c