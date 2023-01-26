import styled, { keyframes } from 'styled-components'
import { Box, Flex, Heading, Skeleton, Balance, Text } from '@pancakeswap/uikit'
import { LotteryStatus } from 'config/constants/types'
import { useTranslation } from '@pancakeswap/localization'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useLottery } from 'state/lottery/hooks'
import { getBalanceNumber } from '@pancakeswap/utils/formatBalance'
import BuyTicketsButton from './BuyTicketsButton'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Trans from 'components/Trans'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useActiveChainId } from 'hooks/useActiveChainId'
import getTimePeriods from 'utils/getTimePeriods'
import useNextEventCountdown from '../hooks/useNextEventCountdown'

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
const floatingTicketLeft = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-10px, 15px);
  }
  to {
    transform: translate(0, -0px);
  }
`
const floatingTicketRight = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(10px, 15px);
  }
  to {
    transform: translate(0, -0px);
  }
`
const PrizeTotalBalance = styled(Balance)`
  background: ${({ theme }) => theme.colors.gradientGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const Decorations = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(/img/lottery/hero.png);
  background-repeat: no-repeat;
  background-position: center 0;
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
  & :nth-child(4) {
    animation: ${floatingTicketLeft} 6s ease-in-out infinite;
    animation-delay: 0.2s;
  }
  & :nth-child(5) {
    animation: ${floatingTicketRight} 6s ease-in-out infinite;
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
      right: 0%;
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
      right: 0%;
      top: 24%;
    }
  }
`
const HeroWrapper = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5% 0;
  // align-items: center;
  .lottery-header-title {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 39px;
    line-height: 58px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
  }
`
const RightSection = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5% 0;
  background: radial-gradient(circle, rgba(249, 59, 93, 0.7) 1%, rgba(11, 36, 106, 0.17) 77%);
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
    background: #F3BA2F;
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
const HeroTicketWrap = styled.div`
  position: relative;
  height: 70px;
  width: 280px;
  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 90px;
  }
  .center-text {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h3 {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 31px;
      line-height: 46px;
      color: #29ABE2;
    }
    span {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 11px;
      line-height: 16px;
      color: #000000;
    }
  }
`

const HeroSection = (props) => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { chainId, isWrongNetwork } = useActiveChainId()
  const {nextEventTime, postCountdownText, preCountdownText} = props
  const secondsRemaining = useNextEventCountdown(nextEventTime)
  const { days, hours, minutes } = getTimePeriods(secondsRemaining)

  const {
    currentRound: { amountCollectedInCake, status },
    isTransitioning,
  } = useLottery()

  const cakePriceBusd = usePriceCakeBusd()
  const prizeInBusd = amountCollectedInCake.times(cakePriceBusd)
  const prizeTotal = getBalanceNumber(prizeInBusd)
  const ticketBuyIsDisabled = status !== LotteryStatus.OPEN || isTransitioning

  const getHeroHeading = () => {
    if (status === LotteryStatus.OPEN) {
      return (
        <>
          {prizeInBusd.isNaN() ? (
            <Skeleton my="7px" height={60} width={190} />
          ) : (
            <PrizeTotalBalance fontSize="75px" bold prefix="$" value={prizeTotal} mb="8px" decimals={0} />
          )}
          <Heading mb="32px" scale="lg" color="#798DC6" fontSize={20}>
            {t('in prizes!')}
          </Heading>
        </>
      )
    }
    return (
      <Heading mb="24px" scale="xl" color="#798DC6">
        {t('Tickets on sale soon')}
      </Heading>
    )
  }

  return (
    <HeroWrapper>
      <LeftSection style={{ flex: 1 }}>
        <div className='lottery-header-title'>The &nbsp; <b> HexaFinity Lottery</b></div>
        {getHeroHeading()}
        {(!account || isWrongNetwork) && <div>
          <ConnectWalletButton scale="sm">
            <Box display={['none', , , 'block']}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Image src="/images/walletButton.png" alt="wallet Image" width={20} height={18} />
                <Text color="invertedContrast" bold fontSize="16px" ml="10px">
                  <Trans>Connect Wallet</Trans>
                </Text>
              </div>
            </Box>
            <Box display={['block', , , 'none']}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Image src="/images/walletButton.png" alt="wallet Image" width={20} height={18} />
                <Text color="invertedContrast" bold fontSize="16px" ml="10px">
                  <Trans>Connect</Trans>
                </Text>
              </div>
            </Box>
          </ConnectWalletButton>
        </div>}
      </LeftSection>
      <RightSection style={{ flex: 1 }}>
        <Decorations />
        <StarsDecorations display={['none', 'none', 'block']}>
          <img src="/img/lottery/ball-01.png" width="82px" height="82px" alt="" />
          <img src="/img/lottery/ball-02.png" width="95px" height="95px" alt="" />
          <img src="/img/lottery/ball-03.png" width="125px" height="125px" alt="" />
        </StarsDecorations>
        <Heading mb="8px" scale="md" color="#ffffff" id="lottery-hero-title">
          {t('GET YOUR TICKETS NOW!')}
        </Heading>
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
        <HeroTicketWrap>
          <img src='/img/lottery/hero-ticket.svg' />
          <div className='center-text'>
            <h3>$1</h3>
            <span>in HEXA per ticket</span>
          </div>
        </HeroTicketWrap>
        <BuyTicketsButton disabled={ticketBuyIsDisabled} icon={true} />
      </RightSection>
    </HeroWrapper>
  )
}

export default HeroSection
