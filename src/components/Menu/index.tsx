import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Menu as UikitMenu } from 'components/_uikit'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useProfile } from 'state/profile/hooks'
import { setGeneralCurrency } from 'state/general'
import { useGetGeneralCurrency } from 'state/general/hooks'
import type { AppDispatch } from 'state'
import config from './config'

const Menu = (props) => {
  const location = useLocation();
  const showMascott = location.pathname === '/';
  const showBgDecoration = location.pathname === '/';
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()
  const { profile } = useProfile()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const bannerSources = ["images/easter-battle.png","images/hero.png",]

  const currency = useGetGeneralCurrency();
  const dispatch = useDispatch<AppDispatch>()
  function getConversionValue() {
    return (Math.random() * (9 - 0.001) + 0.0001).toFixed(4);
  }
  const conversionValue = currency ? getConversionValue() : '-'

  const handleInputSelect = useCallback(
    (currency) => {
      const _currency = {
        address: currency.address,
        name: currency.name,
        symbol: currency.symbol,
        decimals: currency.decimals,
        chainId: currency.chainId,
        logoURI: currency.logoURI,
      }
      dispatch(setGeneralCurrency( _currency))
    },
    [dispatch],
  )
  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      cakePriceUsd={cakePriceUsd.toNumber()}
      links={config(t)}
      tagline={t('Your best investment in Digital Asset')}
      bannerSources={bannerSources}
      showMascott={showMascott}
      showBgDecoration={showBgDecoration}
      currency={currency}
      onCurrencySelect={handleInputSelect}
      conversionValue={conversionValue}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      {...props}
    />
  )
}

export default Menu