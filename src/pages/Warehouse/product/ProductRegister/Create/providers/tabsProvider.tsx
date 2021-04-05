import React, { createContext, useCallback, useContext, useState } from 'react';

type EntityWithIdAndNameField = {
  id: string;
  name: string;
  parent_id: string | null;
};

type HasVariation = {
  hasVariation?: boolean;
  name: string;
};

type TypeDataOverViewProps = {
  typeSelectProdut: EntityWithIdAndNameField;
  categoryCost: EntityWithIdAndNameField;
  subCategoryCost: EntityWithIdAndNameField;
  groupProduct: EntityWithIdAndNameField;
  hasVariation: HasVariation;
  nameProduct: string;
};

interface TabCreateContext {
  setDataOverView: (overView: TypeDataOverViewProps) => void;
  getDataOverView: () => TypeDataOverViewProps;
}

const TabCreateContext = createContext<TabCreateContext>(
  {} as TabCreateContext,
);

const TabCreateProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const initialStateIdAndNameFieild = { id: '', name: '', parent_id: null };
  const initialState: TypeDataOverViewProps = {
    categoryCost: initialStateIdAndNameFieild,
    subCategoryCost: initialStateIdAndNameFieild,
    groupProduct: initialStateIdAndNameFieild,
    typeSelectProdut: initialStateIdAndNameFieild,
    hasVariation: {
      name: '',
      hasVariation: false
    },
    nameProduct: '',
  };
  const [overView, setOverView] = useState<TypeDataOverViewProps>(initialState);

  const setDataOverView = (NewoverView: TypeDataOverViewProps) => {
    setOverView(NewoverView);
  };
  const getDataOverView = (): TypeDataOverViewProps => {
    return overView;
  };

  return (
    <TabCreateContext.Provider value={{ getDataOverView, setDataOverView }}>
      {children}
    </TabCreateContext.Provider>
  );
};

function useTabCreate(): TabCreateContext {
  const context = useContext(TabCreateContext);

  if (!context) {
    throw new Error('useTabCreate must be used witin a TabCreateProvider');
  }

  return context;
}

export { TabCreateProvider, useTabCreate };
