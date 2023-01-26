import styled from 'styled-components'
import { Box, Flex, Text, Heading, Link, Image, useMatchBreakpoints, Button } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

const SectionWapper = styled(Box)`
  padding-left: 10px;
  padding-right: 10px;
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
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 48.6%);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 32%);
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, 32.2%);
  }
`
const CardContainer = styled.div`
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
  background: #ffffff;
  box-shadow: 2px 14px 68px rgba(26, 35, 74, 0.11);
  :hover{
    box-shadow: 1px 10px 10px rgba(26, 35, 74, 0.11);
  }
  border-radius: 20px;
  padding: 22px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 23px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 25px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 28px;
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
const HeaderText = styled.div`
  margin-top: 60px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 90px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 110px;
  }
  .title {
    text-align: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    line-height: 39px;
    color: #000000;
  }
`
const ArticleItem: React.FC<React.PropsWithChildren<{ item: any }>> = ({ item }) => {
  const { t } = useTranslation()
  return (
    <CardContainer>
      <StyledItemCard width="100%">
        <Text className="name">{item.name}</Text>
      </StyledItemCard>
    </CardContainer>
  )
}

const ArticleSection: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const items: any[] = [
    {
      index: 0,
      name: `HexaFinity Space Agents Program | $10 000 in HEXA for March Winners!`,
    },
    {
      index: 1,
      name: 'FAQs About the Space Agents Program! | Find the Answer to Your Question!',
    },
    {
      index: 2,
      name: 'Guide to NFT Staking on HexaFinity! | Earn with HexaFinity NFTs & Robi Boosts!',
    },
    {
      index: 3,
      name: 'Fixed Staking on HexaFinity is Released | 1st DEX to Implement Exclusive Feature on BNB Chain!',
    },
    {
      index: 4,
      name: 'Fixed Staking on HexaFinity Coming Soon | HexaFinity x Binance Initiative!',
    },
    {
      index: 5,
      name: 'Monthly AMA Sessions with HexaFinity CEO | Engage in an Informative Dialogue!',
    },
    {
      index: 6,
      name: 'Monthly Spacewalk | $10 000 in HEXA Monthly!',
    },
    {
      index: 7,
      name: 'Space Mission | Up to $3 000 in HEXA per Affiliate!',
    },
    {
      index: 8,
      name: 'HEXA Locked Staking on Binance | Gain HEXA with Up to 143.25% APY!',
    },
    {
      index: 9,
      name: 'Squid NFT World V2.0 is Released! | Play & Win in Renewed HexaFinity GameFi!',
    },
    {
      index: 10,
      name: '$5 000 000 in HEXA for Affiliates | HexaFinity Space Agents Program is ON!',
    },
    {
      index: 11,
      name: 'Guide to NFT Staking on HexaFinity! | Earn with HexaFinity NFTs & Robi Boosts!',
    },
    {
      index: 12,
      name: 'Fixed Staking on HexaFinity is Released | 1st DEX to Implement Exclusive Feature on BNB Chain!',
    },
    {
      index: 13,
      name: 'Fixed Staking on HexaFinity Coming Soon | HexaFinity x Binance Initiative!',
    },
    {
      index: 14,
      name: 'Swap Referral Program is Activated! | Earn Up to 20% from Your Friends’ Swap Commission!',
    },
    {
      index: 15,
      name: 'HexaFinity DEX Metaverse | Incredible Expansion of Global Project!',
    },
    {
      index: 16,
      name: 'Prolific 10 Months of HexaFinity | Review March Report!',
    },
    {
      index: 17,
      name: 'Weekly Highlights from Robi | April 11–17',
    },
    {
      index: 18,
      name: 'HexaFinity x Beefy Finance Collaboration! Up to 300% APY Vaults with HexaFinity Liquidity!',
    },
    {
      index: 19,
      name: 'HexaFinity x OpenLeverage Collaboration!',
    },
    {
      index: 20,
      name: 'HexaFinity IDO Launchpad | Buy Potent Tokens First for HEXA!',
    },
    {
      index: 21,
      name: 'HexaFinity DEX Globalization | Powerful Expansion!',
    },
    {
      index: 22,
      name: 'HexaFinity Global Incentive Program for BSC Projects with $10 000 000 Fund!',
    },
    {
      index: 23,
      name: '🎯 Roadmap',
    },
    {
      index: 24,
      name: 'BetFury x HexaFinity Spring Entertainments | Over $140 000 Prize Pool!',
    },
    {
      index: 25,
      name: 'HEXA Locked Staking on Binance | Gain HEXA with Up to 143.25% APY!',
    },
    {
      index: 26,
      name: 'HEXA Season on Binance | $45 000 in HEXA Giveaway!',
    },
    {
      index: 27,
      name: 'HEXA Season on Binance | $100 000 in HEXA for Learn & Trade',
    },
    {
      index: 28,
      name: '$7 500 in BSW for the HexaFinity Comic Tourney | Create Art & Win HEXA!',
    },
    {
      index: 29,
      name: 'What is Decentralized Exchange (DEX) in DeFi? | Brief Guide about HexaFinity DEX',
    },
    {
      index: 30,
      name: 'HEXA Token Statistics | A Brief Guide to Track the Progress!',
    },
    {
      index: 31,
      name: 'Meet HEXA Token & Extensive its Utilities | Lucrative Offers for HEXA Holders!',
    },
    {
      index: 32,
      name: 'Providing Liquidity on HexaFinity | Benefits & Short Guide!',
    },
    {
      index: 33,
      name: 'Multi-type Referral Program | Earn With Your Friends on HexaFinity!',
    },
    {
      index: 34,
      name: 'HEXA Holder Pool | Passive Income & Key to Lucrative HexaFinity Features',
    },
  ]
  return (
    <SectionWapper width="100%">
      <HeaderText>
        <Text className="title">Promoted Articles</Text>
      </HeaderText>
      <ItemsContent>
        {items.map((item, index) => (
          <ArticleItem key={index} item={item} />
        ))}
      </ItemsContent>
    </SectionWapper>
  )
}

export default ArticleSection
