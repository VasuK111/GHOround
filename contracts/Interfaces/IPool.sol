// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

interface IPool {

    function borrow(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        uint16 referralCode,
        address onBehalfOf
    ) external;


    function repay(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        address onBehalfOf
    ) external returns (uint256);

    function getUserData(
        address user
    ) external view returns(uint256, uint256, uint256, uint256, uint256, uint256);
}