import { MenuEntry } from 'components/_uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Swap'),
    icon: 'SwapIcon',
    items: [
      {
        label: t('Exchange'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/pool',
      }
    ],
  },
  {
    label: t('Staking'),
    icon: 'StakingIcon',
    href: '/pools',
  },
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Launchpad'),
    icon: 'LaunchpadIcon',
    href: '/launchpad',
  },
  {
    label: t('Airdrop'),
    icon: 'AirdropIcon',
    href: '/airdrop',
  },
  {
    label: t('Advertising'),
    icon: 'AdvertIcon',
    href: '/advert',
  },
]

export default config
