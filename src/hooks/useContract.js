import ABI from '../constants/abi.json';
import SHARE_PRICE_ABI from '../constants/sharePrice.json';
import APPROVAL_ABI from '../constants/approve.json';
import LP_ABI from '../constants/lp.json';
import STAKING_POOL_ABI from '../constants/stakingpool.json';
import FTM_ABI from '../constants/ftm.json';
import {
  SPREAD_A_CONTRACT_ADDRESS,
  SPREAD_B_CONTRACT_ADDRESS,
  SPREAD_C_CONTRACT_ADDRESS,
  SHARE_PRICE_A_CONTRACT_ADDRESS,
  SHARE_PRICE_B_CONTRACT_ADDRESS,
  SHARE_PRICE_C_CONTRACT_ADDRESS,
  APPROVAL_CONTRACT_ADDRESS,
  LP1_ADDRESS,
  LP2_ADDRESS,
  LP3_ADDRESS,
  LP4_ADDRESS,
  STAKING_POOL_ADDRESS,
  FTM_CONTRACT
} from '../constants/index';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { getAddress } from 'ethers/lib/utils';
import { AddressZero } from '@ethersproject/constants';
export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
// / account is not optional
export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}
// returns null on errors
function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined,
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}
export function useSpreadAConract() {
  return useContract(SPREAD_A_CONTRACT_ADDRESS, ABI, true);
}
export function useSpreadBConract() {
  return useContract(SPREAD_B_CONTRACT_ADDRESS, ABI, true);
}
export function useSpreadCConract() {
  return useContract(SPREAD_C_CONTRACT_ADDRESS, ABI, true);
}
export function useSharePriceAContract() {
  return useContract(SHARE_PRICE_A_CONTRACT_ADDRESS, SHARE_PRICE_ABI, true);
}
export function useSharePriceBContract() {
  return useContract(SHARE_PRICE_B_CONTRACT_ADDRESS, SHARE_PRICE_ABI, true);
}
export function useSharePriceCContract() {
  return useContract(SHARE_PRICE_C_CONTRACT_ADDRESS, SHARE_PRICE_ABI, true);
}
export function useApprovalContract() {
  return useContract(APPROVAL_CONTRACT_ADDRESS, APPROVAL_ABI, true);
}

export function useLP1Contract() {
  return useContract(LP1_ADDRESS, LP_ABI, true);
}
export function useLP2Contract() {
  return useContract(LP2_ADDRESS, LP_ABI, true);
}
export function useLP3Contract() {
  return useContract(LP3_ADDRESS, LP_ABI, true);
}
export function useLP4Contract() {
  return useContract(LP4_ADDRESS, LP_ABI, true);
}
export function useStakingPoolContract() {
  return useContract(STAKING_POOL_ADDRESS, STAKING_POOL_ABI, true);
}
export function useFtmContract() {
  return useContract(FTM_CONTRACT, FTM_ABI, true);
}
