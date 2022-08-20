// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BlueBird is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;
    bool public paused = false;
    bool public revealed = false;
    string public notRevealedUri;
    string private _currentBaseURI;
    uint256 public cap;

    constructor(uint256 _newCap) ERC721("BlueBird Helix", "BBH") {
        setNotRevealedURI(
            "ipfs://QmNXSQPSXkKcyfz1Hv5UfXdnEce8HbPmvRxX9QiKNgaigF/hidden.json"
        );
        setBaseURI("ipfs://QmfQYSR4gTxx7K4ctnfqEXDr3Hkbpd3btqkYrya5APWTvB/");
        cap = _newCap;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _currentBaseURI = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _currentBaseURI;
    }

    function mint() external onlyOwner {
      require(
            cap >= _tokenIdCounter.current(),
            "There are no more tokens to mint"
        );
        _tokenIdCounter.increment();
        _safeMint(msg.sender, _tokenIdCounter.current());
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        ".json"
                    )
                )
                : "";
    }

    function reveal() public onlyOwner {
        revealed = true;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function clearETH() public payable onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
