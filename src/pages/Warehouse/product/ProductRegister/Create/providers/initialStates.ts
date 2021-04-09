import {
  TypeDataOverViewProps,
  TypeGenericValueWithError,
  TypeErroProps,
  EntityWithIdAndNameFieldAndParentId,
  TypeDetailsProps,
  TypeStockProps,
  TypeProduct,
  TypeHasVariation,
  TypePriceCompositionProps,
  TypeFiscal,
} from './domain.types';

export const error: TypeErroProps = {
  isError: false,
};

export const initialStateIdAndNameFieild: TypeGenericValueWithError<EntityWithIdAndNameFieldAndParentId> = {
  error,
  value: {
    id: '',
    name: '',
    parent_id: null,
  },
};

export const initialStateOverview: TypeDataOverViewProps = {
  categoryCost: initialStateIdAndNameFieild,
  subCategoryCost: initialStateIdAndNameFieild,
  groupProduct: initialStateIdAndNameFieild,
  typeSelectProdut: initialStateIdAndNameFieild,
  hasVariation: {
    error,
    value: { name: '', hasVariation: false },
  },
  nameProduct: { error, value: '' },
};

export const initialStateDetails: TypeDetailsProps = {
  descriptionAndDetails: { value: '', error },
  height: { value: '', error },
  length: { value: '', error },
  technicalSpecification: { value: '', error },
  wayOfUse: { value: '', error },
  weight: { value: '', error: { isError: false } },
  width: { value: '', error: { isError: false } },
};

export const initialStateStock: TypeStockProps = {
  stockCurrent: { value: '', error },
  unitMensured: { value: { id: '', name: '' }, error },
  priceCost: { value: '', error },
  priceSale: { value: '', error },
};

export const initialStateComposition: TypeProduct[] = [
  {
    amount: { error, value: '' },
    cost: { error, value: '' },
    nameProduct: { error, value: '' },
    subtotal: { error, value: '' },
  },
];

export const initialStatePriceComposition: TypePriceCompositionProps = {
  cost: { error, value: '' },
  dif: { error, value: '' },
  ipi: { error, value: '' },
  profit: { error, value: '' },
};

export const intialStateHasVariation: TypeHasVariation[] = [
  {
    unitMensured: {
      error,
      value: { id: '', name: '' },
    },
    priceCost: { error, value: '' },
    currentStock: {
      error,
      value: '',
    },
    priceSale: { error, value: '' },
    variations: [{ error, value: { id: '', name: '' } }],
  },
];

export const initialStateFiscal: TypeFiscal = {
  ncm: { error, value: '' },
  cfop: { error, value: '' },
  icms: {
    taxesIssue: { error, value: { id: '', name: '' } },
    origem: { error, value: { id: '', name: '' } },
  },
  ipi: { taxesIssue: { error, value: { id: '', name: '' } } },
  pis: { taxesIssue: { error, value: { id: '', name: '' } } },
  cofins: { taxesIssue: { error, value: { id: '', name: '' } } },
};
