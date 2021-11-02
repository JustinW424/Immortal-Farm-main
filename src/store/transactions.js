import { useWeb3React } from '@web3-react/core';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { usePopups } from './popups';

const StorageId = 'transactions';

const context = createContext();
export function TransactionsProvider({ children }) {
  const [state, setState] = useState({});
  const { account, library, chainId } = useWeb3React();
  const [blockNumberState, setBlockNumberState] = useState({
    chainId,
    blockNumber: null,
  });
  const { AddPopup } = usePopups();

  const blockNumberCallback = useCallback(
    (blockNumber) => {
      setBlockNumberState((state) => {
        if (chainId === state.chainId) {
          if (typeof state.blockNumber !== 'number')
            return { chainId, blockNumber };
          return {
            chainId,
            blockNumber: Math.max(blockNumber, state.blockNumber),
          };
        }
        return state;
      });
    },
    [chainId, setBlockNumberState],
  );

  // attach/detach listeners
  useEffect(() => {
    if (!library || !chainId) return undefined;

    setBlockNumberState({ chainId, blockNumber: null });

    library
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error) =>
        console.error(
          `Failed to get block number for chainId: ${chainId}`,
          error,
        ),
      );

    library.on('block', blockNumberCallback);
    return () => {
      library.removeListener('block', blockNumberCallback);
    };
  }, [chainId, library, blockNumberCallback]);
  const lastBlockNumber = blockNumberState.blockNumber;

  function AddTransaction(hash, summery, extras) {
    const subscribe = extras?.subscribe,
      claim = extras?.claim,
      approval = extras?.approval;
    const transactions = getRecentTransactions();
    transactions[hash] = {
      hash,
      summery,
      subscribe,
      claim,
      approval,
    };
    localStorage.setItem(StorageId, JSON.stringify(transactions));
    setState(transactions);
  }
  const getRecentTransactions = useCallback(() => {
    const trx = localStorage.getItem(StorageId);
    if (trx) return JSON.parse(localStorage.getItem(StorageId));
    return {};
  }, []);
  function ClearTransactions() {
    localStorage.removeItem(StorageId);
    setState({});
  }
  const finalizeTransaction = useCallback(
    ({ hash, receipt }) => {
      const transactions = getRecentTransactions();
      const tx = transactions[hash];
      if (!tx) {
        return;
      }
      tx.receipt = receipt;
      tx.confirmedTime = new Date().getTime();
      transactions[hash] = tx;
      localStorage.setItem(StorageId, JSON.stringify(transactions));
      setState(transactions);
    },
    [setState, getRecentTransactions],
  );
  const checkedTransaction = useCallback(
    ({ chainId, hash, blockNumber }) => {
      const transactions = getRecentTransactions();
      const tx = transactions[hash];
      if (!tx) {
        return;
      }
      if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber;
      } else {
        tx.lastCheckedBlockNumber = Math.max(
          blockNumber,
          tx.lastCheckedBlockNumber,
        );
      }
      transactions[hash] = tx;
      localStorage.setItem(StorageId, JSON.stringify(transactions));
      setState(transactions);
    },
    [getRecentTransactions, setState],
  );
  useEffect(() => {
    if (!chainId || !library || !lastBlockNumber) return;
    Object.keys(state)
      .filter((hash) => shouldCheck(lastBlockNumber, state[hash]))
      .forEach((hash) => {
        library
          .getTransactionReceipt(hash)
          .then((receipt) => {
            if (receipt) {
              finalizeTransaction({
                hash,
                receipt: {
                  blockHash: receipt.blockHash,
                  blockNumber: receipt.blockNumber,
                  contractAddress: receipt.contractAddress,
                  from: receipt.from,
                  status: receipt.status,
                  to: receipt.to,
                  transactionHash: receipt.transactionHash,
                  transactionIndex: receipt.transactionIndex,
                },
              });
              AddPopup(state[hash]?.summery, hash);
            } else {
              checkedTransaction({
                chainId,
                hash,
                blockNumber: lastBlockNumber,
              });
            }
          })
          .catch((error) => {
            console.error(`failed to check transaction hash: ${hash}`, error);
          });
      });
  }, [
    account,
    library,
    chainId,
    state,
    lastBlockNumber,
    AddPopup,
    finalizeTransaction,
    checkedTransaction,
  ]);
  useEffect(() => {
    setState(getRecentTransactions());
  }, [getRecentTransactions]);
  return (
    <context.Provider
      value={{
        transactions: state,
        ClearTransactions,
        getRecentTransactions,
        AddTransaction,
      }}
    >
      {children}
    </context.Provider>
  );
}
export function useTransactions() {
  return useContext(context);
}

export function shouldCheck(lastBlockNumber, tx) {
  if (!tx.hash || tx.receipt) return false;
  if (!tx.lastCheckedBlockNumber) return true;
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber;
  if (blocksSinceCheck < 1) return false;
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60;
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9;
  } else if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2;
  } else {
    // otherwise every block
    return true;
  }
}
