import { initialStateDataOvewView } from '../reducer/dataOverView/states';
import { ProductContextType } from './index';

export const initialStateProduct: ProductContextType = {
  dataOverView: {
    dataOvewViewState: initialStateDataOvewView,
    dataOverViewDispatch: () => null,
  },
  validate: () => null,
};
