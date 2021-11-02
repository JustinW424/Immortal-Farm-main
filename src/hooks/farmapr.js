import BigNumber from 'big-number'
import { FTM_PER_YEAR } from '../constants'
/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param cakePriceUsd Cake price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @param farmAddress Farm Address
 * @returns Farm Apr
 */
export const getFarmApr = (
  poolWeight,
  ftmPriceUsd,
  poolLiquidityUsd,
) => {
  // console.log("farming info : ", poolWeight, ftmPriceUsd, poolLiquidityUsd)
  // const yearlyFtmRewardAllocation = poolWeight ? BigNumber(poolWeight).multiply(FTM_PER_YEAR) : new BigNumber(NaN)
  // const FtmRewardsApr = BigNumber(yearlyFtmRewardAllocation).multiply(ftmPriceUsd).div(poolLiquidityUsd).div(1e20)

  // return (Number(FtmRewardsApr) / 1e10)
}

export default null