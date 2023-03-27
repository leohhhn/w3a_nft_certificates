// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract W3A_2023_NFT_Certificates is ERC721, Ownable {

    string public baseCID;

    constructor(string memory _baseCID) ERC721("Web3 Academy 2023 Certificates", "W3A2023C"){
        baseCID = _baseCID;
    }





}