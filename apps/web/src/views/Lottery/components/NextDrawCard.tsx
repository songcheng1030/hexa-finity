import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  Text,
  Skeleton,
  Button,
  useModal,
  Box,
  CardFooter,
  ExpandableLabel,
  Balance,
} from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { LotteryStatus } from 'config/constants/types'
import { useTranslation } from '@pancakeswap/localization'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useLottery } from 'state/lottery/hooks'
import { getBalanceNumber } from '@pancakeswap/utils/formatBalance'
import ViewTicketsModal from './ViewTicketsModal'
import BuyTicketsButton from './BuyTicketsButton'
import { dateTimeOptions } from '../helpers'
import RewardBrackets from './RewardBrackets'
import getTimePeriods from 'utils/getTimePeriods'
import useNextEventCountdown from '../hooks/useNextEventCountdown'

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-column-gap: 32px;
    grid-template-columns: 50% 50%;
  }
`
const StyledCard = styled(Card)`
  width: 100%;
  background: linear-gradient(91.07deg, #041647 2.08%, #7633E2 97.24%);
  border-radius: 20px;
`
const StyledCardHeader = styled.div`
  padding: 1rem;
`
const CustomCardBody = styled(CardBody)`
  background: linear-gradient(91.07deg, #041647 2.08%, #7633E2 97.24%);
  border-radius: 20px;
`
const NextDrawWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 24px;
  margin-top: 24px;
  border-radius: 20px;
`
const TextStyle1 = {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: 600,
  color: '#000207',
}
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 10%;
`
const LeftSection = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5% 0;
`
const floatingStarsLeft = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(10px, 10px);
  }
  to {
    transform: translate(0, -0px);
  }
`
const floatingStarsRight = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-10px, 10px);
  }
  to {
    transform: translate(0, -0px);
  }
`
const StarsDecorations = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;

  & img {
    position: absolute;
  }

  & :nth-child(1) {
    animation: ${floatingStarsLeft} 3s ease-in-out infinite;
    animation-delay: 0.25s;
  }
  & :nth-child(2) {
    animation: ${floatingStarsLeft} 3.5s ease-in-out infinite;
    animation-delay: 0.5s;
  }
  & :nth-child(3) {
    animation: ${floatingStarsRight} 4s ease-in-out infinite;
    animation-delay: 0.75s;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & :nth-child(1) {
      left: 0%;
      top: 5%;
    }
    & :nth-child(2) {
      left: 7%;
      top: 72%;
    }
    & :nth-child(3) {
      right: 0%;
      top: 24%;
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    & :nth-child(1) {
      left: 0%;
      top: 5%;
    }
    & :nth-child(2) {
      left: 7%;
      top: 72%;
    }
    & :nth-child(3) {
      right: 5%;
      top: 24%;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    & :nth-child(1) {
      left: 0%;
      top: 5%;
    }
    & :nth-child(2) {
      left: 7%;
      top: 72%;
    }
    & :nth-child(3) {
      right: 5%;
      top: 24%;
    }
  }
`
const CountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  .count-number .count {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 33px;
    line-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000;
    height: 46px;
    width: 53px;
    background: #FFDB1C;
    border-radius: 8px;
  }
  .count-number .text {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #FFFFFF;
    text-align: center;
  }
  .count-spliter {
    font-size: 21px;
    padding: 0 5px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 27px;
  }
`
const RightBox = styled.div`
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7%;
  border-radius: 20px;
`
const NextDrawCard = (props) => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const { address: account } = useAccount()
  const { currentLotteryId, isTransitioning, currentRound } = useLottery()
  const { endTime, amountCollectedInCake, userTickets, status } = currentRound
  const { nextEventTime } = props
  const secondsRemaining = useNextEventCountdown(nextEventTime)
  const { days, hours, minutes } = getTimePeriods(secondsRemaining)

  const [onPresentViewTicketsModal] = useModal(<ViewTicketsModal roundId={currentLotteryId} roundStatus={status} />)
  const [isExpanded, setIsExpanded] = useState(false)
  const ticketBuyIsDisabled = status !== LotteryStatus.OPEN || isTransitioning

  const cakePriceBusd = usePriceCakeBusd()
  const prizeInBusd = amountCollectedInCake.times(cakePriceBusd)
  const endTimeMs = parseInt(endTime, 10) * 1000
  const endDate = new Date(endTimeMs)
  const isLotteryOpen = status === LotteryStatus.OPEN
  const userTicketCount = userTickets?.tickets?.length || 0

  const getPrizeBalances = () => {
    if (status === LotteryStatus.CLOSE || status === LotteryStatus.CLAIMABLE) {
      return (
        <Heading scale="xl" color="secondary" textAlign={['center', null, null, 'center']}>
          {t('Calculating')}...
        </Heading>
      )
    }
    return (
      <>
        {prizeInBusd.isNaN() ? (
          <Skeleton my="7px" height={40} width={160} />
        ) : (
          <Balance
            fontSize="55px"
            color="#F3BA2F"
            textAlign="center"
            bold
            fontFamily="Poppins"
            prefix="~$"
            value={getBalanceNumber(prizeInBusd)}
            decimals={0}
          />
        )}
        {prizeInBusd.isNaN() ? (
          <Skeleton my="2px" height={14} width={90} />
        ) : (
          <Balance
            fontSize="20px"
            color="#FFFFFF"
            textAlign="center"
            unit=" HEXA"
            value={getBalanceNumber(amountCollectedInCake)}
            decimals={2}
          />
        )}
      </>
    )
  }

  const getNextDrawId = () => {
    if (status === LotteryStatus.OPEN) {
      return `${currentLotteryId} |`
    }
    if (status === LotteryStatus.PENDING) {
      return ''
    }
    return parseInt(currentLotteryId, 10) + 1
  }

  const getNextDrawDateTime = () => {
    if (status === LotteryStatus.OPEN) {
      return `${t('Draw')}: ${endDate.toLocaleString(locale, dateTimeOptions)}`
    }
    return ''
  }

  const ticketRoundText =
    userTicketCount > 1
      ? t('You have %amount% tickets this round', { amount: userTicketCount })
      : t('You have %amount% ticket this round', { amount: userTicketCount })
  const [youHaveText, ticketsThisRoundText] = ticketRoundText.split(userTicketCount.toString())

  return (
    <div style={{ width: '100%' }}>
      <StyledCardHeader className='card-header'>
        <Flex justifyContent="space-between">
          <Heading mr="12px" style={{ ...TextStyle1, fontSize: 22 }}>{t('Next Draw')}</Heading>
          <Text style={{ ...TextStyle1, fontSize: 14 }}>
            {currentLotteryId && `#${getNextDrawId()}`} {Boolean(endTime) && getNextDrawDateTime()}
          </Text>
        </Flex>
      </StyledCardHeader>
      <StyledCard background='linear-gradient(91.07deg, #041647 2.08%, #7633E2 97.24%)'>
        <CustomCardBody>
          <Grid>
            <LeftSection>
              <StarsDecorations display={['none', 'none', 'block']}>
                <img src="/img/lottery/ball-03.png" width="100px" height="100px" alt="" />
                <img src="/img/lottery/ball-02.png" width="90px" height="90px" alt="" />
                <img src="/img/lottery/ball-01.png" width="80px" height="80px" alt="" />
              </StarsDecorations>
              <Heading mb="8px" scale="md" color="#ffffff" id="lottery-hero-title">
                {t('Prize Pot')}
              </Heading>
              <Flex flexDirection="column" mb="18px">
                {getPrizeBalances()}
              </Flex>
              <CountWrapper>
                <div className='count-number'>
                  <div className='count'>{days}</div>
                  <div className='text'>Days</div>
                </div>
                <div className='count-spliter'>:</div>
                <div className='count-number'>
                  <div className='count'>{hours}</div>
                  <div className='text'>Hours</div>
                </div>
                <div className='count-spliter'>:</div>
                <div className='count-number'>
                  <div className='count'>{minutes}</div>
                  <div className='text'>Minutes</div>
                </div>
              </CountWrapper>

            </LeftSection>
            <RightSection>
              <RightBox>
                <Flex flexDirection="column">
                  <Heading style={{ color: '#000206', fontSize: 18, paddingBottom: 12 }}>{t('Your tickets')}</Heading>
                  {isLotteryOpen && (
                    <Flex
                      flexDirection="column"
                      mr={[null, null, null, '24px']}
                      alignItems={['center', null, null, 'flex-start']}
                    >
                      {account && (
                        <Flex justifyContent={['center', null, null, 'flex-start']}>
                          <Text display="inline" color='#000206' fontSize='14px'>{youHaveText} </Text>
                          {!userTickets.isLoading ? (
                            <Balance value={userTicketCount} decimals={0} display="inline" bold mx="4px" color='#11A9FF' />
                          ) : (
                            <Skeleton mx="4px" height={20} width={40} />
                          )}
                          <Text display="inline" color='#000206' fontSize='14px'> {ticketsThisRoundText}</Text>
                        </Flex>
                      )}
                      {!userTickets.isLoading && userTicketCount > 0 && (
                        <Button
                          onClick={onPresentViewTicketsModal}
                          height="auto"
                          width="fit-content"
                          p="0"
                          mb={['32px', null, null, '0']}
                          variant="text"
                          scale="sm"
                        >
                          {t('View your tickets')}
                        </Button>
                      )}
                    </Flex>
                  )}
                </Flex>
                <Flex flexDirection={['column', null, null, 'row']} alignItems={['center', null, null, 'flex-start']}>
                  <BuyTicketsButton disabled={ticketBuyIsDisabled} maxWidth="280px" icon={true} />
                </Flex>
              </RightBox>
              {(status === LotteryStatus.OPEN || status === LotteryStatus.CLOSE) && (
                <Flex alignItems="flex-start" justifyContent="flex-start">
                  <ExpandableLabel expanded={isExpanded} iconColor="#FFFFFF" buttonPadding='0px' onClick={() => setIsExpanded(!isExpanded)}>
                    <span style={{ color: '#FFF' }}>{isExpanded ? t('Hide') : t('More')}</span>
                  </ExpandableLabel>
                </Flex>
              )}

            </RightSection>
          </Grid>
          {isExpanded && (
            <NextDrawWrapper>
              <RewardBrackets lotteryNodeData={currentRound} />
            </NextDrawWrapper>
          )}
        </CustomCardBody>
      </StyledCard>
    </div>
  )
}

export default NextDrawCard
