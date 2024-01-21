// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {IAccessControl} from '@openzeppelin/contracts/access/IAccessControl.sol';

interface IGhoToken is IERC20, IAccessControl {
  struct Facilitator {
    uint128 bucketCapacity;
    uint128 bucketLevel;
    string label;
  }

  event FacilitatorAdded(
    address indexed facilitatorAddress,
    bytes32 indexed label,
    uint256 bucketCapacity
  );

  event FacilitatorRemoved(address indexed facilitatorAddress);

  event FacilitatorBucketCapacityUpdated(
    address indexed facilitatorAddress,
    uint256 oldCapacity,
    uint256 newCapacity
  );

  event FacilitatorBucketLevelUpdated(
    address indexed facilitatorAddress,
    uint256 oldLevel,
    uint256 newLevel
  );

  function FACILITATOR_MANAGER_ROLE() external pure returns (bytes32);

  function BUCKET_MANAGER_ROLE() external pure returns (bytes32);

  function mint(address account, uint256 amount) external;

  function burn(uint256 amount) external;

  function addFacilitator(
    address facilitatorAddress,
    string calldata facilitatorLabel,
    uint128 bucketCapacity
  ) external;


  function removeFacilitator(address facilitatorAddress) external;

  function setFacilitatorBucketCapacity(address facilitator, uint128 newCapacity) external;

  function getFacilitator(address facilitator) external view returns (Facilitator memory);

  function getFacilitatorBucket(address facilitator) external view returns (uint256, uint256);

  function getFacilitatorsList() external view returns (address[] memory);
}