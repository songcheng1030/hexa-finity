import styled from 'styled-components'
import { useAccount } from 'wagmi'
import {
  Flex, Image, Text, CustomFlexLayout, PageHeader, Loading, Pool, Box,
  CustomButtonMenu, ButtonMenuItem, NextLinkFromReactRouter, TokenPoolImage
} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { usePoolsPageFetch, usePoolsWithVault } from 'state/pools/hooks'
import Page from 'components/Layout/Page'
import { Token } from '@pancakeswap/sdk'
import { TokenPairImage, getImageUrlFromToken } from 'components/TokenImage'
import CardActions from './components/PoolCard/CardActions'
import AprRow from './components/PoolCard/AprRow'
import CardFooter from './components/PoolCard/CardFooter'
import CakeVaultCard from './components/CakeVaultCard'
import PoolControls from './components/PoolControls'
import { StakingApy } from './components/CakeVaultCard/StakingApy'
import { colors } from './CustomColors'
import LaunchSection from './LaunchSection'
import LaunchGuideSection from './LaunchGuideSection'

const CardLayout = styled(CustomFlexLayout)`
  justify-content: center;
`
const PageHero = styled(PageHeader)`
  background-image: url(/img/launchpools/hero-back-0.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`
const HeroCard = styled(Box)`
  background-image: url(/img/launchpools/hero-back-3.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 20px;
  padding: 12px 24px;
  display: flex;
  margin: 32px 0;
  #hero-card-image {
    display: none;
    ${({ theme }) => theme.mediaQueries.sm} {
      display: initial;
    }
  }
`
const HeroButtonWrap = styled.div`
  padding-top: 48px;
  a {
    padding: 12px 24px;
    background: var(--colors-primary);
    color: white;
    border-radius: 12px;
    cursor: pointer;
    :hover {
      background: #11a9ffe6;
    }
  }
`
const HeroTabWrap = styled.div`
  position: absolute;
  bottom: 0;
`
const HeroTabItemActive = styled(ButtonMenuItem)`
  background: #F79726;
  color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 12px 24px;
`
const HeroTabItemDisable = styled(ButtonMenuItem)`
  background: transparent;
  color: white;
  padding: 12px 24px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`
const PageBody = styled.div`
  background: #ECF1FF;
`
const Pools: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { pools, userDataLoaded } = usePoolsWithVault()

  usePoolsPageFetch()

  return (
    <>
      <PageHero background='#041647'>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]} justifyContent='center'>
            <Text fontSize='43px' color="white" mb="24px">
              {t('Launchpools')}
            </Text>
            <Text color="white" fontSize='16px'>
              {t('Looking for a less resource-intensive alternative to mining? Use your HEXA tokens to earn more tokens, for Free. ')}
              <a style={{ color: colors.primary, cursor: 'target' }} href='/how-it-works'>{t('Learn how it works')}</a>
            </Text>
            <HeroButtonWrap>
              <a href='#launchpool-section'>{t('Add Project')} &nbsp; +</a>
            </HeroButtonWrap>
          </Flex>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]} justifyContent='center'>
            <HeroCard>
              <Flex flex='1' flexDirection='column'>
                <Text style={{ ...colors.textFamily3, color: colors.heroTitle, fontSize: 32 }}>{t('Earn Up to 20%')}</Text>
                <Text style={{ ...colors.textFamily1, color: colors.white, fontSize: 18 }}>{t('From invited friends')}</Text>
                <Flex mt='12px'>
                  <img src='/img/launchpools/hero-arrow.svg' style={{ marginRight: 12 }} />
                  <Text style={{ ...colors.textFamily1, color: colors.white, fontSize: 16 }}>{t('Swaps’ Commission')}</Text>
                </Flex>
                <Flex>
                  <img src='/img/launchpools/hero-arrow.svg' style={{ marginRight: 12 }} />
                  <Text style={{ ...colors.textFamily1, color: colors.white, fontSize: 16 }}>{t('Farms')}</Text>
                </Flex>
                <Flex>
                  <img src='/img/launchpools/hero-arrow.svg' style={{ marginRight: 12 }} />
                  <Text style={{ ...colors.textFamily1, color: colors.white, fontSize: 16 }}>{t('Launchpools')}</Text>
                </Flex>
              </Flex>
              <Flex id='hero-card-image'>
                <img src='/img/launchpools/hero-logo.png' />
              </Flex>
            </HeroCard>
          </Flex>
        </Flex>
        <Flex flexDirection={['column', null, null, 'row']}>
          <HeroTabWrap>
            <CustomButtonMenu activeIndex={1} scale="sm" variant="subtle" backgroundColor='transparent' borderColor='transparent' borderWidth='0'>
              <HeroTabItemActive as={NextLinkFromReactRouter} to="/pools" replace>
                {t("Stake HEXA")}
              </HeroTabItemActive>
              <HeroTabItemDisable as={NextLinkFromReactRouter} to="/pools/history" replace>
                {t("Stake Tokens")}
              </HeroTabItemDisable>
            </CustomButtonMenu>
          </HeroTabWrap>

        </Flex>
      </PageHero>
      <PageBody>
        <Page style={{ minHeight: 200 }}>
          <PoolControls pools={pools}>
            {({ chosenPools, viewMode, stakedOnly, normalizedUrlSearch, showFinishedPools }) => (
              <>
                {account && !userDataLoaded && stakedOnly && (
                  <Flex justifyContent="center" mb="4px">
                    <Loading />
                  </Flex>
                )}
                <CardLayout>
                  {chosenPools.map((pool) =>
                    pool.vaultKey ? (
                      <CakeVaultCard key={pool.vaultKey} pool={pool} showStakedOnly={stakedOnly} />
                    ) : (
                      <Pool.PoolCard<Token>
                        key={pool.sousId}
                        pool={pool}
                        isStaked={Boolean(pool?.userData?.stakedBalance?.gt(0))}
                        cardContent={
                          account ? (
                            <CardActions pool={pool} stakedBalance={pool?.userData?.stakedBalance} />
                          ) : <></>
                        }
                        tokenPairImage={
                          <TokenPoolImage
                            primarySrc={getImageUrlFromToken(pool.earningToken)}
                            secondarySrc={getImageUrlFromToken(pool.stakingToken)}
                            width={92}
                            height={92}
                          />
                        }
                        cardFooter={<CardFooter pool={pool} account={account} />}
                        aprRow={<Flex flexDirection="row" style={{ padding: '12px 0 0 12px' }}>
                          <div style={{ flex: 1 }}><AprRow pool={pool} stakedBalance={pool?.userData?.stakedBalance} /></div>
                          <div style={{ flex: 1 }}></div>
                        </Flex>}
                      />
                    ),
                  )}
                </CardLayout>
              </>
            )}
          </PoolControls>
          <div id='launchpool-section'>
            <LaunchSection />
          </div>
        </Page>
      </PageBody>
      <PageBody style={{ background: '#DAE4FF' }}>
        <Page>
          <LaunchGuideSection />
        </Page>
      </PageBody>
    </>
  )
}

export default Pools
