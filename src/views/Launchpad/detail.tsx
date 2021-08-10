import React, { useCallback } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Button, Heading, Flex, CardHeader, Text,  Card, Box, CardRibbon, CardBody, LinkExternal, IconButton, ArrowBackIcon,  } from 'components/_uikit'
import UnlockButton from 'components/UnlockButton'
import { useTranslation } from 'contexts/Localization'
import { useLaunchpads , useDerivedLaunchpadInfo, useLaunchpadActionHandlers, useLaunchpadState} from 'state/launchpad/hooks'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { CurrencyAmount } from 'utils/@sdk'
import { Field } from 'state/launchpad/actions'

const PromotedGradient = keyframes`
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`

interface PromotedStyleCardProps {
  isDesktop: boolean
}
const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  background: ${({background}) =>  `url(${background})`};
  background-size: cover;
  background-repeat: no-repeat;
  height: 130px;
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
`

const StyledCard = styled(Card)<{ isPromoted?: PromotedStyleCardProps; isFinished?: boolean }>`
  width: 50%;
  max-width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  position: relative;
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};
  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);

  ${({ isPromoted, theme }) =>
    isPromoted
      ? css`
          background: linear-gradient(180deg, ${theme.colors.primaryBright}, ${theme.colors.secondary});
          padding: 1px 1px 3px 1px;
          background-size: 400% 400%;
        `
      : `background: ${(props) => props.theme.card.background};`}

  ${({ isPromoted }) =>
    isPromoted &&
    isPromoted.isDesktop &&
    css`
      animation: ${PromotedGradient} 3s ease infinite;
    `}
`

const StyledCardInner = styled(Box)`
  background: ${({ theme }) => theme.card.background};
  border-radius: ${({ theme }) => theme.radii.card};
`
export default function ProjectLauchpad({
  match: {
    params: { projectId },
  },
}: RouteComponentProps<{ projectId: string }>) {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { launchpads } = useLaunchpads(account)

  const launchpad = launchpads.filter((launchpad) => launchpad.projectId === parseInt(projectId) )[0]

  const { currencyBalances, currencies, parsedAmount } = useDerivedLaunchpadInfo()
  const { onCurrencySelection, onUserInput } = useLaunchpadActionHandlers()
  const { typedValue } = useLaunchpadState()
  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmount?.equalTo(maxAmountInput))

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      onCurrencySelection(Field.INPUT, inputCurrency)
    },
    [onCurrencySelection],
  )

  return (
    <>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>          
            <Flex alignItems="center">
              <IconButton as={Link} to="/launchpads">
                <ArrowBackIcon width="32px" />
              </IconButton>
              <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
                <Heading as="h1" scale="xl" color="primary" mb="24px">
                  {launchpad.projectTitle}
                </Heading>
              <Text color="text" fontWeight="400" fontSize="24px" lineHeight="24px">
                {launchpad.projectTagline}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </PageHeader>
      <Page>        
        <StyledPage>
          <StyledCard
                isFinished={launchpad.status === 'ended'}
                ribbon={<CardRibbon variantColor={launchpad.status === 'ended'? "textSubtle" : "secondary"} text={launchpad.status} />}
              >
                <StyledCardInner>
                  <Wrapper isFinished={false} background={launchpad.projectBannerUrl}/>
                  <CardBody>
                    <Flex mb="24px" flexDirection="column">
                      <CurrencyInputPanel
                        label={t('Amount')}
                        value={typedValue}
                        showMaxButton={!atMaxAmountInput}
                        currency={currencies[Field.INPUT]}
                        onUserInput={handleTypeInput}
                        onMax={handleMaxInput}
                        onCurrencySelect={handleInputSelect}
                        id="launchpad-currency-input"
                      />
                    </Flex>
                    {account ? (
                      <Button
                        disabled={!(parseInt(typedValue) > 0) || !(currencies[Field.INPUT])}
                        variant="primary"
                        width="100%"
                        mb="24px"
                      >
                        {parseInt(typedValue) > 0 ? (currencies[Field.INPUT]) ? t('Participate') : t('Select a token') : t('Enter an amount')}
                      </Button>
                    ) : (
                      <>
                        <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                          {t('Participate')}
                        </Text>
                        <UnlockButton />
                      </>
                    )}
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text color="textSubtle" fontWeight="400" fontSize="14px" lineHeight="16px">
                        {t('Amount :')}
                      </Text>
                      <Text color="secondary" fontWeight="800" fontSize="16px" lineHeight="16px">
                        {launchpad.amount}{launchpad.symbol}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text color="textSubtle" fontWeight="400" fontSize="14px" lineHeight="16px">
                        {t('Time :')}
                      </Text>
                      <Text color="secondary" fontWeight="800" fontSize="16px" lineHeight="16px">
                        {t('0 (07.19 7:00 UTC)')}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text color="textSubtle" fontWeight="400" fontSize="14px" lineHeight="16px">
                        {t('Supported Coin:')}
                      </Text>
                      <Text color="secondary" fontWeight="800" fontSize="16px" lineHeight="16px">
                        {launchpad.supportedCoin[0]}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text color="textSubtle" fontWeight="400" fontSize="14px" lineHeight="16px">
                        {t('Price:')}
                      </Text>
                      <Text color="secondary" fontWeight="800" fontSize="16px" lineHeight="16px">
                        {launchpad.price}{launchpad.supportedCoin[0]}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text color="textSubtle" fontWeight="400" fontSize="14px" lineHeight="16px">
                        {t('Start Block:')}
                      </Text>
                      <Text color="secondary" fontWeight="800" fontSize="16px" lineHeight="16px">
                        {launchpad.startBlock}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between" mt="16px">
                      <Text color="textSubtle" fontWeight="400" fontSize="14px" lineHeight="16px" textAlign="justify" mb="16px">
                      {launchpad.projectDescription}
                      </Text>
                    </Flex>
                    <Flex mb="2px" justifyContent="flex-end" mt="16px">
                      <LinkExternal href={launchpad.projectWebsiteUrl} bold={false} small>
                        {t('View Project Site')}
                      </LinkExternal>
                    </Flex>
                  </CardBody>
                </StyledCardInner>
              </StyledCard>
          </StyledPage>
      </Page>
    </>
  )
}
