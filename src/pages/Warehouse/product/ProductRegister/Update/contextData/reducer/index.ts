import { Dispatch } from 'react';
import { TypesDataOvewView } from './dataOverView/types';
import { TypeDataOverViewActions } from './dataOverView/actions';

export type TypeDataOverViewReducer = {
  dataOvewViewState: TypesDataOvewView;
  dataOverViewDispatch: Dispatch<TypeDataOverViewActions>;
};
