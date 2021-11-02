import useSingleCallResult from './useBlockchainCall';

export default function useFtm(contract) {
  const ftm_usd = useSingleCallResult(contract, 'latestAnswer', []);
  return Number(ftm_usd);
}
