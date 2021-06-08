import React, { useEffect } from 'react'
import { useTabs, TabsProvider } from '../../../../../../../hooks/tabs'
import { TabsModel } from '../../../domain/models/tabs'
import { DetailsTab } from '../../pages/create/components/tabs/details'
import { OverviewTab } from '../../pages/create/components/tabs/overview'
import {
  Container,
  ContentItem,
  TabHeaderContainer,
  TabName,
  TabPanelContainer
} from './styles'

type TypeContentProps = {
  tabList: TabsModel[]
}

export const Tab = ({ tabList }: TypeContentProps): JSX.Element => {
  const { addTab, changeCurrentTab, loadCurrentTab } = useTabs()

  useEffect(() => {
    tabList.forEach(({ name, isDefault, label, isEnable, Component }) => {
      addTab({ default: isDefault, name, label, isEnable, Component })
    })
  }, [addTab, tabList])

  const onClickNameTab = (name: string) => changeCurrentTab(name)

  return (
    <TabsProvider>
      <Container>
        <ContentItem>
          <TabHeaderContainer>
            {tabList.map(
              ({ label, isEnable, name }, index) =>
                isEnable && (
                  <TabName
                    onClick={() => onClickNameTab(name)}
                    key={index}
                    isActive={loadCurrentTab().key === name}
                  >
                    {label}
                  </TabName>
                )
            )}
          </TabHeaderContainer>
          <TabPanelContainer>
            <>
              <hr />
              <div
                className={`${loadCurrentTab().key !== 'overview' && 'hidden'}`}
              >
                <OverviewTab />
              </div>
              <div
                className={`${loadCurrentTab().key !== 'details' && 'hidden'}`}
              >
                <DetailsTab />
              </div>
            </>
          </TabPanelContainer>
        </ContentItem>
      </Container>
    </TabsProvider>
  )
}
