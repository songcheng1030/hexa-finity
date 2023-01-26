import { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { Flex, CardFooter, ExpandableLabel, Button, useTooltip, Farm as FarmUI, Pool } from '@pancakeswap/uikit'
import { Token } from '@pancakeswap/sdk'
import PoolStatsInfo from '../../PoolStatsInfo'
import ConnectWalletButton from 'components/ConnectWalletButton'
import VaultCardActions from "../../CakeVaultCard/VaultCardActions"

const { CompoundingPoolTag, ManualPoolTag } = FarmUI.Tags

interface FooterProps {
  pool: Pool.DeserializedPool<Token>
  account: string
  totalCakeInVault?: BigNumber
  defaultExpanded?: boolean
  accountHasSharesStaked?: boolean
  isLoading?: boolean
  performanceFee?: number

}

const ExpandableButtonWrapper = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  button {
    padding: 0;
  }
`
const ExpandedWrapper = styled(Flex)`
  padding-top: 12px;
  svg {
    height: 14px;
    width: 14px;
  }
`

const Footer: React.FC<React.PropsWithChildren<FooterProps>> = ({ pool, account, defaultExpanded, accountHasSharesStaked, isLoading, performanceFee, children }) => {
  const { vaultKey, sousId, isFinished } = pool
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(defaultExpanded || false)

  return (
    <CardFooter>
      <ExpandableButtonWrapper>
        <div style={{ flex: 1, paddingRight: 3 }}>
          {account ? (
            <VaultCardActions
              pool={pool}
              accountHasSharesStaked={accountHasSharesStaked}
              isLoading={isLoading}
              performanceFee={performanceFee}
              isFinished={isFinished && sousId !== 0}
            />
          ) : (
            <>
              <ConnectWalletButton />
            </>
          )}
        </div>
        <div style={{ flex: 1, paddingLeft: 3 }}>
          <Button width="100%">
            <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} iconColor="poolButtonText">
              <span style={{color: 'var(--colors-poolButtonText)'}}>{isExpanded ? t('Hide') : t('Details')}</span>
            </ExpandableLabel>
          </Button>
        </div>
      </ExpandableButtonWrapper>
      {isExpanded && (
        <ExpandedWrapper flexDirection="column">
          {children || <PoolStatsInfo pool={pool} account={account} />}
        </ExpandedWrapper>
      )}
    </CardFooter>
  )
}

export default Footer
