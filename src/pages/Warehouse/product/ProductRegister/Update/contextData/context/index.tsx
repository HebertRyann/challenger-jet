import React, { createContext, useContext, useReducer } from 'react';
import { MainReducerType } from '../reducer';
import { initialMainState } from '../reducer/initialStateMain';
import { dataOverViewReducer } from '../reducer/dataOverView/reducers';
import { initialStateDataOvewView } from '../reducer/dataOverView/states';
import { DataOvewViewActionTypes } from '../reducer/dataOverView/actions';

type TypeUpdateProvider = {
  children: JSX.Element;
};

const HasVariationContext = createContext<MainReducerType>(initialMainState);

const ProviderProduct = ({ children }: TypeUpdateProvider) => {
  const [overView, overViewdispatch] = useReducer(
    dataOverViewReducer,
    initialStateDataOvewView,
  );
  return (
    <HasVariationContext.Provider
      value={{
        dataOverView: {
          dataOvewViewState: overView,
          dataOverViewDispatch: overViewdispatch,
        },
      }}
    >
      {children}
    </HasVariationContext.Provider>
  );
};

function useProduct(): MainReducerType {
  const context = useContext(HasVariationContext);

  if (!context) {
    throw new Error('useProduct must be used witin a ProviderProduct');
  }

  return context;
}

export { useProduct, ProviderProduct, DataOvewViewActionTypes };
