import {expect} from 'chai';
import {ethers} from 'hardhat';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {W3ACertificates} from '../typechain-types';
import {collectionName, collectionSymbol, metadataBaseURI0, metadataBaseURI1} from '../helpers/helpers';

describe('W3A Certificate Tests', function () {
    let admin: SignerWithAddress, user: SignerWithAddress;
    let sc: W3ACertificates;

    beforeEach(async () => {
        [admin, user] = await ethers.getSigners();
        let certificateFactory = await ethers.getContractFactory('W3ACertificates');
        sc = await certificateFactory.deploy(metadataBaseURI0, metadataBaseURI1, collectionName, collectionSymbol);
    })

    it('should deploy correctly', async () => {
        expect(await sc.name()).to.be.eq(collectionName);
        expect(await sc.symbol()).to.be.eq(collectionSymbol);
        expect(await sc.baseURI0()).to.be.eq(metadataBaseURI0);
        expect(await sc.baseURI1()).to.be.eq(metadataBaseURI1);
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
        let tokenId = 0;
        await sc.mint(admin.address, tokenId);
        let uri = `${metadataBaseURI0}metadata/metadata_${tokenId}.json`;

        expect(await sc.tokenURI(tokenId))
            .to.be.eq(uri);

        tokenId = 99;
        await sc.mint(admin.address, tokenId);
        uri = `${metadataBaseURI0}metadata/metadata_${tokenId}.json`;

        console.log(uri)
        expect(await sc.tokenURI(tokenId))
            .to.be.eq(uri);

        tokenId = 100;
        await sc.mint(admin.address, tokenId);
        uri = `${metadataBaseURI1}metadata/metadata_${tokenId}.json`;
        console.log(uri)
        expect(await sc.tokenURI(tokenId))
            .to.be.eq(uri);
    });

    it('should not mint 2 same tokenIDs', async () => {
        let tokenId = 0;
        await sc.mint(admin.address, tokenId);
        await expect(sc.mint(admin.address, tokenId)).to.be.revertedWith('ERC721: token already minted');
    });

    it('should change baseURI correctly', async () => {
        let newBaseURI = 'ipfs://newbaseUri/';
        await sc.setBaseURI(0, newBaseURI);
        await sc.setBaseURI(1, newBaseURI);

        expect(await sc.baseURI0()).to.be.eq(newBaseURI);
        expect(await sc.baseURI1()).to.be.eq(newBaseURI);
    });
});
