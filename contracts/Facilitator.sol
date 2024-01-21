//SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './interfaces/IWrappedToken.sol' ;
import './interfaces/IPool.sol';


contract Facilitator is Ownable {
    constructor(address initialOwner) 
        Ownable(initialOwner)
    {}

    uint256 private BucketThreshold = 10;
    uint256 private AvailableCapacity;
    uint256 private BucketCapacity=20;

    address public GHO = 0xc4bF5CbDaBE595361438F8c6a187bDc330539c60; //GHO Sepolia
    IERC20 ghoToken = IERC20(GHO);

    address public aaveGateway = 0x387d311e47e80b498169e6fb51d3193167d89F7D;
    IWrappedToken gateway = IWrappedToken(aaveGateway); // collateral

    address public aavePool = 0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951;
    IPool pool = IPool(aavePool); // borrow repay

    
    function deposit () external payable onlyOwner {
        gateway.deposit{value: msg.value}(aavePool, address(this), 0);
    }

/* User can MINT GHO when the
 number of AI Models he lended are now greater than the collateral threshold.*/

    function borrow (uint256 AvailableCapacity) internal onlyOwner {
        require( BucketThreshold<= AvailableCapacity,'You need to lend more AI Models to mint GHO');
        require( AvailableCapacity<= BucketCapacity, 'Limit Reached');
        
        pool.borrow(GHO, AvailableCapacity, 2, 0, address(this));
    }

    function SellGHO (uint256 amount, address user) external onlyOwner {
        borrow(amount);
        bool ghoTransferred = ghoToken.transfer(user, amount);
        require(ghoTransferred, 'Transfer failed.');
    }

    function repay (uint256 amount) external onlyOwner {
        require(BucketThreshold <= AvailableCapacity, 'Charges DUE');

        pool.repay(GHO, amount, 2, address(this));
    }

    function withdraw() external onlyOwner {
        require(ghoToken.balanceOf(address(this)) >= 0, 'zero balance');
        
        //clear gho vault
        uint256 balance = ghoToken.balanceOf(address(this));
        bool ghoTransferred = ghoToken.transfer(msg.sender, balance);
        require(ghoTransferred, 'Transfer failed.');
    } 

}