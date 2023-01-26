import { Currency } from '@pancakeswap/sdk'
import { BottomDrawer, Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import { AppBody } from 'components/App'
import { useContext } from 'react'
import { useUserSmartRouter } from 'state/user/smartRouter'

import { useCurrency } from '../../hooks/Tokens'
import { Field } from '../../state/swap/actions'
import { useSingleTokenSwapInfo, useSwapState } from '../../state/swap/hooks'
import Page from '../Page'
import SwapForm from './components/SwapForm'
import SwapTab, { SwapType } from './components/SwapTab'
import { SmartSwapForm } from './SmartSwap'
import StableSwapFormContainer from './StableSwap'
import {
  StyledInputCurrencyWrapper,
  StyledSwapContainer,
  StyledHeaderTitle,
  WithDrawArea,
  ContentIteamArea,
  RightSideArea,
} from './styles'
import { SwapFeaturesContext } from './SwapFeaturesContext'

export default function Swap() {
  const { isMobile } = useMatchBreakpoints()
  const { isChartExpanded, isChartDisplayed, setIsChartDisplayed, setIsChartExpanded, isChartSupported } =
    useContext(SwapFeaturesContext)

  // swap state & price data
  const {
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  }

  const singleTokenPrice = useSingleTokenSwapInfo(inputCurrencyId, inputCurrency, outputCurrencyId, outputCurrency)
  // TODO read from global settings
  const [smartSwap] = useUserSmartRouter()

  return (
    <Page removePadding={isChartExpanded} hideFooterOnDesktop={isChartExpanded}>
      <StyledHeaderTitle>
        <h1>Make a Swap at No Cost</h1>
        <p>
          Fee reimbursement of up to 70% in HEXA tokens, 10% is credited to your Robi Boost & Squid Energy. You can
          change the percentage.
        </p>
      </StyledHeaderTitle>
      <WithDrawArea>
        <ContentIteamArea>
          <RightSideArea>
            <div>
              <p>Fee Return: </p>
              <img src="/images/circleQuestion.png" alt="" />
            </div>
            <h3>0.00000 HEXA</h3>
          </RightSideArea>
          <div className="leftArea">Withdraw</div>
        </ContentIteamArea>
        <ContentIteamArea>
          <RightSideArea>
            <div>
              <p>Robi Boost: </p>
              <img src="/images/circleQuestion.png" alt="" />
            </div>
            <h3>0.00000 RB</h3>
          </RightSideArea>
          <div className="leftArea">Use</div>
        </ContentIteamArea>
      </WithDrawArea>
      <Flex flexDirection="column">
        <StyledSwapContainer $isChartExpanded={isChartExpanded}>
          <StyledInputCurrencyWrapper mt={isChartExpanded ? '24px' : '0'}>
            <AppBody>
              {smartSwap ? (
                <SmartSwapForm />
              ) : (
                <SwapTab>
                  {(swapTypeState) =>
                    swapTypeState === SwapType.STABLE_SWAP ? <StableSwapFormContainer /> : <SwapForm />
                  }
                </SwapTab>
              )}
            </AppBody>
          </StyledInputCurrencyWrapper>
        </StyledSwapContainer>
      </Flex>
    </Page>
  )
}
