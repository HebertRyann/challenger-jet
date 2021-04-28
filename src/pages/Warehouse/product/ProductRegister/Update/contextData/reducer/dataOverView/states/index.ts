import { TypesDataOvewView } from '../types';

export const initialStateDataOvewView: TypesDataOvewView = {
  categoryCostList: [],
  groupProductList: [],
  subcategoryCostList: [],
  typeProductList: [],
  inputs: {
    categoryCost: { value: '' },
    groupProduct: { value: '' },
    hasVariation: { name: '', hasVariation: false },
    nameProduct: { value: '' },
    subcategoryCost: { value: '' },
    typeProduct: { value: '' },
  },
};
