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
  const { loadTabs, addTab, loadCurrentTab, changeCurrentTab } = useTabs();
  const { activeLoading, disableLoading } = useLoading();
  const [tabs, setTabs] = useState<TypeContentTabs[]>([]);

  useEffect(() => {
    async function load() {
      activeLoading();
      const tabs = await makeTabs();
      tabs.map(tab => addTab(tab));
      changeCurrentTab(tabs[0].name);
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
                    onClick={() => changeCurrentTab(name)}
                    isActive={name === loadCurrentTab().key}
                  >
                    {label}
                  </TabName>
                ),
            )}
          </TabHeaderContainer>
          <TabPanelContainer>
            <hr />
            {tabs.map(({ Component, name }) => (
              <RenderComponent isActive={name === loadCurrentTab().key}>
                {Component}
              </RenderComponent>
            ))}
          </TabPanelContainer>
        </ContentItem>
      </Container>
    </>
  );
};
