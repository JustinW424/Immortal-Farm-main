import { useMemo } from 'react';
import useSingleCallResult from './useBlockchainCall';

export default function useSpreadallPairs(contract) {
  const LPTokenAddress = [];
  LPTokenAddress[0] = useSingleCallResult(contract, 'allPairs', [0]);
  LPTokenAddress[1] = useSingleCallResult(contract, 'allPairs', [1]);
  LPTokenAddress[2] = useSingleCallResult(contract, 'allPairs', [2]);
  LPTokenAddress[3] = useSingleCallResult(contract, 'allPairs', [3]);

  return useMemo(() => {
    return LPTokenAddress
  }, [LPTokenAddress]);
}
