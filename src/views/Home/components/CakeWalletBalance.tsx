import React from 'react'
import { Text } from 'components/_uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-top: 4px;
`

const CakeWalletBalance = () => {
  const { t } = useTranslation()
  const { balance: cakeBalance } = useTokenBalance(getCakeAddress())
  const cakePriceBusd = usePriceCakeBusd()
  const busdBalance = new BigNumber(getBalanceNumber(cakeBalance)).multipliedBy(cakePriceBusd).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Block>
        <Text color="secondary" fontWeight="600" fontSize="24px" textTransform="uppercase">
          {t('Locked')}
        </Text>
      </Block>
    )
  }

  return (
    <Block>
      <CardValue value={getBalanceNumber(cakeBalance)} decimals={4} lineHeight="32px" />
      {cakePriceBusd.gt(0) ? <CardBusdValue value={busdBalance} color="textSubtle"/> : <br />}
    </Block>
  )
}

export default CakeWalletBalance
