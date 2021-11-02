import { useMemo } from 'react';
import useSingleCallResult from './useBlockchainCall';

export default function useSpreadreservesWFTM(contract) {
  let LPPairFTM = 0;
  const BlockAddress = useSingleCallResult(contract, 'token0', []);
  const allReserves = useSingleCallResult(contract, 'getReserves', []);
  
    if (Array.isArray(allReserves)) {
      if (BlockAddress === "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83") 
        LPPairFTM = parseInt(allReserves[0]._hex) * 2;
      else
        LPPairFTM = parseInt(allReserves[1]._hex) * 2;
    }  
  const totalSupply = useSingleCallResult(contract, 'totalSupply', []);
  return {"LPPairFTM": LPPairFTM, "TotalSupply": Number(totalSupply)}
}
