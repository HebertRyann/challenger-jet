import React, { createContext, useContext, useReducer } from 'react';
import { TypeDataOverViewReducer } from '../reducer';
import { initialStateProduct } from './initialState';
import { dataOverViewReducer } from '../reducer/dataOverView/reducers';
import { initialStateDataOvewView } from '../reducer/dataOverView/states';
import { DataOvewViewActionTypes } from '../reducer/dataOverView/actions';

type TypeUpdateProvider = {
  children: JSX.Element;
};

export type ProductContextType = {
  dataOverView: TypeDataOverViewReducer;
  validate: () => void;
};

const HasVariationContext = createContext<ProductContextType>(
  initialStateProduct,
);

const ProviderProduct = ({ children }: TypeUpdateProvider) => {
  const [overView, overViewdispatch] = useReducer(
    dataOverViewReducer,
    initialStateDataOvewView,
  );

  const validate = () => {
    console.log('Validate all');
    overViewdispatch({
      type: DataOvewViewActionTypes.VALIDATE_DATA_OVER_VIEW,
      payload: null,
    });
  };

  return (
    <HasVariationContext.Provider
      value={{
        dataOverView: {
          dataOvewViewState: overView,
          dataOverViewDispatch: overViewdispatch,
        },
        validate,
      }}
    >
      {children}
    </HasVariationContext.Provider>
  );
};

function useProduct(): ProductContextType {
  const context = useContext(HasVariationContext);

  if (!context) {
    throw new Error('useProduct must be used witin a ProviderProduct');
  }

  return context;
}

export { useProduct, ProviderProduct, DataOvewViewActionTypes };
