import { Flex, Heading, Skeleton, Text, Balance, Button, Link, ArrowForwardIcon, ArrowBackIcon } from '@pancakeswap/uikit'
import { useEffect, useReducer, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { useTranslation } from '@pancakeswap/localization'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
const resourcesList = [
  { 
    id: 1, 
    imageUrl: 'images/hexa/resources/DappRadar_logo.png',
    name: 'DappRadar',
    description: 'Prices are set when the round starts, equal to $1 in HEXA per ticket.'
  },
  { 
    id: 2, 
    imageUrl: 'images/hexa/resources/Cryptocurrency.png',
    name: 'Binance',
    description: 'Invite your friends to register via your referral link'
  },
  { 
    id: 2, 
    imageUrl: 'images/hexa/resources/Cryptocurrency.png',
    name: 'Binance',
    description: 'Invite your friends to register via your referral link'
  },
  { 
    id: 2, 
    imageUrl: 'images/hexa/resources/Cryptocurrency.png',
    name: 'Binance',
    description: 'Invite your friends to register via your referral link'
  },
  { 
    id: 2, 
    imageUrl: 'images/hexa/resources/Cryptocurrency.png',
    name: 'Binance',
    description: 'Invite your friends to register via your referral link'
  },
]

const ResourcesPage = styled.div`
  position: relative;
  display: unset;
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    align-items: center;
    
  }
  
`

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #000000;
  line-height: 35px;
  margin-bottom: 20px;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.md} {
    text-align: left;
  }
`

const Content = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #061E63;
  line-height: 26px;
  margin-bottom: 10px;
   
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 20px;
  }
`

const ArrowButton = styled.div`
  border-radius: ${({ theme }) => theme.radii.small};
  padding: 5px 5px 3px 5px;
  background-color: #041647;
`;

const ArrowButtonGroup = styled.div`
  position: unset;
  z-index: 10;
  display: flex;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: left;
    position: absolute;
    top: 280px;
    left: 0;
  }
`;


const ResourcesCard = styled.div`
  padding: 20px 20px 30px 20px;
  margin: 10px 0;
  background: #FFFFFF;
  border-radius: 20px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 40px 30px 50px 30px;
    margin: 10px 10px;
    width: 340px;
  }
`;

const CardTitle = styled.div`
  font-size: 24px;
  color: #061E63;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
`;

const CardContent = styled.div`
  display: flex;
  font-size: 16px;
  color: #5970B1;
  font-weight: 400;
  text-align: center;
  line-height: 24px;
  margin-bottom: 20px;
  height: 44px;
  overflow: hidden;
`;

const CardImage = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

const CardButton = styled.div`
  display: flex;
  justify-content: center;
`

const SwiperPart = styled.div`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 70%;
  }
`


export default function Resources() {
  const { t } = useTranslation()
  const { isDesktop, isMobile } = useMatchBreakpoints()

  const SwiperButtonNext = () => {
    const swiper = useSwiper();
    return (
      <ArrowButton style={{marginRight: 10}} onClick={() => swiper.slideNext()}>
        <ArrowBackIcon color="#798DC6" />
      </ArrowButton>
    )
  };

  const SwiperButtonBack = () => {
    const swiper = useSwiper();
    return (
      <ArrowButton style={{marginRight: 10}} onClick={() => swiper.slidePrev()}>
        <ArrowForwardIcon color="#798DC6" />
      </ArrowButton>
    )
  };

  return (
    <ResourcesPage>
      <div style={{margin:'10px 20px 10px 0'}}>
        <Title>
          Reviews From Reputable<br></br> Crypto Resources
        </Title>
        <Content>
          Read more about the accomplishments of Biswap on the most reputable crypto resources.
        </Content>
        {/* <ArrowButtonGroup>
          <ArrowButton style={{marginRight: 10}} >
            <ArrowBackIcon color="#798DC6" />
          </ArrowButton>
          <ArrowButton >
            <ArrowForwardIcon color="#798DC6" />
          </ArrowButton>
        </ArrowButtonGroup> */}
      </div>
      <SwiperPart>
        {isMobile ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={500}
            autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
            loop
            pagination={{ clickable: false }}
            style = {{backgroundColor: '#DAE4FF', position: 'unset', display: 'flex', flexDirection: 'column-reverse', alignItems: 'end'}}
          >
            <ArrowButtonGroup>
              <SwiperButtonNext />
              <SwiperButtonBack />
            </ArrowButtonGroup>
            {resourcesList.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <div style={{ display: 'flex' }}>
                    <ResourcesCard>
                      <CardImage>
                        <img src={item.imageUrl} alt="resource image" />
                      </CardImage>
                      <CardTitle>{item.name}</CardTitle>
                      <CardContent>{item.description}</CardContent>
                      <CardButton>
                        {/* <Link href={perpetualUrl} external> */}
                          <Button>
                            <Text color="invertedContrast" bold fontSize="12px" mr="4px">
                              {t('Read More')}
                            </Text>
                            <ArrowForwardIcon color="invertedContrast" />
                          </Button>
                        {/* </Link> */}
                      </CardButton>
                    </ResourcesCard>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={2.5}
            spaceBetween={10}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={500}
            autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
            style = {{backgroundColor: '#DAE4FF', position: 'unset'}}
            loop
          > 
            <ArrowButtonGroup>
              <SwiperButtonNext />
              <SwiperButtonBack />
            </ArrowButtonGroup>
            {resourcesList.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <div style={{ display: 'flex' }}>
                    <ResourcesCard>
                      <CardImage>
                        <img src={item.imageUrl} alt="resource image" />
                      </CardImage>
                      <CardTitle>{item.name}</CardTitle>
                      <CardContent>{item.description}</CardContent>
                      <CardButton>
                        {/* <Link href={perpetualUrl} external> */}
                          <Button>
                            <Text color="invertedContrast" bold fontSize="12px" mr="4px">
                              {t('Read More')}
                            </Text>
                            <ArrowForwardIcon color="invertedContrast" />
                          </Button>
                        {/* </Link> */}
                      </CardButton>
                    </ResourcesCard>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        )}
      </SwiperPart>
    </ResourcesPage>
  )
}


