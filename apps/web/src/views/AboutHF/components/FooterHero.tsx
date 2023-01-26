import { Box, Button, Flex, Heading, Text, ProposalIcon } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import Container from 'components/Layout/Container'
import Link from 'next/link'
import ButtonCustom from 'views/Lottery/components/ButtonCustom'

const StyledHero = styled(Box)`
  background: #AABEF0;
  padding-bottom: 32px;
  padding-top: 32px;
  font-family: 'Poppins';
  font-style: normal;
`
const HeroImgWrap = styled.div`
  text-align: center;
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
  img {
    width: 90%;
  }
`
const FooterHero = () => {
  const { t } = useTranslation()
  return (
    <StyledHero>
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <Box style={{ flex: 3, paddingTop: 24, paddingBottom: 24 }}>
            <Heading mb="16px" style={{fontSize: '24px', color: '#000'}}>
              {t('Want to Integrate Hexa Finity Token Into Your Platform / Service?')}
            </Heading>
            <Text mb="16px" color='aboutText' style={{fontSize: 14}}>
              {t('Get in touch with us via')}&nbsp;<span style={{fontWeight: 'bold'}}>cooperation@hexafinity.org</span>&nbsp;
              {t('and the team will carefully analyze the possibility of connecting your product with the user base of more than 46,000 BSW holders. The best products based on our initial review will be added to the list of BSW Token Opportunities and will get the marketing boost in the form of promotion across our social media profiles accounting for more than 130,000 users.')}
            </Text>
          </Box>
          <HeroImgWrap style={{ flex: 1 }}>
            <img src="/img/launchpools/hero-back-2.png" alt='hero-logo' />
          </HeroImgWrap>
        </Flex>
      </Container>
    </StyledHero>
  )
}

export default FooterHero
