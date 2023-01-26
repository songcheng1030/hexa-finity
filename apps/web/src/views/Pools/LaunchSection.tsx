import styled from 'styled-components'
import { Box, Flex, Text, Heading, Link } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import ButtonCustom from 'views/Lottery/components/ButtonCustom'

const Wrapper = styled.div`

`
const GappedFlex = styled(Flex)`
  gap: 24px;
`
const TextStyle = {
  fontFamily: 'Poppins',
  fontStyle: 'normal'
}
const LaunchSectionImg = styled.div`
`
const LaunchSection: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()

  return (<Wrapper>
    <GappedFlex flexDirection={['column', 'column', 'column', 'row']}>
      <Flex flex="3" flexDirection="column" justifyContent='center'>
        <Heading mt='24px' mb='24px' style={{ ...TextStyle, color: '#000', fontSize: '24px', fontWeight: 600 }}>
          {t('Launch Your Project on Hexa Finity!')}
        </Heading>
        <Text mb='16px' style={{ ...TextStyle, color: 'poolText', fontSize: '16px', fontWeight: 400 }}>
          {t('Farms stimulate users to provide liquidity for your trading pair by distributing HEXA tokens to your pair’s LP token holders. Launchpool is a platform where a project owner can distribute tokens to BNB users who stake HEXA tokens in the pool. When a project applies for Hexa Finity Launchpool we can also create a new farming pair (subject to discussion). Hexa Finity Launchpool and Farms are platforms that help project teams promote their token and get exposure to thousands of active Hexa Finity users across the globe. We look for strong teams with clear and innovative vision in the crypto space. If you think you are one of the projects, do not wait any longer and apply below.')}
        </Text>
        <div>
          <ButtonCustom
            buttonText={t('Apply to Launch')}
            isIcon={true}
            icon={<img src='/img/launchpools/rocket-icon-white.svg' />}
            style={{
              boxShadow: 'none',
              background: '#F93B5D',
            }}
            onClick={() => window.open('https://google.com', '_blank')}
          />
        </div>
      </Flex>
      <Flex flex="2" flexDirection="column">
        <LaunchSectionImg>
          <img src="/img/launchpools/section-2.png" />
        </LaunchSectionImg>
      </Flex>
    </GappedFlex>
  </Wrapper>);
}

export default LaunchSection