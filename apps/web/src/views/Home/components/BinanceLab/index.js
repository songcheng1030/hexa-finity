import { useEffect, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { ArrowForwardIcon, Button, Text, Link } from '@pancakeswap/uikit'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@pancakeswap/uikit'

const BinanceLabPage = styled.div`
  margin: 0;
  background: linear-gradient(80.63deg, #041647 49.98%, #000000 89.8%);
  border-radius: 20px;
  padding: 30px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 50px 0 50px 80px;
    margin: 30px 0 30px 0;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  justify-content: space-between;
  
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: unset;
  }
  
`

const Title = styled.div`
  color: #FFFFFF;
  font-size: 28px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    text-align: left;
    font-size: 32px;
    margin-top: 0px;
    margin-bottom: 20px;
  }
`

const Body = styled.div`
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 500;
  line-height: 26px;
  margin-bottom: 20px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    color: #FFFFFF;
    font-size: 18px;
    line-height: 26px;
    margin-bottom: 20px;
    text-align: left;
  }
`

const DetailButton = styled.div`
  display: flex;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: left;
  }
`

const ImgArea = styled.img`
  height: 96px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 160px;
  }
`

const BinanceLab = ({}) => {

  const { t } = useTranslation()
  const { isDesktop, isMobile } = useMatchBreakpoints()

  return (
    <BinanceLabPage>
      <Content>
        <div>
          <Title>
            {t('Our Strategic Investor')}
          </Title>
          <Body>
            Binance Labs, the venture capital and incubator of Binance, announced Strategic
            investment in Biswap. The synergy from two companies working together in
            tandem will bring new high-quality products & services, technology
            enhancement, and further worldwide expansion.
          </Body>
          <DetailButton>
            {/* <Link href={perpetualUrl} external> */}
            {isMobile? (
                <Button width="100%">
                  <Text color="invertedContrast" bold fontSize="14px" mr="4px">
                    {t('Details')}
                  </Text>
                  <ArrowForwardIcon color="invertedContrast" />
                </Button>
              ): (
                <Button >
                  <Text color="invertedContrast" bold fontSize="14px" mr="4px">
                    {t('Details')}
                  </Text>
                  <ArrowForwardIcon color="invertedContrast" />
                </Button>
              )}
            {/* </Link> */}
          </DetailButton>
        </div>
        <ImgArea src="/images/hexa/binanceLabs.png" />
      </Content>
    </BinanceLabPage>
  )
}

export default BinanceLab
