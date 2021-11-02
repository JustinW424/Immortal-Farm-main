import { MaxUint256 } from '@ethersproject/constants';
import { useCallback, useMemo } from 'react';
import { calculateGasMargin, toWei } from '../utils';
import { BigNumber } from 'ethers';
import { useTransactions } from '../store/transactions';
import { useWeb3React } from '@web3-react/core';
import { useIsApproving } from './useIsApproving';
import useSingleCallResult from './useBlockchainCall';
import { useApprovalContract } from './useContract';
export const ApprovalState = {
  UNKNOWN: 'UNKNOWN',
  NOT_APPROVED: 'NOT_APPROVED',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
};
function useTokenAllowance(contract, account, spender) {
  const result = useSingleCallResult(contract, 'allowance', [account, spender]);
  return useMemo(() => {
    return !result ? BigNumber.from('0') : result;
  }, [result]);
}
// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(amountToApprove, spender) {
  const { account } = useWeb3React();
  const token = useApprovalContract();
  const currentAllowance = useTokenAllowance(
    token,
    account ?? undefined,
    spender,
  );
  const pendingApproval = useIsApproving(token?.address, spender);
  // check the current approval status
  const approvalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN;
    // we might not have enough data to know whether or not we need to approve
    if (!(currentAllowance + '')) return ApprovalState.UNKNOWN;

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lt(toWei(amountToApprove.toString()))
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [amountToApprove, currentAllowance, pendingApproval, spender]);

  const tokenContract = useApprovalContract();
  const { AddTransaction } = useTransactions();

  const approve = useCallback(async () => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily');
      return;
    }
    if (!token) {
      console.error('no token');
      return;
    }

    if (!tokenContract) {
      console.error('tokenContract is null');
      return;
    }

    if (!amountToApprove) {
      console.error('missing amount to approve');
      return;
    }

    if (!spender) {
      console.error('no spender');
      return;
    }

    let useExact = false;
    const estimatedGas = await tokenContract.estimateGas
      .approve(spender, MaxUint256)
      .catch(() => {
        // general fallback for tokens who restrict approval amounts
        useExact = true;
        return tokenContract.estimateGas.approve(
          spender,
          toWei(amountToApprove.toString()),
        );
      });
    return tokenContract
      .approve(
        spender,
        useExact ? toWei(amountToApprove.toString()) : MaxUint256,
        {
          gasLimit: calculateGasMargin(estimatedGas),
        },
      )
      .then((response) => {
        AddTransaction(response, {
          summary: 'Approve ',
          approval: { tokenAddress: token.address, spender: spender },
        });
      })
      .catch((error) => {
        console.debug('Failed to approve token', error);
        throw error;
      });
  }, [
    approvalState,
    token,
    tokenContract,
    amountToApprove,
    spender,
    AddTransaction,
  ]);

  return [approvalState, approve];
}
