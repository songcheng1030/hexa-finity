import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { Image, Heading, Text, Button, Flex, Link, Box, useMatchBreakpoints } from '@pancakeswap/uikit'
import Container from 'components/Layout/Container'

const HeroWapper = styled(Box)`
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 16px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 30px;
  }
  margin-left: auto;
  margin-right: auto;
  max-width: 1600px;
`
const HeroView = styled.div`
  width: 100%;
  padding-top: 40px;
  padding-bottom: 40px;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  background: #001244;
`
const HeroContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`
const HeroLeftArea = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  line-height: 1.2;
  h2 {
    font-size: 33px;
    font-family: 'Poppins';
    font-weight: 500;
    line-height: 64px;
    color: #ffffff;
  }
  p {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 30px;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 7px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    h2 {
      font-size: 43px;
    }
    p {
      font-size: 17px;
    }
  }
`
const HeroRightArea = styled.div`
  flex-direction: column;
  flex: 1;
  display: none;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
  }
`

const HeroSection = (props) => {
  const { t } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  
  if (!isTablet && !isMobile) {
    return (
      <HeroWapper px={['16px', '24px']}>
        <HeroView>
          <HeroContainer>
            <HeroLeftArea>
              <h2>{t('Farms')}</h2>
              <p>
                {t('Hexa Finity Farms offer multiple farming opportunities to you. Get double rewards by staking your LP tokens in return for additional HEXA tokens and earning high income from swap transactions.')}
                <Link external ellipsis href="/" style={{ display: 'inline', color: '#11A9FF' }}>
                  {t('Learn how to start')}
                </Link>
              </p>
              <div style={{ marginTop: '30px' }}>
                <Button width={199} height={54}>
                  <Text color="invertedContrast" bold fontSize="16px" mr="10px">
                    {t('Add project')}
                  </Text>
                  <Image src="/images/farms/add.png" alt="add" width={12} height={12} />
                </Button>
              </div>
            </HeroLeftArea>
            <HeroRightArea>
              <img src="/images/farms/banner.png" alt="perpetual" />
            </HeroRightArea>
          </HeroContainer>
        </HeroView>
      </HeroWapper>
    )
  }

  return (
    <HeroWapper px={['16px', '24px']} style={{paddingLeft: 0, paddingRight: 0}}>
      <HeroView style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}}>
        <HeroContainer>
          <HeroLeftArea>
            <h2>Farms</h2>
            <p>
              Hexa Finity Farms offer multiple farming opportunities to you. Get double rewards by staking your LP
              tokens in return for additional HEXA tokens and earning high income from swap transactions.{' '}
              <Link external ellipsis href="/" style={{ display: 'inline', color: '#11A9FF' }}>
                Learn how to start
              </Link>
            </p>
            <div style={{ marginTop: '30px' }}>
              <Button width={199} height={54}>
                <Text color="invertedContrast" bold fontSize="16px" mr="10px">
                  {t('Add project')}
                </Text>
                <Image src="/images/farms/add.png" alt="add" width={12} height={12} />
              </Button>
            </div>
          </HeroLeftArea>
          <HeroRightArea>
            <img src="/images/farms/banner.png" alt="perpetual" />
          </HeroRightArea>
        </HeroContainer>
      </HeroView>
    </HeroWapper>
  )
}

export default HeroSection
