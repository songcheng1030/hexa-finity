import { useEffect, useState } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'

const BeniefitPage = styled.div`
  margin-top: 0;

  ${({ theme }) => theme.mediaQueries.md} {
     margin-top: 40px;
  }
`

const Title = styled.div`
  text-align: center;
  font-size: 26px;
  color: #000000;
  font-weight: 600;
  line-height: 39px;
  margin-bottom: 20px;

  ${({ theme }) => theme.mediaQueries.md} {
     margin-bottom: 40px;
 }
`

const Beniefits = styled.div`
  grid-gap: 50px;
  display: grid;
  grid-template-columns: auto auto auto auto;
  @media (max-width: 1200px) {
    grid-gap: 30px;
    grid-template-columns: auto auto;
  }
  @media (max-width: 674px) {
    grid-gap: 20px;
    grid-template-columns: auto;
  }
`

const BeniefitItem = styled.div`
  width: 700px
  @media (max-width: 674px) {
    flex: 100%;
  }
`

const BeniefitTitle = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  color: #061E63;
  margin-bottom:10px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 20px;
}
`

const BeniefitContent = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #061E63;
  line-height: 24px;
`

const BeniefitImg = styled.img`
  height: 40px;
  margin-bottom: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 74px;
  }
`
const BeniefitImgPart = styled.div`
  display:flex;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: left;
  }
`


const OurBenefit = ({}) => {
  const { t } = useTranslation()

  const contents = [
    {
      title: '3-Types Referral System',
      content: 'Get access to 380k+ Hexa Finity users across the globe.',
      img: "/images/hexa/benefit/benifit1.png"
    },
    {
      title: 'The Lowest Exchange Fee',
      content: 'All the rewards coming from the accounts with no referrers are used for weekly BSW token burning.',
      img: "/images/hexa/benefit/benifit5.png"
    },
    {
      title: 'Trade Fee Reimbursement',
      content: 'Subtracted automatically from each harvest in the BSW Auto Compound pool and burned on a weekly basis.',
      img: "/images/hexa/benefit/benifit3.png"
    },
    {
      title: 'Competitions',
      content: '13% from every lottery ticket are accumulated on a separate wallet and burned once a week.',
      img: "/images/hexa/benefit/benifit4.png"
    },
  ]

  return (
    <BeniefitPage>
      <Title>
        {t('Our Benefits')}
      </Title>
      <Beniefits>
        {contents.map(function (item, index) {
          return (
            <BeniefitItem key={index}>
              <BeniefitImgPart>
                <BeniefitImg src={item.img} />
              </BeniefitImgPart>
              <BeniefitTitle>
                {item.title}
              </BeniefitTitle>
              <BeniefitContent>
                {item.content}
              </BeniefitContent>
            </BeniefitItem>
          )
        })}
       </Beniefits>
    </BeniefitPage>
  )
}

export default OurBenefit
