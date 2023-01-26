import styled from 'styled-components'
import { Box, Flex, Text, Heading, QuestionHelper, HistoryIcon } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

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
  align-self: baseline;
  position: relative;
  background: #041647;
  padding: 1px 1px 3px 1px;
  border-radius: 20px;
  position: relative;
`
const StyledStepCard2 = styled(Box)`
  display: flex;
  align-self: baseline;
  position: relative;
  background: #C9D5F5;
  padding: 1px 1px 3px 1px;
  border-radius: 20px;
  position: relative;
`
const StepCardInner1 = styled(Box)`
  width: 100%;
  padding: 12px;
  background: #041647;
  border-radius: 20px;
  display: flex;
  min-height: 120px;
  align-items: center;
  .card-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 17%;
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
  }
`
const StepCardInner2 = styled(Box)`
  width: 100%;
  padding: 12px;
  background: #C9D5F5;
  border-radius: 20px;
  display: flex;
  min-height: 120px;
  align-items: center;
  .card-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 17%;
  }
  .card-button {
    width: 70%;
    flex-direction: row-reverse;
    padding-right: 2rem;
    .withdraw {
      background: rgba(255, 255, 255, 0.21);
      border: none;
      border-radius: 12px;
      padding: 9px 20px;
      display: flex;
      align-items: center;
      color: rgba(121, 141, 198, 0.43);
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
  }
`
const StepImg = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  display: none;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: initial;
  }
`

const LotteryBalance: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()

  return (
    <Box width="100%">
      <StepContainer>
        <StyledStepCard1 width="100%">
          <StepCardInner1>
            <StepImg src='/img/lottery/balance-01.png' />
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
              <button className='withdraw'>Withdraw</button>
            </Flex>
          </StepCardInner1>
        </StyledStepCard1>
        <StyledStepCard2 width="100%">
          <StepCardInner2>
            <StepImg src='/img/lottery/balance-02.png' />
            <Flex className='card-text'>
              <Flex alignItems="center">
                <Text style={{ fontSize: 16, color: 'rgba(121, 141, 198, 0.43)' }}>{t('Lottery Balance')}</Text>
                <QuestionHelper
                  text={t(
                    'Waiting for a text of this quotation!!!',
                  )}
                  placement="top-start"
                  ml="4px"
                  color='rgba(121, 141, 198, 0.43)'
                />
              </Flex>
              <Text color='rgba(121, 141, 198, 0.43)'>---</Text>
            </Flex>
            <Flex className='card-button'>
              <button className='history'>History <HistoryIcon color="#FFFFFF" width="18px" style={{marginLeft: 6}} /></button>
              <button className='withdraw'>Withdraw</button>
            </Flex>
          </StepCardInner2>
        </StyledStepCard2>
      </StepContainer>
    </Box>
  )
}

export default LotteryBalance
