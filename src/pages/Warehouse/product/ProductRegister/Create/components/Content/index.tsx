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
import { TabCreateProvider } from '../../providers/tabsProvider';
import { ToolsContainerProps } from '../../../../../../../components/Container';

export type TypeContentTabs = {
  name: string;
  label: string;
  isEnable: boolean;
  Component: JSX.Element;
};

type TypeContentProps = {
  tools: ToolsContainerProps[];
};

export const Content = ({ tools }: TypeContentProps): JSX.Element => {
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
      <HeaderCreateProduct tools={tools} />
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
            <TabCreateProvider>
              <>
                {tabs.map(({ Component, name }) => (
                  <RenderComponent isActive={name === loadCurrentTab().key}>
                    {Component}
                  </RenderComponent>
                ))}
              </>
            </TabCreateProvider>
          </TabPanelContainer>
        </ContentItem>
      </Container>
    </>
  );
};
