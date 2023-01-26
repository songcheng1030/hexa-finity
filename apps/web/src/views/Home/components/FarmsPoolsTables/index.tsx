import { createContext } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import Pools from './Pools'
import Farms from './Farms/Farms'

const MainArea = styled.div`
  display: flex;
  flex: 1;
  align-items: start;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  @media screen and (max-width: 1070px) {
    flex-direction: column;
  }
`
const ItemArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border-radius: 12px;
  width: 49.5%;
  @media screen and (max-width: 1070px) {
    width: 100%;
    margin-bottom: 10px;
  }
`
const LeftIteam = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: row;
  width: 100%;
  div {
    display: flex;
    flex-direction: column;
    max-width: 190px;
    font-weight: 300;
    line-height: 1.3;
    margin-left: 10px;
  }
  img {
    width: 50px;
  }
  p {
    font-size: 16px;
    color: white;
  }
  h2 {
    font-size: 24px;
    color: #f3ba2f;
    font-weight: 400;
  }
  @media screen and (max-width: 560px) {
    img {
      width: 40px;
    }
    p {
      font-size: 12px;
      color: white;
    }
    h2 {
      font-size: 16px;
      color: #f3ba2f;
      font-weight: 400;
    }
  }
`
const RightIteam = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: row;
  width: 100%;
  img {
    width: 50px;
  }
  div {
    display: flex;
    flex-direction: column;
    font-weight: 300;
    line-height: 1.3;
    margin-left: 10px;
  }
  p {
    font-size: 16px;
    color: white;
    margin-bottom: 5px;
    max-width: 190px;
  }
  h2 {
    font-size: 26px;
    color: white;
    font-weight: 500;
    letter-spacing: 0px;
  }
  @media screen and (max-width: 560px) {
    img {
      width: 35px;
    }
    p {
      font-size: 12px;
      color: white;
    }
    h2 {
      font-size: 16px;
      color: #f3ba2f;
      font-weight: 400;
    }
  }
`

const FarmsPoolsTables: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()

  return (
    <MainArea>
      <ItemArea>
        <Farms />
      </ItemArea>
      <ItemArea>
        <Pools />
      </ItemArea>
    </MainArea>
  )
}

export const FarmsContext = createContext({ chosenFarms: [] })

export default FarmsPoolsTables
