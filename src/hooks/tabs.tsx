import React, { createContext, useContext, useState } from 'react';

type TypeTabs = {
  name: string;
  label: string;
  Component: JSX.Element;
  isEnable?: boolean | undefined;
};

type TypeTabsContext = {
  addTab: (newTab: TypeTabs) => void;
  removeTab: (keyTab: string) => void;
  loadTabs: () => TypeTabs[];
  activeTab: (keyTab: string) => void;
  disableTab: (keyTab: string) => void;
};

type TypeTabsProvider = {
  children: JSX.Element;
};

const TabsContext = createContext<TypeTabsContext>({} as TypeTabsContext);

const TabsProvider = ({ children }: TypeTabsProvider): JSX.Element => {
  const [tabs, setTabs] = useState<TypeTabs[]>([]);

  const addTab = (newTab: TypeTabs): void => {
    tabs.push(newTab);
    setTabs([...tabs]);
  };

  const removeTab = (keyTab: string): void => {
    try {
      const result = tabs.filter(({ name }) => name === keyTab);
      if (!result) {
        const resultTabsWithouRemoveTab = tabs.filter(
          ({ name }) => keyTab !== name,
        );
        setTabs(resultTabsWithouRemoveTab);
        return;
      }
      throw new Error('No find tab with id');
    } catch (error) {
      console.error(error.message);
    }
  };

  const loadTabs = (): TypeTabs[] => tabs;

  const activeTab = (keyTab: string) => {
    try {
      const result = tabs.filter(({ name }) => name === keyTab);
      if (result) {
        const indexTab = tabs.indexOf(result[0]);
        tabs[indexTab].isEnable = true;
        setTabs([...tabs]);
        return;
      }
      throw new Error('No find tab with id');
    } catch (error) {
      console.error(error.message);
    }
  };

  const disableTab = (keyTab: string) => {
    try {
      const result = tabs.filter(({ name }) => name === keyTab);
      if (result) {
        const indexTab = tabs.indexOf(result[0]);
        tabs[indexTab].isEnable = false;
        setTabs([...tabs]);
        return;
      }
      throw new Error('No find tab with id');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <TabsContext.Provider
      value={{ addTab, removeTab, loadTabs, activeTab, disableTab }}
    >
      {children}
    </TabsContext.Provider>
  );
};

const useTabs = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('useTabs must be used witin a TabsProvider');
  }

  return context;
};

export { TabsProvider, useTabs };
