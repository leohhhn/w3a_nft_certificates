import {expect} from 'chai';
import {ethers} from 'hardhat';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';

import {W3ACertificates} from '../typechain-types';
import {baseURI, collectionName, collectionSymbol} from '../helpers/helpers';

describe('W3A Certificate Tests', function () {
    let admin: SignerWithAddress;
    let sc: W3ACertificates;

    beforeEach(async () => {
        [admin] = await ethers.getSigners();
        let certificateFactory = await ethers.getContractFactory('W3ACertificates');
        sc = await certificateFactory.deploy(baseURI, collectionName, collectionSymbol);
    })

    it('should deploy correctly', async () => {
        expect(await sc.name()).to.be.eq(collectionName);
        expect(await sc.symbol()).to.be.eq(collectionSymbol);
        expect(await sc.baseURI()).to.be.eq(baseURI);
    });

    it('should have correct URI', async () => {
        let tokenId = 0;
        await sc.mint(admin.address, tokenId);

        let uri = `${baseURI}metadata/metadata_${tokenId}.json`;
        console.log('URI: ', uri)
        expect(await sc.tokenURI(tokenId))
            .to.be.eq(uri);
    });
});
