import { Heading, Flex, Text, Skeleton, ChartIcon, CommunityIcon, SwapIcon } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import useTheme from 'hooks/useTheme'
import { formatLocalisedCompactNumber } from '@pancakeswap/utils/formatBalance'
import useSWRImmutable from 'swr/immutable'
import IconCard, { IconCardData } from '../IconCard'
import StatCardContent from './StatCardContent'
import GradientLogo from '../GradientLogoSvg'
import styled from 'styled-components'

const MainArea = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
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
  height: 134px;
  border-radius: 12px;
  background-color: #041647;
  width: 49.5%;
  padding: 20px;
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

const Stats = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const { data: tvl } = useSWRImmutable('tvl')
  const { data: txCount } = useSWRImmutable('totalTx30Days')
  const { data: addressCount } = useSWRImmutable('addressCount30Days')
  const trades = formatLocalisedCompactNumber(txCount)
  const users = formatLocalisedCompactNumber(addressCount)
  const tvlString = tvl ? formatLocalisedCompactNumber(tvl) : '-'

  const tvlText = t('And those users are now entrusting the platform with over $%tvl% in funds.', { tvl: tvlString })
  const [entrusting, inFunds] = tvlText.split(tvlString)

  const UsersCardData: IconCardData = {
    icon: <CommunityIcon color="secondary" width="36px" />,
  }

  const TradesCardData: IconCardData = {
    icon: <SwapIcon color="primary" width="36px" />,
  }

  const StakedCardData: IconCardData = {
    icon: <ChartIcon color="failure" width="36px" />,
  }

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column" padding="0px">
      <MainArea>
        <ItemArea>
          <LeftIteam>
            <img src="/images/lastesFeeImage.png" alt="lastesFeeImage" />
            <div>
              <p>The Lowest Trade Fee in the DeFi Space</p>
              <h2>0.1%</h2>
            </div>
          </LeftIteam>
          <LeftIteam>
            <img src="/images/feeReimImag.png" alt="lastesFeeImage" />
            <div>
              <p>Exchange Fee Reimbursement</p>
              <h2>up to 70%</h2>
            </div>
          </LeftIteam>
        </ItemArea>
        <ItemArea style={{ backgroundColor: '#2F4DA0' }}>
          <RightIteam>
            <img src="/images/binanceImage.png" alt="lastesFeeImage" />
            <div>
              <p>Total Value Locked</p>
              <h2>$948 561 357</h2>
            </div>
          </RightIteam>
          <RightIteam>
            <div>
              <p>Total Trading Volume</p>
              <h2>$47721756347</h2>
            </div>
          </RightIteam>
        </ItemArea>
        {/* <IconCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t('%users% users', { users })}
            bodyText={t('in the last 30 days')}
            highlightColor={theme.colors.secondary}
          />
        </IconCard>
        <IconCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t('%trades% trades', { trades })}
            bodyText={t('made in the last 30 days')}
            highlightColor={theme.colors.primary}
          />
        </IconCard>
        <IconCard {...StakedCardData}>
          <StatCardContent
            headingText={t('$%tvl% staked', { tvl: tvlString })}
            bodyText={t('Total Value Locked')}
            highlightColor={theme.colors.failure}
          />
        </IconCard> */}
      </MainArea>
    </Flex>
  )
}

export default Stats
