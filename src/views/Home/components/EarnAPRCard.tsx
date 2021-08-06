import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Text, Card,  Flex, ArrowForwardIcon } from 'components/_uikit'
import { ChainId } from 'utils/@sdk'
import max from 'lodash/max'
import { NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { useFarms, usePriceCakeBusd } from 'state/farms/hooks'
import { fetchFarmsPublicDataAsync, nonArchivedFarms } from 'state/farms'
import { getFarmApr } from 'utils/apr'
import useIntersectionObserver from 'hooks/useIntersectionObserver'


const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  min-height: 104px;
  padding-left: 24px;
  padding-right: 24px;
  position: relative;
  background-color: transparent;
`

const Block = styled.div`
  position: absolute;
  top: 50%;
  width: calc( 100% - 48px);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`

const CardCorner = styled.div`
  position: absolute;
  bottom: calc(50% - 16px);
  right: 0;
`;

const CardMidContent = styled(Text).attrs({ fontWeight:"700" , fontSize:"24px" , lineHeight:"24px" })`
`

const EarnAPRCard = () => {
  const [isFetchingFarmData, setIsFetchingFarmData] = useState(true)
  const { t } = useTranslation()
  const { data: farmsLP } = useFarms()
  const cakePrice = usePriceCakeBusd()
  const dispatch = useAppDispatch()
  const { observerRef, isIntersecting } = useIntersectionObserver()

  // Fetch farm data once to get the max APR
  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        await dispatch(fetchFarmsPublicDataAsync(nonArchivedFarms.map((nonArchivedFarm) => nonArchivedFarm.pid)))
      } finally {
        setIsFetchingFarmData(false)
      }
    }

    if (isIntersecting) {
      fetchFarmData()
    }
  }, [dispatch, setIsFetchingFarmData, isIntersecting])

  const highestApr = useMemo(() => {
    if (cakePrice.gt(0)) {
      const aprs = farmsLP.map((farm) => {
        // Filter inactive farms, because their theoretical APR is super high. In practice, it's 0.
        if (farm.pid !== 0 && farm.multiplier !== '0X' && farm.lpTotalInQuoteToken && farm.quoteToken.busdPrice) {
          const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
          const { cakeRewardsApr, lpRewardsApr } = getFarmApr(
            new BigNumber(farm.poolWeight),
            cakePrice,
            totalLiquidity,
            farm.lpAddresses[ChainId.MAINNET],
          )
          return cakeRewardsApr + lpRewardsApr
        }
        return null
      })

      const maxApr = max(aprs)
      return maxApr?.toLocaleString('en-US', { maximumFractionDigits: 2 })
    }
    return null
  }, [cakePrice, farmsLP])

  const aprText = highestApr || '-'
  const earnAprText = t('Earn from %highestApr% APR', { highestApr: aprText })
  const [earnUpTo, InFarms] = earnAprText.split(aprText)

  return (
    <StyledFarmStakingCard>
      <NavLink exact activeClassName="active" to="/farms" id="farm-apr-cta">
        <Block>
          <Text color="textSubtle" fontWeight="400" fontSize="14px" lineHeight="24px">
            {earnUpTo}
          </Text>
          <Flex justifyContent="space-between">
            <CardMidContent color="secondary">
              {highestApr && !isFetchingFarmData ? (
                `${InFarms} ${highestApr}%`
              ) : (
                <>
                  {`${InFarms}`}
                  <div ref={observerRef} />
                </>
              )}             
            </CardMidContent>
            <CardCorner>
              <ArrowForwardIcon color="primary" width="32px"/>
            </CardCorner>
          </Flex>
        </Block>      
      </NavLink>
    </StyledFarmStakingCard>
  )
}

export default EarnAPRCard
