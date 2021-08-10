import React from 'react'
import { Link } from 'react-router-dom'
import { CardHeader, CardBody, Flex, Text, CardRibbon, Heading, Button } from 'components/_uikit'
import styled from 'styled-components'
import UnlockButton from 'components/UnlockButton'
import { useTranslation } from 'contexts/Localization'
import { Launchpad } from 'state/types'
import { StyledCard, StyledCardInner } from './StyledCard'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  background: ${({background}) =>  `url(${background})`};
  background-size: cover;
  background-repeat: no-repeat;
  height: 90px;
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
`
const ProjectCard: React.FC<{ launchpad: Launchpad; account: string }> = ({ launchpad, account }) => {
  const { projectId, projectTitle, projectTagline, projectBannerUrl, symbol, amount, status } = launchpad
  const { t } = useTranslation()
  return (
    <StyledCard
      isFinished={status === 'ended'}
      ribbon={<CardRibbon variantColor={status === 'ended'? "textSubtle" : "secondary"} text={status} />}
    >
      <StyledCardInner>
        <Wrapper isFinished={false} background={projectBannerUrl}/>
        <CardBody>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex flexDirection="column">
              <Heading color='primary' scale="lg">
                {projectTitle}
              </Heading>
              <Text color='text'mt="8px" mb="8px">{projectTagline}</Text>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color="textSubtle" fontWeight="400" fontSize="14px" lineHeight="16px">
              {t('Amount :')}
            </Text>
            <Text color="secondary" fontWeight="800" fontSize="16px" lineHeight="16px">
              {amount}{symbol}
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
          <Flex mt="24px" flexDirection="column">
            {account ? (
              <Button
                as={Link}
                to={`/launchpad/${projectId}`}
                variant="primary"
                width="100%"
                mb="8px"
              >
                {t('Participate')}
              </Button>
            ) : (
              <>
                <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                  {t('Participate')}
                </Text>
                <UnlockButton />
              </>
            )}
          </Flex>
        </CardBody>
      </StyledCardInner>
    </StyledCard>
  )
}

export default ProjectCard
