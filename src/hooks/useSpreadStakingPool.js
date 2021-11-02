import { useMemo } from 'react';
import useSingleCallResult from './useBlockchainCall';

export default function useSpreadStakingPool(contract) {
  const lp1_userInfo = useSingleCallResult(contract, 'userInfo', [17, '0x86478b2877a4155AE72aD543ABC69c9dfd73ad76']);
  const lp2_userInfo = useSingleCallResult(contract, 'userInfo', [30, '0x86478b2877a4155AE72aD543ABC69c9dfd73ad76']);
  const lp3_userInfo = useSingleCallResult(contract, 'userInfo', [4, '0x86478b2877a4155AE72aD543ABC69c9dfd73ad76']);
  const lp4_userInfo = useSingleCallResult(contract, 'userInfo', [56, '0x86478b2877a4155AE72aD543ABC69c9dfd73ad76']);

  const amount = [];
  if (Array.isArray(lp1_userInfo)) 
    amount[0] = Number(lp1_userInfo['amount']._hex)
  if (Array.isArray(lp2_userInfo)) 
    amount[1] = Number(lp2_userInfo['amount']._hex)
  if (Array.isArray(lp3_userInfo)) 
    amount[2] = Number(lp3_userInfo['amount']._hex)
  if (Array.isArray(lp4_userInfo)) 
    amount[3] = Number(lp4_userInfo['amount']._hex)

  return amount;
}
