import React from 'react'
import { TabsModel } from '../../domain/models/tabs'
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

export const Tab = ({ tabList }: TypeContentProps): JSX.Element => {
  return (
    <Container>
      <ContentItem>
        <TabHeaderContainer>
          {tabList.map(
            ({ label, isEnable }, index) =>
              isEnable && (
                <TabName key={index} isActive={true}>
                  {label}
                </TabName>
              )
          )}
        </TabHeaderContainer>
        <TabPanelContainer>
          <>
            <hr />
            {tabList.map(({ Component, name }) => (
              <RenderComponent key={Math.random()} isActive={name === ''}>
                {Component}
              </RenderComponent>
            ))}
          </>
        </TabPanelContainer>
      </ContentItem>
    </Container>
  )
}
