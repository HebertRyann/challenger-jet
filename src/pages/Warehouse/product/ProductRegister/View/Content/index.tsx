import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  ContentItem,
  RenderComponent,
  TabHeaderContainer,
  TabName,
  TabPanelContainer,
} from './styles';
import { useTabs } from '../../../../../../hooks/tabs';
import { makeTabs } from './tabs';

export type TypeContentTabs = {
  name: string;
  label: string;
  isEnable: boolean;
  Component: JSX.Element;
};

type Link = {
  link: string;
  name: string;
};

export const Content = (): JSX.Element => {
  const [tabs, setTabs] = useState<TypeContentTabs[]>([]);
  const { loadTabs, addTab, loadCurrentTab, changeCurrentTab } = useTabs();

  useEffect(() => {
    async function load() {
      const tabs = await makeTabs();
      tabs.map(tab => addTab(tab));
      changeCurrentTab(tabs[0].name);
      setTabs(loadTabs());
    }
    load();
  }, []);

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
                ),
            )}
          </TabHeaderContainer>
          <TabPanelContainer>
            <>
              {tabs.map(({ Component, name }) => (
                <RenderComponent isActive={name === loadCurrentTab().key}>
                  {Component}
                </RenderComponent>
              ))}
            </>
          </TabPanelContainer>
        </ContentItem>
      </Container>
    </>
  );
};
