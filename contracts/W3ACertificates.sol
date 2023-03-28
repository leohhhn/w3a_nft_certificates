// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract W3ACertificates is ERC721, Ownable {
    using Strings for uint256;

    event BaseURIChanged(string _newBaseURI);

    string public baseURI;

    constructor(string memory __baseURI, string memory _name, string memory _symbol) ERC721(_name, _symbol){
        baseURI = __baseURI;
    }

    function mint(address to, uint256 tokenId) external onlyOwner {
        _safeMint(to, tokenId);
    }

    function setBaseURI(string calldata _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
        emit BaseURIChanged(_newBaseURI);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory tmp = _baseURI();
        return bytes(tmp).length > 0 ? string(abi.encodePacked(tmp, "metadata/metadata_", tokenId.toString(), ".json")) : "";
    }
}