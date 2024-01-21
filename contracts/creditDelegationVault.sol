// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

contract GHOcreditDelegationVault is ERC4626, Ownable{
    uint256 public baseFees=10000000000000000000;
    uint256 public borrowPeriod=10;
    IERC20 public tradedToken;
    uint256 private amountTraded;
    uint256 public interestPaid;
    uint256 public initialAmount;
    uint256 public underlyingDecimals = 18;
    uint256 public borrowedTime;
    string public CID;

    struct Interest{
        uint256 amount;
        uint256 time;
        uint256 interest;
    }

    mapping (address=>Interest) private borrowertopay;

    event Borrowed(address indexed owner, uint256 amount);
    event ModelReceived(address indexed owner, string CID);

constructor(IERC20 _ghoToken) ERC4626(_ghoToken) ERC20("Gho Token", "GHO") Ownable(msg.sender) {
        tradedToken = _ghoToken;
        initialAmount = 10;
    }


function calculateInterest(uint256 amount, uint256 borrowedTime, uint256 baseFees, uint256 borrowPeriod) internal view returns (uint256) {
        uint256 timeElapsed = block.timestamp - borrowedTime;

        // If model is borrowed for less than 1 month (86400*30 seconds), charge 20% fee
        if (timeElapsed < borrowPeriod * 1 days) {
            return (amount * 2000) / 10000;
        } else {
            // If model is borrowed for more than 30 days
            uint256 baseFees = baseFees;
            uint256 minAmountForReducedFee = 100000; // Minimum amount threshold for reduced fee

            uint256 effectiveBaseFees;
            if (amount < minAmountForReducedFee) {
                effectiveBaseFees = baseFees;
            } else {
                uint256 inverseFeeRate = 10000000 / amount; // Adjusted inverse fee calculation
                effectiveBaseFees = inverseFeeRate < baseFees ? inverseFeeRate : baseFees;
            }
            return (amount * effectiveBaseFees) / 10000;
        }
}


function totalCreditRemaining() view public returns (uint256) {
        return totalAssets() - initialAmount;
    }

function borrowWithPermit(uint256 assets, address receiver, uint256 deadline, uint8 v, bytes32 r, bytes32 s) public onlyOwner {
        IERC20Permit(address(tradedToken)).permit(msg.sender, address(this), assets, deadline, v, r, s);
        require(IERC20(tradedToken).transferFrom(msg.sender, address(this), assets), "Transfer failed");

        borrowertopay[receiver] = Interest(assets, block.timestamp, interestPaid);
        initialAmount += assets;

        emit Borrowed(receiver, assets);
    }

function borrow(uint256 amount, address receiver) public onlyOwner returns (uint256 shares) {
        borrowertopay[receiver] = Interest(amount, block.timestamp,interestPaid);
        initialAmount += initialAmount;
        return super.deposit(amount, receiver);
    }

function withdraw(uint256 assets, address receiver, address _owner) public override onlyOwner returns (uint256 shares) {

}

function modelReceived(uint256 amount) public onlyOwner {
        require(tradedToken.transferFrom(msg.sender, address(this),amount), "Transfer failed");
    emit ModelReceived(msg.sender,CID );
    }

function receivedCID(string calldata Model) public pure returns(string memory){
         return Model;
}

function finalValue() public view returns (uint256) {
        return super.totalAssets() + amountTraded;
    }

}
                                  ///********
///SENDING GHO FROM ETH SEPOLIA TO ARB SEPOLIA VIA CCIP ALONG WITH CID OF THE MODEL
                                  

contract sendGHOviaCCIP is OwnerIsCreator {
    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees);
    error NothingToWithdraw();
    error FailedToWithdrawEth(address owner, address target, uint256 value); 
    error DestinationChainNotAllowlisted(uint64 destinationChainSelector); 
    
    event TokensTransferred(
        bytes32 indexed messageId, 
        uint64 indexed destinationChainSelector,
        address receiver, 
        address token,
        uint256 tokenAmount, 
        address feeToken, 
        uint256 fees 
    );

    mapping(uint64 => bool) public allowlistedChains;

    IRouterClient private s_router;

    IERC20 private s_linkToken;

    constructor(address _router, address _link) {
        s_router = IRouterClient(_router);
        s_linkToken = IERC20(_link);
    }

    modifier onlyAllowlistedChain(uint64 _destinationChainSelector) {
        if (!allowlistedChains[_destinationChainSelector])
            revert DestinationChainNotAllowlisted(_destinationChainSelector);
        _;
    }
    function allowlistDestinationChain(
        uint64 _destinationChainSelector,
        bool allowed
    ) external onlyOwner {
        allowlistedChains[_destinationChainSelector] = allowed;
    }

    function transferTokensPayLINK(
        uint64 _destinationChainSelector,
        address _receiver,
        address _token,
        uint256 _amount
    )
        external
        onlyOwner
        onlyAllowlistedChain(_destinationChainSelector)
        returns (bytes32 messageId)
    {

        Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(
            _receiver,
            _token,
            _amount,
            address(s_linkToken)
        );

        uint256 fees = s_router.getFee(
            _destinationChainSelector,
            evm2AnyMessage
        );

        if (fees > s_linkToken.balanceOf(address(this)))
            revert NotEnoughBalance(s_linkToken.balanceOf(address(this)), fees);
        s_linkToken.approve(address(s_router), fees);
        IERC20(_token).approve(address(s_router), _amount);
        messageId = s_router.ccipSend(
            _destinationChainSelector,
            evm2AnyMessage
        );

        emit TokensTransferred(
            messageId,
            _destinationChainSelector,
            _receiver,
            _token,
            _amount,
            address(s_linkToken),
            fees
        );
        return messageId;
    }

    function _buildCCIPMessage(
        address _receiver,
        address _token,
        uint256 _amount,
        address _feeTokenAddress
    ) internal pure returns (Client.EVM2AnyMessage memory) {
        Client.EVMTokenAmount[]
            memory tokenAmounts = new Client.EVMTokenAmount[](1);
        tokenAmounts[0] = Client.EVMTokenAmount({
            token: _token,
            amount: _amount
        });

            Client.EVM2AnyMessage({
                receiver: abi.encode(_receiver), 
                data: "bafybeig6idqcrpdakcnki4v4cvcxqf7fabsrqw6gjig4iakmevp2fofz2q", 
                tokenAmounts: tokenAmounts, // The amount and type of token being transferred
                extraArgs: Client._argsToBytes(
                    // Additional arguments, setting gas limit to 0 as we are not sending any data
                    Client.EVMExtraArgsV1({gasLimit: 0})
                ),
                // Set the feeToken to a feeTokenAddress, indicating specific asset will be used for fees
                feeToken: _feeTokenAddress
            });
    }

    receive() external payable {}
}

