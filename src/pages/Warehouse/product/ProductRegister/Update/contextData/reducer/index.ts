import { Dispatch } from 'react';
import { TypesDataOvewView } from './dataOverView/types';
import { TypeDataOverViewActions } from './dataOverView/actions';

type TypeDataOverViewReducer = {
  dataOvewViewState: TypesDataOvewView;
  dataOverViewDispatch: Dispatch<TypeDataOverViewActions>;
};

export type MainReducerType = {
  dataOverView: TypeDataOverViewReducer;
};
