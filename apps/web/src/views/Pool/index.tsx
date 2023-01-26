import { useMemo } from 'react'
import styled from 'styled-components'
import { Text, Flex, CardBody, CardFooter, Button, AddIcon, Heading } from '@pancakeswap/uikit'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useLPTokensWithBalanceByAccount } from 'views/Swap/StableSwap/hooks/useStableConfig'
import FullPositionCard, { StableFullPositionCard } from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs, PairState } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import Dots from '../../components/Loader/Dots'
import { AppHeader, AppBody } from '../../components/App'
import Page from '../Page'
import SwapTab from 'components/SwapTab'
import { useTooltip } from '@pancakeswap/uikit/src/hooks/useTooltip'
import { HelpIcon } from '@pancakeswap/uikit/src/components/Svg'

import { StyledHeaderTitle, TooltipSection } from './styles'

const Body = styled(CardBody)`
  /* background-color: ${({ theme }) => theme.colors.dropdownDeep}; */
`
const ReferenceElement = styled.div`
  display: inline-block;
`

export default function Pool() {
  const { address: account } = useAccount()
  const { t } = useTranslation()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()

  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  const stablePairs = useLPTokensWithBalanceByAccount(account)

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances ||
    v2Pairs?.length < liquidityTokensWithBalances.length ||
    (v2Pairs?.length && v2Pairs.every(([pairState]) => pairState === PairState.LOADING))
  const allV2PairsWithLiquidity = v2Pairs
    ?.filter(([pairState, pair]) => pairState === PairState.EXISTS && Boolean(pair))
    .map(([, pair]) => pair)

  const renderBody = () => {
    if (!account) {
      return <Text textAlign="center">{t('Connect to a wallet to view your liquidity.')}</Text>
    }
    if (v2IsLoading) {
      return (
        <Text textAlign="center">
          <Dots>{t('Loading')}</Dots>
        </Text>
      )
    }

    let positionCards = []

    if (allV2PairsWithLiquidity?.length > 0) {
      positionCards = allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={Boolean(stablePairs?.length) || index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
        />
      ))
    }

    if (stablePairs?.length > 0) {
      positionCards = [
        ...positionCards,
        ...stablePairs?.map((stablePair, index) => (
          <StableFullPositionCard
            key={`stable-${stablePair.liquidityToken.address}`}
            pair={stablePair}
            mb={index < stablePairs.length - 1 ? '16px' : 0}
          />
        )),
      ]
    }

    if (positionCards?.length > 0) {
      return positionCards
    }

    return <Text>{t('No liquidity found.')}</Text>
  }

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t(
      "When you add liquidity, you are given pool tokens that represent your share. If you don't see a pool you joined in this list, try importing a pool below",
    ),
    { placement: 'left-end', tooltipOffset: [20, 10] },
  )

  return (
    <Page>
      <StyledHeaderTitle>
        <h1>Become a Liquidity Provider</h1>
        <p>
          Earn high yeilds from transaction fees.
          <br />
          <span style={{ color: '#11A9FF' }}>Learn how to add liquidity</span>
        </p>
      </StyledHeaderTitle>
      <AppBody>
        <SwapTab />
        <AppHeader title={t('Liquidity')} subtitle={t('Add liquidity to receive LP tokens')} />
        <CardFooter style={{ textAlign: 'center' }}>
          <Link href="/add" passHref>
            <Button id="join-pool-button" width="100%" endIcon={<AddIcon color="invertedContrast" />}>
              {t('Add Liquidity')}
            </Button>
          </Link>
          <TooltipSection>
            <Heading as="h2">Your Liquidity</Heading>
            <ReferenceElement ref={targetRef}>
              <HelpIcon color="textSubtle" />
            </ReferenceElement>
            {tooltipVisible && tooltip}
          </TooltipSection>
        </CardFooter>
        <Body>
          {renderBody()}
          {account && !v2IsLoading && (
            <>
            <Flex flexDirection="row" mt="24px" alignItems="center">
              <Text>{t("Don't see a pool you joined?")}</Text>
              <Link href="/find" passHref>
                <Text as="a" color='textSubtle'>{t("import it")}</Text>
                {/* <Button scale="sm" as="a">
                  {t('import it')}
                </Button> */}
              </Link>
            </Flex>
            <Flex flexDirection="row" mt="5px" alignItems="center">
              <Text>{t("Or. If you started your LP tokens in a farm, unstake them to see them here")}</Text>
            </Flex>
            </>
          )}
        </Body>
      </AppBody>
    </Page>
  )
}
