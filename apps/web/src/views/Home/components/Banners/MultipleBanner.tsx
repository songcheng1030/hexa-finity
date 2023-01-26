import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styled-components'

import { useMatchBreakpoints } from '@pancakeswap/uikit'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { map } from 'lodash'

const bannerImageList = [
  { id: 1, imageUrl: 'images/banners/doubleEternal.png' },
  { id: 2, imageUrl: 'images/banners/farmPairs.png' },
  { id: 3, imageUrl: 'images/banners/market1.png' },
  { id: 4, imageUrl: 'images/banners/gameFi.jpg' },
  { id: 5, imageUrl: 'images/banners/nftEarn.jpg' },
  { id: 6, imageUrl: 'images/banners/binanceLabs.jpg' },
]

const StyledSwiper = styled(Swiper)`
  position: relative;
  padding-bottom: 30px;
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .swiper-pagination {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    width: 108px;
    bottom: 0px;
  }
  .swiper-pagination-bullet {
    background-color: #aabef0;
  }
`

export default function App() {
  const { isDesktop, isMobile } = useMatchBreakpoints()
  return (
    <div style={{ marginTop: 20, paddingBottom: 50 }}>
      {isMobile ? (
        <StyledSwiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={500}
          autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
          loop
          pagination={{ clickable: true }}
        >
          {bannerImageList.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div style={{ display: 'flex' }}>
                  <img src={item.imageUrl} alt="banner image" />
                </div>
              </SwiperSlide>
            )
          })}
        </StyledSwiper>
      ) : (
        <StyledSwiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={500}
          autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
          loop
          pagination={{ clickable: true }}
        >
          {bannerImageList.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div style={{ display: 'flex' }}>
                  <img src={item.imageUrl} alt="banner image" />
                </div>
              </SwiperSlide>
            )
          })}
        </StyledSwiper>
      )}
    </div>
  )
}
