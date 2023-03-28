import {ethers} from 'hardhat';

import {W3ACertificates} from '../typechain-types';
import {baseURI, collectionName, collectionSymbol} from '../helpers/helpers';

async function main() {

    const [deployer] = await ethers.getSigners();

    console.log('Deploying from: ' + deployer.address);
    let balanceBefore = await deployer.getBalance();
    console.log('Balance before deploying ', balanceBefore)

    let w3aCertificates: W3ACertificates;
    let certificateFactory = await ethers.getContractFactory('W3ACertificates');
    w3aCertificates = await certificateFactory.deploy(baseURI, collectionName, collectionSymbol);

    await w3aCertificates.deployed();

    let balanceAfter = await deployer.getBalance();
    console.log('Deployed W3A 2023 Certificate Collection to: ', w3aCertificates.address);
    console.log('Balance after deploying: ', await deployer.getBalance())
    console.log('Total deployment cost: ', ethers.utils.formatEther(balanceBefore.sub(balanceAfter)));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
