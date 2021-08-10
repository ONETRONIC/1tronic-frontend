import React, { CSSProperties } from 'react'
import { Token } from 'utils/@sdk'
import { Button, Text, CheckmarkCircleIcon } from 'components/_uikit'
import { AutoRow, RowFixed } from 'components/Layout/Row'
import { AutoColumn } from 'components/Layout/Column'
import CurrencyLogo from 'components/Logo/CurrencyLogo'
import styled from 'styled-components'
import { useIsUserAddedToken, useIsTokenActive } from 'hooks/Tokens'
import { useTranslation } from 'contexts/Localization'

const TokenSection = styled.div<{ dim?: boolean }>`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto;
  grid-gap: 8px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subtleLine};

  opacity: ${({ dim }) => (dim ? '0.4' : '1')};
`

const CheckIcon = styled(CheckmarkCircleIcon)`
  height: 16px;
  width: 16px;
  margin-right: 6px;
  stroke: ${({ theme }) => theme.colors.success};
`

export default function ImportRow({
  token,
  style,
  dim,
  showImportView,
  setImportToken,
}: {
  token: Token
  style?: CSSProperties
  dim?: boolean
  showImportView: () => void
  setImportToken: (token: Token) => void
}) {
  // gloabls

  const { t } = useTranslation()

  // check if already active on list or local storage tokens
  const isAdded = useIsUserAddedToken(token)
  const isActive = useIsTokenActive(token)

  return (
    <TokenSection style={style}>
      <CurrencyLogo currency={token} size="24px" style={{ opacity: dim ? '1' : '1' }} />
      <AutoColumn gap="sm" style={{ opacity: dim ? '1' : '1' }}>
        <AutoRow>
          <Text bold mr="6px" color="background" fontSize="12px">{token.symbol}</Text>
          <Text small color="background" fontSize="12px">
            {token.name}
          </Text>
        </AutoRow>
        {/* {list && list.logoURI && (
          <RowFixed>
            <Text small mr="4px" color="textSubtle">
              {t('via')} {list.name}
            </Text>
            <ListLogo logoURI={list.logoURI} size="12px" />
          </RowFixed>
        )} */}
      </AutoColumn>
      {!isActive && !isAdded ? (
        <Button
          width="fit-content" variant="contrast"
          onClick={() => {
            if (setImportToken) {
              setImportToken(token)
            }
            showImportView()
          }}
        >
          {t('Import')}
        </Button>
      ) : (
        <RowFixed style={{ minWidth: 'fit-content' }}>
          <CheckIcon />
          <Text color="success">Active</Text>
        </RowFixed>
      )}
    </TokenSection>
  )
}
