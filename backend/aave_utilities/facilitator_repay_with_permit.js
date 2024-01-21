/// EIP-2612 Logic
import { Pool } from '@aave/contract-helpers';
import { EthereumTransactionTypeExtended } from '@aave/contract-helpers';

const pool = new Pool(provider, {
    POOL: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60", // Goerli Sepolia market
    WETH_GATEWAY: "0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534", // Goerli Sepolia market
});

// Generate payload to be signed by user
const approvalMsg = await pool.signERC20Approval({
   user,
   reserve,
   amount,
   deadline, 
)};

// User signs with wallet method such as ethers signTypedDataV4 and passed as signature variable in next call

const txs: EthereumTransactionTypeExtended[] = await pool.repayWithPermit({
  user,
  reserve: '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60', // Goerli Sepolia market
  amount,
  interestRateMode,
  onBehalfOf,
  signature,
});

import { BigNumber, providers } from 'ethers';

function submitTransaction({
  provider: ethers.providers.provider,  // Signing transactions requires a wallet provider
  tx: EthereumTransactionTypeExtended
}){
  const extendedTxData = await tx.tx();
  const { from, ...txData } = extendedTxData;
  const signer = provider.getSigner(from);
  const txResponse = await signer.sendTransaction({
    ...txData,
    value: txData.value ? BigNumber.from(txData.value) : undefined,
  });
}