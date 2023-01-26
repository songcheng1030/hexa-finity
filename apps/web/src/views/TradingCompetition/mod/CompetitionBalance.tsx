import styled from 'styled-components'
import { Box, Flex, Text, QuestionHelper, HistoryIcon } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useAccount } from 'wagmi'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { colors } from '../styles'

const StepContainer = styled(Flex)`
  gap: 24px;
  width: 100%;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`
const StyledStepCard1 = styled(Box)`
  display: flex;
  position: relative;
  background: #041647;
  border-radius: 20px;
`
const StyledStepCard2 = styled(Box)`
  display: flex;
  position: relative;
  background: #C9D5F5;
  border-radius: 20px;
`
const StepCardInner1 = styled(Box)`
  width: 100%;
  padding: 12px;
  background: #041647;
  border-radius: 20px;
  display: flex;
  min-height: 120px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
  }
  .card-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 7%;
  }
  .card-button {
    width: 70%;
    flex-direction: row-reverse;
    padding-right: 2rem;
    .withdraw {
      background: #00C400;
      border-radius: 12px;
      padding: 9px 20px;
      display: flex;
      align-items: center;
      color: #FFFFFF;
      border: none;
      cursor: pointer;
    }
    .history {
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      color: #FFFFFF;
      border: none;
      padding-left: 12px;
      cursor: pointer;
    }
    button:disabled {
      cursor: no-drop;
      opacity: 0.7;
    }
  }
`
const StepCardInner2 = styled(Box)`
  width: 100%;
  padding: 12px;
  background: #2F4DA0;
  border-radius: 20px;
  display: flex;
  min-height: 120px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
  .card-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 7%;
  }
  .card-button {
    width: 100%;
    flex-direction: row-reverse;
    padding-right: 2rem;
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 70%;
    }
    .c-telegram {
      background-color: white;
      .c-image {
        background: url(/img/competition/telegram-blue.png);
        background-repeat: no-repeat;
        background-position: center;
      }
    }
    .c-telegram:hover {
      background-color: var(--colors-primary);
      .c-image {
        background: url(/img/competition/telegram-white.png);
        background-repeat: no-repeat;
        background-position: center;
      }
    }
    .c-twitter {
      background-color: white;
      .c-image {
        background: url(/img/competition/twitter-blue.png);
        background-repeat: no-repeat;
        background-position: center;
      }
    }
    .c-twitter:hover {
      background-color: var(--colors-primary);
      .c-image {
        background: url(/img/competition/twitter-white.png);
        background-repeat: no-repeat;
        background-position: center;
      }
    }
    .c-whatsapp {
      background-color: white;
      .c-image {
        background: url(/img/competition/whatsapp-blue.png);
        background-repeat: no-repeat;
        background-position: center;
      }
    }
    .c-whatsapp:hover {
      background-color: var(--colors-primary);
      .c-image {
        background: url(/img/competition/whatsapp-white.png);
        background-repeat: no-repeat;
        background-position: center;
      }
    }
    .c-facebook {
      background-color: white;
      .c-image {
        background: url(/img/competition/facebook-blue.png);
        background-repeat: no-repeat;
        background-position: center;
      }
    }
    .c-facebook:hover {
      background-color: var(--colors-primary);
      .c-image {
        background: url(/img/competition/facebook-white.png);
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
`
const SocialWrap = styled.div`
  .c-text {
    padding-top: 4px;
    font-family: 'Poppins',
    font-style: 'normal',
    font-weight: 400;
    color: #FFF;
    font-size: 11px;
    text-align: center;
  }
`
const SocialInner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 36px;
  margin: 0 6px;
  cursor: pointer;
`
const SocialImg = styled.div`
  height: 100%;
`
const CompetitionBalance: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { isWrongNetwork } = useActiveChainId()

  return (
    <Box width="100%">
      <StepContainer>
        <StyledStepCard1 width="100%">
          <StepCardInner1>
            <Flex className='card-text'>
              <Flex alignItems="center">
                <Text style={{ fontSize: 16, color: '#FFFFFF' }}>{t('Lottery Balance')}</Text>
                <QuestionHelper
                  text={t(
                    'Waiting for a text of this quotation!!!',
                  )}
                  placement="top-start"
                  ml="4px"
                  color='#FFFFFF'
                />
              </Flex>
              <Text color='#FFFFFF'>---</Text>
            </Flex>
            <Flex className='card-button'>
              {(!account || isWrongNetwork) ? <>
                <button className='history' disabled>{t('History')} <HistoryIcon color="#FFFFFF" width="18px" style={{ marginLeft: 6 }} /></button>
                <button className='withdraw' disabled>{t('Withdraw')}</button>
              </> : <>
                <button className='history'>{t('History')} <HistoryIcon color="#FFFFFF" width="18px" style={{ marginLeft: 6 }} /></button>
                <button className='withdraw'>{t('Withdraw')}</button></>}
            </Flex>
          </StepCardInner1>
        </StyledStepCard1>
        <StyledStepCard2 width="100%">
          <StepCardInner2>
            <Flex className='card-text'>
              <Flex alignItems="center">
                <Text style={{ fontSize: 16, color: '#FFF' }}>{t('Share')}</Text>
              </Flex>
            </Flex>
            <Flex className='card-button'>
              <SocialWrap>
                <SocialInner className='c-facebook'>
                  <SocialImg className='c-image' />
                </SocialInner>
                <Text className='c-text'>{t('Facebook')}</Text>
              </SocialWrap>
              <SocialWrap>
                <SocialInner className='c-whatsapp'>
                  <SocialImg className='c-image' />
                </SocialInner>
                <Text className='c-text'>{t('Whatsapp')}</Text>
              </SocialWrap>
              <SocialWrap>
                <SocialInner className='c-twitter'>
                  <SocialImg className='c-image' />
                </SocialInner>
                <Text className='c-text'>{t('Twitter')}</Text>
              </SocialWrap>
              <SocialWrap>
                <SocialInner className='c-telegram'>
                  <SocialImg className='c-image' />
                </SocialInner>
                <Text className='c-text'>{t('Telegram')}</Text>
              </SocialWrap>
            </Flex>
          </StepCardInner2>
        </StyledStepCard2>
      </StepContainer>
    </Box>
  )
}

export default CompetitionBalance
