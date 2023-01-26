import { useTranslation } from '@pancakeswap/localization'
import {
  Text,
  useMatchBreakpoints,
  Farm as FarmUI,
  FarmTableLiquidityProps,
  FarmTableMultiplierProps,
  Button,
} from '@pancakeswap/uikit'
import LinkExternal from './LinkExternal'
import { useContext } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { getBlockExploreLink } from 'utils'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { multiChainPaths } from 'state/info/constant'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { FarmWithStakedValue } from '../../types'

import BoostedAction from '../../YieldBooster/components/BoostedAction'
import { YieldBoosterStateContext } from '../../YieldBooster/components/ProxyFarmContainer'
import Apr, { AprProps } from '../Apr'
import { HarvestAction, HarvestActionContainer, ProxyHarvestActionContainer } from './HarvestAction'
import StakedAction, { ProxyStakedContainer, StakedContainer } from './StakedAction'
import { ActionContainer as ActionContainerSection, ActionContent, ActionTitles } from './styles'
import ConnectWalletButton from './ConnectWalletButton'
import Link from 'next/link'

const { Multiplier, Liquidity } = FarmUI.FarmTable

export interface ActionPanelProps {
  apr: AprProps
  multiplier: FarmTableMultiplierProps
  liquidity: FarmTableLiquidityProps
  details: FarmWithStakedValue
  userDataReady: boolean
  expanded: boolean
}

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 700px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 700px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.dropdown};
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 24px;
  gap: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    gap: 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 30px 40px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 30px 80px;
  }
`
const AvailLP = styled.div`
  font-family: 'Poppins';
  color: #798dc6;
  .title {
    color: #798dc6;
    font-size: 12px;
  }
  .lp-name {
    color: rgb(47, 77, 160);
    font-size: 13px;
    margin-top: 5px;
    font-weight: 600;
  }
  .balance {
    color: rgb(47, 77, 160);
    font-size: 16px;
    margin-top: 5px;
    font-weight: bold;
  }
`
const HarvestButton = styled(Button)`
  background: #aabef0;
  color: #041647;
  font-size: 14px;
`
const EarnedDiv = styled.div`
  font-family: 'Poppins';
  color: #798dc6;
  .title {
    color: #798dc6;
    font-size: 12px;
  }
  .bal-hexa {
    color: rgb(47, 77, 160);
    font-size: 13px;
    margin-top: 5px;
    font-weight: 600;
  }
  .balance {
    color: rgb(47, 77, 160);
    font-size: 16px;
    margin-top: 5px;
    font-weight: bold;
  }
`
const ActionPanel: React.FunctionComponent<React.PropsWithChildren<ActionPanelProps>> = ({
  details,
  apr,
  multiplier,
  liquidity,
  userDataReady,
  expanded,
}) => {
  const { chainId } = useActiveChainId()
  const { proxyFarm, shouldUseProxyFarm } = useContext(YieldBoosterStateContext)

  const farm = details

  const { isDesktop } = useMatchBreakpoints()

  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const isActive = farm.multiplier !== '0X'
  const { quoteToken, token } = farm
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
    chainId,
  })
  const { lpAddress } = farm
  const bsc = getBlockExploreLink(lpAddress, 'address', chainId)
  const info = `/info${multiChainPaths[chainId]}/pairs/${lpAddress}`
  const { stakedBalance, tokenBalance, proxy } = farm.userData

  return (
    <Container expanded={expanded}>
      <Button variant="secondary" scale="md">
        <LinkExternal href={`/add/${liquidityUrlPathParts}`}>Get LP</LinkExternal>   
      </Button>
      <AvailLP>
        <div className="title">Available LP</div>
        <div className="lp-name">{lpLabel}</div>
        <div className="balance">
          {shouldUseProxyFarm ? (
            <ProxyHarvestActionContainer {...proxyFarm} userDataReady={userDataReady}>
              {(props) => <HarvestAction {...props} />}
            </ProxyHarvestActionContainer>
          ) : (
            <HarvestActionContainer {...farm} userDataReady={userDataReady}>
              {(props) => <HarvestAction {...props} />}
            </HarvestActionContainer>
          )}
        </div>
      </AvailLP>
      <ConnectWalletButton />
      <HarvestButton>Harvest all</HarvestButton>
      <EarnedDiv>
        <div className="title">Earned</div>
        <div className="bal-hexa">0 HEXA</div>
        <div className="balance">
          {shouldUseProxyFarm ? (
            <ProxyHarvestActionContainer {...proxyFarm} userDataReady={userDataReady}>
              {(props) => <HarvestAction {...props} />}
            </ProxyHarvestActionContainer>
          ) : (
            <HarvestActionContainer {...farm} userDataReady={userDataReady}>
              {(props) => <HarvestAction {...props} />}
            </HarvestActionContainer>
          )}
        </div>
      </EarnedDiv>
    </Container>
  )
}

export default ActionPanel
