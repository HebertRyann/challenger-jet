import React, { useState } from 'react';
import { FooterCreateProduct } from '../footer';
import { HeaderCreateProduct } from '../Header';
import {
  Container,
  ContentItem,
  TabHeaderContainer,
  TabName,
  TabPanelContainer,
} from './styles';

import { tabs } from './tables';

export type TypeContentTabs = {
  name: string;
  label: string;
  Component: () => JSX.Element;
};

export const Content = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState(tabs[0].name);

  return (
    <>
      <HeaderCreateProduct />
      <Container>
        <ContentItem>
          <div>
            <TabHeaderContainer>
              {tabs.map((tab, index) => (
                <TabName
                  key={index}
                  onClick={() => setCurrentTab(tab.name)}
                  isActive={tab.name === currentTab}
                >
                  {tab.label}
                </TabName>
              ))}
            </TabHeaderContainer>
            <TabPanelContainer>
              {tabs.map(({ Component, name }, index) => {
                if (name === currentTab) {
                  return (
                    <div key={index}>
                      <Component />
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </TabPanelContainer>
          </div>
        </ContentItem>
        <FooterCreateProduct />
      </Container>
    </>
  );
};
