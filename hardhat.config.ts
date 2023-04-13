import {HardhatUserConfig} from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import "hardhat-gas-reporter";

import * as dotenv from 'dotenv';

dotenv.config({path: __dirname + '/.env'});

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  gasReporter: {
    enabled: true
  },

  // DEPLOYMENT
  networks: {
    goerli: {
      url: process.env.ALCHEMY_GOERLI_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    mumbai: {
      url: process.env.ALCHEMY_MUMBAI_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    polygon: {
      url: process.env.ALCHEMY_POLYGONPOS_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  }
};

export default config;