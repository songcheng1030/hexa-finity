import { Heading, CardBody, CardProps, Flex, Text, TokenPoolImage, FlexGap, Pool, useTooltip, HelpIcon } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from '@pancakeswap/localization'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { VaultKey, DeserializedLockedCakeVault, DeserializedCakeVault } from 'state/types'
import { Token } from '@pancakeswap/sdk'
import styled from 'styled-components'
import CardFooter from '../PoolCard/CardFooter'
import { VaultPositionTagWithLabel } from '../Vault/VaultPositionTag'
import { StakingApy } from './StakingApy'
import VaultCardActions from './VaultCardActions'
import LockedStakingApy from '../LockedPool/LockedStakingApy'

interface CakeVaultProps extends CardProps {
  pool: Pool.DeserializedPool<Token>
  showStakedOnly: boolean
  defaultFooterExpanded?: boolean
  showICake?: boolean
  showSkeleton?: boolean
}

interface CakeVaultDetailProps {
  isLoading?: boolean
  account: string
  pool: Pool.DeserializedPool<Token>
  vaultPool: DeserializedCakeVault
  accountHasSharesStaked: boolean
  defaultFooterExpanded?: boolean
  showICake?: boolean
  performanceFeeAsDecimal: number
}

const StyledCardBody = styled(CardBody) <{ isLoading: boolean }>`
  min-height: ${({ isLoading }) => (isLoading ? '0' : '254px')};
  padding: 12px;
`

export const CakeVaultDetail: React.FC<React.PropsWithChildren<CakeVaultDetailProps>> = ({
  isLoading = false,
  account,
  pool,
  vaultPool,
  accountHasSharesStaked,
  showICake,
  performanceFeeAsDecimal,
  defaultFooterExpanded,
}) => {
  const { t } = useTranslation()
  const manualTooltipText = t('You must harvest and compound your earnings from this pool manually.')
  const autoTooltipText = t('Rewards are distributed and included into your staking balance automatically. There’s no need to manually compound your rewards.')
  const { vaultKey } = pool
  const { targetRef, tooltip, tooltipVisible } = useTooltip(vaultKey ? autoTooltipText : manualTooltipText, { placement: 'bottom' })
  return (
    <>
      <StyledCardBody isLoading={isLoading}>
        {account && pool.vaultKey === VaultKey.CakeVault && (
          <VaultPositionTagWithLabel userData={(vaultPool as DeserializedLockedCakeVault).userData} />
        )}
        {account &&
          pool.vaultKey === VaultKey.CakeVault &&
          (vaultPool as DeserializedLockedCakeVault).userData.locked ? (
          <LockedStakingApy
            userData={(vaultPool as DeserializedLockedCakeVault).userData}
            stakingToken={pool?.stakingToken}
            stakingTokenBalance={pool?.userData?.stakingTokenBalance}
            showICake={showICake}
          />
        ) : (
          <>
            <Flex>
              <div style={{ flex: 1 }}><StakingApy pool={pool} /></div>
              <div style={{ flex: 1 }}></div>
            </Flex>
            <Pool.PoolCardHeader isStaking={accountHasSharesStaked}>
              <TokenPoolImage primarySrc='/img/launchpools/hero-back-2.png' secondarySrc='' width={92} height={92} />
              <Flex flexDirection="column">
                <Flex>
                  <Heading color={"body"} fontSize="22px" textAlign={'center'}>
                    Holder Pool
                    {tooltipVisible && tooltip}
                  </Heading>
                  <Flex ref={targetRef}>
                    <HelpIcon ml="4px" width="20px" height="20px" color="poolText" />
                  </Flex>
                </Flex>

                <Text fontSize="14px" mt="4px" color={"poolText"} textAlign='center'>Stake HEXA - Earn HEXA</Text>
              </Flex>
              <Text style={{ color: '#00A478', fontSize: 12 }}>+ {t('participate in exclusive offers')}</Text>
            </Pool.PoolCardHeader>
          </>
        )}
      </StyledCardBody>
      <CardFooter defaultExpanded={defaultFooterExpanded} pool={pool} account={account} accountHasSharesStaked={accountHasSharesStaked} isLoading={isLoading} performanceFee={performanceFeeAsDecimal} />
    </>
  )
}

const CakeVaultCard: React.FC<React.PropsWithChildren<CakeVaultProps>> = ({
  pool,
  showStakedOnly,
  defaultFooterExpanded,
  showICake = false,
  showSkeleton = true,
  ...props
}) => {
  const { address: account } = useAccount()
  const vaultPool = useVaultPoolByKey(pool.vaultKey)
  const {
    userData: { userShares, isLoading: isVaultUserDataLoading },
    fees: { performanceFeeAsDecimal },
  } = vaultPool
  const accountHasSharesStaked = userShares && userShares.gt(0)
  const isLoading = !pool.userData || isVaultUserDataLoading
  if (showStakedOnly && !accountHasSharesStaked) {
    return null
  }

  return (
    <Pool.StyledPoolCard isActive {...props}>
      <CakeVaultDetail
        isLoading={isLoading}
        account={account}
        pool={pool}
        vaultPool={vaultPool}
        accountHasSharesStaked={accountHasSharesStaked}
        showICake={showICake}
        performanceFeeAsDecimal={performanceFeeAsDecimal}
        defaultFooterExpanded={defaultFooterExpanded}
      />
    </Pool.StyledPoolCard>
  )
}

export default CakeVaultCard
