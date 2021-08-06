import React from 'react'
import { Button, useWalletModal } from 'components/_uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const UnlockButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button 
      scale="md"
      variant="primary"
      onClick={onPresentConnectModal} {...props}>
      {t('UNLOCK WALLET')}
    </Button>
  )
}

export default UnlockButton
