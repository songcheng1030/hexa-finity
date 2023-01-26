import BigNumber from 'bignumber.js'

import styled from 'styled-components'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { Flex, Text, Box, Pool } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { PoolCategory } from 'config/constants/types'
import { useProfileRequirement } from 'views/Pools/hooks/useProfileRequirement'
import { Token } from '@pancakeswap/sdk'
import ApprovalAction from './ApprovalAction'
import StakeActions from './StakeActions'
import HarvestActions from './HarvestActions'
import { ProfileRequirementWarning } from '../../ProfileRequirementWarning'

const InlineText = styled(Text)`
  display: inline;
`

interface CardActionsProps {
  pool: Pool.DeserializedPool<Token>
  stakedBalance: BigNumber
}

const CardActions: React.FC<React.PropsWithChildren<CardActionsProps>> = ({ pool, stakedBalance }) => {
  const { sousId, stakingToken, earningToken, poolCategory, userData, earningTokenPrice, profileRequirement } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const { t } = useTranslation()
  const allowance = userData?.allowance ? new BigNumber(userData.allowance) : BIG_ZERO
  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO
  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const needsApproval = !allowance.gt(0) && !isBnbPool
  const isStaked = stakedBalance.gt(0)
  const isLoading = !userData

  const { notMeetRequired, notMeetThreshold } = useProfileRequirement(profileRequirement)

  return (
    <Flex flexDirection="column">
      <HarvestActions
        earnings={earnings}
        earningTokenSymbol={earningToken.symbol}
        earningTokenDecimals={earningToken.decimals}
        sousId={sousId}
        earningTokenPrice={earningTokenPrice}
        isBnbPool={isBnbPool}
        isLoading={isLoading}
      />
    </Flex>
  )
}

export default CardActions
