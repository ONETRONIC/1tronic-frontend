import React from 'react'
import styled from 'styled-components'
import { Card, BaseLayout } from 'components/_uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/Layout/Page'
import PlainCard from './components/PlainCard'

const CTACardsItemsImage = styled(Card)<{ decorationImage: string}>`
margin-left: auto;
margin-right: auto;
width: 100%;
min-height: 142px;
position: relative;
${({decorationImage}) => decorationImage === '' ? '':
  `&:before{
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    background: url(${decorationImage}) 0 0 no-repeat;
    background-size: cover;
  }`
}  
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

const Advertising: React.FC = () => {
  const { t } = useTranslation()
  const decorationImages = ["images/advertisings/adver01.svg",
                            "images/advertisings/adver02.svg",
                            "images/advertisings/adver03.svg",
                            "images/advertisings/adver04.svg",
                            "images/advertisings/adver05.svg",
                            "images/advertisings/adver06.svg",
                            "images/advertisings/adver07.svg"]
  return (
    <Page>
      <div>
        <CTACards>
          {decorationImages.map((decorationImage) => {
            return (
                <CTACardsItemsImage key={decorationImage} decorationImage={decorationImage}/>
            )
          })}
          <div>
            <PlainCard text={t('Advertise your projects here')} redirect="/advert" invert/>
          </div>
        </CTACards>
      </div>
    </Page>
  )
}

export default Advertising
