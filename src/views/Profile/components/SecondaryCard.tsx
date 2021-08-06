import styled from 'styled-components'
import { Text } from 'components/_uikit'

const SecondaryCard = styled(Text)`
  border: 2px solid ${({ theme }) => theme.colors.tertiary};
  border-radius: 8px;;
`

SecondaryCard.defaultProps = {
  p: '24px',
}

export default SecondaryCard
