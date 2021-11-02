import { useMemo } from 'react';
import { useTransactions } from '../store/transactions';

export function useIsApproving(tokenAddress, account) {
  const { transactions } = useTransactions();
  return useMemo(
    () =>
      typeof tokenAddress === 'string' &&
      typeof account === 'string' &&
      Object.values(transactions).some((tx) => {
        if (!tx) return false;
        if (tx.receipt) {
          return false;
        } else {
          const approval = tx.approval;
          if (!approval) return false;
          return (
            approval.account === account &&
            approval.tokenAddress === tokenAddress
          );
        }
      }),
    [transactions, account, tokenAddress],
  );
}
