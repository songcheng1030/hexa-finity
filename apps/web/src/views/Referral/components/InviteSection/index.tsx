import styled from 'styled-components'
import { Box, Flex, Text, Heading, Link, Image, useMatchBreakpoints, Button } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import Container from 'components/Layout/Container'

const InviteContent = styled(Flex)`
  width: 100%;
  align-items: center;
  grid-gap: 36px;
  display: grid;
  grid-template-columns: repeat(1, 100%);

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 47.2%);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 31%);
  }
`
const DescriptionContent = styled(Flex)`
  width: 100%;
  align-items: center;
  grid-gap: 36px;
  display: grid;
  grid-template-columns: repeat(1, 100%);

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 47.2%);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 31%);
  }
`
const CardContainer = styled.div`
  justify-content: center;
  align-items: center;
`
const StyledItemCard = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 2px 14px 68px rgba(26, 35, 74, 0.11);
  border-radius: 20px;
`
const ItemCardBody = styled.div`
  width: 100%;
  height: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 380px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    height: 400px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 350px;
  }
  padding: 39px 43px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .item-order {
    position: absolute;
    top: -20px;
  }
  .item-image {
    max-width: 130px;
    height: 130px;
  }
  .item-title {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 43px;
    text-align: center;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 24px;
    }
    color: #061e63;
    margin-top: 14px;
  }
  .item-description {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #5970b1;
    text-align: center;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 16px;
    }
    margin-top: 11px;
  }
`
const CardDetails = styled.div`
  padding: 20px 0;
  height: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 420px;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.xl} {
    justify-content: space-between;
    height: 320px;
  }
  .detail-header {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 43px;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 24px;
    }
    color: #000000;
    margin-top: 14px;
  }
  .detail-description {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #2f4da0;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 14px;
    }
    margin-top: 12px;
  }
  .detail-button {
    margin-top: 36px;
  }
`
type InviteType = {
  title: string
  description: string
  order: string
  image: string
}
const InviteItem: React.FC<React.PropsWithChildren<{ item: InviteType }>> = ({ item }) => {
  const { t } = useTranslation()
  return (
    <CardContainer>
      <StyledItemCard width="100%">
        <ItemCardBody>
          <img className="item-order" src={item.order} />
          <div>
            <img className="item-image" src={item.image} />
            <Heading className="item-title">{item.title}</Heading>
          </div>
          <Text className="item-description">{item.description}</Text>
        </ItemCardBody>
      </StyledItemCard> 
    </CardContainer>
  )
}
type DescriptionType = {
  detail_header: string
  detail_description: string
}
const DescriptionItem: React.FC<React.PropsWithChildren<{ item: DescriptionType }>> = ({ item }) => {
  const { t } = useTranslation()
  return (
    <CardContainer> 
      <CardDetails>
        <div>
          <Heading className="detail-header">{item.detail_header}</Heading>
          <Text className="detail-description">{item.detail_description}</Text>
        </div>
        <Button width={120} height={35} className="detail-button">
          <Text color="invertedContrast" fontSize="12px">
            {t('Read More')}
          </Text>
        </Button>
      </CardDetails>
    </CardContainer>
  )
}

const TextStyle = {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
}
const InviteSection: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()

  const items: InviteType[] = [
    {
      title: 'Get a Referral Link',
      description: t('Prices are set when the round starts, equal to $1 in HEXA per ticket'),
      order: 'images/referral/invite-1.png',
      image: 'images/referral/invite-1-pic.png',  
    },
    {
      title: 'Invite Friends',
      description: t('Invite your friends to register via your referral link'),
      order: 'images/referral/invite-2.png',
      image: 'images/referral/invite-2-pic.png',
    },
    {
      title: 'Earn Crypto',
      description: t('Receive referral rewards in HEXA tokens from your friends’ earnings & swaps'),
      order: 'images/referral/invite-3.png',
      image: 'images/referral/invite-3-pic.png',
    },
  ]
  const Desitems: DescriptionType[] = [
    {
      detail_header: 'Farms Referral Rewards',
      detail_description:
        'Gain 5% from your friends earnings on Farms! Your rewards will be displayed on the referral balance at the moment your invited friends withdraw their earned HEXA tokens.',
    },
    {
      detail_header: 'Launchpools Referral Rewards',
      detail_description:
        'Get 5% of from friends’ profit obtained in Launchpools! The reward is only valid for the pool in which HexaFinity is staked in return for more HexaFinity.',
    },
    {
      detail_header: 'Farms Referral Rewards',
      detail_description:
        'Get up to 20% from friends’ swap commission each time your friend makes a swap! Receive your reward immediately after the swap is made. Swaps referral program will be active for certain pairs only.',
    },
  ]
  return (
    <Container>
      <Box width="100%">
        <Heading
          mb="48px"
          style={{ ...TextStyle, color: '#000', fontSize: '26px', lineHeight: '39px', fontWeight: 600 }}
        >
          {t('How to Invite Friends')}
        </Heading>
        <InviteContent>
          {items.map((item, index) => (
            <InviteItem key={index} item={item} />
          ))}
        </InviteContent>
        <DescriptionContent>
          {Desitems.map((item, index) => (
            <DescriptionItem key={index} item={item} />
          ))}
        </DescriptionContent>
      </Box>
    </Container>
  )
}

export default InviteSection
