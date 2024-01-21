// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGhoFacilitator {

  event FeesDistributedToTreasury(
    address indexed ghoTreasury,
    address indexed asset,
    uint256 amount
  );

  event GhoTreasuryUpdated(address indexed oldGhoTreasury, address indexed newGhoTreasury);

  function distributeFeesToTreasury() external;

  function updateGhoTreasury(address newGhoTreasury) external;

  function getGhoTreasury() external view returns (address);
}