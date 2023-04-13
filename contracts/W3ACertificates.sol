// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract W3ACertificates is ERC721, Ownable {
    using Strings for uint256;

    event BaseURIChanged(uint256 which, string newBaseURI);

    string public baseURI0;
    string public baseURI1;

    constructor(string memory __baseURI0, string memory __baseURI1, string memory _name, string memory _symbol) ERC721(_name, _symbol){
        baseURI0 = __baseURI0;
        baseURI1 = __baseURI1;
    }

    function mint(address to, uint256 tokenId) external onlyOwner {
        _mint(to, tokenId);
    }

    function setBaseURI(uint256 _which, string calldata _newBaseURI) external onlyOwner {
        if (_which == 0)
            baseURI0 = _newBaseURI;
        else
            baseURI1 = _newBaseURI;
        emit BaseURIChanged(_which, _newBaseURI);
    }

    function _baseURI(uint256 _which) internal view returns (string memory) {
        if (_which == 0)
            return baseURI0;
        else
            return baseURI1;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory tmp;
        if (tokenId < 100)
            tmp = _baseURI(0);
        else
            tmp = _baseURI(1);

        return bytes(tmp).length > 0 ? string(abi.encodePacked(tmp, "metadata/metadata_", tokenId.toString(), ".json")) : "";
    }
}