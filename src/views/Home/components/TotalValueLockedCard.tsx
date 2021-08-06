import React from 'react'
import styled from 'styled-components'
import { Card, Text } from 'components/_uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetStats } from 'hooks/api'

const StyledTotalValueLockedCard = styled(Card)`
  // text-align: center;
  padding-top: 60px;
  border-color: transparent;
  box-shadow: none;
`

const TotalValueLockedCard = () => {
  const { t } = useTranslation()
  const data = useGetStats()
  const tvl = data ? data.tvl.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledTotalValueLockedCard>
        <Text color="primaryDark" fontSize="20px" fontWeight="700" mb="8px" textTransform="uppercase" >{t('Total Value Locked (TVL)')}</Text>
        {data ? (
          <>
            <Text color="text" fontWeight="800" fontSize="32px" lineHeight="36px" decoration="none solid rgb(255, 255, 255)" shadow="0px 2px 1px rgba(0,0,0,0.5)">{`$${tvl}`}</Text>
          </>
        ) : (
          <Text color="text" fontWeight="800" fontSize="32px" lineHeight="36px" decoration="none solid rgb(255, 255, 255)" shadow="0px 2px 1px rgba(0,0,0,0.5)">$</Text>
        )}
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
