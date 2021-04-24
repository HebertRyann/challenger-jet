import React, { createContext, useContext, useReducer } from 'react';
import { hasVariationReducer } from './reducer';
import {
  TypeHasVariationAction,
  TypeHasVariationState,
  HasVariationActionTypes,
} from './types';

type HasVariationState = {
  state: TypeHasVariationState;
  dispatch: React.Dispatch<TypeHasVariationAction>;
};

type TypeHasVariationContext = {
  state: TypeHasVariationState;
  dispatch: React.Dispatch<TypeHasVariationAction>;
};

const initialState: TypeHasVariationState = {
  hasVariation: {
    inputs: [
      {
        unitMensured: {
          value: '',
        },
        currentStock: {
          value: '',
        },
        replamenentPoint: { value: '' },
        price: {
          cost: { value: '' },
          sale: { value: '' },
        },
        atributes: [{ id: 0, name: '' }],
      },
    ],
  },
};

const HasVariationContext = createContext<HasVariationState>({
  dispatch: () => null,
  state: initialState,
});

type TypeHasVariationProvider = {
  children: JSX.Element;
};

const mainReducer = () => {

}

const HasVariationProvider = ({
  children,
}: TypeHasVariationProvider): JSX.Element => {
  const [state, dispatch] = useReducer(hasVariationReducer, initialState);

  return (
    <HasVariationContext.Provider value={{ state, dispatch }}>
      {children}
    </HasVariationContext.Provider>
  );
};

function useHasVariation(): TypeHasVariationContext {
  const context = useContext(HasVariationContext);

  if (!context) {
    throw new Error(
      'useHasVariation must be used witin a HasVariationProvider',
    );
  }

  return context;
}

export { HasVariationProvider, useHasVariation, HasVariationActionTypes };
