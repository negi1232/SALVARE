// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

interface ISALVARE is IERC20 {
    function setAmountOfTrash(uint256 _newAmount, uint256 id) external;

    function verifySignature(
        bytes32 messageHash,
        bytes memory signature
    ) external pure returns (address);

    function startWork(
        uint256 trashWeight,
        bytes32 messageHash,
        bytes memory signature,
        uint256 id
    ) external;

    function doneWork(
        uint actualWeight,
        bytes32 messageHash,
        bytes memory signature
    ) external;
}
