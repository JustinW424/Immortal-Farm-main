import { formatEther } from '@ethersproject/units';
import { useMemo } from 'react';
import { truncate } from '../utils';
import useSingleCallResult from './useBlockchainCall';

export default function useSpreadTVL(contract) {
  const lastTVL = useSingleCallResult(contract, 'lastTVL', []);
  return useMemo(() => {
    return lastTVL ? truncate(formatEther(lastTVL)) : undefined;
  }, [lastTVL]);
}
