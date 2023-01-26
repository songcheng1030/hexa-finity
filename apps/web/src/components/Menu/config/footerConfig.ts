import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Docs'),
        href: 'https://docs.pancakeswap.finance/contact-us',
        isHighlighted: true,
      },
      {
        label: t('Team'),
        href: 'https://docs.pancakeswap.finance/brand',
      },
      {
        label: t('News'),
        href: 'https://medium.com/pancakeswap',
      },
      {
        label: t('Github'),
        href: 'https://docs.pancakeswap.finance/contact-us/telegram',
      },
      {
        label: t('Bug Bounty'),
        href: 'https://v2litepaper.pancakeswap.finance/',
      }
    ],
  },
  {
    label: t('Products'),
    items: [
      {
        label: t('Exchange'),
        href: 'https://docs.pancakeswap.finance/contact-us/customer-support',
      },
      {
        label: t('Liquidity'),
        href: 'https://docs.pancakeswap.finance/help/troubleshooting',
      },
      {
        label: t('Farms'),
        href: 'https://docs.pancakeswap.finance/get-started',
      },
      {
        label: t('Launchpools'),
        href: 'https://docs.pancakeswap.finance/get-started',
      },
      {
        label: t('Lottery'),
        href: 'https://docs.pancakeswap.finance/get-started',
      },
    ],
  },
  {
    label: t('Service'),
    items: [
      {
        label: 'Referral program',
        href: 'https://github.com/pancakeswap',
      },
      {
        label: t('HEXA Token'),
        href: 'https://docs.pancakeswap.finance',
      },
      {
        label: t('Apply to Launch'),
        href: 'https://docs.pancakeswap.finance/code/bug-bounty',
      },
      {
        label: t('$10M Program'),
        href: 'https://docs.pancakeswap.finance/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited',
      }
    ],
  },
]
