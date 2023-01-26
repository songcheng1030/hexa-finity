import styled from 'styled-components'
import { Box, Flex, Text, Heading } from '@pancakeswap/uikit'
import Container from 'components/Layout/Container'
import { useTranslation } from '@pancakeswap/localization'

const StyledHero = styled(Box)`
  background: #DAE4FF;
  padding-bottom: 32px;
  padding-top: 32px;
  font-family: 'Poppins';
  font-style: normal;
`
const TextStyle = {
  fontFamily: 'Poppins',
  fontStyle: 'normal'
}
type Step = { title: string; subtitle: string; label: string, image: string }
const StyledStepCard = styled(Box)`
  display: flex;
  align-self: baseline;
  position: relative;
  border-radius: 20px;
  padding: 1px 1px 3px 1px;
  background-image: url(/img/about_hf/card-background.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  min-height: 320px;
  margin: auto;
`
const StepContainer = styled.div`
  gap: 24px;
  width: 100%;
  display: grid;
  flex-wrap: wrap;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`
const StepCardInner = styled(Box)`
  width: 100%;
  padding: 24px;
  border-radius: 20px;
`
const StepCardBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    opacity: 0.7;
  }
`
const StepCardImage = styled.img`
  width: 108px;
  height: 108px;
`
const StepCard: React.FC<React.PropsWithChildren<{ step: Step }>> = ({ step }) => {
  return (
    <StyledStepCard width="100%">
      <StepCardInner>
        <StepCardBody>
          <StepCardImage src = {step.image} />
          <Heading className='step-title'>{step.title}</Heading>
          <Text className='step-subtitle'>{step.subtitle}</Text>
        </StepCardBody>
      </StepCardInner>
    </StyledStepCard>
  )
}
const Opportunities: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const steps: Step[] = [
    {
      label: t('1'),
      image: '/img/about_hf/token-1.png',
      title: t('Hexa Finity Launchpools'),
      subtitle: t('Stake your BSW tokens in Hexa Finity Launchpools and earn other tokens for FREE.'),
    },
    {
      label: t('2'),
      image: '/img/about_hf/token-2.png',
      title: t('Liquidity Provider Fee'),
      subtitle: t('Add HF token along with other tokens to the liquidity pools on Biswap and receive 50% from every transaction fee occurring on the platform.'),
    },
    {
      label: t('3'),
      image: '/img/about_hf/token-1.png',
      title: t('Hexa Finity Farms'),
      subtitle: t('Stake your Liquidity Provider tokens in Hexa Finity Farms pairs and receive Hexa Finity tokens in return.'),
    },
    {
      label: t('4'),
      image: '/img/about_hf/token-4.png',
      title: t('I-Gaming'),
      subtitle: t('Play your favorite games on the #1 i-gaming platform BetFury using the HF token.'),
    },
    {
      label: t('5'),
      image: '/img/about_hf/token-5.png',
      title: t('Referral Commission'),
      subtitle: t('Receive 5% from your friends’ earnings in Farms & Launchpools in the form of HF tokens'),
    },
    {
      label: t('6'),
      image: '/img/about_hf/token-6.png',
      title: t('Trading'),
      subtitle: t('Easily trade Hexa Finity token on the platform with the lowest transaction fees in the DeFi space - Hexa Finity'),
    },
    {
      label: t('7'),
      image: '/img/about_hf/token-7.png',
      title: t('Hexa Finity Lottery'),
      subtitle: t('Buy lottery tickets with Hexa Finity tokens and win exclusive prizes.'),
    },
    {
      label: t('8'),
      image: '/img/about_hf/token-8.png',
      title: t('Fee Return'),
      subtitle: t('Make exchanges on Hexa Finity and get up to 100% of the trading fee back in Hexa Finity tokens.'),
    },
  ]
  return (
    <StyledHero>
      <Container>
        <Flex flexDirection="column">
          <Heading mt='24px' mb='24px' style={{ ...TextStyle, color: '#000', fontSize: '24px', fontWeight: 600 }}>
            {t('Hexa Finity Token Opportunities')}
          </Heading>
        </Flex>
        <StepContainer>
          {steps.map((step) => (
            <StepCard key={step.label} step={step} />
          ))}
        </StepContainer>
      </Container>
    </StyledHero>
  );
}

export default Opportunities