import {expect} from 'chai';
import {ethers} from 'hardhat';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {W3ACertificates} from '../typechain-types';
import {baseURI, collectionName, collectionSymbol} from '../helpers/helpers';

describe('W3A Certificate Tests', function () {
    let admin: SignerWithAddress, user: SignerWithAddress;
    let sc: W3ACertificates;

    beforeEach(async () => {
        [admin, user] = await ethers.getSigners();
        let certificateFactory = await ethers.getContractFactory('W3ACertificates');
        sc = await certificateFactory.deploy(baseURI, collectionName, collectionSymbol);
    })

    it('should deploy correctly', async () => {
        expect(await sc.name()).to.be.eq(collectionName);
        expect(await sc.symbol()).to.be.eq(collectionSymbol);
        expect(await sc.baseURI()).to.be.eq(baseURI);
    });

    it('should mint token correctly', async () => {
        let tokenId = 0;
        await sc.mint(admin.address, tokenId);
        expect(await sc.balanceOf(admin.address)).to.be.eq(1);
        expect(await sc.ownerOf(tokenId)).to.be.eq(admin.address);
        tokenId++;

        await sc.mint(user.address, tokenId);
        expect(await sc.balanceOf(user.address)).to.be.eq(1);
        expect(await sc.ownerOf(tokenId)).to.be.eq(user.address);
    });

    it('should return correct token metadata URI', async () => {
        for (let i = 0; i < 5; i++) {
            let tokenId = i;
            await sc.mint(admin.address, tokenId);
            let uri = `${baseURI}metadata/metadata_${tokenId}.json`;

            expect(await sc.tokenURI(tokenId))
                .to.be.eq(uri);
        }
    });

    it('should change baseURI correctly', async () => {
        let currentBaseURI = await sc.baseURI();
        let newBaseURI = 'ipfs://newbaseUri/';

        await sc.setBaseURI(newBaseURI);
        expect(currentBaseURI !== newBaseURI).to.be.true;
        expect(await sc.baseURI()).to.be.eq(newBaseURI);
    });
});
