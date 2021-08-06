import React from 'react'
import styled from 'styled-components'
import { Card, CardBody } from 'components/_uikit'
import { NavLink } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import useFarmsWithBalance from 'views/Home/hooks/useFarmsWithBalance'
import CakeHarvestBalance from './CakeHarvestBalance'
import CardText from './CardText'

const StyledStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  min-height: 104px;
`

const Block = styled.div`
`

const FarmedStakingCard = () => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.gt(0))

  return (
    <StyledStakingCard>
      { account ? (
        <NavLink exact activeClassName="active" to="/pools" id="farm-apr-cta">
          <CardBody>
            <Block>
              <CardText fontSize="14px" lineHeight="1.1" color="textSubtle" bold={false} text={t('Coin to Harvest')}/>
              <CakeHarvestBalance farmsWithBalance={balancesWithValue} />
            </Block>
          </CardBody>
        </NavLink>
      ) : (
        <CardBody>
          <Block>
            <CardText fontSize="14px" lineHeight="1.1" color="textSubtle" bold={false} text={t('Coin to Harvest')}/>
            <CakeHarvestBalance farmsWithBalance={balancesWithValue} />
          </Block>
        </CardBody>
      )}
    </StyledStakingCard>
  )
}

export default FarmedStakingCard
