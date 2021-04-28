import { initialStateDataOvewView } from './dataOverView/states';
import { MainReducerType } from './index';

export const initialMainState: MainReducerType = {
  dataOverView: {
    dataOvewViewState: initialStateDataOvewView,
    dataOverViewDispatch: () => null,
  },
};
