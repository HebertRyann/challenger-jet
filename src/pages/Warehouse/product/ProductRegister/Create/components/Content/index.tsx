import React, { useEffect, useState } from 'react';
import { FooterCreateProduct } from '../footer';
import { HeaderCreateProduct } from '../Header';
import { TypeTabNameEnableOrDisable } from '../Tabs/DataOverview';
import {
  Container,
  ContentItem,
  RenderComponent,
  TabHeaderContainer,
  TabName,
  TabPanelContainer,
} from './styles';
import { useTabs } from '../../../../../../../hooks/tabs';
import { makeTabs } from './tabs';

export type TypeContentTabs = {
  name: string;
  label: string;
  isEnable?: boolean;
  Component: JSX.Element;
};

export const Content = (): JSX.Element => {
  const { loadTabs, addTab } = useTabs();
  const tabs = makeTabs();

  useEffect(() => {
    tabs.map(tab => addTab(tab));
  }, []);

  const allTabsData = loadTabs();

  const [currentTab, setCurrentTab] = useState(tabs[0].name);

  return (
    <>
      <HeaderCreateProduct />
      <Container>
        <ContentItem>
          <TabHeaderContainer>
            {allTabsData.map(
              ({ label, name, isEnable }, index) =>
                isEnable && (
                  <TabName
                    key={index}
                    onClick={() => setCurrentTab(name)}
                    isActive={name === currentTab}
                  >
                    {label}
                  </TabName>
                ),
            )}
          </TabHeaderContainer>
          <TabPanelContainer>
            <hr />
            {allTabsData.map(({ Component, name }, index) => (
              <RenderComponent isActive={name === currentTab}>
                {Component}
              </RenderComponent>
            ))}
          </TabPanelContainer>
          <footer>
            <button className="btn dark btn-sm sbold uppercase">salvar</button>
          </footer>
        </ContentItem>
      </Container>
    </>
  );
};
