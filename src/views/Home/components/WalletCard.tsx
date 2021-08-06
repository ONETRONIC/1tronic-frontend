import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, ArrowForwardIcon, Flex } from 'components/_uikit'
import { harvestFarm } from 'utils/calls'
import { useWeb3React } from '@web3-react/core'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import useFarmsWithBalance from 'views/Home/hooks/useFarmsWithBalance'
import { useMasterchef } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import CardText from './CardText'

const StyledWalletCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  min-height: 104px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const CardCorner = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
`;

const WalletCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { toastError } = useToast()
  const farmsWithBalance = useFarmsWithBalance()
  const masterChefContract = useMasterchef()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.gt(0))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    // eslint-disable-next-line no-restricted-syntax
    for (const farmWithBalance of balancesWithValue) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await harvestFarm(masterChefContract, farmWithBalance.pid)
      } catch (error) {
        toastError(t('Error'), error?.message)
      }
    }
    setPendingTx(false)
  }, [balancesWithValue, masterChefContract, toastError, t])

  return (
    <StyledWalletCard>
      <NavLink exact activeClassName="active" to="/swap" id="farm-apr-cta">
        <CardBody>
          <Block>
            <CardText fontSize="14px" lineHeight="1.1" color="textSubtle" bold={false} text={t('Coin in Wallet')}/>
            <CakeWalletBalance />
          </Block>
          <Flex justifyContent="space-between">
            <CardCorner>
              <ArrowForwardIcon color="primary" width="32px"/>
            </CardCorner>
          </Flex>
        </CardBody>
      </NavLink>
    </StyledWalletCard>
  )
}

export default WalletCard
