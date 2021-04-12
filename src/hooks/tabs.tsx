import React, { createContext, useCallback, useContext, useState } from 'react';

type TypeTabs = {
  name: string;
  label: string;
  Component: JSX.Element;
  isEnable: boolean;
};

type TypeCurrentTab = {
  key: string;
};

type TypeTabsContext = {
  addTab: (newTab: TypeTabs) => void;
  removeTab: (keyTab: string) => void;
  loadTabs: () => TypeTabs[];
  activeTab: (keyTab: string) => void;
  disableTab: (keyTab: string) => void;
  changeCurrentTab: (keyTab: string) => void;
  changeCurrentTabForNext: (keyTab: string) => void;
  loadCurrentTab: () => TypeCurrentTab;
  changeCurrentTabForPrevious: (keyTab: string) => void;
};

type TypeTabsProvider = {
  children: JSX.Element;
};

const TabsContext = createContext<TypeTabsContext>({} as TypeTabsContext);

const TabsProvider = ({ children }: TypeTabsProvider): JSX.Element => {
  const [tabs, setTabs] = useState<TypeTabs[]>([]);
  const [currentTab, setCurrentTab] = useState<TypeCurrentTab>({ key: '' });

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

  const activeTab = useCallback(
    (keyTab: string) => {
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
    },
    [tabs],
  );

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

  const changeCurrentTab = useCallback(
    (keyTab: string): void => setCurrentTab({ key: keyTab }),
    [currentTab],
  );

  const loadCurrentTab = (): TypeCurrentTab => currentTab;

  const changeCurrentTabForNext = useCallback(
    (keyTab: string) => {
      if (keyTab) {
        const index = tabs
          .filter(({ isEnable }) => isEnable)
          .findIndex(({ name }) => name === keyTab);
        const nextTab = tabs
          .filter(({ isEnable }) => isEnable)
          .find((tab, nextIndex) => {
            return nextIndex === index + 1 ? tab : null;
          });
        if (nextTab) {
          setCurrentTab({ key: nextTab.name });
        }
      }
    },
    [currentTab, tabs],
  );

  const changeCurrentTabForPrevious = useCallback(
    (keyTab: string) => {
      if (keyTab) {
        const index = tabs
          .filter(({ isEnable }) => isEnable)
          .findIndex(({ name }) => name === keyTab);
        const nextTab = tabs
          .filter(({ isEnable }) => isEnable)
          .find((tab, nextIndex) => {
            return nextIndex === index - 1 ? tab : null;
          });
        if (nextTab) {
          setCurrentTab({ key: nextTab.name });
        }
      }
    },
    [currentTab, tabs],
  );

  return (
    <TabsContext.Provider
      value={{
        addTab,
        removeTab,
        loadTabs,
        activeTab,
        disableTab,
        changeCurrentTab,
        loadCurrentTab,
        changeCurrentTabForPrevious,
        changeCurrentTabForNext,
      }}
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
