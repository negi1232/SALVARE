// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Daoathon is ERC721, Pausable {
    uint256 public tokenId;
    address public admin;
    string public tokenUriImage = "ipfs://";
    string public contractUriJson = "ipfs://";
    string public externalUrl = "";

    constructor() ERC721("SalvareNFT", "SNFT") {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    function transferAdminship(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "New Admin is the zero address");
        admin = newAdmin;
    }

    function pause() public onlyAdmin {
        _pause();
    }

    function unpause() public onlyAdmin {
        _unpause();
    }

    function setTokenUriImage(string memory imageCid) external onlyAdmin {
        tokenUriImage = imageCid;
    }

    function setContractUriJson(string memory jsonCid) external onlyAdmin {
        contractUriJson = jsonCid;
    }

    function setExternalUrl(string memory _externalUrl) external onlyAdmin {
        externalUrl = _externalUrl;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal override {
        require(
            from == address(0) || to == address(0),
            "Cannot transfer to others"
        );
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    function hashMsgSender() public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(msg.sender)));
    }

    function mintNft() external whenNotPaused {
        ++tokenId;
        _safeMint(msg.sender, tokenId);
    }

    function burnNft(uint256) external {
        --tokenId;
        _burn(uint256);
    }

    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        _requireMinted(_tokenId);
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        abi.encodePacked(
                            '{"image": "',
                            tokenUriImage,
                            '", "external_url": "',
                            externalUrl,
                            '", "description": "", "name": "SalvareNFT"}'
                        )
                    )
                )
            );
    }

    function contractURI() public view returns (string memory) {
        return contractUriJson;
    }
}
