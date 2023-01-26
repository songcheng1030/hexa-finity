import { memo } from 'react'
import { useMatchBreakpoints, Pool, Button, Text, Link } from '@pancakeswap/uikit'
import { usePool, useDeserializedPoolByVaultKey } from 'state/pools/hooks'
import { VaultKey } from 'state/types'
import styled from 'styled-components'
import NameCell from './Cells/NameCell'
import AutoAprCell from './Cells/AutoAprCell'
import { useTranslation } from '@pancakeswap/localization'

const PoolRows = styled.div`
  display: flex;
`

const CellInner = styled.div`
  padding: 24px 0px;
  display: flex;
  align-items: center;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 32px;
  }
`

export const VaultPoolRow: React.FC<
  React.PropsWithChildren<{ vaultKey: VaultKey; account: string; initialActivity?: boolean }>
> = memo(({ vaultKey, account, initialActivity }) => {
  const { t } = useTranslation()
  const { isXs, isSm, isMd, isLg, isXl, isXxl } = useMatchBreakpoints()
  const isLargerScreen = isLg || isXl || isXxl
  const isXLargerScreen = isXl || isXxl
  const pool = useDeserializedPoolByVaultKey(vaultKey)

  return (
    <PoolRows>
      <NameCell pool={pool} />
      <AutoAprCell pool={pool} />
      <CellInner>
        <Link href="/pools" external>
          <Button variant="primarySub" external>
            <Text color="primary" bold fontSize="16px" mr="4px">
              {t('Stake HEXA')}
            </Text>
          </Button>
        </Link>
      </CellInner>
    </PoolRows>
  )
})

const PoolRow: React.FC<React.PropsWithChildren<{ sousId: number; account: string; initialActivity?: boolean }>> = ({
  sousId,
  account,
  initialActivity,
}) => {
  const { isXs, isSm, isMd, isLg, isXl, isXxl, isDesktop } = useMatchBreakpoints()
  const isLargerScreen = isLg || isXl || isXxl
  const { pool } = usePool(sousId)
  const { t } = useTranslation()
  return (
    <PoolRows>
      <NameCell pool={pool} />
      <AutoAprCell pool={pool} />
      <CellInner>
        <Link href="/pools" external>
          <Button variant="primarySub" external>
            <Text color="primary" bold fontSize="16px" mr="4px">
              {t('Stake HEXA')}
            </Text>
          </Button>
        </Link>
      </CellInner>
    </PoolRows>
  )
}

export default memo(PoolRow)
