import React from 'react'
import { Currency, Token } from 'utils/@sdk'
import { Button, ChevronDownIcon, Text, useModal, Flex } from 'components/_uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import { CurrencyLogo } from '../../../../Logo'

const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  padding: 0 0.5rem;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.input};
  margin-right: 12px;
  margin-left: 12px;
`
interface CurrencyConverterProps {
  onCurrencySelect: (currency: Currency) => void
  currency?: Token | null
  conversionValue?: string | number
  disableCurrencySelect?: boolean
  showCommonBases?: boolean
}
export default function CurrencyConverter({
  onCurrencySelect,
  currency,
  conversionValue,
  disableCurrencySelect = false,
  showCommonBases,
}: CurrencyConverterProps) {
  const { t } = useTranslation()

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      showCommonBases={showCommonBases}
    />,
  )
  return (
    <Flex>
      <Text color="text" lineHeight="24px" fontSize="12px" fontWeight="600" margin="auto" padding="2px">{conversionValue}  TRC</Text>
      <CurrencySelectButton
        selected={!!currency}
        className="open-currency-select-button"
        onClick={() => {
          if (!disableCurrencySelect) {
            onPresentCurrencyModal()
          }
        }}
      >
        <Flex alignItems="center" justifyContent="space-between">
          { currency ? (
            // <ListLogo size="40px" style={{ marginRight: '1rem' }} logoURI={currency.address} alt={`${currency.name} list logo`} />
            <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
          ) : null}        
          <Text color="text" lineHeight="24px" fontSize="12px" fontWeight="600">
            {(currency && currency.symbol && currency.symbol.length > 20
              ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                  currency.symbol.length - 5,
                  currency.symbol.length,
                )}`
              : currency?.symbol) || t('Select a currency')}
          </Text>
          {!disableCurrencySelect && <ChevronDownIcon color="textSubtle"/>}
        </Flex>
      </CurrencySelectButton>
    </Flex>
  )
}