import React from 'react'
import styled from 'styled-components'
import { Card } from 'components/_uikit'

export const BodyWrapper = styled(Card)`

  // border: transparent;
  border-radius: 8px;
  max-width: 436px;
  width: 100%;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
