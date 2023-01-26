import styled from 'styled-components'
import { Box, Flex, Text, Heading, Link } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import useTheme from 'hooks/useTheme'
import { BallWithNumber, MatchExampleA, MatchExampleB, PoolAllocationChart } from '../svgs'

const StyledStepCard = styled(Box)`
  display: flex;
  align-self: baseline;
  position: relative;
  border-radius: 20px;
  padding: 1px 1px 3px 1px;
  background-image: url(/img/lottery/how-to-background.svg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`
const StepContainer = styled(Flex)`
  gap: 24px;
  width: 100%;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`
const StepCardInner = styled(Box)`
  width: 100%;
  padding: 24px;
  border-radius: 20px;
`
const StepCardLabel = styled(Text)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #11A9FF;
  color: #FFF;
`
const StepCardBody = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .step-image {
    padding: 5%;
    max-width: 200px;
  }
  .step-title {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 43px;
    color: #FFFFFF;
  }
  .step-subtitle {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #FFFFFF;
    padding: 2% 5%;
  }
`
type Step = { title: string; subtitle: string; label: string, image: string }
const StepCard: React.FC<React.PropsWithChildren<{ step: Step }>> = ({ step }) => {
  return (
    <StyledStepCard width="100%">
      <StepCardInner>
        <StepCardLabel>{step.label}</StepCardLabel>
        <StepCardBody>
          <img className='step-image' src={step.image} />
          <Heading className='step-title'>{step.title}</Heading>
          <Text className='step-subtitle'>{step.subtitle}</Text>
        </StepCardBody>
      </StepCardInner>
    </StyledStepCard>
  )
}

const Divider = styled.div`
  height: 1px;
  margin: 40px 0;
  width: 100%;
`
const BulletList = styled.div`
  .ticket-name {
    background: #2F4DA0;
    border-radius: 7px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 18px;
    color: #FFFFFF;
    padding: 2px 12px;
    width: max-content;
  }
`
const InlineLink = styled(Link)`
  display: inline;
`
const MatchCardWrapper = styled.div`
  background: #FFFFFF;
  border-radius: 20px;
  padding-top: 10%;
  padding-bottom: 10%;
  width: 100%;
  margin-top: 24px;
  text-align: center;
  & > img {
    width: 75%;
  }
`
const AllocationWrapper = styled.div`
  background: #FFFFFF;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 36px;
`
const AllocationGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-auto-rows: max-content;
  row-gap: 12px;
`
const GappedFlex = styled(Flex)`
  gap: 24px;
`
const TextStyle = {
  fontFamily: 'Poppins',
  fontStyle: 'normal'
}
const HowToPlay: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()

  const steps: Step[] = [
    {
      label: t('1'),
      image: '/img/lottery/how-to-play-01.svg',
      title: t('Buy Tickets'),
      subtitle: t('Prices are set when the round starts, equal to $1 in HEXA per ticket.'),
    },
    {
      label: t('2'),
      image: '/img/lottery/how-to-play-02.svg',
      title: t('Wait for the Draw'),
      subtitle: t('There is two draws every day: one every 12 hours.'),
    },
    {
      label: t('3'),
      image: '/img/lottery/how-to-play-03.svg',
      title: t('Check for Prizes'),
      subtitle: t('Once the round’s over, come back to the page and check the results'),
    },
  ]
  return (
    <Box width="100%">
      <Flex mb="40px" alignItems="center" flexDirection="column">
        <Heading mt='24px' mb='24px' style={{ ...TextStyle, color: '#000', fontSize: '32px', lineHeight: '48px', fontWeight: 600 }}>
          {t('How to Play')}
        </Heading>
        <Text style={{ ...TextStyle, color: '#2F4DA0', fontSize: '16px', fontWeight: 400 }}>
          {t('If the digits on your tickets match the winning numbers in the correct order, you win a portion of the prize pool.')}
        </Text>
        <Text style={{ ...TextStyle, color: '#2F4DA0', fontSize: '16px', fontWeight: 400 }}>{t('Simple!')}</Text>
      </Flex>
      <StepContainer>
        {steps.map((step) => (
          <StepCard key={step.label} step={step} />
        ))}
      </StepContainer>
      <Divider />

      <GappedFlex flexDirection={['column', 'column', 'column', 'row']}>
        <Flex flex="2" flexDirection="column">
          <Heading mt='24px' mb='24px' style={{ ...TextStyle, color: '#000', fontSize: '32px', lineHeight: '48px', fontWeight: 600 }}>
            {t('Winning Criteria')}
          </Heading>
          <Heading mb="24px" scale="md" style={{ ...TextStyle, color: '#000', fontSize: '18px', lineHeight: '27px', fontWeight: 500 }}>
            {t('The digits on your ticket must match in the correct order to win.')}
          </Heading>
          <Text mb='16px' style={{ ...TextStyle, color: '#2F4DA0', fontSize: '16px', fontWeight: 400 }}>
            {t('Here’s an example lottery draw, with two tickets, A and B.')}
          </Text>
          <BulletList>
            <div>
              <Text className='ticket-name'>{t('Ticket A')}</Text>
              <Text mt='8px' mb='16px' style={{ ...TextStyle, color: '#2F4DA0', fontSize: '16px', fontWeight: 400 }}>
                {t('The first 3 digits and the last 2 digits match, but the 4th digit is wrong, so this ticket only wins a “Match first 3” prize.')}
              </Text>
            </div>
            <div>
              <Text className='ticket-name'>{t('Ticket B')}</Text>
              <Text mt='8px' mb='16px' style={{ ...TextStyle, color: '#2F4DA0', fontSize: '16px', fontWeight: 400 }}>
                {t('Even though the last 5 digits match, the first digit is wrong, so this ticket doesn’t win a prize.')}
              </Text>
            </div>
          </BulletList>
          <Text mt='8px' mb='16px' style={{ ...TextStyle, color: '#2F4DA0', fontSize: '16px', fontWeight: 400 }}>
            {t('Prize brackets don’t ‘stack’: if you match the first 3 digits in order, you’ll only win prizes from the')}
            <span style={{ color: '#00C400' }}>&nbsp;{t('‘Match 3’ bracket')}</span>
            {t(', and not from')}
            <span style={{ color: '#00C400' }}>&nbsp;{t('‘Match 1’ and ‘Match 2’.')}</span>
          </Text>
          <MatchCardWrapper>
            <img src='/img/lottery/how-to-play-06.svg' />
          </MatchCardWrapper>
        </Flex>
        <Flex flex="3" flexDirection="column" justifyContent="center" paddingLeft='12px' paddingRight='12px'>
          <AllocationWrapper>
            <Text mb='24px' style={{ ...TextStyle, color: '#798DC6', fontSize: '20px', fontWeight: 500, textAlign: 'center' }}>
              {t('Distribution of funds from purchased tickets')}:</Text>
            <AllocationGrid>
              <img src='/img/lottery/how-to-play-04.svg' />
              <img src='/img/lottery/how-to-play-05.svg' />
            </AllocationGrid>
          </AllocationWrapper>
          <Heading mt='24px' mb='24px' style={{ ...TextStyle, color: '#000', fontSize: '32px', lineHeight: '48px', fontWeight: 600 }}>
            {t('Prize Funds')}
          </Heading>
          <Text mt='8px' mb='16px' style={{ ...TextStyle, color: '#2F4DA0', fontSize: '16px', fontWeight: 400 }}>{t('The prizes for each lottery round come from three sources:')}</Text>
          <Heading mb='16px' style={{ ...TextStyle, color: '#000', fontSize: '18px', fontWeight: 500 }}>
            {t('Ticket Purchases')}
          </Heading>
          <BulletList>
            <div>
              <Text mt='8px' mb='16px' style={{ ...TextStyle, color: '#2F4DA0', fontSize: '16px', fontWeight: 400 }}>
                {t('80% of the HEXA paid by people buying tickets that round goes back into the prize pools.')}
              </Text>
            </div>
          </BulletList>
          <Heading mb='16px' style={{ ...TextStyle, color: '#000', fontSize: '18px', fontWeight: 500 }}>
            {t('Rollover Prizes')}
          </Heading>
          <BulletList>
            <div>
              <Text mt='8px' mb='16px' style={{ ...TextStyle, color: '#2F4DA0', fontSize: '16px', fontWeight: 400 }}>
                {t(
                  'After every round, if nobody wins in one of the prize brackets, the unclaimed HEXA for that bracket rolls over into the next round and are redistributed among the prize pools.',
                )}
              </Text>
            </div>
          </BulletList>
        </Flex>
      </GappedFlex>
      <Divider />
    </Box>
  )
}

export default HowToPlay
