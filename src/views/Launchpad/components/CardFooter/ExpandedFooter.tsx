import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import {
  Flex,
  Text,
  LinkExternal,
} from 'components/_uikit'
import { Launchpad } from 'state/types'

interface ExpandedFooterProps {
  launchpad: Launchpad
  account: string
}

const ExpandedWrapper = styled(Flex)`
  svg {
    height: 14px;
    width: 14px;
  }
`

const ExpandedFooter: React.FC<ExpandedFooterProps> = ({ launchpad }) => {
  const { t } = useTranslation()
  const { projectWebsiteUrl } = launchpad

  return (
    <ExpandedWrapper flexDirection="column">
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="text" fontWeight="400" fontSize="14px" lineHeight="16px" textAlign="justify" mb="16px">
        {launchpad.projectDescription}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="text" fontWeight="400" fontSize="14px" lineHeight="16px">
          {t('Supported Coin:')}
        </Text>
        <Text color="text" fontWeight="800" fontSize="16px" lineHeight="16px">
          {launchpad.supportedCoin[0]}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="text" fontWeight="400" fontSize="14px" lineHeight="16px">
          {t('Price:')}
        </Text>
        <Text color="text" fontWeight="800" fontSize="16px" lineHeight="16px">
          {launchpad.price}{launchpad.supportedCoin[0]}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="text" fontWeight="400" fontSize="14px" lineHeight="16px">
          {t('Start Block:')}
        </Text>
        <Text color="text" fontWeight="800" fontSize="16px" lineHeight="16px">
          {launchpad.startBlock}
        </Text>
      </Flex>
      <Flex mb="2px" justifyContent="flex-end" mt="16px">
        <LinkExternal href={projectWebsiteUrl} bold={false} small>
          {t('View Project Site')}
        </LinkExternal>
      </Flex>
    </ExpandedWrapper>
  )
}

export default React.memo(ExpandedFooter)
