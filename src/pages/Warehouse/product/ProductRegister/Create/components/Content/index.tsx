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
              <hr style={{ marginBottom: '20px' }} />
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
              <hr style={{ marginBottom: '20px' }} />
              <FooterCreateProduct />
            </TabPanelContainer>
          </div>
          <footer>
            <button className="btn dark btn-sm sbold uppercase">
              <span
                className="fa fa-check"
                aria-hidden="true"
                style={{ marginRight: '5px' }}
              />
              Cadastrar
            </button>
            <button className="btn btn-sm sbold uppercase">
              <span
                className="fa fa-remove"
                aria-hidden="true"
                style={{ marginRight: '5px' }}
              />
              Cancelar
            </button>
          </footer>
        </ContentItem>
      </Container>
    </>
  );
};
