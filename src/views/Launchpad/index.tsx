import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex, Image, Text } from 'components/_uikit'
import orderBy from 'lodash/orderBy'
import { useTranslation } from 'contexts/Localization'
import { useLaunchpads } from 'state/launchpad/hooks'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import { Launchpad } from 'state/types'
import ProjectCard from './components/ProjectCard'

const CardLayout = styled(FlexLayout)`
  justify-content: center;
`

const LaunchpadControls = styled(Flex)`
  flex-direction: column;
  margin-bottom: 24px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const SearchSortContainer = styled(Flex)`
  gap: 10px;
  justify-content: space-between;
`

const ControlStretch = styled(Flex)`
  > div {
    flex: 1;
  }
`

const NUMBER_OF_LAUNCHPADS_VISIBLE = 12

const Launchpads: React.FC = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { launchpads } = useLaunchpads(account)
  const [numberOfLaunchpadsVisible, setNumberOfLaunchpadsVisible] = useState(NUMBER_OF_LAUNCHPADS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')

  useEffect(() => {
    const showMoreLaunchpads = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfLaunchpadsVisible((launchpadsCurrentlyVisible) => launchpadsCurrentlyVisible + NUMBER_OF_LAUNCHPADS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreLaunchpads, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const sortLaunchpads = (launchpadsToSort: Launchpad[]) => {
    switch (sortOption) {
      case 'amount':
        // Ternary is needed to prevent launchpads without APR (like MIX) getting top spot
        return orderBy(
          launchpadsToSort,
          (launchpad: Launchpad) => (launchpad.amount),
          'desc',
        )
      default:
        return launchpadsToSort
    }
  }

  const launchpadsToShow = () => {
    let _launchpad = [];
    _launchpad = launchpads
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      _launchpad = launchpads.filter((launchpad) => launchpad.projectTitle.toLowerCase().includes(lowercaseQuery),
      )
    }
    return sortLaunchpads(_launchpad).slice(0, numberOfLaunchpadsVisible)
  }

  return (
    <>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xl" color="primary" mb="24px">
              {t('Lauchpad')}
            </Heading>
            <Text color="text" fontWeight="400" fontSize="24px" lineHeight="24px">
            {t('Participate in new project.')}
            </Text>
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <LaunchpadControls justifyContent="flex-end">
          <SearchSortContainer>
            <Flex flexDirection="column" width="50%">
              <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                {t('Sort by')}
              </Text>
              <ControlStretch>
                <Select
                  options={[
                    {
                      label: t('Hot'),
                      value: 'hot',
                    },
                    {
                      label: t('amount'),
                      value: 'amount',
                    },
                  ]}
                  onChange={handleSortOptionChange}
                />
              </ControlStretch>
            </Flex>
            <Flex flexDirection="column" width="50%">
              <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                {t('Search')}
              </Text>
              <ControlStretch>
                <SearchInput onChange={handleChangeSearchQuery} placeholder="Search Launchpads" />
              </ControlStretch>
            </Flex>
          </SearchSortContainer>
        </LaunchpadControls>
        <CardLayout>
          {launchpadsToShow().map((launchpad) => <ProjectCard key={launchpad.projectId} launchpad={launchpad} account={account} />
          )}
        </CardLayout>
        <div ref={loadMoreRef} />
        <Image
          mx="auto"
          mt="12px"
          src="/images/decorations/3d-syrup-bunnies.png"
          alt="Pancake illustration"
          width={192}
          height={184.5}
        />
      </Page>
    </>
  )
}

export default Launchpads
