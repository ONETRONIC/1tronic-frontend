import React from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { FarmWithBalance } from 'views/Home/hooks/useFarmsWithBalance'
import { usePriceCakeBusd } from 'state/farms/hooks'
import styled from 'styled-components'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import UnlockButton from 'components/UnlockButton'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-top: 5px;
  display: flex;
`

interface CakeHarvestBalanceProps {
  farmsWithBalance: FarmWithBalance[]
}

const CakeHarvestBalance: React.FC<CakeHarvestBalanceProps> = ({ farmsWithBalance }) => {
  const { account } = useWeb3React()
  const earningsSum = farmsWithBalance.reduce((accum, earning) => {
    const earningNumber = new BigNumber(earning.balance)
    if (earningNumber.eq(0)) {
      return accum
    }
    return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber()
  }, 0)
  const cakePriceBusd = usePriceCakeBusd()
  const earningsBusd = new BigNumber(earningsSum).multipliedBy(cakePriceBusd).toNumber()

  if (!account) {
    return (
      <Block>
        <UnlockButton width="100%" />
      </Block>
    )
  } else {
    return (
      <Block>
        <CardValue value={earningsSum} lineHeight="32px" />
        {cakePriceBusd.gt(0) && <CardBusdValue value={earningsBusd} color="textSubtle"/>}
      </Block>
    )
  }
}

export default CakeHarvestBalance
