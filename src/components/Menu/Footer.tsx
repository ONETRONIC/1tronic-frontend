import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Text } from 'components/_uikit'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: space-between;
    flex-direction: row;
  }
`

const HrefWrapper = styled.a`
  width: 100%;
`

const Footer = () => {
  function getYear() {
    return new Date().getFullYear();
  }
  const { t } = useTranslation()
  const disclaimer = t('All content provided herein our website, hyperlinked sites, associated applications, forums, blogs, social media accounts and other platforms (“Site”) is for your general information only, procured from third party sources. We make no warranties of any kind in relation to our content, including but not limited to accuracy and updatedness. No part of the content that we provide constitutes financial advice, legal advice or any other form of advice meant for your specific reliance for any purpose. Any use or reliance on our content is solely at your own risk and discretion. You should conduct your own research, review, analyse and verify our content before relying on them. Trading is a highly risky activity that can lead to major losses, please therefore consult your financial advisor before making any decision. No content on our Site is meant to be a solicitation or offer');
  return (
    <Wrapper>
        <Text color="textSubtle" fontSize="12px" width="100%">{t('DISCLAIMER')}</Text>
        <Text color="textSubtle" fontSize="12px" mb="80px" width="100%">{disclaimer}</Text>
        
        <HrefWrapper href="https://1tronic.io/">
          <Text color="textSubtle" fontSize="11px" width="100%">© {getYear()} 1TronicSwap</Text>
        </HrefWrapper>
    </Wrapper>
  )
}

export default Footer
