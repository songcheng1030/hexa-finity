import styled from 'styled-components'
import { Box, Flex, Text, Heading, Link, Image, useMatchBreakpoints, Button } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

const SectionWapper = styled(Box)`
  padding-left: 15px;
  padding-right: 15px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 20px;
    padding-right: 20px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 0;
    padding-right: 0;
  }
`
const ItemsContent = styled(Flex)`
  width: 100%;
  align-items: center;
  grid-gap: auto;
  display: grid;
  grid-template-columns: repeat(1, 100%);
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, 32.2%);
  }
`
const CardContainer = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 17px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 21px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 24px;
  }
`
const StyledItemCard = styled(Box)`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    gap: 40px;
    margin-bottom: 20px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    gap: 60px;
    margin-bottom: 30px;
  }
  .name {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;
    color: #2f4da0;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 14px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 15px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      font-size: 16px;
    }
  }
`
const HeaderContent = styled.div`
  display: flex;
  display-direction: row;
  justify-content: space-between;
  margin-top: 60px;
  margin-bottom: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 90px;
    margin-bottom: 30px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 110px;
    margin-bottom: 40px;
  }
  .title {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 26px;
    }
    line-height: 39px;
    color: #000000;
  }
`
const LeftCard = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 2px 14px 68px rgba(26, 35, 74, 0.11);
  border-radius: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
`
const RightCard = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    justify-content: space-between;
    .plan {
      width: 20px;
      height: 20px;
    }
    .more {
      width: 20px;
      height: 20px;
    }
    .last-time {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #2f4da0;
      margin-left: 10px;
    }
  }
  .title {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 33px;
    color: #061e63;
  }
  .content {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #2f4da0;
  }
`
const SeeMoreButton = styled(Button)`
  background: #11A9FF;
  width: 100px;
  height: 34px;
  color: #FFFFFF;
  margin-left: 15px;
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
    width: 131px;
    height: 54px;
  }
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  padding: 0;
`
const ArticleItem: React.FC<React.PropsWithChildren<{ item: any }>> = ({ item }) => {
  const { t } = useTranslation()
  return (
    <CardContainer>
      <StyledItemCard width="100%">
        <LeftCard>
          <img src="/images/news/logo.png" alt="logo" />
        </LeftCard>
        <RightCard>
          <div className="first-line">
            <div>
              <img className="plan" src={item.planImage} alt="plan" />
              <Text className="last-time">{item.lastTime}</Text>
            </div>
            <div>
              <img className="more" src={item.moreImage} alt="more" />
              <Text style={{ paddingLeft: '10px' }}>0</Text>
            </div>
          </div>
          <Text className="title">{item.title}</Text>
          <Text className="content">{item.content}</Text>
        </RightCard>
      </StyledItemCard>
    </CardContainer>
  )
}

const ActivitySection: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const items: any[] = [
    {
      index: 0,
      planImage: '/images/news/plan.png',
      lastTime: 'Article created 2 days ago',
      moreImage: '/images/news/more.png',
      title: 'HexaFinity Weekly Highlights',
      content: `Weekly Highlights from Robi | April 11–17`,
    },
    {
      index: 1,
      planImage: '/images/news/plan.png',
      lastTime: 'Article created 4 days ago',
      moreImage: '/images/news/more.png',
      title: 'How to earn with HexaFinity Core Products',
      content: `Providing Liquidity on HexaFinity | Benefits & Short Guide!`,
    },
    {
      index: 2,
      moreImage: '/images/news/more.png',
      lastTime: 'Article created 2 days ago',
      planImage: '/images/news/plan.png',
      title: 'HexaFinity Collaborations',
      content: `HexaFinity x Beefy Finance Collaboration! 
      Up to 300% APY Vaults with HexaFinity 
      Liquidity!`,
    },
    {
      index: 3,
      planImage: '/images/news/plan.png',
      lastTime: 'Article created 2 days ago',
      moreImage: '/images/news/more.png',
      title: 'HexaFinity Weekly Highlights',
      content: `Weekly Highlights from Robi | April 11–17`,
    },
    {
      index: 4,
      planImage: '/images/news/plan.png',
      lastTime: 'Article created 4 days ago',
      moreImage: '/images/news/more.png',
      title: 'How to earn with HexaFinity Core Products',
      content: `Providing Liquidity on HexaFinity | Benefits & Short Guide!`,
    },
    {
      index: 5,
      planImage: '/images/news/plan.png',
      lastTime: 'Article created 2 days ago',
      moreImage: '/images/news/more.png',
      title: 'HexaFinity Collaborations',
      content: `HexaFinity x Beefy Finance Collaboration! 
      Up to 300% APY Vaults with HexaFinity 
      Liquidity!`,
    },
  ]
  return (
    <SectionWapper width="100%">
      <HeaderContent>
        <Text className="title">Recent activity</Text>
        <SeeMoreButton>{t('See More')}</SeeMoreButton>
      </HeaderContent>
      <ItemsContent>
        {items.map((item, index) => (
          <ArticleItem key={index} item={item} />
        ))}
      </ItemsContent>
    </SectionWapper>
  )
}

export default ActivitySection
