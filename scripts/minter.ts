import {ethers} from 'hardhat';
import {W3ACertificates} from '../typechain-types';
import {Candidate, w3aMumbai} from '../helpers/helpers';
import {getCandidateList} from '../helpers/xlsx_reader';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';

async function main() {
    const [minter] = await ethers.getSigners();

    console.log('Acting as: ' + minter.address);

    let W3ACertificates = await ethers.getContractFactory('W3ACertificates');
    let w3aCertificates: W3ACertificates = await W3ACertificates.attach(w3aMumbai); // connect to instance

    console.log('W3A Certificates instance: ', w3aCertificates.address)

    let candidates: Candidate[] = getCandidateList();
    let balanceBefore = await minter.getBalance();

    for (let i = 0; i < candidates.length; i++) {
        const candidate: SignerWithAddress = await ethers.getSigner(candidates[i].address);
        console.log(`Minting ${candidates[i].role.toLowerCase()} NFT #${i} to ${await candidate.getAddress()}`);
        await w3aCertificates.mint(await candidate.getAddress(), i);
    }

    let balanceAfter = await minter.getBalance();
    console.log('Total mint cost: ', ethers.utils.formatEther(balanceBefore.sub(balanceAfter)));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
