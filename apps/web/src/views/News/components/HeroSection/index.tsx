import styled, { keyframes } from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import {
  Image,
  Heading,
  Text,
  Button,
  Flex,
  Link,
  Box,
  useMatchBreakpoints,
  SearchInput,
  Input,
} from '@pancakeswap/uikit'

const HeroWapper = styled(Box)`
  padding-left: 0;
  padding-right: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 30px;
    padding-left: 16px;
    padding-right: 16px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 24px;
    padding-right: 24px;
  }
  margin-left: auto;
  margin-right: auto;
  max-width: 1600px;
`
const HeroView = styled.div`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
  }
  background: #001244;
`
const HeroContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`
const floatingStarsLeft = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(20px, 20px);
  }
  to {
    transform: translate(0, -0px);
  }
`
const floatingStarsRight = keyframes`
  from {
    transform: translate(0,  -0px);
  }
  50% {
    transform: translate(-20px, 20px);
  }
  to {
    transform: translate(0, 0px);
  }
`
const LeftDecorations = styled(Box)`
  width: 30%;
  height: 100%;
  position: absolute;
  display: none;
  left: 20px;
  & img {
    position: absolute;
  }

  & :nth-child(1) {
    animation: ${floatingStarsLeft} 3s ease-in-out infinite;
    animation-delay: 0.25s;
    width: 200px;
    height: 130px;
  }
  & :nth-child(2) {
    animation: ${floatingStarsRight} 3.5s ease-in-out infinite;
    animation-delay: 0.5s;
    width: 120px;
    height: 40px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & :nth-child(1) {
      left: 0%;
      top: 5%;
    }
    & :nth-child(2) {
      left: 20%;
      top: 58%;
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
    & :nth-child(1) {
      left: 0%;
      top: 5%;
      width: 220px;
      height: 160px;
    }
    & :nth-child(2) {
      left: 20%;
      top: 60%;
      width: 150px;
      height: 70px;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    & :nth-child(1) {
      left: 0%;
      top: 5%;
      width: 255px;
      height: 192px;
    }
    & :nth-child(2) {
      left: 40%;
      top: 68%;
      width: 189px;
      height: 105px;
    }
  }
`
const RightDecorations = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  right: 20px;
  & img {
    position: absolute;
  }

  & :nth-child(1) {
    animation: ${floatingStarsRight} 3s ease-in-out infinite;
    animation-delay: 0.25s;
    z-index: 10;
    width: 190px;
    height: 130px;
    left: 0%;
    top: 62%;
  }
  & :nth-child(2) {
    animation: ${floatingStarsLeft} 3.5s ease-in-out infinite;
    animation-delay: 0.5s;
    z-index: 10;
    left: 25%;
    top: 75%;
  }
  & :nth-child(3) {
    animation: ${floatingStarsLeft} 4s ease-in-out infinite;
    animation-delay: 0.75s;
    z-index: 10;
    width: 120px;
    height: 60px;
    right: 10%;
    top: 72%;
  }
  & :nth-child(4) {
    margin-top: -280px;
    width: 200px;
    height: 200px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & :nth-child(1) {
      left: 10%;
      top: 59%;
    }
    & :nth-child(2) {
      left: 37%;
      top: 69%;
    }
    & :nth-child(3) {
      right: 20%;
      top: 69%;
      width: 130px;
      height: 70px;
    }
    & :nth-child(4) {
      margin-top: -350px;
      width: 200px;
      height: 200px;
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    position: absolute;
    & :nth-child(1) {
      left: -30%;
      top: 52%;
      width: 220px;
      height: 150px;
    }
    & :nth-child(2) {
      left: 37%;
      top: 72%;
    }
    & :nth-child(3) {
      right: -10%;
      top: 65%;
      width: 140px;
      height: 80px;
    }
    & :nth-child(4) {
      margin-top: auto;
      width: auto;
      height: auto;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    & :nth-child(1) {
      left: -10%;
      top: 52%;
      width: auto;
      height: auto;
    }
    & :nth-child(2) {
      left: 37%;
      top: 72%;
    }
    & :nth-child(3) {
      right: -10%;
      top: 57%;
      width: auto;
      height: auto;
    }
  }
`
const SearchContent = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
  padding-bottom: 250px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 60px 0;
    padding-bottom: 300px;
    width: 70%;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 100px 0;
    width: 43%;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 140px 0;
  }
`
const SearchWrapper = styled.div`
  position: relative;
  padding-left: 15px;
  padding-right: 15px;
  > ${Text} {
    font-size: 12px;
  }
  width: 100%;
  margin-bottom: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: 0;
  }
`
const StyledSearchInput = styled(Input)`
  width: 100%;
  height: 53px;
  border-radius: 100px;
  padding-left: 58px;
  color: #000000;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 58px;
    padding-left: 57px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    height: 62px;
    padding-left: 57px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    height: 67px;
    padding-left: 60px;
  }
`
const SearchIcon = styled.div`
  position: absolute;
  left: 45px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
`
const Title = styled.div`
  margin-top: 30px;
  p {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 26px;
    line-height: 52px;
    color: #ffffff;
    text-align: center;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 28px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 32px;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      font-size: 35px;
    }
  }
`
const HeroSection = (props) => {
  const { t } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()

  return (
    <HeroWapper>
      <HeroView>
        <HeroContainer>
          <LeftDecorations display={['none', 'none', 'block']}>
            <img className="ball-9-0" src="/images/news/ball-9-0.png" alt="" />
            <img className="ball-9" src="/images/news/ball-9.png" alt="" />
          </LeftDecorations>
          <SearchContent>
            <SearchWrapper>
              <StyledSearchInput type="text" scale="md" placeholder="Search" />
              <SearchIcon>
                <img src="/images/news/search.png" alt="searchIcon" />
              </SearchIcon>
            </SearchWrapper>
            <Title>
              <p>
                <span style={{ color: '#F3BA2F' }}>1st DEX </span>with a 3 Type Referral system
              </p>
            </Title>
          </SearchContent>
          <RightDecorations display={['none', 'none', 'block']}>
            <img className="ball-9-0" src="/images/news/ball-9-0.png" width="255px" height="192px" alt="" />
            <img src="/images/news/ball-white.png" width="87px" height="66px" alt="" />
            <img className="ball-9-large" src="/images/news/ball-big.png" width="264px" height="146px" alt="" />
            <img src="/images/news/right-banner.png" alt="rightbanner" />
          </RightDecorations>
        </HeroContainer>
      </HeroView>
    </HeroWapper>
  )
}

export default HeroSection
