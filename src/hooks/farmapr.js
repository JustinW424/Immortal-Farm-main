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
  console.log("farming info : ", poolWeight, ftmPriceUsd, poolLiquidityUsd)
  const yearlyFtmRewardAllocation = poolWeight * FTM_PER_YEAR
  const FtmRewardsApr = yearlyFtmRewardAllocation * ftmPriceUsd / poolLiquidityUsd

  return (FtmRewardsApr)
}

export default null