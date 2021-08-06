import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: '1TronicSwap',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by 1TronicSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://1tronic.io/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('1TronicSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('1TronicSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('1TronicSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('1TronicSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('1TronicSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('1TronicSwap')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('1TronicSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('1TronicSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('1TronicSwap')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('1TronicSwap')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('1TronicSwap')}`,
      }
    default:
      return null
  }
}
