### GHOround

GHOround is the state-of-the-art platform where anyone round the globe can become a part of a new emerging ecosystem of **lending & borrowing AI models** 
that has GHO - AaVE's stablecoin as it's backbone.

* Users can come & build their trading strategies for various tokens of different DEXs & chains & then create models for them.
  
* They can [lend those models to borrowers](https://github.com/VasuK111/Swallet/blob/88982bf2dd97fe9e7603ea6701d1bb62bb8b8aa1/contracts/lender_ccip.sol) & get a [upfront fees in GHO](https://github.com/VasuK111/Swallet/blob/88982bf2dd97fe9e7603ea6701d1bb62bb8b8aa1/contracts/borrower_ccip.sol) tokens.
  The transactions on cross chains/DEXs will be done securely through [CCIP](https://github.com/VasuK111/Swallet/blob/88982bf2dd97fe9e7603ea6701d1bb62bb8b8aa1/contracts/sendGHO_ccip.sol).
  
* For making those models available for lending, they'll have to follow a [Proof-of-Stake](https://github.com/VasuK111/Swallet/blob/88982bf2dd97fe9e7603ea6701d1bb62bb8b8aa1/contracts/StakingPOS.sol) mechanism
  where they will stake a certain amount of GHO which then goes to the Aave DAO Treasury.
  
* The [creditDelegationVault.sol](https://github.com/VasuK111/Swallet/blob/c4bfc3da43428c15962dc5c224301105fce16c78/contracts/creditDelegationVault.sol) will be signed between model lender & borrower which will have a fixed deadline when the model has to be returned & also the interest that the user will have to pay throughout the period on a regular basis.
  
* Borrowers can trade using those models the way they want & all the payments to lenders happens in GHO since it's 1:1 pegged as well.
  
* The lenders after gaining a good record of lending can use the future payments ( interests they will regularly receive from borrowers) as collateral & after crossing a limit they can become a [GHO facilitator](https://github.com/VasuK111/Swallet/blob/main/contracts/Facilitator.sol).
  
* The platform for convenience of users will also have a wallet integrated into the platform where they can buy or sell tokens.
  
* The UI will be very fluid & they can see all their [interactions with GHO coin](https://github.com/VasuK111/Swallet/blob/88982bf2dd97fe9e7603ea6701d1bb62bb8b8aa1/contracts/UIGHoDataProvider.sol). This data fetched is visualised through various charts & users can smartly lookup at their transactio histories & other details.
  
* Web2-Web3 integration also happens since [GET FIAT CURRENCY](https://github.com/VasuK111/Swallet/blob/88982bf2dd97fe9e7603ea6701d1bb62bb8b8aa1/getfiat.ts) option is also available for for users to liquidate their tokens to FIAT currency. We're using Monerium's SDK for this.

* The models borrowed & lended will be kept secure using IPFS encryption and only the CID will be shared with the borrower .

* This will create a positive feedback loop where more the number of models borrowed more GHO tokens will be transacted & this more lenders will be there on the platform who can act as Facilitators & thus mint more GHO for more trading.

* A win-win for both Aave Community & GHO token traders as it will increase the use of GHO for daily trading while also incentivising users for it.
  

All of this process described above is smoothly iluustrated in the following diagram:  

## Contract Addresses



## What's Next?


