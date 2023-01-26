import { useState, useEffect } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useProfile } from 'state/profile/hooks'
import { Flex, Box, useMatchBreakpoints } from '@pancakeswap/uikit'
import Image from 'next/image'
import { useTradingCompetitionContractMoD } from 'hooks/useContract'
import useTheme from 'hooks/useTheme'
import { PageMeta } from 'components/Layout/Page'
import { TC_MOD_SUBGRAPH, API_PROFILE } from 'config/constants/endpoints'
import { multicallv2 } from 'utils/multicall'
import { ChainId } from '@pancakeswap/sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import tradingCompetitionMoDAbi from 'config/abi/tradingCompetitionMoD.json'
import {
  SmartContractPhases,
  CompetitionPhases,
  LIVE,
  FINISHED,
  CLAIM,
  OVER,
  REGISTRATION,
} from 'config/constants/trading-competition/phases'
import PageSection from 'components/PageSection'
import { DARKBG, MIDBLUEBG, MIDBLUEBG_DARK, TRADINGCOMPETITIONBANNER } from './pageSectionStyles'
import { RulesIcon } from './svgs'
import Countdown from './components/Countdown'
import StormBunny from './pngs/MoD-storm-bunny.png'
import RibbonWithImage from './components/RibbonWithImage'
import HowToJoin from './components/HowToJoin'
import BattleCta from './components/BattleCta'
import Rules from './components/Rules'
import { UserTradingInformation, initialUserTradingInformation, initialUserLeaderboardInformation } from './types'
import { CompetitionPage, BannerFlex, BottomBunnyWrapper, colors } from './styles'
import RanksIcon from './svgs/RanksIcon'
import ModBattleBanner, { CoinDecoration } from './mod/components/BattleBanner/ModBattleBanner'
import ModPrizesInfo from './mod/components/PrizesInfo/ModPrizesInfo'
import ModYourScore from './mod/components/YourScore/ModYourScore'
import { useTeamInformation } from './useTeamInformation'
import { useRegistrationClaimStatus } from './useRegistrationClaimStatus'
import TeamRanksWithParticipants from './components/TeamRanks/TeamRanksWithParticipants'
import MoDCakerBunny from './pngs/MoD-caker.png'
import PrizesInfoSection from './components/PrizesInfoSection'
import CustomModBattleBanner from './mod/CustomModBattleBanner'
import CompetitionBalance from './mod/CompetitionBalance'
import CompetitionStep from './mod/CompetitionStep'
import CompetitionScore from './mod/CompetitionScore'
import CompetitionRules from './mod/CompetitionRules'

const MoDCompetition = () => {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const { profile, isLoading: isProfileLoading } = useProfile()
  const { isMobile } = useMatchBreakpoints()
  const { isDark, theme } = useTheme()
  const tradingCompetitionContract = useTradingCompetitionContractMoD(false)
  const [currentPhase, setCurrentPhase] = useState(CompetitionPhases.CLAIM)
  const { registrationSuccessful, claimSuccessful, onRegisterSuccess, onClaimSuccess } = useRegistrationClaimStatus()
  const [userTradingInformation, setUserTradingInformation] =
    useState<UserTradingInformation>(initialUserTradingInformation)
  const [userLeaderboardInformation, setUserLeaderboardInformation] = useState(initialUserLeaderboardInformation)

  const {
    globalLeaderboardInformation,
    team1LeaderboardInformation,
    team2LeaderboardInformation,
    team3LeaderboardInformation,
  } = useTeamInformation(4)

  const isCompetitionLive = currentPhase.state === LIVE
  const hasCompetitionEnded =
    currentPhase.state === FINISHED || currentPhase.state === CLAIM || currentPhase.state === OVER

  const { hasUserClaimed, isUserActive, userCakeRewards, userDarRewards, userPointReward, canClaimNFT } =
    userTradingInformation

  const userCanClaimPrizes =
    currentPhase.state === CLAIM &&
    isUserActive &&
    !hasUserClaimed &&
    (userCakeRewards !== '0' || userDarRewards !== '0' || userPointReward !== '0' || canClaimNFT)
  const finishedAndPrizesClaimed = hasCompetitionEnded && account && hasUserClaimed
  const finishedAndNothingToClaim = hasCompetitionEnded && account && !userCanClaimPrizes

  useEffect(() => {
    const fetchCompetitionInfoContract = async () => {
      const competitionStatus = await tradingCompetitionContract.currentStatus()
      setCurrentPhase(SmartContractPhases[competitionStatus])
    }

    const fetchUserContract = async () => {
      try {
        const [user, [userClaimed]] = await multicallv2({
          abi: tradingCompetitionMoDAbi,
          calls: [
            {
              address: tradingCompetitionContract.address,
              name: 'claimInformation',
              params: [account],
            },
            {
              address: tradingCompetitionContract.address,
              name: 'userTradingStats',
              params: [account],
            },
          ],
          options: { requireSuccess: false },
        })
        const userObject: UserTradingInformation = {
          isLoading: false,
          account,
          hasRegistered: user[0],
          isUserActive: user[1],
          hasUserClaimed: userClaimed,
          userRewardGroup: user[3].toString(),
          userCakeRewards: user[4].toString(),
          userDarRewards: user[5].toString(),
          userPointReward: user[6].toString(),
          canClaimNFT: user[7],
        }
        setUserTradingInformation(userObject)
      } catch (error) {
        console.error(error)
        setUserTradingInformation({ ...initialUserTradingInformation, account, isLoading: false })
      }
    }

    if (chainId === ChainId.BSC) {
      fetchCompetitionInfoContract()
      if (account) {
        fetchUserContract()
      } else {
        setUserTradingInformation({ ...initialUserTradingInformation, isLoading: false })
      }
    }
  }, [chainId, account, registrationSuccessful, claimSuccessful, tradingCompetitionContract])

  useEffect(() => {
    const fetchUserTradingStats = async () => {
      const res = await fetch(`${API_PROFILE}/api/users/${account}`)
      const data = await res.json()
      setUserLeaderboardInformation(data.leaderboard_dar)
    }
    // If user has not registered, user trading information will not be displayed and should not be fetched
    if (userTradingInformation.account && userTradingInformation.hasRegistered) {
      fetchUserTradingStats()
    } else {
      setUserLeaderboardInformation({ ...initialUserLeaderboardInformation })
    }
  }, [account, userTradingInformation])

  const isLoading = isProfileLoading || userTradingInformation.isLoading
  // Don't hide when loading. Hide if the account is connected && the user hasn't registered && the competition is live or finished
  const shouldHideCta =
    !isLoading &&
    userTradingInformation.account &&
    !userTradingInformation.hasRegistered &&
    (isCompetitionLive || hasCompetitionEnded)

  return (
    <>
      <PageMeta />
      <CompetitionPage id="pcs-competition-page">
        <PageSection index={1} background={colors.background} hasCurvedDivider={false} innerProps={{ width: '100%' }}>
          <CustomModBattleBanner currentPhase={currentPhase} hasCompetitionEnded={hasCompetitionEnded} />
        </PageSection>
        <PageSection index={2} hasCurvedDivider={false} innerProps={{ width: '100%' }}>
          <CompetitionBalance />
        </PageSection>
        <PageSection index={2} hasCurvedDivider={false} innerProps={{ width: '100%' }}>
          <CompetitionStep />
        </PageSection>
        <PageSection index={2} hasCurvedDivider={false} innerProps={{ width: '100%', marginBottom: '36px' }}>
          <CompetitionScore rankingData={globalLeaderboardInformation} />
        </PageSection>
        <PageSection id='competition_rules' index={2} hasCurvedDivider={false} background='#DAE4FF' innerProps={{ width: '100%', marginBottom: '36px' }}>
          <CompetitionRules />
        </PageSection>
      </CompetitionPage>
    </>
  )
}

export default MoDCompetition
