import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { Image, Heading, Text, Button, Flex, Link, Box, useMatchBreakpoints } from '@pancakeswap/uikit'

const LunchWrapper = styled.div`
  width: 100%;
  align-items: center;
  grid-gap: 15px;
  display: grid;
  grid-template-columns: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 60% 30%;
    padding-top: 70px;
    padding-bottom: 50px;
  }
`
const LunchLeftArea = styled.div`
  line-height: 1.2;
  z-index: 20;
  h2 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 39px;
    color: #000000;
  }
  p {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 26px;
    color: #061e63;
    margin-top: 12px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    h2 {
      font-size: 26px;
    }
    p {
      font-size: 16px;
    }
  }
`
const LunchRightArea = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0;
  flex: 1;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 52px;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
`

const LunchSection = (props) => {
  const { t } = useTranslation()

  return (
    <LunchWrapper>
      <LunchLeftArea>
        <h2>Launch Your Project on Hexa Finity!</h2>
        <p>
          Farms stimulate users to provide liquidity for your trading pair by distributing HEXA tokens to your pair’s LP
          token holders. Launchpool is a platform where a project owner can distribute tokens to BNB users who stake
          HEXA tokens in the pool. When a project applies for Hexa Finity Launchpool we can also create a new farming
          pair (subject to discussion). Hexa Finity Launchpool and Farms are platforms that help project teams promote
          their token and get exposure to thousands of active Hexa Finity users across the globe. We look for strong
          teams with clear and innovative vision in the crypto space. If you think you are one of the projects, do not
          wait any longer and apply below.
        </p>
        <div style={{ marginTop: '22px' }}>
          <Button style={{ width: '199px', height: '54px', background: '#F93B5D' }}>
            <Text color="invertedContrast" bold fontSize="16px" mr="10px">
              {t('Apply to Lunch')}
            </Text>
            <Image src="/images/farms/lunch.png" alt="lunch" width={14} height={14} />
          </Button>
        </div>
      </LunchLeftArea>
      <LunchRightArea>
        <img src="/images/farms/lunch-image.png" alt="perpetual" />
      </LunchRightArea>
    </LunchWrapper>
  )
}

export default LunchSection
