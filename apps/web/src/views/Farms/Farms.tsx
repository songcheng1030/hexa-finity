import { useEffect, useCallback, useState, useMemo, useRef, createContext } from 'react'
import BigNumber from 'bignumber.js'
import { ChainId } from '@pancakeswap/sdk'
import { useAccount } from 'wagmi'
import {
  Image,
  Heading,
  Toggle,
  Text,
  Button,
  ArrowForwardIcon,
  Flex,
  Link,
  Box,
  Farm as FarmUI,
  Loading,
  SearchInput,
  OptionProps,
  FlexLayout,
  PageHeader,
  NextLinkFromReactRouter,
  Row,
  ButtonMenu,
} from '@pancakeswap/uikit'
import ButtonMenuItem from './components/ButtonMenuItem'
import { Select } from './components/FilterSelect'
import styled from 'styled-components'
import Page from 'components/Layout/Page'
import { useFarms, usePollFarmsWithUserData, usePriceCakeBusd } from 'state/farms/hooks'
import { useCakeVaultUserData } from 'state/pools/hooks'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { DeserializedFarm } from '@pancakeswap/farms'
import { useTranslation } from '@pancakeswap/localization'
import { getFarmApr } from 'utils/apr'
import orderBy from 'lodash/orderBy'
import { latinise } from 'utils/latinise'
import { useUserFarmStakedOnly, useUserFarmsViewMode } from 'state/user/hooks'
import { ViewMode } from 'state/user/actions'
import { useRouter } from 'next/router'
import { useActiveChainId } from 'hooks/useActiveChainId'
import Table from './components/FarmTable/FarmTable'
import { FarmWithStakedValue } from './components/types'
import Container from 'components/Layout/Container'
import HeroSection from './components/HeroSection'
import LunchSection from './components/LunchSection'
import ChooseSection from './components/ChooseSection'

const FarmsPage = styled(Box)`
  ${({ theme }) => theme.mediaQueries.md} {
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
const FarmsWrapper1 = styled.div`
  width: 100%;
  background: #ecf1ff;
  padding-bottom: 30px;
`
const FarmsWrapper2 = styled.div`
  width: 100%;
  background: #dae4ff;
  padding-top: 30px;
  padding-bottom: 30px;
`
const TableContainer = styled(Container)`
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
    margin-right: 0;
  }
`
const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 40px 0;
    margin-bottom: 0;
  }
`
const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;

  ${Text} {
    margin-left: 8px;
  }
`
const SearchWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
  width: 100%;
  margin-bottom: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 220px;
    margin-bottom: 0;
  }
`
const StyledSearchInput = styled(SearchInput)`
  font-size: 12px;
  height: 40px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
    height: 50px;
  }
`
const FilterSelect = styled(Select)`
  width: 100px;
  min-width: 100px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 127px;
    min-width: 127px;
  }
`
const FilterContainer = styled.div`
  align-items: center;
  width: 100%;
  padding: 8px 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    width: auto;
    padding: 0;
  }
`
const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  margin-bottom: 20px;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 0;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;
    > div {
      padding: 0;
    }
  }
`
const HarvestButton = styled(Button)`
  background: #aabef0;
  width: 117px;
  height: 40px;
  color: #041647;
  margin-left: 15px;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
  }
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  padding: 0;
`
const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`
const FinishedTextContainer = styled(Flex)`
  padding-bottom: 32px;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`
const FinishedTextLink = styled(Link)`
  font-weight: 400;
  white-space: nowrap;
  text-decoration: underline;
`
const StyledButtonMenu = styled(ButtonMenu)`
  display: flex;
  flex-wrap: wrap;
`
const NUMBER_OF_FARMS_VISIBLE = 12

const Farms: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { pathname, query: urlQuery } = useRouter()
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()
  const { data: farmsLP, userDataLoaded, poolLength, regularCakePerBlock } = useFarms()
  const cakePrice = usePriceCakeBusd()

  const [_query, setQuery] = useState('')
  const normalizedUrlSearch = useMemo(() => (typeof urlQuery?.search === 'string' ? urlQuery.search : ''), [urlQuery])
  const query = normalizedUrlSearch && !_query ? normalizedUrlSearch : _query

  const [viewMode, setViewMode] = useUserFarmsViewMode()
  const { address: account } = useAccount()
  const [sortOption, setSortOption] = useState('all')
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const chosenFarmsLength = useRef(0)

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived
  const [farmsIndex, setFarmsIndex] = useState(0)

  const handleFarmsClick = (newIndex: any) => setFarmsIndex(newIndex)

  useCakeVaultUserData()

  usePollFarmsWithUserData()

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(isActive)
  const [boostedOnly, setBoostedOnly] = useState(false)

  const activeFarms = farmsLP.filter(
    (farm) => farm.pid !== 0 && farm.multiplier !== '0X' && (!poolLength || poolLength > farm.pid),
  )
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')
  const archivedFarms = farmsLP

  const stakedOnlyFarms = activeFarms.filter(
    (farm) =>
      farm.userData &&
      (new BigNumber(farm.userData.stakedBalance).isGreaterThan(0) ||
        new BigNumber(farm.userData.proxy?.stakedBalance).isGreaterThan(0)),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) =>
      farm.userData &&
      (new BigNumber(farm.userData.stakedBalance).isGreaterThan(0) ||
        new BigNumber(farm.userData.proxy?.stakedBalance).isGreaterThan(0)),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) =>
      farm.userData &&
      (new BigNumber(farm.userData.stakedBalance).isGreaterThan(0) ||
        new BigNumber(farm.userData.proxy?.stakedBalance).isGreaterThan(0)),
  )

  const farmsList = useCallback(
    (farmsToDisplay: DeserializedFarm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceBusd) {
          return farm
        }

        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteTokenPriceBusd)
        const { cakeRewardsApr, lpRewardsApr } = isActive
          ? getFarmApr(
              chainId,
              new BigNumber(farm.poolWeight),
              cakePrice,
              totalLiquidity,
              farm.lpAddress,
              regularCakePerBlock,
            )
          : { cakeRewardsApr: 0, lpRewardsApr: 0 }

        return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }

      return farmsToDisplayWithAPR
    },
    [query, isActive, chainId, cakePrice, regularCakePerBlock],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)

  const chosenFarms = useMemo(() => {
    let chosenFs = []
    if (isActive) {
      chosenFs = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      chosenFs = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      chosenFs = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    if (boostedOnly) {
      chosenFs = chosenFs.filter((f) => f.boosted)
    }

    return chosenFs
  }, [
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    boostedOnly,
  ])

  const chosenFarmsMemoized = useMemo(() => {
    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr + farm.lpRewardsApr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        case 'latest':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.pid), 'desc')
        default:
          return farms
      }
    }

    return sortFarms(chosenFarms).slice(0, numberOfFarmsVisible)
  }, [chosenFarms, sortOption, numberOfFarmsVisible])

  chosenFarmsLength.current = chosenFarmsMemoized.length

  useEffect(() => {
    if (isIntersecting) {
      setNumberOfFarmsVisible((farmsCurrentlyVisible) => {
        if (farmsCurrentlyVisible <= chosenFarmsLength.current) {
          return farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE
        }
        return farmsCurrentlyVisible
      })
    }
  }, [isIntersecting])

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <FarmsContext.Provider value={{ chosenFarmsMemoized }}>
      <HeroSection />
      <FarmsPage>
        <FarmsWrapper1>
          <Container>
            <ControlContainer>
              <ViewControls>
                {/* <FarmUI.FarmTabButtons hasStakeInFinishedFarms={stakedInactiveFarms.length > 0} /> */}
                <StyledButtonMenu activeIndex={farmsIndex} onItemClick={handleFarmsClick}>
                  <ButtonMenuItem>{t('Live')}</ButtonMenuItem>
                  <ButtonMenuItem>{t('Main')}</ButtonMenuItem>
                  <ButtonMenuItem>{t('Innovation')}</ButtonMenuItem>
                  <ButtonMenuItem>{t('GameFi')}</ButtonMenuItem>
                  <ButtonMenuItem>{t('Archive')}</ButtonMenuItem>
                </StyledButtonMenu>
                <ToggleWrapper>
                  <Toggle
                    id="staked-only-farms"
                    checked={stakedOnly}
                    onChange={() => setStakedOnly(!stakedOnly)}
                    scale="sm"
                  />
                  <Text> {t('Staked only')}</Text>
                </ToggleWrapper>
              </ViewControls>
              <FilterContainer>
                <SearchWrapper style={{ marginRight: 15 }}>
                  <StyledSearchInput
                    initialValue={normalizedUrlSearch}
                    onChange={handleChangeQuery}
                    placeholder="Search Farms"
                  />
                </SearchWrapper>
                <div style={{ display: 'flex' }}>
                  <FilterSelect
                    options={[
                      {
                        label: t('All'),
                        value: 'all',
                      },
                      {
                        label: t('Hot'),
                        value: 'hot',
                      },
                      {
                        label: t('APR'),
                        value: 'apr',
                      },
                      {
                        label: t('Multiplier'),
                        value: 'multiplier',
                      },
                      {
                        label: t('Earned'),
                        value: 'earned',
                      },
                      {
                        label: t('Liquidity'),
                        value: 'liquidity',
                      },
                      {
                        label: t('Latest'),
                        value: 'latest',
                      },
                    ]}
                    onOptionChange={handleSortOptionChange}
                  />
                  <HarvestButton>{t('Harvest all')}</HarvestButton>
                </div>
              </FilterContainer>
            </ControlContainer>
            {isInactive && (
              <FinishedTextContainer>
                <Text fontSize={['16px', null, '20px']} color="failure" pr="4px">
                  {t("Don't see the farm you are staking?")}
                </Text>
                <Flex>
                  <FinishedTextLink href="/migration" fontSize={['16px', null, '20px']} color="failure">
                    {t('Go to migration page')}
                  </FinishedTextLink>
                  <Text fontSize={['16px', null, '20px']} color="failure" padding="0px 4px">
                    or
                  </Text>
                  <FinishedTextLink
                    external
                    color="failure"
                    fontSize={['16px', null, '20px']}
                    href="https://v1-farms.pancakeswap.finance/farms/history"
                  >
                    {t('check out v1 farms')}.
                  </FinishedTextLink>
                </Flex>
              </FinishedTextContainer>
            )}
          </Container>
          <Container>
            {viewMode === ViewMode.TABLE ? (
              <Table farms={chosenFarmsMemoized} cakePrice={cakePrice} userDataReady={userDataReady} />
            ) : (
              <FlexLayout>{children}</FlexLayout>
            )}
            {account && !userDataLoaded && stakedOnly && (
              <Flex justifyContent="center">
                <Loading />
              </Flex>
            )}
            {poolLength && <div ref={observerRef} />}
          </Container>
        </FarmsWrapper1>
      </FarmsPage>
    </FarmsContext.Provider>
  )
}

export const FarmsContext = createContext({ chosenFarmsMemoized: [] })

export default Farms
