import React, { useEffect, useState } from 'react';
import { HeaderCreateProduct } from '../Header';
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
import { useLoading } from '../../../../../../../hooks/loading';

export type TypeContentTabs = {
  name: string;
  label: string;
  isEnable: boolean;
  Component: JSX.Element;
};

export const Content = (): JSX.Element => {
  const { loadTabs, addTab } = useTabs();
  const [currentTab, setCurrentTab] = useState('');
  const { activeLoading, disableLoading } = useLoading();
  const [tabs, setTabs] = useState<TypeContentTabs[]>([]);

  useEffect(() => {
    async function load() {
      activeLoading();
      const tabs = await makeTabs();
      tabs.map(tab => addTab(tab));
      setCurrentTab(tabs[0].name);
      setTabs(loadTabs());
      disableLoading();
    }
    load();
  }, []);

  return (
    <>
      <HeaderCreateProduct />
      <Container>
        <ContentItem>
          <TabHeaderContainer>
            {tabs.map(
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
            {tabs.map(({ Component, name }, index) => (
              <RenderComponent isActive={name === currentTab}>
                {Component}
              </RenderComponent>
            ))}
          </TabPanelContainer>
        </ContentItem>
      </Container>
    </>
  );
};
