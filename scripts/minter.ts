import {ethers} from 'hardhat';

import {W3ACertificates} from '../typechain-types';

import {Candidate, w3acSCGoerli} from '../helpers/helpers';
import {getCandidateList} from '../helpers/xlsx_reader';

// mihajlo sd onsite 0
// milica pd onsite 1
// nata mkt onsite 2
// iveza pm onsite 3
// uros sd online 4
// maja pd online 5
// maki pm online 6
// alex mkt online 7

async function main() {

    const [minter] = await ethers.getSigners();

    console.log('Acting as: ' + minter.address);

    let W3ACertificates = await ethers.getContractFactory('W3ACertificates');
    let w3aCertificates: W3ACertificates = await W3ACertificates.attach(w3acSCGoerli); // connect to instance on goerli

    console.log('W3A Certificates instance on Goerli: ', w3aCertificates.address)

    let candidates: Candidate[] = getCandidateList();

    for (let i = 0; i < candidates.length; i++) {

    }


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
