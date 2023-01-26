import styled from 'styled-components'
import { ArrowForwardIcon, Button, Text, Link, useMatchBreakpoints } from '@pancakeswap/uikit'
import PageSection from 'components/PageSection'
import { useAccount } from 'wagmi'
import { useMemo, useEffect } from 'react'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
import { PageMeta } from 'components/Layout/Page'
import { useTranslation } from '@pancakeswap/localization'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { ChainId } from '@pancakeswap/sdk'
import Hero from './components/Hero'
import { swapSectionData, earnSectionData, cakeSectionData } from './components/SalesSection/data'
import MetricsSection from './components/MetricsSection'
import SalesSection from './components/SalesSection'
import WinSection from './components/WinSection'
import FarmsPoolsRow from './components/FarmsPoolsRow'
import Footer from './components/Footer'
import CakeDataRow from './components/CakeDataRow'
import { WedgeTopLeft, InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopRight } from './components/WedgeSvgs'
import UserBanner from './components/UserBanner'
import MultipleBanner from './components/Banners/MultipleBanner'
import { perpLangMap } from 'utils/getPerpetualLanguageCode'
import { perpTheme } from 'utils/getPerpetualTheme'
import RotateSection from './components/RotateSection'
import FarmsPoolsTables from './components/FarmsPoolsTables'
import OurBenefit from './components/OurBenefit'
import BenefitTotal from './components/BenefitTotal'
import Resources from './components/Resources/index'
import Exchanges from './components/Exchanges'
import Partners from './components/Partners'
import BinanceLab from './components/BinanceLab'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 30px;
  }
`

const UserBannerWrapper = styled(Container)`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding-left: 0px;
  padding-right: 0px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const TradeView = styled.div`
  width: 100%;
  height: 250px;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  background: #001244;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 400px;
  }
`

const TradeLeftArea = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  line-height: 1.2;
  h2 {
    font-size: 24px;
    font-family: Poppins;
    font-weight: 400;
    color: white;
  }
  p {
    font-size: 10px;
    font-family: Poppins;
    font-weight: 400;
    margin-top: 10px;
    color: white;
    opacity: 0.7;
    margin-bottom: 25px;
  }
  img {
    display: flex;
    position: absolute;
    right: 0px;
    top: 0px;
    opacity: 0.4;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    h2 {
      font-size: 34px;
    }
    p {
      font-size: 13px;
    }
    img {
      display: none;
      width: 50px;
    }
  }
`
const TradeRightArea = styled.div`
  flex-direction: column;
  flex: 1;
  display: none;
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
  }
`
const BackgroundSection = styled.div`
  background-color: #DAE4FF;
  padding: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 30px;
  }
`

const Home: React.FC<React.PropsWithChildren> = () => {
  const { theme } = useTheme()
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()
  const {
    t,
    currentLanguage: { code },
  } = useTranslation()
  const { isDesktop, isMobile } = useMatchBreakpoints()
  const { isDark } = useTheme()

  const HomeSectionContainerStyles = { margin: '0', width: '100%', backgroundColor: '#DAE4FF', padding: 0 }

  const perpetualUrl = useMemo(
    () => `https://perp.pancakeswap.finance/${perpLangMap(code)}/futures/BTCUSDT?theme=${perpTheme(isDark)}`,
    [code, isDark],
  )

  return (
    <>
      <PageMeta />
      <style jsx global>{`
        #home-1 .page-bg {
          /* background: linear-gradient(139.73deg, #e6fdff 0%, #f3efff 100%); */
        }
        [data-theme='dark'] #home-1 .page-bg {
          /* background: radial-gradient(103.12% 50% at 50% 50%, #21193a 0%, #191326 100%); */
        }
        #home-2 .page-bg {
          /* background: linear-gradient(180deg, #ffffff 22%, #d7caec 100%); */
        }
        [data-theme='dark'] #home-2 .page-bg {
          /* background: linear-gradient(180deg, #09070c 22%, #201335 100%); */
        }
        #home-3 .page-bg {
          /* background: linear-gradient(180deg, #6fb6f1 0%, #eaf2f6 100%); */
        }
        [data-theme='dark'] #home-3 .page-bg {
          /* background: linear-gradient(180deg, #0b4576 0%, #091115 100%); */
        }
        /* #home-4 .inner-wedge svg {
          fill: #d8cbed;
        }
        [data-theme='dark'] #home-4 .inner-wedge svg {
          fill: #201335;
        } */
      `}</style>
      <StyledHeroSection
        innerProps={{ style: { margin: '0', width: '100%', paddingBottom: 0 } }}
        containerProps={{
          id: 'home-1',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        {/* {account && chainId === ChainId.BSC && (
          <UserBannerWrapper>
            <UserBanner />
          </UserBannerWrapper>
        )} */}
        <TradeView>
          <TradeLeftArea>
            <img src="/images/home/banner.png" width="300" alt="banner" />
            <h2>
              The <span style={{ color: '#F7931A' }}>First DEX on BSC</span> variable fees as low as 0%, along with trading rewards.
            </h2>
            <p>Enjoy profitable yield farming and exchanging with the lowest fees in DeFi space!</p>
            <Link href={perpetualUrl} external>
              <Button>
                <Text color="invertedContrast" bold fontSize="16px" mr="4px">
                  {t('Trade Now')}
                </Text>
                <ArrowForwardIcon color="invertedContrast" />
              </Button>
            </Link>
          </TradeLeftArea>
          <TradeRightArea>
            <img src="/images/home/banner.png" alt="banner" style={{position: 'absolute', top: 0}} />          
            <img src="/images/home/ellipse.png" alt="ellipse" />          
          </TradeRightArea>
        </TradeView>
        {/* <Hero /> */}
      </StyledHeroSection>
      <PageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home-2',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <MetricsSection />
        <RotateSection />
        <MultipleBanner />
      </PageSection>

{/* ----------- Frams and Pools Section ------------------- */}
      <PageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home-3',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <FarmsPoolsTables />
      </PageSection>

{/* ----------- Our Benifit Section ------------------- */}
      <PageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home-4',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <OurBenefit />
      </PageSection>
      <PageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home-4',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <BenefitTotal />
      </PageSection>
      <BackgroundSection>
        <PageSection
          innerProps={{ style: { margin: '0', width: '100%', background: '#DAE4FF'} }}
          index={2}
          hasCurvedDivider={false}
        >
          <Resources />
        </PageSection>
        <PageSection
          innerProps={{ style: { margin: '0', width: '100%', background: '#DAE4FF' } }}
          index={2}
          hasCurvedDivider={false}
        >
          <BinanceLab />
        </PageSection>
        <PageSection
          innerProps={{ style: { margin: '0', width: '100%', background: '#DAE4FF' } }}
          index={2}
          hasCurvedDivider={false}
        >
          <Exchanges />
        </PageSection>
        <PageSection
          innerProps={{ style: { margin: '0', width: '100%', background: '#DAE4FF' } }}
          index={2}
          hasCurvedDivider={false}
        >
          <Partners />
        </PageSection>
      </BackgroundSection>
    </>
  )
}

export default Home
