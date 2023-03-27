import {ethers} from 'hardhat';
import {baseURI, collectionName, collectionSymbol} from '../test/helper';
import {W3ACertificates} from '../typechain-types';

async function main() {

    const [deployer] = await ethers.getSigners();

    console.log('Deploying from: ' + deployer.address);

    let w3aCertificates: W3ACertificates;
    let certificateFactory = await ethers.getContractFactory('W3ACertificates');
    w3aCertificates = await certificateFactory.deploy(baseURI, collectionName, collectionSymbol);

    await w3aCertificates.deployed();
    console.log('Deployed W3A 2023 Certificate Collection to: ', w3aCertificates.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
