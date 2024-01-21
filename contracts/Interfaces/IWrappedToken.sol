//SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface IWrappedToken {
    function deposit(
        address pool,
        address onBehalfOf,
        uint16 referralCode
    ) external payable;
}