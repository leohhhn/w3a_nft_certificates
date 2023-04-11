import {ethers} from 'hardhat';
import {W3ACertificates} from '../typechain-types';
import {Candidate} from '../helpers/helpers';
import {getCandidateList} from '../helpers/xlsx_reader';

async function main() {
    const [minter] = await ethers.getSigners();

    console.log('Acting as: ' + minter.address);

    let W3ACertificates = await ethers.getContractFactory('W3ACertificates');
    let w3aCertificates: W3ACertificates = await W3ACertificates.attach('0x2a5E40fE46B4b7e90F2FEfad78E7C979D72D7E98'); // connect to instance

    console.log('W3A Certificates instance: ', w3aCertificates.address)

    let candidates: Candidate[] = getCandidateList();

    let multipleMints: Candidate[] = [];

    for (let i = 0; i < 22; i++) {
        let balanceOf = await w3aCertificates.balanceOf(candidates[i].address);
        console.log(`address ${i}, balance: ${balanceOf}`);
        if (balanceOf.gt('1'))
            multipleMints.push(candidates[i]);
    }

    for (let i = 0; i < multipleMints.length; i += 2)
        console.log(multipleMints[i].address)

    console.log('Multiple mints #: ', multipleMints.length / 2)
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
