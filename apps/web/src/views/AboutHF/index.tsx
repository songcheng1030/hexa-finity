import { Flex } from '@pancakeswap/uikit'
import { PageMeta } from 'components/Layout/Page'
import styled from 'styled-components'
import Hero from './components/Hero'
import Opportunities from './components/Opportunities'
import FooterHero from './components/FooterHero'
import Footer from './components/Footer'
import Metrics from './components/Metrics'
import Mechanism from './components/Mechanism'

const Chrome = styled.div`
  flex: none;
`

const Content = styled.div`
  flex: 1;
  height: 100%;
`

const AboutHF = () => {
    return (
        <>
            <PageMeta />
            <Flex flexDirection="column" minHeight="calc(100vh - 64px)">
                <Chrome>
                    <Hero />
                </Chrome>
                <Content>
                    <Metrics />
                    <Mechanism />
                </Content>
                <Chrome>
                    <Opportunities />
                    <FooterHero />
                    <Footer />
                </Chrome>
            </Flex>
        </>
    )
}

export default AboutHF
