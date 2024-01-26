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
<img src="https://github.com/VasuK111/GHOround/blob/main/frontend-new/src/Assets/Flowchart%20(1).jpg">



## Contract Addresses

* [0x39F1d105446E32942318F63c1363a835F9BD8dCF](https://ccip.chain.link/address/0x39f1d105446e32942318f63c1363a835f9bd8dcf) -- [lender_ccip](https://github.com/VasuK111/Swallet/blob/8e7751ecb6a261b25dc817f8fb5aaea3f18677ad/contracts/lender_ccip.sol)
* [0x1F2E135F5a90EDcAEf32Bae4804eb894418645Cc](https://ccip.chain.link/address/0x1f2e135f5a90edcaef32bae4804eb894418645cc) -- [borrower_ccip](https://github.com/VasuK111/Swallet/blob/8e7751ecb6a261b25dc817f8fb5aaea3f18677ad/contracts/borrower_ccip.sol)
* `0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59` -- [sendGHO_ccip](https://github.com/VasuK111/Swallet/blob/8e7751ecb6a261b25dc817f8fb5aaea3f18677ad/contracts/sendGHO_ccip.sol)
* `0x147F6d5B83166043C0784cD688AFE5C54f4f295a` -- [creditDelegationVault](https://github.com/VasuK111/Swallet/blob/8e7751ecb6a261b25dc817f8fb5aaea3f18677ad/contracts/creditDelegationVault.sol)
* `0x494e65506Bf2a0d0650aE789bD7299a41EAFf1Cb` -- [mockGHOToken](https://github.com/VasuK111/Swallet/blob/8e7751ecb6a261b25dc817f8fb5aaea3f18677ad/contracts/mocks/mockGhoToken.sol)
* `0x502726A056D32Fc3362Eb21095401dd93Fa47fC3` -- [mockAToken](https://github.com/VasuK111/Swallet/blob/8e7751ecb6a261b25dc817f8fb5aaea3f18677ad/contracts/mocks/mockAToken.sol)
* `0x0f55c1C9250fC77f5261B9773cACB6d6b455fB1C` -- [Facilitator](https://github.com/VasuK111/Swallet/blob/8e7751ecb6a261b25dc817f8fb5aaea3f18677ad/contracts/Facilitator.sol)
* `0xF0138ef0b7D6Ed38A5091a2B4AcEa2A05072Ea51` -- [UIGhoDataProvider](https://github.com/VasuK111/Swallet/blob/8e7751ecb6a261b25dc817f8fb5aaea3f18677ad/contracts/UIGHoDataProvider.sol)

## FAQs
* How does the facilitator aspect works ?
  Well, the concept is such that whenever the `AvailableCapacity()` of the lender is greater than the `BucketThreshold()` while simultaneously being less than the 
  `BucketCapacity()`, the lender is elgible to act as a [Facilitator](https://github.com/VasuK111/Swallet/blob/397ad13facf6ef6180964ab966de21a11739c1fa/contracts/Facilitator.sol).

* What is the collateral that the GHO is being minted against in this case, is it the expectation of profit from the strategies?
  Every borrower who has borrowed a model signs an agreement with the lender, pays the upfront fees in GHO tokens.
  Now he'll have to also pay a certain fixed amount of fees predefined in the contract every month to the lender as interest.
  The interest that this lender gets every month + also the number of borrower count acts as a collateral for the lender.

  **Ofcourse, We can't keep expectations of profit from strategies as collateral since that's not a guaranteed or a very reliable form of payment**.
 
## What's Next?
 * *Well, why just limit to models for trading!?*. We plan to expand to building the customised model framework in the next couple of months to enable lenders to lend any kind of AI model which will bring generalisability & wide adoption of the ecosystem thus bringing in even more use cases for GHO token.


