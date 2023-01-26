import styled from 'styled-components'
import {
  Card,
  CardBody,
  Text,
  ChevronRightIcon
} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import ButtonCustom from './ButtonCustom'

const StyledCard = styled(Card)`
  width: 100%;
  background: #041647;
  border-radius: 20px;
  overflow: unset;
`
const CustomCardBody = styled(CardBody)`
  background: #041647;
  border-radius: 20px;
  position: relative;
  min-height: 250px;
  overflow: hidden;
`
const MetaphoneImg = styled.img`
  position: absolute;
  height: 240px;
  bottom: -62px;
  left: -42px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 320px;
  }
`
const RotateText = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    transform: rotate(-147.24deg) scale(0.6);
    z-index: 2;
    ${({ theme }) => theme.mediaQueries.sm} {
      transform: rotate(-147.24deg) scale(0.8);
    }
`
const TextStyle = {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
}
const ReferralCard = (props) => {
  const { t } = useTranslation()

  return (
    <StyledCard background='#041647'>
      <CustomCardBody>
        <MetaphoneImg src='/img/lottery/metaphone.png' />
      </CustomCardBody>
      <RotateText>
        <Text style={{ ...TextStyle, fontSize: 32, fontWeight: 600, color: '#FFF' }}>{t('Invite your friends.')}</Text>
        <Text style={{ ...TextStyle, fontSize: 32, fontWeight: 600, color: '#FFF' }}>{t('Earn cryptocurrency together')}</Text>
        <Text style={{ ...TextStyle, fontSize: 18, fontWeight: 500, color: '#FFF', maxWidth: 640, paddingBottom: 12}}>
          <span style={{ color: '#F3BA2F' }}>{t('Get 2% ')}</span>
          {t('from your friends’ total ticket lottery purchase amount immediately to your referral balance.')}</Text>
        <ButtonCustom buttonText={t('Go to referral')} isIcon={true} icon={<ChevronRightIcon color='#FFF' />} />
      </RotateText>
    </StyledCard>
  )
}

export default ReferralCard
