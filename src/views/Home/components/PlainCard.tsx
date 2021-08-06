import React from 'react'
import styled from 'styled-components'
import { Flex, Card, ArrowForwardIcon, Text } from 'components/_uikit'
import { NavLink } from 'react-router-dom'

const StyledPlainCard = styled(Card)<{invert : boolean, decorationImage: string}>`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  min-height: 104px;
  padding-left: 24px;
  padding-right: 24px;
  position: relative;
  background-color: ${({ invert, theme }) => invert ? theme.colors.secondary : `transparent`};
  ${({decorationImage}) => decorationImage === '' ? '':
    `&:before{
      content: "";
      position: absolute;
      width: 133px;
      height: 165px;
      top: -14%;
      right: -25px;
      z-index: -1;
      background: url(${decorationImage}) 0 0 no-repeat;
      transform: rotate(-10deg);
    }`
  }  
`

const Block = styled.div`
  position: absolute;
  top: 50%;
  width: calc( 100% - 48px);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`

const CardCorner = styled.div`
  position: absolute;
  bottom: calc(50% - 16px);
  right: 0;
`;
export interface CardValueProps {
  text: string,
  title?: string,
  invert?: boolean,
  redirect?: string,
  decorationImage?: string,
}

const PlainCard: React.FC<CardValueProps> = ({
  text,
  title,
  invert = false,
  redirect = "",
  decorationImage = "",
}) => {

  return (
    <StyledPlainCard invert={invert} decorationImage={decorationImage}>      
      { redirect === "" ? 
          (
          <Block>
            {title && (
              <Text color="textSubtle" fontWeight="400" fontSize="14px" lineHeight="24px">
                {title}
              </Text>
            )}
            <Flex justifyContent="space-between">
              <Text color={ invert ? "text" : "secondary"} fontWeight="700" fontSize="24px" lineHeight="24px">
                {text}
              </Text>
            </Flex>
          </Block>      
          )
        : (
          <NavLink exact activeClassName="active" to={redirect} id="farm-apr-cta">
            <Block>
              {title && (
                <Text color="textSubtle" fontWeight="400" fontSize="14px" lineHeight="24px">
                  {title}
                </Text>
              )}
              <Flex justifyContent="space-between">
                <Text color={ invert ? "text" : "secondary"} fontWeight="700" fontSize="24px" lineHeight="24px">
                  {text}
                </Text>
                <CardCorner>
                  <ArrowForwardIcon color={ invert ? "background" : "primary"} width="32px"/>
                </CardCorner>
              </Flex>
            </Block>      
          </NavLink>
      )}
    </StyledPlainCard>
  )
}

export default PlainCard
