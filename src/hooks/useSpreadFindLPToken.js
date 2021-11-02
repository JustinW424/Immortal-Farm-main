import { useMemo } from 'react';
import useSingleCallResult from './useBlockchainCall';

export default function useSpreadFindLPToken(contract) {
  const LPTokenAddress = useSingleCallResult(contract, 'allPairs', [0]);
  return useMemo(() => {
    return LPTokenAddress ? LPTokenAddress : undefined;
  }, [LPTokenAddress]);
}
