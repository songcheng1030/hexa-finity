import styled, { ThemeConsumer } from 'styled-components'
import { Flex, Box } from '@pancakeswap/uikit'

export const CompetitionPage = styled.div`
  min-height: calc(100vh - 64px);
`

export const BannerFlex = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.xl} {
    padding-top: 10px;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  @media screen and (min-width: 1920px) {
    padding-top: 32px;
  }
`

export const BottomBunnyWrapper = styled(Box)`
  position: relative;
  z-index: 3;
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    position: relative;
    right: -66px;
    margin-left: -20px;
    width: 182px;
    height: 214px;
  }
`

export const colors = {
  background: '#041647',
  active: '#00C400',
  ended: 'rgb(249, 59, 93)',
  black: '#000',
  white: '#FFF',
  textFamily1: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400
  },
  textFamily2: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500
  },
  textFamily3: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600
  },
  text1: '#2F4DA0',
}