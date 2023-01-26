import { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  CardBody,
  Heading,
  Flex,
  Skeleton,
  Text,
  Box,
  useModal,
  BunnyPlaceholderIcon,
  useMatchBreakpoints,
  Balance,
  ExpandableLabel
} from '@pancakeswap/uikit'
import { LotteryRound, LotteryRoundGraphEntity } from 'state/types'
import { useGetUserLotteriesGraphData, useLottery } from 'state/lottery/hooks'
import { LotteryStatus } from 'config/constants/types'
import { useTranslation } from '@pancakeswap/localization'
import WinningNumbers from '../WinningNumbers'
import ViewTicketsModal from '../ViewTicketsModal'
import BigNumber from 'bignumber.js'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { formatNumber, getBalanceNumber } from '@pancakeswap/utils/formatBalance'
import { useGetLotteryGraphDataById } from 'state/lottery/hooks'
import { getGraphLotteries } from 'state/lottery/getLotteriesData'
import FooterExpanded from './FooterExpanded'

const TextStyle = {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: 600,
}
const CardWrapper = styled.div`

`
const StyledCardBody = styled(CardBody)`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-column-gap: 24px;
    grid-row-gap: 24px;
    grid-template-columns: 35% 65%;
  }
`
const LeftFlex = styled(Flex)`
  background: #EAEFFD;
  border-radius: 20px;
  align-items: center;
  padding: 5% 0 0 10%;
`
const RightFlex = styled(Flex)`
  flex-direction: column;
`
const LatestRibbon = styled(Text)`
  background: #11A9FF;
  border-radius: 6px;
  margin-left: 12px;
  padding: 2px 18px;
  color: #FFF;
  font-size: 12px;
`
const PreviousRoundCardBody: React.FC<
  React.PropsWithChildren<{ lotteryNodeData: LotteryRound; lotteryId: string }>
> = ({ lotteryNodeData, lotteryId }) => {
  const { t } = useTranslation()
  const {
    currentLotteryId,
    currentRound: { status },
  } = useLottery()
  const userLotteryData = useGetUserLotteriesGraphData()
  const userDataForRound = userLotteryData.rounds.find((userLotteryRound) => userLotteryRound.lotteryId === lotteryId)
  const { isLg, isXl, isXxl } = useMatchBreakpoints()
  const isLargerScreen = isLg || isXl || isXxl

  const currentLotteryIdAsInt = parseInt(currentLotteryId)
  const mostRecentFinishedRoundId =
    status === LotteryStatus.CLAIMABLE ? currentLotteryIdAsInt : currentLotteryIdAsInt - 1
  const isLatestRound = mostRecentFinishedRoundId.toString() === lotteryId

  const [onPresentViewTicketsModal] = useModal(
    <ViewTicketsModal roundId={lotteryId} roundStatus={lotteryNodeData?.status} />,
  )

  const totalTicketNumber = userDataForRound ? userDataForRound.totalTickets : 0
  const ticketRoundText =
    totalTicketNumber > 1
      ? t('You had %amount% tickets this round', { amount: totalTicketNumber })
      : t('You had %amount% ticket this round', { amount: totalTicketNumber })
  const [youHadText, ticketsThisRoundText] = ticketRoundText.split(totalTicketNumber.toString())

  const [fetchedLotteryGraphData, setFetchedLotteryGraphData] = useState<LotteryRoundGraphEntity>()
  const lotteryGraphDataFromState = useGetLotteryGraphDataById(lotteryId)
  useEffect(() => {
    const getGraphData = async () => {
      const fetchedGraphData = await getGraphLotteries(undefined, undefined, { id_in: [lotteryId] })
      setFetchedLotteryGraphData(fetchedGraphData[0])
    }
    if (!lotteryGraphDataFromState) {
      getGraphData()
    }
  }, [lotteryGraphDataFromState, lotteryId])
  const cakePriceBusd = usePriceCakeBusd()
  let prizeInBusd = new BigNumber(NaN)
  if (lotteryNodeData) {
    const { amountCollectedInCake } = lotteryNodeData
    prizeInBusd = amountCollectedInCake.times(cakePriceBusd)
  }
  const getPrizeBalances = () => {
    return (
      <>
        {prizeInBusd.isNaN() ? (
          <Skeleton my="7px" height={40} width={200} />
        ) : (
          <Heading style={{ ...TextStyle, color: '#11A9FF', fontSize: 36, padding: '12px 0 0 0' }}>
            ${formatNumber(getBalanceNumber(prizeInBusd), 0, 0)}
          </Heading>
        )}
        {prizeInBusd.isNaN() ? (
          <Skeleton my="2px" height={14} width={90} />
        ) : (
          <Balance
            fontSize="16px"
            color="#2F4DA0"
            unit=" HEXA"
            value={getBalanceNumber(lotteryNodeData?.amountCollectedInCake)}
            decimals={2}
          />
        )}
      </>
    )
  }
  const getTotalUsers = (): string => {
    if (!lotteryGraphDataFromState && fetchedLotteryGraphData) {
      return fetchedLotteryGraphData?.totalUsers?.toLocaleString()
    }
    if (lotteryGraphDataFromState) {
      return lotteryGraphDataFromState?.totalUsers?.toLocaleString()
    }
    return null
  }
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <CardWrapper>
      <StyledCardBody>
        <Grid>
          <LeftFlex id='right-card'>
            <Flex mb="24px" flexDirection="column" justifyContent="space-between">
              <Box>
                <Heading style={{ ...TextStyle, fontSize: 18, color: '#000' }}>{t('Prize pot')}</Heading>
                {getPrizeBalances()}
              </Box>
              <Box mb="12px">
                <Flex>
                  <Text style={{ ...TextStyle, fontSize: 16, color: '#2F4DA0', fontWeight: 400 }}>
                    {t('Total players this round')}:{' '}
                    {lotteryNodeData && (lotteryGraphDataFromState || fetchedLotteryGraphData) ? (
                      getTotalUsers()
                    ) : (
                      <Skeleton height={14} width={31} />
                    )}
                  </Text>
                </Flex>
              </Box>
              {userDataForRound && (
                <>
                  <Box display={['none', null, null, 'flex']}>
                    <Heading style={{ ...TextStyle, fontSize: 18, color: '#000' }}>{t('Your tickets')}</Heading>
                  </Box>
                  <Flex flexDirection="column" padding="12px 0 0 0">
                    <Box mt={['32px', null, null, 0]}>
                      <Text style={{ ...TextStyle, fontSize: 16, color: '#2F4DA0', fontWeight: 400, display: 'inline' }}>{youHadText} </Text>
                      <Text style={{ ...TextStyle, fontSize: 16, color: '#11A9FF', fontWeight: 600, display: 'inline', cursor: 'pointer' }} onClick={onPresentViewTicketsModal}>
                        {userDataForRound.totalTickets} tickets
                      </Text>
                      <Text display="inline"> {t('this round')}</Text>
                    </Box>
                  </Flex>
                </>
              )}
            </Flex>
          </LeftFlex>

          <RightFlex>
            <Flex justifyContent={['center', null, null, 'center']} mt='24px'>
              <Heading style={{ ...TextStyle, color: '#000206', fontSize: 22, fontWeight: 500 }}>{t('Winning Number')}</Heading>
              {isLatestRound && <LatestRibbon>{t('Latest')}</LatestRibbon>}
            </Flex>
            <Flex justifyContent={['center', null, null, 'center']}>
              {lotteryId ? (
                lotteryNodeData?.finalNumber ? (
                  <WinningNumbers
                    rotateText={isLargerScreen || false}
                    number={lotteryNodeData?.finalNumber.toString()}
                  />
                ) : (
                  <Skeleton
                    width={['240px', null, null, '450px']}
                    height={['34px', null, null, '71px']}
                    mr={[null, null, null, '32px']}
                  />
                )
              ) : (
                <>
                  <Flex flexDirection="column" alignItems="center" width={['240px', null, null, '480px']}>
                    <Text mb="8px">{t('Please specify Round')}</Text>
                    <BunnyPlaceholderIcon height="64px" width="64px" />
                  </Flex>
                </>
              )}
            </Flex>
            <Flex p="8px 24px" alignItems="center" justifyContent="center">
              <ExpandableLabel
                expanded={isExpanded}
                iconColor='#000'
                buttonPadding='0'
                onClick={() => {
                  if (lotteryId) {
                    setIsExpanded(!isExpanded)
                  }
                }}
              >
                <span style={{ color: '#000' }}>{isExpanded ? t('Hide') : t('More')}</span>
              </ExpandableLabel>
            </Flex>
          </RightFlex>
        </Grid>
      </StyledCardBody>
      {isExpanded && <FooterExpanded lotteryNodeData={lotteryNodeData} lotteryId={lotteryId} />}
    </CardWrapper>

  )
}

export default PreviousRoundCardBody
