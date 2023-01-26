import styled from 'styled-components'
import { Box, Flex, Text, Heading, Link, Image, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

const ChooseContainer = styled(Flex)`
  width: 100%;
  align-items: center;
  grid-gap: 15px;
  display: grid;
  grid-template-columns: repeat(1, 100%);

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 48.5%);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 32.5%);
  }
`
const StyledItemCard = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: url(images/farms/chooseback.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 39px 43px;
`
const ItemCardInner = styled(Box)`
  width: 100%;
  padding: 24px;
  border-radius: 20px;
`
const ItemCardBody = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .item-image {
    max-width: 240px;
    height: 180px;
  }
  .item-title {    
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    text-align: center;
    font-size: 24px;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 22px;
    }
    line-height: 40px;
    color: #ffffff;
    margin-top: 14px;
  }
  .item-description {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 200;
    text-align: center;
    font-size: 16px;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 14px;
    }
    line-height: 23px;
    color: #ffffff;
    opacity: 0.7;
    margin-top: 11px;
  }
`
type ChooseType = { title: string; description: string; image: string }
const ChooseItem: React.FC<React.PropsWithChildren<{ item: ChooseType }>> = ({ item }) => {
  return (
    <StyledItemCard width="100%">
      <ItemCardBody>
        <img className="item-image" src={item.image} />
        <Heading className="item-title">{item.title}</Heading>
        <Text className="item-description">{item.description}</Text>
      </ItemCardBody>
    </StyledItemCard>
  )
}

const TextStyle = {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
}
const ChooseSection: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()

  const items: ChooseType[] = [
    {
      image: 'images/farms/ViralMarketing.png',
      title: t('Global Exposure'),
      description: t('Get access to 380k+ Hexa Finity users across the globe.'),
    },
    {
      image: 'images/farms/Statistics.png',
      title: t('Liquidity'),
      description: t('Projects launched on Hexa Finity Launchpool will be listed and have high trading liquidity.'),
    },
    {
      image: 'images/farms/Audience.png',
      title: t('Token Distribution'),
      description: t('Your token will be instantly distributed to a large user base that holds your token.'),
    },
    {
      image: 'images/farms/Startup.png',
      title: t('Trading Competition'),
      description: t('Hexa Finity will organize a tournament dedicated to your project to maximize trading volume with your token.'),
    },
    {
      image: 'images/farms/320k.png',
      title: t('Marketing Boost'),
      description: t('Your project will be promoted across all our social media platforms with an audience of over 320K+.'),
    },
    {
      image: 'images/farms/Conversion.png',
      title: t('Growth Opportunities'),
      description: t('Your token might also be added to Hexa Finity Farms with high APR.'),
    }
  ]
  return (
    <Box width="100%">
      <Heading mb="48px" style={{ ...TextStyle, color: '#000', fontSize: '26px', lineHeight: '39px', fontWeight: 600 }}>
        {t('Why choose us?')}
      </Heading>
      <ChooseContainer>
        {items.map((item, index) => (
          <ChooseItem key={index} item={item} />
        ))}
      </ChooseContainer>
    </Box>
  )
}

export default ChooseSection
