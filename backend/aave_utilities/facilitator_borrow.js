import { Pool, InterestRate } from "@aave/contract-helpers";
import { EthereumTransactionTypeExtended } from '@aave/contract-helpers';
import { BigNumber, providers } from 'ethers';

const pool = new Pool(provider, {
  POOL: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60", // Goerli Sepolia market
  WETH_GATEWAY: "0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534", // Goerli Sepolia market
});

const txs: EthereumTransactionTypeExtended[] = await pool.borrow({
  user,
  reserve: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60", // Goerli Sepolia market
  amount,
  interestRateMode,
  debtTokenAddress: "0x80aa933EfF12213022Fd3d17c2c59C066cBb91c7", // Goerli Sepolia market
  onBehalfOf,
  referralCode,
});

function submitTransaction({
  provider: ethers.providers.provider,
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