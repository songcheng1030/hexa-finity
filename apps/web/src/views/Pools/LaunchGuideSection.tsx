import styled from 'styled-components'
import { Box, Flex, Text, Heading, Link } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

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
  background-image: url(/img/launchpools/card-back-1.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  min-height: 320px;
  margin: auto;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 31.5%;
  }
`
const StepContainer = styled(Flex)`
  gap: 24px;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`
const StepCardInner = styled(Box)`
  width: 100%;
  padding: 24px;
  border-radius: 20px;
`
const StepCardBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .step-image {
    padding: 5%;
    max-width: 200px;
    max-height: 200px;
  }
  .step-title {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 43px;
    color: #FFFFFF;
    text-align: center;
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
const StepCardImage = styled.div`
  width: 170px;
  height: 170px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`
const StepCard: React.FC<React.PropsWithChildren<{ step: Step }>> = ({ step }) => {
  return (
    <StyledStepCard width="100%">
      <StepCardInner>
        <StepCardBody>
          <StepCardImage style={{backgroundImage: `url(${step.image})`}}/>
          <Heading className='step-title'>{step.title}</Heading>
          <Text className='step-subtitle'>{step.subtitle}</Text>
        </StepCardBody>
      </StepCardInner>
    </StyledStepCard>
  )
}
const LaunchGuideSection: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const steps: Step[] = [
    {
      label: t('1'),
      image: '/img/launchpools/card-logo-1.png',
      title: t('Global Exposure'),
      subtitle: t('Get access to 380k+ Hexa Finity users across the globe.'),
    },
    {
      label: t('2'),
      image: '/img/launchpools/card-logo-2.png',
      title: t('Liquidity'),
      subtitle: t('Projects launched on Hexa Finity Launchpool will be listed and have high trading liquidity.'),
    },
    {
      label: t('3'),
      image: '/img/launchpools/card-logo-3.png',
      title: t('Token Distribution'),
      subtitle: t('Your token will be instantly distributed to a large user base that holds your token.'),
    },
    {
      label: t('4'),
      image: '/img/launchpools/card-logo-4.png',
      title: t('Trading Competition'),
      subtitle: t('Hexa Finity will organize a tournament dedicated to your project to maximize trading volume with your token.'),
    },
    {
      label: t('5'),
      image: '/img/launchpools/card-logo-5.png',
      title: t('Marketing Boost'),
      subtitle: t('Your project will be promoted across all our social media platforms with an audience of over 320K+.'),
    },
    {
      label: t('6'),
      image: '/img/launchpools/card-logo-6.png',
      title: t('Growth Opportunities'),
      subtitle: t('Your token might also be added to Hexa Finity Farms with high APR.'),
    },
  ]
  return (<>
    <Flex flexDirection="column">
      <Heading mt='24px' mb='24px' style={{ ...TextStyle, color: '#000', fontSize: '24px', fontWeight: 600 }}>
        {t('Why choose us?')}
      </Heading>
    </Flex>
    <StepContainer>
      {steps.map((step) => (
        <StepCard key={step.label} step={step} />
      ))}
    </StepContainer>
  </>);
}

export default LaunchGuideSection