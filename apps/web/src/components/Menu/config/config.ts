import {
  MenuItemsType,
  DropdownMenuItemType,
  ExchangeIcon,
  DeactiveExchangeIcon,
  LiquidityIcon,
  DeactiveLiquidityIcon,
  LimitIcon,
  DeactiveLimitIcon,
  FarmsIcon,
  DeactiveFarmsIcon,
  LaunchPoolIcon,
  DeactivePoolIcon,
  ReferralIcon,
  DeactiveReferralIcon,
  CompetitionIcon,
  DeactiveCompetitionIcon,
  LotteryIcon,
  DeactiveLotteryIcon,
  ProgramIcon,
  DeactiveProgramIcon,
  NewsIcon,
  DeactiveNewsIcon,
  AboutIcon,
  DeactiveAboutIcon,
  OverviewIcon,
  DeactiveOverviewIcon,
  CollectionIcon,
  DeactiveCollectionIcon,
  ActiveIcon,
  DeactiveActiveIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  TrophyIcon,
  TrophyFillIcon,
  NftIcon,
  NftFillIcon,
  MoreIcon,
  DropdownMenuItems,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import { perpLangMap } from 'utils/getPerpetualLanguageCode'
import { perpTheme } from 'utils/getPerpetualTheme'
import { SUPPORT_ONLY_BSC } from 'config/constants/supportChains'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Trade'),
      icon: ExchangeIcon,
      deactive: DeactiveExchangeIcon,
      fillIcon: SwapFillIcon,
      href: '/swap',
      showItemsOnMobile: false,
      items: [
        {
          label: t('Exchange'),
          href: '/swap',
          icon: ExchangeIcon,
          deactive: DeactiveExchangeIcon,
        },
        {
          label: t('Liquidity'),
          href: '/liquidity',
          icon: LiquidityIcon,
          deactive: DeactiveLiquidityIcon,
        },
        {
          label: t('Limit'),
          href: '/limit-orders',
          supportChainIds: SUPPORT_ONLY_BSC,
          image: '/images/decorations/3d-coin.png',
          icon: LimitIcon,
          deactive: DeactiveLimitIcon,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Earn'),
      href: '/farms',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: '/images/decorations/pe2.png',
      items: [
        {
          label: t('Farms'),
          href: '/farms',
          icon: FarmsIcon,
          deactive: DeactiveFarmsIcon,
        },
        {
          label: t('Launchpools'),
          href: '/pools',
          supportChainIds: SUPPORT_ONLY_BSC,
          icon: LaunchPoolIcon,
          deactive: DeactivePoolIcon,
        },
        {
          label: t('Referral Program'),
          href: '/referral',
          icon: ReferralIcon,
          deactive: DeactiveReferralIcon,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Win'),
      href: '/competition',
      icon: TrophyIcon,
      fillIcon: TrophyFillIcon,
      supportChainIds: SUPPORT_ONLY_BSC,
      items: [
        {
          label: t('Competitions'),
          href: '/competition',
          image: '/images/decorations/tc.png',
          hideSubNav: true,
          icon: CompetitionIcon,
          deactive: DeactiveCompetitionIcon,
        },
        {
          label: t('Lottery'),
          href: '/lottery',
          image: '/images/decorations/lottery.png',
          icon: LotteryIcon,
          deactive: DeactiveLotteryIcon,
        },
      ],
    },
    // {
    //   label: t('NFT'),
    //   href: `${nftsBaseUrl}`,
    //   icon: NftIcon,
    //   fillIcon: NftFillIcon,
    //   supportChainIds: SUPPORT_ONLY_BSC,
    //   image: '/images/decorations/nft.png',
    //   items: [
    //     {
    //       label: t('Overview'),
    //       href: `${nftsBaseUrl}`,
    //       icon: OverviewIcon,
    //       deactive: DeactiveOverviewIcon,
    //     },
    //     {
    //       label: t('Collections'),
    //       href: `${nftsBaseUrl}/collections`,
    //       icon: CollectionIcon,
    //       deactive: DeactiveCollectionIcon,
    //     },
    //     {
    //       label: t('Activity'),
    //       href: `${nftsBaseUrl}/activity`,
    //       icon: ActiveIcon,
    //       deactive: DeactiveActiveIcon,
    //     },
    //   ],
    // },
    {
      label: 'More',
      href: '/program',
      icon: MoreIcon,
      hideSubNav: true,
      items: [
        {
          label: t('$10M Program'),
          href: '/program',
          icon: ProgramIcon,
          deactive: DeactiveProgramIcon,
        },
        {
          label: t('News'),
          href: '/news',
          supportChainIds: SUPPORT_ONLY_BSC,
          image: '/images/ifos/ifo-bunny.png',
          icon: NewsIcon,
          deactive: DeactiveNewsIcon,
        },
        {
          label: t('About HF'),
          href: '/about_hf',
          supportChainIds: SUPPORT_ONLY_BSC,
          image: '/images/voting/voting-bunny.png',
          icon: AboutIcon,
          deactive: DeactiveAboutIcon,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
