import { Box, Button, Flex, Heading, Text, ProposalIcon } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import Container from 'components/Layout/Container'
import Link from 'next/link'
import ButtonCustom from 'views/Lottery/components/ButtonCustom'

const StyledHero = styled(Box)`
  background: #ECF1FF;
  padding-bottom: 32px;
  padding-top: 32px;
  font-family: 'Poppins';
  font-style: normal;
`
const StepContainer = styled.div`
  flex: 2;
  gap: 24px;
  width: 100%;
  display: grid;
  flex-wrap: wrap;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`
const StyledStepCard = styled(Box)`
  display: flex;
  align-self: baseline;
  position: relative;
  border-radius: 20px;
  padding: 1px 1px 3px 1px;
  width: 100%;
  min-height: 280px;
  margin: auto;
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
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: var(--colors-aboutText);
    padding: 12px 0;
  }
  .step-subtitle {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: var(--colors-aboutText);
    opacity: 0.7;
  }
`
const StepCardImage = styled.img`
  width: 74px;
  height: 74px;
  margin-bottom: 12px;
`
const StepCard: React.FC<React.PropsWithChildren<{ step: Step }>> = ({ step }) => {
  return (
    <StyledStepCard width="100%">
      <StepCardInner>
        <StepCardBody>
          <StepCardImage src={step.image} />
          <Heading className='step-title'>{step.title}</Heading>
          <Text className='step-subtitle'>{step.subtitle}</Text>
        </StepCardBody>
      </StepCardInner>
    </StyledStepCard>
  )
}
const BurnContainer = styled.div`
  flex: 1;
`
const BurnStyledCard = styled(Box)`
  background: #FFF;
  border-radius: 20px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

type Step = { title: string; subtitle: string; label: string, image: string }
const Mechanism = () => {
  const { t } = useTranslation()
  const steps: Step[] = [
    {
      label: t('1'),
      image: '/img/about_hf/mechanism-logo-1.png',
      title: t('50% From Trading Fees'),
      subtitle: t('Get access to 380k+ Hexa Finity users across the globe.'),
    },
    {
      label: t('2'),
      image: '/img/about_hf/mechanism-logo-2.png',
      title: t('Unregistered Referrals'),
      subtitle: t('All the rewards coming from the accounts with no referrers are used for weekly BSW token burning.'),
    },
    {
      label: t('3'),
      image: '/img/about_hf/mechanism-logo-3.png',
      title: t('Performance Fee 1.99%'),
      subtitle: t('Subtracted automatically from each harvest in the BSW Auto Compound pool and burned on a weekly basis.'),
    },
    {
      label: t('4'),
      image: '/img/about_hf/mechanism-logo-4.png',
      title: t('13% from Lottery tickets'),
      subtitle: t('13% from every lottery ticket are accumulated on a separate wallet and burned once a week.'),
    },
  ]
  return (
    <StyledHero>
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <Box p="32px" style={{ width: '100%' }}>
            <Heading mb="16px" style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }} color='#000'>{t('Hexa Finity Burning Mechanism')}</Heading>
            <Text style={{ fontSize: '14px', textAlign: 'center', padding: '12px 24px' }} color='aboutText'>
              {t(`Hexa Finity will continue decreasing the total supply of Hexa Finity tokens with the help of a weekly burning mechanism, which should in turn increase the value of the token in the long run.`)}
            </Text>
            <Flex alignItems="center" justifyContent="space-between" flexDirection={['column', 'column', 'column', 'row']}>
              <StepContainer>
                {steps.map((step) => (
                  <StepCard key={step.label} step={step} />
                ))}
              </StepContainer>
              <BurnContainer>
                <BurnStyledCard>
                  <img src='/img/about_hf/mechanism.png' alt='mechanism' />
                  <Flex mt="24px" alignItems='center'>
                    <img src='/img/about_hf/burner-icon.png' alt='burn-icon' style={{width: '12px', height: '18px'}} />
                    <Text ml='8px'>{t('Burned')}</Text>
                  </Flex>
                  <Heading>600 369 628</Heading>
                  <div style={{ textAlign: 'center', paddingTop: 24 }}>
                    <Link href="/swap" passHref prefetch={false}>
                      <ButtonCustom
                        buttonText={t('Check Burning History')}
                        isIcon={false}
                        style={{
                          boxShadow: 'none',
                          background: 'var(--colors-heroRedButton)',
                        }}
                      />
                    </Link>
                  </div>
                </BurnStyledCard>

              </BurnContainer>
            </Flex>

          </Box>
        </Flex>
      </Container>
    </StyledHero>
  )
}

export default Mechanism
