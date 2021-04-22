import React, { createContext, useContext, useReducer } from 'react';
import { AtributeActions, atributesReducer } from './reducers';

export type AtributeState = {
  id: number;
  parent_id: number;
  name: string;
  isChecked: boolean;
};

type InitialAtributeState = {
  atributes: AtributeState[];
};

type TypeAtributeContext = {
  state: InitialAtributeState;
  dispatch: React.Dispatch<AtributeActions>;
};

const initialState: InitialAtributeState = {
  atributes: [{ id: 0, isChecked: false, parent_id: 0, name: '' }],
};

const AtributeContext = createContext<TypeAtributeContext>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { atributes }: { atributes: any },
  action: AtributeActions,
) => ({
  atributes: atributesReducer(atributes, action),
});

type TypeAtributeProvider = {
  children: JSX.Element;
};

const AtributeProvider = ({ children }: TypeAtributeProvider): JSX.Element => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AtributeContext.Provider value={{ state, dispatch }}>
      {children}
    </AtributeContext.Provider>
  );
};

function useAtribute(): TypeAtributeContext {
  const context = useContext(AtributeContext);

  if (!context) {
    throw new Error('useAtribute must be used witin a AtributeProvider');
  }

  return context;
}

export { AtributeProvider, useAtribute };
