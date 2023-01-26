import { useEffect, useState, createElement, useRef } from 'react'
import styled from 'styled-components'
import {
  Box,
  Flex,
  Link,
  Button,
  ArrowForwardIcon,
  Text,
  useMatchBreakpoints,
  Skeleton,
  Farm as FarmUI,
  FarmTableEarnedProps,
  FarmTableLiquidityProps,
  FarmTableMultiplierProps,
  FarmTableFarmTokenInfoProps,
} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useFarmUser } from 'state/farms/hooks'
import Apr, { AprProps } from './Apr'
import Farm from './Farm'
import { DesktopColumnSchema, MobileColumnSchema, FarmWithStakedValue } from '../types'

const { FarmAuctionTag, CoreTag } = FarmUI.Tags
const { CellLayout, Details, Multiplier, Liquidity, Earned } = FarmUI.FarmTable

export interface RowProps {
  apr: AprProps
  farm: FarmTableFarmTokenInfoProps
  earned: FarmTableEarnedProps
  multiplier: FarmTableMultiplierProps
  liquidity: FarmTableLiquidityProps
  details: FarmWithStakedValue
  type: 'core' | 'community'
  initialActivity?: boolean
}

interface RowPropsWithLoading extends RowProps {
  userDataReady: boolean
}

const cells = {
  apr: Apr,
  farm: Farm,
  earned: Earned,
  details: Details,
  multiplier: Multiplier,
  liquidity: Liquidity,
}

const CellInner = styled.div`
  padding: 24px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 32px;
  }
`

const StyledTr = styled.tr`
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.disabled};
  }
`

const Row: React.FunctionComponent<React.PropsWithChildren<RowPropsWithLoading>> = (props) => {
  const { details, initialActivity, multiplier } = props
  const { stakedBalance, proxy, tokenBalance } = props.details.userData
  const userDataReady = multiplier.multiplier !== undefined
  const hasSetInitialValue = useRef(false)
  const hasStakedAmount = !!useFarmUser(details.pid).stakedBalance.toNumber()
  const { t } = useTranslation()

  const { isDesktop, isMobile } = useMatchBreakpoints()

  const isSmallerScreen = !isDesktop
  const tableSchema = isSmallerScreen ? MobileColumnSchema : DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const handleRenderRow = () => {
    return (
      <StyledTr>
        {Object.keys(props).map((key, index) => {
          const columnIndex = columnNames.indexOf(key)
          if (columnIndex === -1) {
            return null
          }
          switch (key) {
            case 'farm':
              return (
                <td key={key}>
                  <CellInner>
                    {createElement(cells[key], { ...props[key] })}
                  </CellInner>
                </td>
              )
            case 'apr':
              return (
                <td key={key}>
                  <CellInner>
                    <CellLayout label={t('APR')}>
                      <Apr
                        {...props.apr}
                        hideButton={isSmallerScreen}
                        strikethrough={props?.details?.boosted}
                        boosted={props?.details?.boosted}
                      />
                      {/* {props?.details?.boosted && userDataReady ? (
                        <BoostedApr
                          lpRewardsApr={props?.apr?.lpRewardsApr}
                          apr={props?.apr?.originalValue}
                          pid={props.farm?.pid}
                          lpTotalSupply={props.details?.lpTotalSupply}
                          userBalanceInFarm={
                            stakedBalance.plus(tokenBalance).gt(0)
                              ? stakedBalance.plus(tokenBalance)
                              : proxy.stakedBalance.plus(proxy.tokenBalance)
                          }
                        />
                      ) : null} */}
                    </CellLayout>
                  </CellInner>
                </td>
              )
          }
          
        })}
        <td>
          <CellInner>
            <CellLayout>
              <Link href="/farms" external>
                <Button variant="primarySub" external>
                  <Text color="primary" bold fontSize="16px" mr="4px">
                    {t('Start Farm')}
                  </Text>
                </Button>
              </Link>
            </CellLayout>
          </CellInner>
        </td>
      </StyledTr>
    )
  }

  return (
    <>
      {handleRenderRow()}
    </>
  )
}

export default Row
