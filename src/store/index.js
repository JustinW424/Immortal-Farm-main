import { useWeb3React } from '@web3-react/core';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

const context = createContext();
export default function StoreProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const { chainId, library } = useWeb3React();
  const [blockNumberState, setBlockNumberState] = useState({
    chainId,
    blockNumber: null,
  });
  function setWalletState(value) {
    setIsOpen(value);
  }

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
  const value = { isOpen, setWalletState, lastBlockNumber };

  return <context.Provider value={value}>{children}</context.Provider>;
}
export function useStore() {
  return useContext(context);
}
