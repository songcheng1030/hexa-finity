import { useMemo, useCallback } from 'react'
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

import isEmpty from 'lodash/isEmpty'
import groupBy from 'lodash/groupBy'
import { useAllSortedRecentTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import { useAppDispatch } from 'state'
import { clearAllTransactions } from 'state/transactions/actions'
import { chains } from 'utils/wagmi'
import { AutoRow } from '../../components/Layout/Row'
import Transaction from '../../components/App/Transactions/Transaction'
import ConnectWalletButton from '../../components/ConnectWalletButton'

import { StyledHeaderTitle, ModalBody } from './styles'

function renderTransactions(transactions: TransactionDetails[], chainId: number) {
  return (
    <Flex flexDirection="column">
      {transactions.map((tx) => {
        return <Transaction key={tx.hash + tx.addedTime} tx={tx} chainId={chainId} />
      })}
    </Flex>
  )
}

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

  const dispatch = useAppDispatch()
  const sortedRecentTransactions = useAllSortedRecentTransactions()

  const hasTransactions = !isEmpty(sortedRecentTransactions)

  const clearAllTransactionsCallback = useCallback(() => {
    dispatch(clearAllTransactions())
  }, [dispatch])

  return (
    <Page>
      <StyledHeaderTitle>
        <h1>Make a Swap at No Cost</h1>
        <p>
          Fee reimbursement of up to 70% in HEXA tokens, 10% is credited to your Robl Boost & Squid Energy. You can
          change the percentage.
        </p>
      </StyledHeaderTitle>
      <AppBody>
        <SwapTab />
        {/* <AppHeader title={t('Liquidity')} subtitle={t('Add liquidity to receive LP tokens')} /> */}
        <Text fontWeight={'600'} fontSize={18} mt="20px" ml="30px" mb={30}>{t('Recent Transactions')}</Text>
        <Flex flexDirection="column" alignItems="center" mb={70}>
          {account ? (
            <ModalBody>
              {hasTransactions ? (
                <>
                  <AutoRow mb="1rem" style={{ justifyContent: 'space-between' }}>
                    <Button variant="tertiary" scale="xs" onClick={clearAllTransactionsCallback}>
                      {t('clear all')}
                    </Button>
                  </AutoRow>
                  {Object.entries(sortedRecentTransactions).map(([chainId, transactions]) => {
                    const chainIdNumber = Number(chainId)
                    const groupedTransactions = groupBy(Object.values(transactions), (trxDetails) =>
                      Boolean(trxDetails.receipt),
                    )

                    const confirmed = groupedTransactions.true ?? []
                    const pending = groupedTransactions.false ?? []

                    return (
                      <div key={`transactions#${chainIdNumber}`}>
                        <Text fontSize="12px" color="textSubtle" mb="4px">
                          {chains.find((c) => c.id === chainIdNumber)?.name ?? 'Unknown network'}
                        </Text>
                        {renderTransactions(pending, chainIdNumber)}
                        {renderTransactions(confirmed, chainIdNumber)}
                      </div>
                    )
                  })}
                </>
              ) : (
                <Text>{t('No recent transactions')}</Text>
              )}
            </ModalBody>
          ) : (
            <Text>{t('Please connect a wallet to view your Recent Transactions')}</Text>
          )}
        </Flex>
      </AppBody>
    </Page>
  )
}
