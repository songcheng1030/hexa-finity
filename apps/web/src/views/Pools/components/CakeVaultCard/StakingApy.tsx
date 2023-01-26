import { Flex, Text, Skeleton, useModal, Button, CalculateIcon, FlexGap, Balance, Pool } from '@pancakeswap/uikit'
import { LightGreyCard } from 'components/Card'
import { useTranslation } from '@pancakeswap/localization'
import { useVaultApy } from 'hooks/useVaultApy'
import { memo } from 'react'
import { VaultKey } from 'state/types'
import styled from 'styled-components'
import { Token } from '@pancakeswap/sdk'
import { VaultRoiCalculatorModal } from '../Vault/VaultRoiCalculatorModal'

const AprLabelContainer = styled(Flex)`
  &:hover {
    opacity: 0.5;
  }
`

export const StakingApy = memo(({ pool }: { pool: Pool.DeserializedPool<Token> }) => {
  const { t } = useTranslation()

  const { flexibleApy, lockedApy } = useVaultApy()

  const [onPresentFlexibleApyModal] = useModal(<VaultRoiCalculatorModal pool={pool} />)

  const [onPresentLockedApyModal] = useModal(<VaultRoiCalculatorModal pool={pool} initialView={1} />)

  return (
    <LightGreyCard id = 'light-grey-card' style={{padding: '2px 8px', background: '#000'}}>
      {pool.vaultKey === VaultKey.CakeVault && (
        <Flex alignItems="center" justifyContent="space-between" id='vault-flex'>
          <Text color="#FFF" textTransform="uppercase" fontSize="14px">APY</Text>
          {lockedApy ? (
            <FlexGap gap="4px" flexWrap="wrap" justifyContent="flex-end">
              <AprLabelContainer alignItems="center">
                <Balance fontSize="14px" value={parseFloat(lockedApy)} decimals={2} unit="%" color='#FFF' />
              </AprLabelContainer>
            </FlexGap>
          ) : (
            <Skeleton width="80px" height="16px" />
          )}
        </Flex>
      )}
    </LightGreyCard>
  )
})
