import { Flex, Text, Box } from '@pancakeswap/uikit'
import Image from 'next/image'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { CompetitionPhaseProps } from '../types'
import getTimePeriods from 'utils/getTimePeriods'
import { useAccount } from 'wagmi'
import { useActiveChainId } from 'hooks/useActiveChainId'
import Trans from 'components/Trans'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { colors } from '../styles'

const Wrapper = styled(Flex)`
  gap: 24px;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`
const LeftSection = styled(Flex)`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5% 0;
  transform: scale(0.7);
  ${({ theme }) => theme.mediaQueries.sm} {
    transform: scale(1);
  }
`
const StatusWrap = styled(Flex)`
  display: flex;
  flex-direction: row;
  align-items: center;
  .status-time {
    padding: 0 12px;
    align-items: center;
    & > img {
      width: 16px;
      height: 16px;
      margin-right: 12px;
    }
  }
`
const StatusBtn = styled.button<{ background: string, color: string }>`
    font-size: 14px;
    padding: 3px 12px;
    border: none;
    border-radius: 15px;
    margin-right: 12px;
    color: ${({ color }) => color ? color : '#000'};
    background-color: ${({ background }) => background ? background : 'transparent'};
`
const RightSection = styled(Flex)`
  flex: 2;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5% 0;
`
const CountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 19px 0;
  .count-number .count {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 33px;
    line-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    height: 46px;
    width: 53px;
    background: var(--colors-primary);
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
const PrizeValueWrap = styled.div`
  position: absolute;
  top: 20%;
  left: 10%;
`
const CustomModBattleBanner: React.FC<
  React.PropsWithChildren<{ currentPhase: CompetitionPhaseProps; hasCompetitionEnded: boolean }>
> = ({ currentPhase, hasCompetitionEnded }) => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { chainId, isWrongNetwork } = useActiveChainId()
  const secondsUntilNextEvent = (currentPhase.ends - Date.now()) / 1000;
  const { seconds, minutes, hours, days } = getTimePeriods(secondsUntilNextEvent)
  return (
    <Wrapper>
      <LeftSection>
        <StatusWrap>
          {hasCompetitionEnded ?
            <StatusBtn color={colors.white} background={colors.ended}>{t('Ended')}</StatusBtn>
            : <StatusBtn color={colors.white} background={colors.active}>{t('Active')}</StatusBtn>}
          <Flex className='status-time'>
            <img src='/img/competition/rocket-white.png' />
            <Text style={{ ...colors.textFamily1, color: 'rgba(255, 255, 255, 0.7)', fontSize: 14 }}>
              17 Apr 2022 9:00 am</Text>
          </Flex>
          <Flex className='status-time'>
            <img src='/img/competition/flag-white.png' />
            <Text style={{ ...colors.textFamily1, color: 'rgba(255, 255, 255, 0.7)', fontSize: 14 }}>
              24 Apr 2022 9:00 am</Text>
          </Flex>
        </StatusWrap>
        <Text style={{ ...colors.textFamily2, fontSize: 43, color: '#FFF' }}>{t('Lottery Competition')}</Text>
        <Text style={{ ...colors.textFamily1, fontSize: 14, color: '#FFF' }}>
          <span style={{ color: '#29ABE2' }}>{t('Buy Lottery Tickets ')}</span> &nbsp;{t('and take part in the contest with exclusive prizes')}</Text>
        <CountWrapper>
          <div className='count-number'>
            <div className='count'>{hasCompetitionEnded ? '00' : days}</div>
            <div className='text'>{t('Days')}</div>
          </div>
          <div className='count-spliter'>:</div>
          <div className='count-number'>
            <div className='count'>{hasCompetitionEnded ? '00' : hours}</div>
            <div className='text'>{t('Hours')}</div>
          </div>
          <div className='count-spliter'>:</div>
          <div className='count-number'>
            <div className='count'>{hasCompetitionEnded ? '00' : minutes}</div>
            <div className='text'>{t('Minutes')}</div>
          </div>
          <div className='count-spliter'>:</div>
          <div className='count-number'>
            <div className='count'>{hasCompetitionEnded ? '00' : seconds.toFixed(0)}</div>
            <div className='text'>{t('Seconds')}</div>
          </div>
        </CountWrapper>
        {(!account || isWrongNetwork) && <div>
          <ConnectWalletButton scale="sm">
            <Box display={['none', , , 'block']}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text color="invertedContrast" bold fontSize="16px" mr="10px">
                  <Trans>Connect Wallet</Trans>
                </Text>
                <Image src="/images/walletButton.png" alt="wallet Image" width={20} height={18} />
              </div>
            </Box>
            <Box display={['block', , , 'none']}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text color="invertedContrast" bold fontSize="16px" mr="10px">
                  <Trans>Connect</Trans>
                </Text>
                <Image src="/images/walletButton.png" alt="wallet Image" width={20} height={18} />
              </div>
            </Box>
          </ConnectWalletButton>
        </div>}
      </LeftSection>
      <RightSection>
        <PrizeValueWrap>
          <Text style={{ ...colors.textFamily1, fontSize: 18, color: '#FFF' }}>{t('Prize Pool')}</Text>
          <Text style={{ ...colors.textFamily3, fontSize: 30, color: '#F3BA2F' }}>$452</Text>
        </PrizeValueWrap>
        <img src='/img/competition/prize-logo.png' />

      </RightSection>
    </Wrapper>
  )
}
export default CustomModBattleBanner

