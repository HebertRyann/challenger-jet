import React, { useEffect } from 'react'
import { useTabs, TabsProvider } from '../../../../../../../hooks/tabs'
import { TabsModel } from '../../../domain/models/tabs'
import {
  Container,
  ContentItem,
  RenderComponent,
  TabHeaderContainer,
  TabName,
  TabPanelContainer
} from './styles'

type TypeContentProps = {
  tabList: TabsModel[]
}

const TabComponent = ({ tabList }: TypeContentProps): JSX.Element => {
  const { addTab, loadCurrentTab, changeCurrentTab } = useTabs()

  useEffect(() => {
    tabList.forEach(({ name, isDefault, label, isEnable, Component }) => {
      addTab({ default: isDefault, name, label, isEnable, Component })
    })
  }, [addTab, tabList])

  const onClickNameTab = (name: string) => {
    changeCurrentTab(name)
  }

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
              {tabList.map(({ Component, name }) => (
                <RenderComponent
                  key={Math.random()}
                  isActive={loadCurrentTab().key === name}
                >
                  {Component}
                </RenderComponent>
              ))}
            </>
          </TabPanelContainer>
        </ContentItem>
      </Container>
    </TabsProvider>
  )
}

export const Tab = ({ tabList }: TypeContentProps): JSX.Element => {
  return (
    <TabsProvider>
      <TabComponent tabList={tabList} />
    </TabsProvider>
  )
}
