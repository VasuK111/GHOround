// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./Interfaces/IStaking.sol";

contract StakingRegistry {
    error IncStakingAmount();
    error ClientAlreadyStaked();
    error ClientHasntStaked();
    error TimelockHasntExpired();
    error ClientHasntUnRegistered();
    error NotSlashingManager();
    error ClientHasBeenSlashed();

    mapping(address => uint256) public clientStakes;
    mapping(address => bool) public isStaked;
    mapping(address => bool) public isSlashed;
    mapping(address => uint256) public withdrawlTimelock;

    uint256 public immutable STAKING_AMOUNT;
    uint256 public immutable STAKING_PERIOD;
    address public immutable SLASHING_MANAGER;
    address public immutable SLASH_TREASURY_ADDRESS;

    event Stake(address indexed client);
    event Unregister(address indexed client);
    event WithdrawStake(address indexed client);
    event SlashStake(address indexed client);

    /// @notice Constructor for StakingRegistry
    /// @param _stakeAmount Amount of stake required to be staked by client
    /// @param _stakingPeriod Period for which client stake is locked
    /// @param _slashingManager Address of slashing manager
    /// @param _slashTreasuryAddress Address of slash treasury
    constructor(
        uint256 _stakeAmount,
        uint256 _stakingPeriod,
        address _slashingManager,
        address _slashTreasuryAddress
    ) {
        STAKING_AMOUNT = _stakeAmount;
        STAKING_PERIOD = _stakingPeriod;
        SLASHING_MANAGER = _slashingManager;
        SLASH_TREASURY_ADDRESS = _slashTreasuryAddress;
    }

    /// @notice Function to stake for client
    /// @dev This function is used to stake for client
    function stake() external payable {
        if (msg.value == STAKING_AMOUNT) {
            revert IncStakingAmount();
        }
        if (isStaked[msg.sender]) {
            revert ClientAlreadyStaked();
        }
        if (withdrawlTimelock[msg.sender] > block.timestamp) {
            revert TimelockHasntExpired();
        }
        if (isSlashed[msg.sender]) {
            revert ClientHasBeenSlashed();
        }
        isStaked[msg.sender] = true;
        clientStakes[msg.sender] += STAKING_AMOUNT;
        require(
            clientStakes[msg.sender] == STAKING_AMOUNT,
            "Inc staking amount"
        );

        emit Stake(msg.sender);
    }

    /// @notice Function to unregister client
    /// @dev This function is used to unregister client
    function unRegister() external {
        if (!isStaked[msg.sender]) {
            revert ClientHasntStaked();
        }
        require(isStaked[msg.sender], "Not staked");
        withdrawlTimelock[msg.sender] = block.timestamp + STAKING_PERIOD;
        isStaked[msg.sender] = false;

        emit Unregister(msg.sender);
    }

    /// @notice Function to withdraw client stake
    /// @dev This function is used to withdraw client stake
    function withdrawStake() external {
        if (isStaked[msg.sender]) {
            revert ClientHasntUnRegistered();
        }
        if (withdrawlTimelock[msg.sender] < block.timestamp) {
            revert TimelockHasntExpired();
        }
        uint256 _stake = clientStakes[msg.sender];
        clientStakes[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: _stake}("");
        require(success, "Transfer failed.");
        require(clientStakes[msg.sender] == 0, "Inc stake amount");

        emit WithdrawStake(msg.sender);
    }

    function slashStake(address _clientAddress) external {
        if (msg.sender != SLASHING_MANAGER) {
            revert NotSlashingManager();
        }
        if (
            !isStaked[_clientAddress] &&
            withdrawlTimelock[_clientAddress] < block.timestamp
        ) {
            revert ClientHasntStaked();
        }
        uint256 _stake = clientStakes[_clientAddress];

        clientStakes[_clientAddress] = 0;
        isStaked[_clientAddress] = false;
        isSlashed[_clientAddress] = true;
        (bool success, ) = SLASH_TREASURY_ADDRESS.call{value: _stake}("");
        require(success, "Transfer failed.");

        emit SlashStake(_clientAddress);
    }

    function getClientStake(
        address _clientAddress
    ) external view returns (uint256) {
        return clientStakes[_clientAddress];
    }

    function getStakingPeriod() external view returns (uint256) {
        return STAKING_PERIOD;
    }

    function getStakeAmount() external view returns (uint256) {
        return STAKING_AMOUNT;
    }

    function getSlashTreasuryAddress() external view returns (address) {
        return SLASH_TREASURY_ADDRESS;
    }

    function getSlashingManagerAddress() external view returns (address) {
        return SLASHING_MANAGER;
    }

    function getWithdrawlTimelock(
        address _clientAddress
    ) external view returns (uint256) {
        return withdrawlTimelock[_clientAddress];
    }

    function getIsSlashed(address _clientAddress) external view returns (bool) {
        return isSlashed[_clientAddress];
    }

    function getIsStaked(address _clientAddress) external view returns (bool) {
        return isStaked[_clientAddress];
    }
}