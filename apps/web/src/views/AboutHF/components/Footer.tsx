import { Box, Button, Flex, Heading, Text, ProposalIcon } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import Container from 'components/Layout/Container'
import Link from 'next/link'
import ButtonCustom from 'views/Lottery/components/ButtonCustom'

const StyledHero = styled(Box)`
  background: #ECF1FF;
  padding-bottom: 32px;
  padding-top: 32px;
  font-family: 'Poppins';
  font-style: normal;
`

const Footer = () => {
  const { t } = useTranslation()

  return (
    <StyledHero>
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <Box p="32px" style={{width: '100%'}}>
            <Heading mb="16px" style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center' }} color='aboutText'>
              {t('Become a Holder of the token that Supports')}<br />
              {t('the Hexa Finity Ecosystem')}
            </Heading>
            <div style={{textAlign: 'center', paddingTop: 24}}>
              <Link href="/swap" passHref prefetch={false}>
                <ButtonCustom
                  buttonText={t('Buy Hexa Finity')}
                  isIcon={false}
                  style={{
                    boxShadow: 'none',
                    background: 'var(--colors-heroRedButton)',
                    marginRight: '12px',
                    marginTop: '12px',
                  }}
                />
              </Link>
            </div>
          </Box>
        </Flex>
      </Container>
    </StyledHero>
  )
}

export default Footer
