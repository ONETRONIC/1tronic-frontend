import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, CardFooter, ExpandableLabel } from 'components/_uikit'
import { Launchpad } from 'state/types'
import ExpandedFooter from './ExpandedFooter'

interface FooterProps {
  launchpad: Launchpad
  account: string
  totalCakeInVault?: BigNumber
}

const ExpandableButtonWrapper = styled(Flex)`
  justify-content: flex-end;
  button {
    padding: 0;
  }
`

const Footer: React.FC<FooterProps> = ({ launchpad, account }) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <CardFooter>
      <ExpandableButtonWrapper>
        <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? t('Hide') : t('Details')}
        </ExpandableLabel>
      </ExpandableButtonWrapper>
      {isExpanded && <ExpandedFooter launchpad={launchpad} account={account} />}
    </CardFooter>
  )
}

export default Footer
