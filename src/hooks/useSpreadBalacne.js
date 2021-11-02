import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { truncate } from '../utils';
import useSingleCallResult from './useBlockchainCall';
import {
  useSharePriceAContract,
  useSharePriceBContract,
  useSharePriceCContract,
  useSpreadAConract,
  useSpreadBConract,
  useSpreadCConract,
} from './useContract';

export default function useSpreadBalance(contract, sharePriceContract) {
  const { account } = useWeb3React();
  const data = useSingleCallResult(contract, 'balanceOf', [account]);
  const sharePrice = useSingleCallResult(
    sharePriceContract,
    'sharePriceFTM',
    [],
  );
  return useMemo(() => {
    return data && sharePrice
      ? truncate((formatEther(data) * formatEther(sharePrice)).toString())
      : undefined;
  }, [data, sharePrice]);
}
export function useSpreadABalance() {
  const contract = useSpreadAConract();
  const sharePriceContract = useSharePriceAContract();

  return useSpreadBalance(contract, sharePriceContract);
}
export function useSpreadBBalance() {
  const contract = useSpreadBConract();
  const sharePriceContract = useSharePriceBContract();

  return useSpreadBalance(contract, sharePriceContract);
}
export function useSpreadCBalance() {
  const contract = useSpreadCConract();
  const sharePriceContract = useSharePriceCContract();

  return useSpreadBalance(contract, sharePriceContract);
}
