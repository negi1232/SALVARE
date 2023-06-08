// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "./interfaces/ISALVARE.sol";

contract SalvareNFT is ERC721, Pausable {
    uint256 public tokenIds;
    uint256 public mintableAmount;
    address public admin;
    ISALVARE public salvare;
    string public tokenUriImage = "ipfs://";
    string public contractUriJson = "ipfs://";
    string public externalUrl;
    string public description;

    constructor() ERC721("SalvareNFT", "SFNT") {
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

    function setSalvare(address salvareAddress) external onlyAdmin {
        salvare = ISALVARE(salvareAddress);
    }

    function setMintableAmount(uint256 amount) external onlyAdmin {
        mintableAmount = amount;
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
        require(
            salvare.balanceOf(msg.sender) >= mintableAmount ||
                msg.sender == admin,
            "No SALVARE tokens"
        );
        ++tokenIds;
        _safeMint(msg.sender, hashMsgSender());
    }

    function burnNft() external {
        --tokenIds;
        _burn(hashMsgSender());
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireMinted(tokenId);
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
                            '", "description": "',
                            description,
                            '", "name": "SalvareNFT"}'
                        )
                    )
                )
            );
    }

    function contractURI() public view returns (string memory) {
        return contractUriJson;
    }
}
