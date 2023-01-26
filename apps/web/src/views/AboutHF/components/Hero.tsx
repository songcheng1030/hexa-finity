import { Box, Button, Flex, Heading, Text, ProposalIcon } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import Container from 'components/Layout/Container'
import Link from 'next/link'
import ButtonCustom from 'views/Lottery/components/ButtonCustom'

const StyledHero = styled(Box)`
  background: ${({ theme }) => theme.colors.heroBackground};
  padding-bottom: 32px;
  padding-top: 32px;
  font-family: 'Poppins';
  font-style: normal;
  background-image: url(/img/about_hf/hero-back.png);
  background-repeat: no-repeat;
  background-position: right;
  background-size: contain;
`
const HeroImgWrap = styled.div`
  text-align: center;
  display: none;
  padding: 24px 0;

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`
const Hero = () => {
  const { t } = useTranslation()

  return (
    <StyledHero>
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <Box pr="32px" style={{ flex: 3 }}>
            <Heading as="h1" scale="xl" color="white" mb="16px">
              {t('What is Hexa Finity?')}
            </Heading>
            <Text mb="16px" style={{ color: '#FFF', fontSize: 14 }}>
              {t('Hexa Finity is a popular utility token with a huge user base that supports the Biswap ecosystem. Apart from being able to trade Hexa Finity token, you can also make use of a wide variety additional benefits that come along with it.')}
            </Text>
            <Link href="/swap" passHref prefetch={false}>
              <ButtonCustom
                buttonText={t('Buy Hexa Finity')}
                isIcon={false}
                style={{
                  boxShadow: 'none',
                  background: 'var(--colors-heroRedButton)',
                  marginRight: '12px',
                  marginTop: '12px',
                }}
              />
            </Link>
            <Link href="/swap" passHref prefetch={false} style={{padding: '0 24px'}}>
              <ButtonCustom
                buttonText={t('Integrate Hexa Finity')}
                isIcon={true}
                endIcon={<div>+</div>}
                style={{
                  boxShadow: 'none',
                  background: 'var(--colors-primary)',
                  marginRight: '12px',
                  marginTop: '12px',
                }}
              />
            </Link>
          </Box>
          <HeroImgWrap style={{ flex: 2 }}>
            <img src="/img/about_hf/hero-logo.png" alt='hero-logo' />
          </HeroImgWrap>
        </Flex>
      </Container>
    </StyledHero>
  )
}

export default Hero
