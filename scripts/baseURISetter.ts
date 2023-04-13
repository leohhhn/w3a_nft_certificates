// @ts-ignore
import {ethers} from 'hardhat';
import {W3ACertificates} from '../typechain-types';
import {metadataBaseURI0, metadataBaseURI1} from '../helpers/helpers';

async function main() {
    const [minter] = await ethers.getSigners();

    console.log('Acting as: ' + minter.address);

    let W3ACertificates = await ethers.getContractFactory('W3ACertificates');
    let w3aCertificates: W3ACertificates = await W3ACertificates.attach('0x4a8BF35ea19DdDea4881662Ce1fD59A2e443F5eC'); // connect to instance
    console.log('W3A Certificates instance: ', w3aCertificates.address)

    console.log('Setting URIs...');

    (await w3aCertificates.setBaseURI(0, metadataBaseURI0)).wait();
    (await w3aCertificates.setBaseURI(1, metadataBaseURI1)).wait();



    // console.log('Set URIs:');
    console.log('URI0: ', await w3aCertificates.baseURI0(), 'URI1: ', await w3aCertificates.baseURI1());
    console.log("Metadata for ID0: ", await w3aCertificates.tokenURI(0));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
