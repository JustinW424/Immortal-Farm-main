import { useEffect, useState } from 'react';
import { useStore } from '../store';

export default function useSingleCallResult(contract, method, inputs) {
  const { lastBlockNumber } = useStore();
  const [data, setData] = useState(null);
  useEffect(() => {
    if (contract && method) {
      contract[method](...inputs).then((res) => setData(res));
    }
  }, [contract, method, JSON.stringify(inputs), lastBlockNumber]);
  return data;
}
