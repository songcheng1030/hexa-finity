import {
  Skeleton,
  Text,
  Flex,
  Button,
  CalculateIcon,
  useModal,
  useMatchBreakpoints,
  FlexGap,
  Balance,
  Pool,
} from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { useVaultApy } from 'hooks/useVaultApy'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { DeserializedLockedVaultUser, VaultKey } from 'state/types'
import { MAX_LOCK_DURATION } from 'config/constants/pools'
import { getVaultPosition, VaultPosition } from 'utils/cakePool'
import { Token } from '@pancakeswap/sdk'
import { VaultRoiCalculatorModal } from 'views/Pools/components/Vault/VaultRoiCalculatorModal'
const AprLabelContainer = styled(Flex)`
  &:hover {
    opacity: 0.5;
  }
`

const TitleGroup = styled(Flex)`
  display: flex;
  align-items: center;
`
interface AprCellProps {
  pool: Pool.DeserializedPool<Token>
}

const AutoAprCell: React.FC<React.PropsWithChildren<AprCellProps>> = ({ pool }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const { userData } = useVaultPoolByKey(pool.vaultKey)

  const vaultPosition = getVaultPosition(userData)

  const { flexibleApy, lockedApy } = useVaultApy({
    duration:
      vaultPosition > VaultPosition.Flexible
        ? +(userData as DeserializedLockedVaultUser).lockEndTime -
          +(userData as DeserializedLockedVaultUser).lockStartTime
        : MAX_LOCK_DURATION,
  })

  const [onPresentFlexibleApyModal] = useModal(<VaultRoiCalculatorModal pool={pool} />)
  const [onPresentLockedApyModal] = useModal(
    <VaultRoiCalculatorModal pool={pool} initialView={1} />,
    true,
    true,
    pool.vaultKey === VaultKey.CakeVault ? 'LockedVaultRoiCalculatorModal' : 'FlexibleSideVaultRoiCalculatorModal',
  )

  if (pool.vaultKey === VaultKey.CakeVault && vaultPosition === VaultPosition.None) {
    return (
      <>
        <Pool.BaseCell role="cell" flex={['1 0 50px', '4.5', '1 0 120px', null, '2 0 100px']}>
          <Pool.CellContent>
            <Text fontSize="12px" color="textSubtle" textAlign="left">
              {t('Flexible APY')}
            </Text>
            {flexibleApy ? (
              <AprLabelContainer alignItems="center" justifyContent="flex-start">
                <Balance
                  fontSize={['14px', '14px', '16px']}
                  value={parseFloat(flexibleApy)}
                  decimals={2}
                  unit="%"
                  fontWeight={[600, 400]}
                />
                {!isMobile && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      onPresentFlexibleApyModal()
                    }}
                    variant="text"
                    width="20px"
                    height="20px"
                    padding="0px"
                    marginLeft="4px"
                  >
                    <CalculateIcon color="textSubtle" width="20px" />
                  </Button>
                )}
              </AprLabelContainer>
            ) : (
              <Skeleton width="80px" height="16px" />
            )}
          </Pool.CellContent>
        </Pool.BaseCell>
        {/* <Pool.BaseCell role="cell" flex={['1 0 50px', '1 0 50px', '2 0 100px', null, '1 0 120px']}>
          <Pool.CellContent>
            <Text fontSize="12px" color="textSubtle" textAlign="left">
              {t('Locked APY')}
            </Text>
            {lockedApy ? (
              <AprLabelContainer alignItems="center" justifyContent="flex-start">
                <FlexGap gap="4px" flexWrap="wrap">
                  <Text fontSize={['14px', '14px', '16px']} style={{ whiteSpace: 'nowrap' }} fontWeight={[500, 400]}>
                    {t('Up to')}
                  </Text>
                  <Balance
                    fontSize={['14px', '14px', '16px']}
                    value={parseFloat(lockedApy)}
                    decimals={2}
                    unit="%"
                    fontWeight={[600, 400]}
                  />
                  {!isMobile && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        onPresentLockedApyModal()
                      }}
                      variant="text"
                      width="20px"
                      height="20px"
                      padding="0px"
                      marginLeft="4px"
                    >
                      <CalculateIcon color="textSubtle" width="20px" />
                    </Button>
                  )}
                </FlexGap>
              </AprLabelContainer>
            ) : (
              <Skeleton width="80px" height="16px" />
            )}
          </Pool.CellContent>
        </Pool.BaseCell> */}
      </>
    )
  }

  return (
    <Pool.BaseCell role="cell" flex={['1 0 50px', '1 0 50px', '2 0 100px', '2 0 100px', '1 0 120px']}>
      <Pool.CellContent>
        <TitleGroup>
          <Text fontSize="12px" color="#798DC6" textAlign="left" mr="6px">
            {t('APY')}
          </Text>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              return vaultPosition > VaultPosition.Flexible ? onPresentLockedApyModal() : onPresentFlexibleApyModal()
            }}
            variant="text"
            width="20px"
            height="20px"
            padding="0px"
          >
            {/* <CalculateIcon color="textSubtle" width="20px" /> */}
            <img src="/images/hexa/calc.png" alt="calculation img" style={{height: 14}} />
          </Button>
        </TitleGroup>
        
        {flexibleApy ? (
          <AprLabelContainer alignItems="end" justifyContent="flex-start">
            <Balance
              fontSize="12px"
              color="#11A9FF"
              value={vaultPosition > VaultPosition.Flexible ? parseFloat(lockedApy) : parseFloat(flexibleApy)}
              decimals={2}
              unit="%"
              mr="10px"
            />
            <img src="/images/hexa/question.png" alt="calculation img" style={{height: 15}} />
          </AprLabelContainer>
        ) : (
          <Skeleton width="80px" height="16px" />
        )}
      </Pool.CellContent>
    </Pool.BaseCell>
  )
}

export default AutoAprCell
