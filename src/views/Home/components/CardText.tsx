import React from 'react'
import { Text } from 'components/_uikit'

export interface CardTextProps {
  text: string
  fontSize?: string
  lineHeight?: string
  bold?: boolean
  color?: string
}

const CardText: React.FC<CardTextProps> = ({
  text,
  fontSize = '40px',
  lineHeight = '1',
  bold = true,
  color = 'secondary',
}) => {
  return (
    <Text bold={bold} fontSize={fontSize} style={{ lineHeight }} color={color} textTransform="uppercase">
      {text}
    </Text>
  )
}

export default CardText
