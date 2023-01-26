import { useEffect, useState } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'

const PartnersPage = styled.div`
  margin: 10px 0 10px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 20px 0 30px 0;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    margin: 30px 0 40px 0;
  }
`

const Title = styled.div`
  text-align: center;
  font-size: 26px;
  color: #000000;
  font-weight: 600;
  line-height: 39px;
  margin-bottom: 20px;  
`

const PartnersList = styled.div`
  grid-gap: 10px;
  display: grid;
  grid-template-columns: repeat(2, auto);

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(3, auto);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(6, auto);
  }
`

const CardItem = styled.div`
  flex: 25%;
  border-radius: 10px;
  border: 1px solid rgba(121, 141, 198, 0.4);
  padding: 10px 30px;

  @media (max-width: 674px) {
    flex: 100%;
  }

`

const Partners = ({}) => {

  const { t } = useTranslation()

  const partners = [
    {
      img: "/images/hexa/exchanges/Exchanges7.png"
    },
    {
      img: "/images/hexa/exchanges/Exchanges8.png"
    },
    {
      img: "/images/hexa/exchanges/Exchanges9.png"
    },
    {
      img: "/images/hexa/exchanges/Exchanges10.png"
    },
    {
      img: "/images/hexa/exchanges/Exchanges11.png"
    },
    {
      img: "/images/hexa/exchanges/Exchanges12.png"
    },
  ]

  return (
    <PartnersPage>
      <Title>
        HexaFinity Partners
      </Title>
      <PartnersList>
        {partners.map(function (item, index) {
          return (
            <CardItem key={index}>
              <img style={{height: 37}} src={item.img} />
            </CardItem>
          )
        })}
       </PartnersList>
    </PartnersPage>
  )
}

export default Partners
