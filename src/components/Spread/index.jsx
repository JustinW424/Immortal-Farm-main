import { parseUnits } from '@ethersproject/units';
import { Button, Input, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ApprovalState,
  useApproveCallback,
} from '../../hooks/useApproveCallback';
import {
  useSharePriceAContract,
  useSharePriceBContract,
  useSharePriceCContract,
  useSpreadAConract,
  useSpreadBConract,
  useSpreadCConract,
  useLP1Contract,
  useLP2Contract,
  useLP3Contract,
  useLP4Contract,
  useStakingPoolContract,
  useFtmContract,
} from '../../hooks/useContract';
import useSpreadBalance from '../../hooks/useSpreadBalacne';
import useSpreadTVL from '../../hooks/useSpreadTVL';
import useSpreadallPairs from '../../hooks/useSpreadallPairs';
import { useTransactions } from '../../store/transactions';
import useSpreadreservesWFTM from '../../hooks/useSpreadreservesWFTM';
import useSpreadStakingPool from '../../hooks/useSpreadStakingPool';
import { getFarmApr } from '../../hooks/farmapr';
import useFtm from '../../hooks/useFtm';

const initialInputs = {
  depositAmount: '',
  withdrawAmount: '',
};

const feesapr = [];
const total_liquidity = [];

export default function Spread({ type }) {
  const [inputValues, setInputValues] = useState(initialInputs);
  const [errors, setErrors] = useState({});
  const [depositing, setDepositing] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [feesapr, setFeesapr] = useState([]);
  const [totalLiquidity, setTotalLiquidity] = useState([]);
  const [apy, setApy] = useState(0);
  const [feesapr1, setFeesapr1] = useState([]);
  const [processed, setProcessed] = useState(false);

  const useContract =
    type === 'A'
      ? useSpreadAConract
      : type === 'B'
      ? useSpreadBConract
      : useSpreadCConract;
  const contract = useContract();
  const useSharePriceContract =
    type === 'A'
      ? useSharePriceAContract
      : type === 'B'
      ? useSharePriceBContract
      : useSharePriceCContract;
  const sharePriceContract = useSharePriceContract();

  const spreadBalance = useSpreadBalance(contract, sharePriceContract);
  const spreadTVL = useSpreadTVL(sharePriceContract);
  const spreadLPToken = useSpreadallPairs(sharePriceContract);

  const useWeight1Contract = useLP1Contract();
  const useWeight2Contract = useLP2Contract();
  const useWeight3Contract = useLP3Contract();
  const useWeight4Contract = useLP4Contract();
  const useStakingContract = useStakingPoolContract();
  const ftmContract = useFtmContract();

  const lp1_data = useSpreadreservesWFTM(useWeight1Contract);
  const lp2_data = useSpreadreservesWFTM(useWeight2Contract);
  const lp3_data = useSpreadreservesWFTM(useWeight3Contract);
  const lp4_data = useSpreadreservesWFTM(useWeight4Contract);
  const lp_amount = useSpreadStakingPool(useStakingContract);
  const ftm = useFtm(ftmContract);
  const weight1 =
    (lp1_data['LPPairFTM'] * lp_amount[0]) / lp1_data['TotalSupply'];
  const weight2 =
    (lp2_data['LPPairFTM'] * lp_amount[1]) / lp2_data['TotalSupply'];
  const weight3 =
    (lp3_data['LPPairFTM'] * lp_amount[2]) / lp3_data['TotalSupply'];
  const weight4 =
    (lp4_data['LPPairFTM'] * lp_amount[3]) / lp4_data['TotalSupply'];

  const getDataFeeApr = async () => {
    if (spreadLPToken?.filter((e) => e).length === 4 && !processed) {
      setProcessed(true);
      let temp1 = [];
      let temp2 = [];
      await Promise.all(
        Array.from(Array(4).keys()).map(async (index) => {
          const response = await axios.get(
            `https://api.covalenthq.com/v1/250/xy=k/spiritswap/pools/address/${spreadLPToken[index]}/?key=ckey_4e30f83f47a14c799789e95153b`,
          );
          console.log('ressssssssssssssssssssss', response.data);
          if (response.status === 200) {
            const mulcon = (365 * 100 * 5) / 6;

            temp1.push(
              (response.data.data.items[0].fee_24h_quote /
                response.data.data.items[0].total_liquidity_quote) *
                mulcon,
            );
            temp2 = [
              ...temp2,
              response.data.data.items[0].total_liquidity_quote,
            ];
          }
        }),
      );
      setFeesapr(temp1);
      setTotalLiquidity(temp2);
    }
  };

  useEffect(() => {
    getDataFeeApr();
    calcApy();
  }, [spreadLPToken]);

  let farm1Apr = getFarmApr(weight1, ftm / 1e8, totalLiquidity[0]);
  let farm2Apr = getFarmApr(weight2, ftm / 1e8, totalLiquidity[1]);
  let farm3Apr = getFarmApr(weight3, ftm / 1e8, totalLiquidity[2]);
  let farm4Apr = getFarmApr(weight4, ftm / 1e8, totalLiquidity[3]);

  const calcApy = () => {
    let LPAPR1 = feesapr[0] + farm1Apr;
    let LPAPR2 = feesapr[1] + farm2Apr;
    let LPAPR3 = feesapr[2] + farm3Apr;
    let LPAPR4 = feesapr[3] + farm4Apr;
    let TotalAPR =
      (LPAPR1 * weight1 +
        LPAPR2 * weight2 +
        LPAPR3 * weight3 +
        LPAPR4 * weight4) /
      (weight1 + weight2 + weight3 + weight4);
    let N = 31536000 / (30 * 60);
    setApy(((Math.pow(1 + TotalAPR / N, N) - 1) * ftm) / 1e14);
  };

  const { account, library } = useWeb3React();
  const { AddTransaction } = useTransactions();
  const [approvalState, approveCallBack] = useApproveCallback(
    spreadBalance,
    sharePriceContract?.address,
  );
  const handleChange = (e) => {
    let nvalues = { ...inputValues };
    const name = e.target.name;
    const value = e.target.value;
    if (
      (e.target.type === 'number' && value >= 0) ||
      e.target.type !== 'number'
    ) {
      nvalues[name] = value;
    }
    setInputValues(nvalues);
  };

  const depositTokens = () => {
    const nerrors = { ...errors };
    if (!inputValues.depositAmount) {
      nerrors.depositAmount = 'Amount is required';
    } else if (inputValues.depositAmount <= 0) {
      nerrors.depositAmount = 'Enter a valid amount';
    } else {
      nerrors.depositAmount = null;
    }
    setErrors(nerrors);
    if (!nerrors.depositAmount && sharePriceContract) {
      setDepositing(true);
      const signer = library.getSigner(account);
      const params = {
        from: account,
        to: sharePriceContract.address,
        value: parseUnits(inputValues.depositAmount),
      };

      signer
        .sendTransaction(params)
        .then(async (res) => {
          setInputValues({ ...inputValues, depositAmount: '' });
          setDepositing(false);
          AddTransaction(
            res.hash,
            `Deposited ${inputValues.depositAmount} FTM`,
          );
        })
        .catch((error) => {
          setDepositing(false);
          console.error(error);
        });
    }
  };
  const withdrawTokens = () => {
    // const nerrors = { ...errors };
    // if (!inputValues.withdrawAmount) {
    //     nerrors.withdrawAmount = "Amount is required";
    // }
    // else if (inputValues.withdrawAmount <= 0) {

    //     nerrors.withdrawAmount = "Enter a valid amount";
    // }
    // else {
    //     nerrors.withdrawAmount = null;
    // }
    // setErrors(nerrors);
    if (sharePriceContract) {
      setWithdrawing(true);
      sharePriceContract
        .withdraw()
        .then(async (res) => {
          setInputValues({ ...inputValues, withdrawAmount: '' });
          setWithdrawing(false);
          AddTransaction(
            res.hash,
            `Withdraw ${inputValues.withdrawAmount} FTM`,
          );
        })
        .catch((error) => {
          setWithdrawing(false);
          console.error(error);
        });
    }
  };
  return (
    <Box>
      <Box pb={2}>
        <Typography
          color="common.white"
          fontWeight="bold"
          sx={{ textTransform: 'uppercase' }}
        >
          Deposit
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap={{ xs: 'wrap', xl: 'nowrap' }}
        >
          <Typography
            fontWeight="normal"
            fontSize="small"
            sx={{ whiteSpace: 'nowrap' }}
          >
            Deposit to Spread {type}:
          </Typography>

          <Input
            onChange={handleChange}
            name="depositAmount"
            value={inputValues.depositAmount}
            placeholder="Amount"
            type="number"
            sx={{ mx: 2 }}
            inputProps={{
              min: 0,
              sx: { color: 'common.white', fontSize: 'small' },
            }}
          />
          <Typography fontWeight="bold" fontSize="small" color="secondary.main">
            FTM
          </Typography>
        </Box>
        {errors.depositAmount && (
          <Typography sx={{ fontSize: '.7rem' }} color="error">
            {errors.depositAmount}
          </Typography>
        )}
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          disabled={depositing}
          onClick={depositTokens}
        >
          <Typography fontWeight="bold">Deposit</Typography>
        </Button>
      </Box>

      <Box pb={2}>
        <Typography
          color="common.white"
          fontWeight="bold"
          sx={{ textTransform: 'uppercase', mt: 4 }}
        >
          Withdraw
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap={{ xs: 'wrap', xl: 'nowrap' }}
        >
          <Typography
            color="common.white"
            fontWeight="normal"
            fontSize="small"
            sx={{ whiteSpace: 'nowrap' }}
          >
            Withdraw FTM from Spread {type}:{' '}
          </Typography>

          {/* <Input onChange={handleChange} name='withdrawAmount' value={inputValues.withdrawAmount} placeholder="Amount" type="number" sx={{ mx: 2 }} inputProps={{ min: 0, sx: { color: 'common.white', fontSize: 'small' } }} /> */}
          {/* <Typography fontWeight='bold' fontSize="small" color="secondary.main" >FTM</Typography> */}
          {approvalState === ApprovalState.APPROVED ? (
            <Button
              variant="contained"
              sx={{ ml: 3 }}
              disabled={withdrawing}
              onClick={withdrawTokens}
            >
              <Typography fontWeight="bold">Withdraw</Typography>
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ ml: 3 }}
              disabled={approvalState === ApprovalState.PENDING}
              onClick={approveCallBack}
            >
              <Typography fontWeight="bold">
                {approvalState === ApprovalState.PENDING
                  ? 'Approving...'
                  : 'Approve'}
              </Typography>
            </Button>
          )}
        </Box>
        {errors.withdrawAmount && (
          <Typography sx={{ fontSize: '.7rem' }} color="error">
            {errors.withdrawAmount}
          </Typography>
        )}
      </Box>

      <Typography
        color="common.white"
        fontWeight="bold"
        sx={{ textTransform: 'uppercase', mt: 4 }}
      >
        Bal
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography
          color="common.white"
          fontWeight="normal"
          fontSize="small"
          sx={{ whiteSpace: 'nowrap' }}
        >
          Spread {type} Balance:{' '}
        </Typography>

        <Typography fontWeight="400" color="common.white">
          &nbsp; {spreadBalance} &nbsp;{' '}
        </Typography>

        <Typography fontWeight="bold" fontSize="small" color="secondary.main">
          FTM
        </Typography>
      </Box>
      <Typography
        color="common.white"
        fontWeight="bold"
        sx={{ textTransform: 'uppercase', mt: 4 }}
      >
        TVL
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography
          color="common.white"
          fontWeight="normal"
          fontSize="small"
          sx={{ whiteSpace: 'nowrap' }}
        >
          Spread {type} TVL:{' '}
        </Typography>

        <Typography fontWeight="400" color="common.white">
          &nbsp; {spreadTVL} &nbsp;{' '}
        </Typography>

        <Typography fontWeight="bold" fontSize="small" color="secondary.main">
          FTM
        </Typography>
      </Box>
      <Typography
        color="common.white"
        fontWeight="bold"
        sx={{ textTransform: 'uppercase', mt: 4 }}
      >
        APY
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography fontWeight="400" color="common.white">
          &nbsp; {apy ? apy : 'Please Wait...'} &nbsp;{apy ? ' %' : ''}
        </Typography>
      </Box>
    </Box>
  );
}
