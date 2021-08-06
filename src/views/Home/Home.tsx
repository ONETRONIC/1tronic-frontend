import React from 'react'
import styled from 'styled-components'
import { Text, BaseLayout } from 'components/_uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/Layout/Page'
import StakingCard from 'views/Home/components/StakingCard'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPRCard from 'views/Home/components/EarnAPRCard'
import PlainCard from './components/PlainCard'

const Cards = styled.div`
  align-items: stretch;
  justify-content: stretch;
`

const CTACardsItems = styled.div`
  // min-width: 300px
`
const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-top: 128px;
  margin-bottom: 24px;
  column-gap: 22px;
  row-gap: 24px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <div>
        <Cards>
          <TotalValueLockedCard />
        </Cards>
        <CTACards>
          <CTACardsItems>
            <Text color="primary" mb="12px" fontWeight="600" fontSize="20px" lineHeight="24px">
              {t('Swap')}
            </Text>
            <PlainCard text={t('1TRC')} title={t('LISTED')} decorationImage="images/decorations/cryptonews.svg"/>
          </CTACardsItems>
          <CTACardsItems>
            <Text color="primary" mb="12px" fontWeight="600" fontSize="20px" lineHeight="24px">
              {t('Staking')}
            </Text>
            <StakingCard />
          </CTACardsItems>
          <CTACardsItems>
            <Text color="primary" mb="12px" fontWeight="600" fontSize="20px" lineHeight="24px">
              {t('Farming')}
            </Text>
            <EarnAPRCard />
          </CTACardsItems>
          <CTACardsItems>
            <Text color="primary" mb="12px" fontWeight="600" fontSize="20px" lineHeight="24px">
              {t('Launchpad')}
            </Text>
            <PlainCard text={t('1TRC Live Now!')}/>
          </CTACardsItems>
          <CTACardsItems>
            <Text color="primary" mb="12px" fontWeight="600" fontSize="20px" lineHeight="24px">
              {t('Lending & Borrowing')}
            </Text>
            <PlainCard text={t('Comming Soon')}/>
          </CTACardsItems>
          <CTACardsItems>
            <Text color="primary" mb="12px" fontWeight="600" fontSize="20px" lineHeight="24px">
              {t('Advertising')}
            </Text>
            <PlainCard text={t('Advertise your projects here')} redirect="/advert" invert/>
          </CTACardsItems>
        </CTACards>
      </div>
    </Page>
  )
}

export default Home
