import { useState } from 'react'
import styled from 'styled-components'
import { Flex, Heading } from '@pancakeswap/uikit'
import PageSection from 'components/PageSection'
import { useTranslation } from '@pancakeswap/localization'
import useTheme from 'hooks/useTheme'
import { useFetchLottery, useLottery } from 'state/lottery/hooks'
import {TITLE_BG} from './pageSectionStyles'
import useGetNextLotteryEvent from './hooks/useGetNextLotteryEvent'
import useStatusTransitions from './hooks/useStatusTransitions'
import HeroSection from './components/HeroSection'
import NextDrawCard from './components/NextDrawCard'
import HistoryTabMenu from './components/HistoryTabMenu'
import YourHistoryCard from './components/YourHistoryCard'
import AllHistoryCard from './components/AllHistoryCard'
import ReferralCard from './components/ReferralCard'
import HowToPlay from './components/HowToPlay'
import QuestionCard from './components/QuestionCard'
import LotteryBalance from './components/LotteryBalance'
import useShowMoreUserHistory from './hooks/useShowMoreUserRounds'
import { PageMeta } from '../../components/Layout/Page'

const TextStyle = {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: 600,
  color: '#000207',
}

const LotteryPage = styled.div`
  min-height: calc(100vh - 64px);
`

const Lottery = () => {
  useFetchLottery()
  useStatusTransitions()
  const { t } = useTranslation()
  const {
    currentRound: { status, endTime },
  } = useLottery()
  const [historyTabMenuIndex, setHistoryTabMenuIndex] = useState(0)
  const endTimeAsInt = parseInt(endTime, 10)
  const { nextEventTime, postCountdownText, preCountdownText } = useGetNextLotteryEvent(endTimeAsInt, status)
  const { numUserRoundsRequested, handleShowMoreUserRounds } = useShowMoreUserHistory()

  return (
    <>
      <PageMeta />
      <LotteryPage>
        <PageSection background={TITLE_BG} index={1} hasCurvedDivider={false} innerProps={{ width: '100%' }}>
          <HeroSection nextEventTime={nextEventTime} postCountdownText={postCountdownText} preCountdownText={preCountdownText} />
        </PageSection>
        <PageSection index={2} innerProps={{ width: '100%' }}>
          <LotteryBalance />
        </PageSection>
        <PageSection containerProps={{ style: { marginTop: '-30px' } }} index={2} innerProps={{ width: '100%' }}>
          <Flex alignItems="center" justifyContent="center" flexDirection="column" pt="24px">
            <NextDrawCard nextEventTime={nextEventTime} />
          </Flex>
        </PageSection>
        <PageSection innerProps={{ margin: '0', width: '100%' }} index={2} >
          <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center">
            <Flex width="100%" flexDirection="row" justifyContent="space-between" mb={12}>
              <Heading style={{ ...TextStyle, fontSize: 22 }}>
                {t('Finished Rounds')}
              </Heading>
              <HistoryTabMenu
                activeIndex={historyTabMenuIndex}
                setActiveIndex={(index) => setHistoryTabMenuIndex(index)}
              />
            </Flex>
            {historyTabMenuIndex === 0 ? (
              <AllHistoryCard />
            ) : (
              <YourHistoryCard
                handleShowMoreClick={handleShowMoreUserRounds}
                numUserRoundsRequested={numUserRoundsRequested}
              />
            )}
          </Flex>
        </PageSection>
        <PageSection index={2} hasCurvedDivider={false} innerProps={{ width: '100%' }}>
          <ReferralCard />
        </PageSection>
        <PageSection index={2} hasCurvedDivider={false} background='#E1E9FF' containerProps={{ style: { marginTop: '30px' } }} >
          <HowToPlay />
          <QuestionCard />
        </PageSection>
      </LotteryPage>
    </>
  )
}

export default Lottery
