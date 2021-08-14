import React, { useEffect, useState } from 'react'
import {
  Container,
  ContentItem,
  RenderComponent,
  TabHeaderContainer,
  TabName,
  TabPanelContainer
} from './styles'
import { useTabs } from '../../../../../../../hooks/tabs'
import { makeTabs } from './tabs'

export type TypeContentTabs = {
  name: string
  label: string
  isEnable: boolean
  Component?: JSX.Element
}

export const Content = (): JSX.Element => {
  const { tabs, addTab, loadCurrentTab, changeCurrentTab } = useTabs()

  useEffect(() => {
    async function load() {
      const tabs = await makeTabs()
      tabs.map(tab => addTab(tab))
      changeCurrentTab(tabs[0].name)
    }
    load()
  }, [])

  return (
    <>
      <Container>
        <ContentItem>
          <TabHeaderContainer>
            {tabs.map(
              ({ label, name, isEnable }, index) =>
                isEnable && (
                  <TabName
                    key={index}
                    onClick={() => changeCurrentTab(name)}
                    isActive={name === loadCurrentTab().key}
                  >
                    {label}
                  </TabName>
                )
            )}
          </TabHeaderContainer>
          <TabPanelContainer>
            <>
              {tabs.map(({ Component, name }) => (
                <RenderComponent
                  key={name}
                  isActive={name === loadCurrentTab().key}
                >
                  {Component}
                </RenderComponent>
              ))}
            </>
          </TabPanelContainer>
        </ContentItem>
      </Container>
    </>
  )
}
