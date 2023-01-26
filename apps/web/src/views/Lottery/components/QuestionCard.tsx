import styled from 'styled-components'
import {
  Card,
  CardBody,
  Text,
  ChevronRightIcon,
  Flex,
} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import ButtonCustom from './ButtonCustom'

const GappedFlex = styled(Flex)`
  gap: 24px;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`
const StyledCard = styled(Card)`
  width: 100%;
  background: linear-gradient(271.07deg, #041647 0.92%, #11A9FF 99.08%);
  border-radius: 20px;
  margin-bottom: 32px;
`
const CustomCardBody = styled(CardBody)`
  background: linear-gradient(271.07deg, #041647 0.92%, #11A9FF 99.08%);
  border-radius: 20px;
  position: relative;
  min-height: 250px;
  padding: 0;
`
const MetaphoneImg = styled.img`
  height: 100%;
`
const RotateText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5%;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0;
    padding-right: 12%;
    align-items: flex-start;
  }
`
const TextStyle = {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
}
const QuestionCard = (props) => {
  const { t } = useTranslation()

  return (
    <StyledCard background='background: linear-gradient(271.07deg, #041647 0.92%, #11A9FF 99.08%)'>
      <CustomCardBody>
        <GappedFlex>
          <Flex flex={2} alignItems='center' justifyContent='center'><MetaphoneImg src='/img/lottery/how-to-play-07.svg' /></Flex>
          <Flex flex={3}>
            <RotateText>
              <Text mt='24px' mb='24px' style={{ ...TextStyle, fontSize: 28, fontWeight: 600, color: '#FFF' }}>{t('Still got questions?')}</Text>
              <Text mb='24px' style={{ ...TextStyle, fontSize: 16, fontWeight: 500, color: '#FFF' }}>
                {t('In case you’ve got any questions about the lottery, we invite you to go over our detailed explanation in the docs section.')}
              </Text>
              <ButtonCustom buttonText={t('Go to referral')} isIcon={true} icon={<ChevronRightIcon color='#FFF' />} />
            </RotateText>
          </Flex>
        </GappedFlex>
      </CustomCardBody>

    </StyledCard>
  )
}

export default QuestionCard
