import styled from 'styled-components'
import { Box, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { colors } from '../styles'

const StepContainer = styled(Flex)`
  gap: 24px;
  width: 100%;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`
const StyledStepCard = styled(Box)`
  display: flex;
  position: relative;
  background: #041647;
  border-radius: 20px;
`
const StepCardInner1 = styled(Box)`
  width: 100%;
  padding: 12px;
  background-image: url(/img/competition/rule-1.png);
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  position: relative;
  overflow: hidden;
  padding: 10px;
  .card-title {
    position: absolute;
    top: 40px;
    left: 40px;
    z-index: 9;
  }
  .card-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding 20% 0 25%;
    padding-left: 32px;
    z-index: 9;
  }
  .card-button {
    position: absolute;
    bottom: 40px;
    left: 40px;
    background-color: var(--colors-primary);
    padding: 12px 24px;
    border-radius: 12px;
    z-index: 9;
  }
`
const StepCardInner2 = styled(Box)`
  width: 100%;
  padding: 12px;
  background-image: url(/img/competition/rule-2.png);
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  position: relative;
  overflow: hidden;
  padding: 10px;
  .card-title {
    position: absolute;
    top: 40px;
    left: 40px;
    z-index: 9;
  }
  .card-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding 20% 0 25%;
    padding-left: 32px;
    z-index: 9;
  }
  .card-button {
    position: absolute;
    bottom: 40px;
    left: 40px;
    background-color: var(--colors-primary);
    padding: 12px 24px;
    border-radius: 12px;
    z-index: 9;
  }
`
const CardBall1 = styled.div`
  position: absolute;
  width: 180px;
  left: 60%;
  transform: translate(-50%, 0);
  bottom: -32px;
`
const CardBall2 = styled.div`
  position: absolute;
  width: 180px;
  left: 60%;
  transform: translate(-50%, 0);
  top: -32px;
`
const CardGift = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  width: 240px;
  z-index: 7;
`

const CompetitionStep: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()

  return (
    <Box width="100%">
      <StepContainer>
        <StyledStepCard width="100%">
          <StepCardInner1>
            <CardBall1>
              <img src='/img/competition/ball.png' />
            </CardBall1>
            <CardGift>
              <img src='/img/competition/gift.png' />
            </CardGift>
            <Flex className='card-title'>
              <Text style={{ ...colors.textFamily1, fontSize: 18, color: '#F3BA2F' }}>{t('Competition A')}</Text>
            </Flex>
            <Flex className='card-text'>
              <Text style={{ ...colors.textFamily3, fontSize: 33, color: '#FFF' }}>{t('Ticket Volume')}</Text>
              <Text style={{ ...colors.textFamily3, fontSize: 33, color: '#FFF' }}>{t('94% of the Prize Pool')}</Text>
            </Flex>
            <Flex className='card-button'>
              <a href='#competition_rules'>{t('Read More')}</a>
            </Flex>
          </StepCardInner1>
        </StyledStepCard>

        <StyledStepCard width="100%">
          <StepCardInner2>
            <CardBall2>
              <img src='/img/competition/ball.png' />
            </CardBall2>
            <CardGift>
              <img src='/img/competition/gift.png' />
            </CardGift>
            <Flex className='card-title'>
              <Text style={{ ...colors.textFamily1, fontSize: 18, color: '#F3BA2F' }}>{t('Competition B')}</Text>
            </Flex>
            <Flex className='card-text'>
              <Text style={{ ...colors.textFamily3, fontSize: 33, color: '#FFF' }}>{t('Ranking Tournament')}</Text>
              <Text style={{ ...colors.textFamily3, fontSize: 33, color: '#FFF' }}>{t('6% of the Prize Pool')}</Text>
            </Flex>
            <Flex className='card-button'>
              <a href='#competition_rules'>{t('Read More')}</a>
            </Flex>
          </StepCardInner2>
        </StyledStepCard>
      </StepContainer>
    </Box>
  )
}

export default CompetitionStep
