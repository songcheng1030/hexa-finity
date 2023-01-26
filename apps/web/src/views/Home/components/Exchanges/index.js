import { useEffect, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

const ExchangesPage = styled.div`
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

const ExchangesList = styled.div`
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

const Exchanges = ({}) => {

  const { t } = useTranslation()

  const exchanges = [
    {
      img: "/images/hexa/exchanges/Exchanges1.png"
    },
    {
      img: "/images/hexa/exchanges/Exchanges2.png"
    },
    {
      img: "/images/hexa/exchanges/Exchanges3.png"
    },
    {
      img: "/images/hexa/exchanges/Exchanges4.png"
    },
    {
      img: "/images/hexa/exchanges/Exchanges5.png"
    },
    {
      img: "/images/hexa/exchanges/Exchanges6.png"
    },
  ]

  return (
    <ExchangesPage>
      <Title>
        Exchanges
      </Title>
      <ExchangesList>
        {exchanges.map(function (item, index) {
          return (
            <CardItem key={index}>
              <img style={{height: 37}} src={item.img} />
            </CardItem>
          )
        })}
       </ExchangesList>
    </ExchangesPage>
  )
}

export default Exchanges
