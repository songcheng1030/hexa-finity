import { Box } from '@pancakeswap/uikit'
import { PageMeta } from 'components/Layout/Page'
import styled from 'styled-components'
import ActivitySection from './components/ActivitySection'
import ArticleSection from './components/ArticleSection'
import HeroSection from './components/HeroSection'
import InviteSection from './components/InviteSection'
import SelectItemSection from './components/SelectItemSection'

const NewsPage = styled.div`
  min-height: calc(100vh-64px);
`
const MainContent = styled(Box)`
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 16px;
    padding-right: 16px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 24px;
    padding-right: 24px;
  }
  margin-left: auto;
  margin-right: auto;
  max-width: 1600px;
`
const ContentWrapper = styled.div`
  width: 100%;
  background: #ffffff;
  padding-top: 20px;
  padding-bottom: 100px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 30px;
    padding-bottom: 110px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 49px;
    padding-bottom: 129px;
  }
`
const News = () => {
  return (
    <>
      <PageMeta />
      <NewsPage>
        <HeroSection />
        <MainContent>
          <ContentWrapper> 
            <SelectItemSection></SelectItemSection>
            <ArticleSection></ArticleSection>
            <ActivitySection></ActivitySection>
          </ContentWrapper>
        </MainContent>
      </NewsPage>
    </>
  )
}
export default News
