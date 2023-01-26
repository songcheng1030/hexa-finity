import { Box, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const StyledSwapContainer = styled(Flex)<{ $isChartExpanded: boolean }>`
  flex-shrink: 0;
  height: fit-content;
  padding: 0 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0 40px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    ${({ $isChartExpanded }) => ($isChartExpanded ? 'padding: 0 120px' : 'padding: 0 40px')};
  }
`

export const StyledInputCurrencyWrapper = styled(Box)`
  width: 674px;
  margin-top: 30px;
  @media (max-width: 674px) {
    width: 90vw;
  }
`

export const StyledHeaderTitle = styled.div`
  text-align: center;
  margin-bottom: 30px;
  h1 {
    font-size: 44px;
    font-weight: 600;
  }
  p {
    font-size: 18px;
    font-weight: 200;
    max-width: 662px;
    line-height: 1.4;
    margin-top: 15px;
  }
`
export const WithDrawArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 674px;
  height: 134px;
  padding: 30px;
  background: linear-gradient(to right, #ff022f 0%, #03175f 40%, #14a2f1 105%);
  border-radius: 20px;
  @media (max-width: 674px) {
    width: 90vw;
    flex-direction: column;
    padding: 20px;
  }
`

export const ContentIteamArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .leftArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(170, 190, 240, 0.3);
    padding: 12px 20px;
    border-radius: 5px;
    margin-left: 30px;
    color: white;
    font-size: 16px;
    font-weight: 500;
  }
  .leftArea:hover{
    cursor:pointer
  }
  @media (max-width: 674px) {
    justify-content: space-between;
    width: 100%;
  }
`

export const RightSideArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
      color: white;
      font-size: 16px;
      margin-right: 10px;
    }
  }
  h3 {
    font-size: 18px;
    color: white;
    margin-top: 5px;
  }
`
