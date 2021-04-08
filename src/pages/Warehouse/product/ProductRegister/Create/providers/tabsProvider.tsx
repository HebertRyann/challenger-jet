import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  RAW_MATERIAL,
  SALE,
  SEMI_FINISHED,
  RE_SALE,
  LOCATION,
  CONSUMER,
} from '../domain/products';
import {
  labelDataOverview,
  nameDataOverview,
} from '../components/Tabs/DataOverview';

import { labelDetails, nameDetails } from '../components/Tabs/Details';

import { labelFiscal, nameFiscal } from '../components/Tabs/Fiscal';

import {
  labelHasComposition,
  nameHasComposition,
} from '../components/Tabs/HasComposition';

import {
  labelHasVariation,
  nameHasVariation,
} from '../components/Tabs/HasVariation';

import {
  labelPriceComposition,
  namePriceComposition,
} from '../components/Tabs/PriceComposition';

import { labelStock, nameStock } from '../components/Tabs/Stock';

type EntityWithIdAndNameFieldAndParentId = {
  id: string;
  name: string;
  parent_id: string | null;
};

type EntityWithIdAndNameField = {
  id: string;
  name: string;
};

type HasVariation = {
  hasVariation?: boolean;
  name: string;
};

type TypeGenericValueWithError<T> = {
  value: T;
  error: TypeError;
};

type TypeValidationResult = {
  labelName: string;
  linkName: string;
};

type TypeValitionResolve = {
  validate: () => TypeValidationResult[];
};

type TypeDataOverViewProps = {
  typeSelectProdut: TypeGenericValueWithError<EntityWithIdAndNameFieldAndParentId>;
  categoryCost: TypeGenericValueWithError<EntityWithIdAndNameFieldAndParentId>;
  subCategoryCost: TypeGenericValueWithError<EntityWithIdAndNameFieldAndParentId>;
  groupProduct: TypeGenericValueWithError<EntityWithIdAndNameFieldAndParentId>;
  hasVariation: TypeGenericValueWithError<HasVariation>;
  nameProduct: TypeGenericValueWithError<string>;
};

type TypeError = {
  isError: boolean;
  descriptionError?: string;
};

type TypeValueAndError = {
  value: string;
  error: TypeError;
};

type TypeDetailsProps = {
  weight: TypeValueAndError;
  width: TypeValueAndError;
  height: TypeValueAndError;
  length: TypeValueAndError;
  descriptionAndDetails: TypeValueAndError;
  technicalSpecification: TypeValueAndError;
  wayOfUse: TypeValueAndError;
};

type TypeStockProps = {
  unitMensured: TypeGenericValueWithError<EntityWithIdAndNameField>;
  stockCurrent: TypeValueAndError;
};

type TypePriceCompositionProps = {
  profit: TypeValueAndError;
  ipi: TypeValueAndError;
  cost: TypeValueAndError;
  dif: TypeValueAndError;
};

type FieldWithIdName = {
  id: string;
  name: string;
};

type TypeHasVariation = {
  unitMensured: TypeGenericValueWithError<FieldWithIdName>;
  currentStock: TypeValueAndError;
  priceCost: TypeValueAndError;
  priceSale: TypeValueAndError;
  variations: TypeGenericValueWithError<FieldWithIdName>[];
};

type ResolverHasVariation = {
  changeUnitMensured: (unitMensured: FieldWithIdName, index: number) => void;
  changeCurrentStock: (stock: string, index: number) => void;
  changePriceSale: (priceSale: string, index: number) => void;
  changePriceCost: (priceCost: string, index: number) => void;
  changeVariations: (variation: string, x: number, y: number) => void;
  addVariations: (variation: FieldWithIdName, x: number, y: number) => void;
  removeVariations: (x: number, y: number) => void;
  addVariation: () => void;
  removeVariation: (index: number) => void;
};

type TypeGetAndSetHasVariation<T> = {
  getData: () => T;
  setData: ResolverHasVariation;
  validate: () => boolean;
};

type TypeProduct = {
  nameProduct: TypeValueAndError;
  amount: TypeValueAndError;
  cost: TypeValueAndError;
  subtotal: TypeValueAndError;
};

type TypeGetAndSetAndValidateAba<T> = {
  getData: () => T;
  setData: (data: T) => void;
  validate: () => boolean;
};

type ResolverComposition = {
  changeInputNameProduct: (name: string, index: number) => void;
  changeInputAmount: (amount: string, index: number) => void;
  changeInputCost: (cost: string, index: number) => void;
  changeInputSubTotal: (subtotal: string, index: number) => void;
  addComposition: () => void;
  removeComposition: (index: number) => void;
};

type TypeGetAndSetComposition<T> = {
  getData: () => T;
  setData: ResolverComposition;
  validate: () => boolean;
};

type ResolverFiscal = {
  changeNCM: (ncm: string) => void;
  changeCFOP: (cfop: string) => void;
  changeIcmsTaxeIssue: (taxeIssue: FieldWithIdName) => void;
  changeIcmsOrigem: (origem: FieldWithIdName) => void;
  changeIpiTaxeIssue: (taxeIssue: FieldWithIdName) => void;
  changePisTaxeIssue: (taxeIssue: FieldWithIdName) => void;
  changeCofinsTaxeIssue: (taxeIssue: FieldWithIdName) => void;
};

type TypeFiscal = {
  ncm: TypeValueAndError;
  cfop: TypeValueAndError;
  icms: {
    taxesIssue: TypeGenericValueWithError<FieldWithIdName>;
    origem: TypeGenericValueWithError<FieldWithIdName>;
  };
  ipi: {
    taxesIssue: TypeGenericValueWithError<FieldWithIdName>;
  };
  pis: {
    taxesIssue: TypeGenericValueWithError<FieldWithIdName>;
  };
  cofins: {
    taxesIssue: TypeGenericValueWithError<FieldWithIdName>;
  };
};

type TypeGetAndSetFiscal<T> = {
  getData: () => T;
  setData: ResolverFiscal;
  validate: () => boolean;
};

interface TabCreateContext {
  overview: TypeGetAndSetAndValidateAba<TypeDataOverViewProps>;
  details: TypeGetAndSetAndValidateAba<TypeDetailsProps>;
  stock: TypeGetAndSetAndValidateAba<TypeStockProps>;
  priceComposition: TypeGetAndSetAndValidateAba<TypePriceCompositionProps>;
  fiscal: TypeGetAndSetFiscal<TypeFiscal>;
  composition: TypeGetAndSetComposition<TypeProduct[]>;
  variation: TypeGetAndSetHasVariation<TypeHasVariation[]>;
  validation: TypeValitionResolve;
}

const TabCreateContext = createContext<TabCreateContext>(
  {} as TabCreateContext,
);

const TabCreateProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const error: TypeError = {
    isError: false,
    descriptionError: '',
  };
  const initialStateIdAndNameFieild: TypeGenericValueWithError<EntityWithIdAndNameFieldAndParentId> = {
    error,
    value: {
      id: '',
      name: '',
      parent_id: null,
    },
  };

  const initialStateOverview: TypeDataOverViewProps = {
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

  const initialStateDetails: TypeDetailsProps = {
    descriptionAndDetails: { value: '', error },
    height: { value: '', error },
    length: { value: '', error },
    technicalSpecification: { value: '', error },
    wayOfUse: { value: '', error },
    weight: { value: '', error: { isError: false } },
    width: { value: '', error: { isError: false } },
  };

  const initialStateStock: TypeStockProps = {
    stockCurrent: { value: '', error },
    unitMensured: { value: { id: '', name: '' }, error },
  };

  const initialStateComposition: TypeProduct[] = [
    {
      amount: { error, value: '' },
      cost: { error, value: '' },
      nameProduct: { error, value: '' },
      subtotal: { error, value: '' },
    },
  ];

  const initialStatePriceComposition: TypePriceCompositionProps = {
    cost: { error, value: '' },
    dif: { error, value: '' },
    ipi: { error, value: '' },
    profit: { error, value: '' },
  };

  const intialStateHasVariation: TypeHasVariation[] = [
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

  const initialStateFiscal: TypeFiscal = {
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

  const [overView, setOverView] = useState<TypeDataOverViewProps>(
    initialStateOverview,
  );
  const [detail, setDetail] = useState<TypeDetailsProps>(initialStateDetails);
  const [stocks, setStocks] = useState<TypeStockProps>(initialStateStock);
  const [
    priceCompositionState,
    setPriceCompositionState,
  ] = useState<TypePriceCompositionProps>(initialStatePriceComposition);

  const [fiscalState, setFiscalState] = useState<TypeFiscal>(
    initialStateFiscal,
  );

  const [compositionState, setCompositionState] = useState<TypeProduct[]>(
    initialStateComposition,
  );

  const [variationState, setVariationState] = useState<TypeHasVariation[]>(
    intialStateHasVariation,
  );

  const setDataOverView = (newoverView: TypeDataOverViewProps) => {
    setOverView(newoverView);
  };

  const getDataOverView = (): TypeDataOverViewProps => {
    return overView;
  };

  const validationAndSetErrorAllFieldsDataOverView = useCallback(() => {
    let isError = false;

    if (overView.typeSelectProdut.value.id === '') {
      isError = false;
    }

    if (overView.categoryCost.value.id === '') {
      isError = false;
    }

    if (overView.subCategoryCost.value.id === '') {
      isError = false;
    }

    if (overView.groupProduct.value.id === '') {
      isError = false;
    }

    if (overView.nameProduct.value === '') {
      isError = false;
    }

    return isError;
  }, []);

  const setDetails = (details: TypeDetailsProps) => setDetail(details);

  const getDetails = (): TypeDetailsProps => detail;

  const validationAndSetErrorAllFieldsDetails = useCallback(() => {
    let isError = false;

    if (detail.weight.value === '') {
      isError = true;
      detail.weight.error.isError = true;
      setDetail({ ...detail });
    }
    if (detail.width.value === '') {
      isError = true;
      detail.width.error.isError = true;
      setDetail({ ...detail });
    }
    if (detail.height.value === '') {
      isError = true;
      detail.height.error.isError = true;
      setDetail({ ...detail });
    }
    if (detail.length.value === '') {
      isError = true;
      detail.length.error.isError = true;
      setDetail({ ...detail });
    }
    if (detail.descriptionAndDetails.value === '') {
      isError = true;
      detail.descriptionAndDetails.error.isError = true;
      setDetail({ ...detail });
    }
    if (detail.technicalSpecification.value === '') {
      isError = true;
      detail.technicalSpecification.error.isError = true;
      setDetail({ ...detail });
    }
    if (detail.wayOfUse.value === '') {
      isError = true;
      detail.wayOfUse.error.isError = true;
      setDetail({ ...detail });
    }
    return isError;
  }, [detail]);

  const overview: TypeGetAndSetAndValidateAba<TypeDataOverViewProps> = {
    getData: getDataOverView,
    setData: setDataOverView,
    validate: validationAndSetErrorAllFieldsDataOverView,
  };
  const details: TypeGetAndSetAndValidateAba<TypeDetailsProps> = {
    getData: getDetails,
    setData: setDetails,
    validate: validationAndSetErrorAllFieldsDetails,
  };

  const setStock = (stock: TypeStockProps) => setStocks(stock);

  const getStock = (): TypeStockProps => stocks;

  const validationAndSetErrorAllFieldsStock = () => {
    let isError = false;
    if (stocks.stockCurrent.value === '') {
      isError = true;
      setStocks(old => ({
        ...old,
        stockCurrent: { ...old.stockCurrent, error: { isError: true } },
      }));
    }
    if (stocks.unitMensured.value.id === '') {
      isError = true;
      setStocks(old => ({
        ...old,
        unitMensured: { ...old.unitMensured, error: { isError: true } },
      }));
    }
    return isError;
  };

  const stock: TypeGetAndSetAndValidateAba<TypeStockProps> = {
    setData: setStock,
    getData: getStock,
    validate: validationAndSetErrorAllFieldsStock,
  };

  const getDataPriceComposition = (): TypePriceCompositionProps =>
    priceCompositionState;

  const setDataPriceComposition = (
    priceComposition: TypePriceCompositionProps,
  ) => setPriceCompositionState(priceComposition);

  const validationAndSetErrorAllFieldsPriceComposition = useCallback(() => {
    let isError = false;
    if (priceCompositionState.cost.value === '') {
      isError = true;
      setPriceCompositionState(old => ({
        ...old,
        cost: { ...old.cost, error: { isError: true } },
      }));
    }
    if (priceCompositionState.dif.value === '') {
      isError = true;
      setPriceCompositionState(old => ({
        ...old,
        dif: { ...old.dif, error: { isError: true } },
      }));
    }
    if (priceCompositionState.ipi.value === '') {
      isError = true;
      setPriceCompositionState(old => ({
        ...old,
        ipi: { ...old.ipi, error: { isError: true } },
      }));
    }
    if (priceCompositionState.profit.value === '') {
      isError = true;
      setPriceCompositionState(old => ({
        ...old,
        profit: { ...old.profit, error: { isError: true } },
      }));
    }
    return isError;
  }, [priceCompositionState]);

  const priceComposition: TypeGetAndSetAndValidateAba<TypePriceCompositionProps> = {
    getData: getDataPriceComposition,
    setData: setDataPriceComposition,
    validate: validationAndSetErrorAllFieldsPriceComposition,
  };

  const getDataComposition = (): TypeProduct[] => compositionState;

  const setDataComposition = (): ResolverComposition => {
    const addComposition = () => {
      setCompositionState([...compositionState, initialStateComposition[0]]);
    };

    const removeComposition = (index: number) => {
      const productWithOutIndex = compositionState[index];
      const result = compositionState.filter(
        product => product !== productWithOutIndex,
      );
      if (result.length === 0) {
        setCompositionState(initialStateComposition);
      } else {
        setCompositionState([...result]);
      }
    };

    const changeInputNameProduct = (name: string, index: number) => {
      compositionState[index].nameProduct.value = name;
      compositionState[index].nameProduct.error.isError = false;
      setCompositionState([...compositionState]);
    };

    const changeInputAmount = (amount: string, index: number) => {
      compositionState[index].amount.value = amount;
      compositionState[index].amount.error.isError = false;
      setCompositionState([...compositionState]);
    };

    const changeInputCost = (cost: string, index: number) => {
      compositionState[index].cost.value = cost;
      compositionState[index].cost.error.isError = false;
      setCompositionState([...compositionState]);
    };

    const changeInputSubTotal = (subtotal: string, index: number) => {
      compositionState[index].subtotal.value = subtotal;
      compositionState[index].subtotal.error.isError = false;
      setCompositionState([...compositionState]);
    };

    return {
      addComposition,
      removeComposition,
      changeInputAmount,
      changeInputCost,
      changeInputNameProduct,
      changeInputSubTotal,
    };
  };

  const validationAndSetErrorAllFieldsComposition = () => {
    let isError = false;
    composition.getData().map(({ amount, cost, nameProduct, subtotal }) => {
      if (amount.value === '') {
        isError = true;
        amount.error.isError = true;
      }
      if (cost.value === '') {
        isError = true;
        cost.error.isError = true;
      }
      if (nameProduct.value === '') {
        isError = true;
        nameProduct.error.isError = true;
      }
      if (subtotal.value === '') {
        isError = true;
        subtotal.error.isError = true;
      }
    });
    setCompositionState([...compositionState]);
    return isError;
  };

  const composition: TypeGetAndSetComposition<TypeProduct[]> = {
    getData: getDataComposition,
    setData: setDataComposition(),
    validate: validationAndSetErrorAllFieldsComposition,
  };

  const getDataVariation = (): TypeHasVariation[] => variationState;

  const setDataVariation = (): ResolverHasVariation => {
    const changeUnitMensured = (
      unitMensured: FieldWithIdName,
      index: number,
    ) => {
      variationState[index].unitMensured.value = unitMensured;
      variationState[index].currentStock.error.isError = false;
      setVariationState([...variationState]);
    };

    const changeCurrentStock = (stock: string, index: number) => {
      variationState[index].currentStock.value = stock;
      variationState[index].currentStock.error.isError = false;
      setVariationState([...variationState]);
    };

    const changePriceSale = (priceSale: string, index: number) => {
      variationState[index].priceSale.value = priceSale;
      variationState[index].priceSale.error.isError = false;
      setVariationState([...variationState]);
    };

    const changePriceCost = (priceCost: string, index: number) => {
      variationState[index].priceCost.value = priceCost;
      variationState[index].priceCost.error.isError = false;
      setVariationState([...variationState]);
    };

    const changeVariations = (variation: string, x: number, y: number) => {};

    const addVariations = (
      variation: FieldWithIdName,
      x: number,
      y: number,
    ) => {};
    const removeVariations = (x: number, y: number) => {};

    const removeVariation = (index: number) => {
      const variationWithOutIndex = variationState[index];
      const result = variationState.filter(
        variation => variation !== variationWithOutIndex,
      );
      if (result.length === 0) {
        setVariationState(intialStateHasVariation);
      } else {
        setVariationState([...result]);
      }
    };

    const addVariation = () => {
      setVariationState([...variationState, intialStateHasVariation[0]]);
    };

    return {
      changeUnitMensured,
      changeCurrentStock,
      changePriceSale,
      changePriceCost,
      changeVariations,
      addVariations,
      removeVariations,
      removeVariation,
      addVariation,
    };
  };

  const validationAndSetErrorAllFieldsVariation = () => {
    let isError = false;

    variation
      .getData()
      .map(
        (
          { unitMensured, currentStock, priceSale, priceCost, variations },
          index,
        ) => {
          if (currentStock.value === '') {
            variationState[index].currentStock.error.isError = true;
            setVariationState([
              ...variationState,
              {
                priceCost,
                priceSale,
                unitMensured,
                variations,
                currentStock: { error: { isError: true }, value: '' },
              },
            ]);
            isError = true;
          }
        },
      );

    setVariationState([...variationState]);

    return isError;
  };

  const variation: TypeGetAndSetHasVariation<TypeHasVariation[]> = {
    getData: getDataVariation,
    setData: setDataVariation(),
    validate: validationAndSetErrorAllFieldsVariation,
  };

  const getDataFiscal = (): TypeFiscal => fiscalState;

  const setDataFiscal = (): ResolverFiscal => {
    const changeNCM = (ncm: string) => {
      fiscalState.ncm.value = ncm;
      setFiscalState({ ...fiscalState });
    };
    const changeCFOP = (cfop: string) => {
      fiscalState.cfop.value = cfop;
      setFiscalState({ ...fiscalState });
    };
    const changeCofinsTaxeIssue = (taxeIssue: FieldWithIdName) => {
      fiscalState.cofins.taxesIssue.value = taxeIssue;
      setFiscalState({ ...fiscalState });
    };
    const changeIcmsOrigem = (origem: FieldWithIdName) => {
      fiscalState.icms.origem.value = origem;
      setFiscalState({ ...fiscalState });
    };
    const changeIcmsTaxeIssue = (taxeIssue: FieldWithIdName) => {
      fiscalState.icms.taxesIssue.value = taxeIssue;
      setFiscalState({ ...fiscalState });
    };
    const changeIpiTaxeIssue = (taxeIssue: FieldWithIdName) => {
      fiscalState.ipi.taxesIssue.value = taxeIssue;
      setFiscalState({ ...fiscalState });
    };
    const changePisTaxeIssue = (taxeIssue: FieldWithIdName) => {
      fiscalState.pis.taxesIssue.value = taxeIssue;
      setFiscalState({ ...fiscalState });
    };

    return {
      changeCFOP,
      changeCofinsTaxeIssue,
      changeIcmsOrigem,
      changeIcmsTaxeIssue,
      changeIpiTaxeIssue,
      changeNCM,
      changePisTaxeIssue,
    };
  };

  const validationAndSetErrorAllFieldsFiscal = () => {
    let isError = false;

    if (fiscalState.ncm.value === '') {
      isError = true;
    }

    if (fiscalState.cfop.value === '') {
      isError = true;
    }

    return isError;
  };

  const fiscal: TypeGetAndSetFiscal<TypeFiscal> = {
    getData: getDataFiscal,
    setData: setDataFiscal(),
    validate: validationAndSetErrorAllFieldsFiscal,
  };

  const validation: TypeValitionResolve = {
    validate: () => {
      const resultList: TypeValidationResult[] = [];
      const valueSelectedTypeProduct = overView.typeSelectProdut.value.name;
      const hasVariation = overView.hasVariation.value.hasVariation;

      const validateHasVariationOrStock = () => {
        if (hasVariation) {
          if (variation.validate()) {
            resultList.push({
              labelName: labelHasVariation,
              linkName: nameHasVariation,
            });
            console.log('Há erros na aba variação');
          }
        } else {
          if (stock.validate()) {
            resultList.push({
              labelName: labelStock,
              linkName: nameStock,
            });
            console.log('Há erros na aba estoque');
          }
        }
      };

      const validateDataOverViewAndDetailsAndStockOrHasVariation = () => {
        if (overview.validate()) {
          resultList.push({
            labelName: labelDataOverview,
            linkName: nameDataOverview,
          });
          console.log('Há erros na aba dados');
        }
        if (details.validate()) {
          resultList.push({ labelName: labelDetails, linkName: nameDetails });
          console.log('Há erros na aba detalhes');
        }
        validateHasVariationOrStock();
      };

      const validateIsPriceFormationAndFiscal = () => {
        if (priceComposition.validate()) {
          resultList.push({
            labelName: labelPriceComposition,
            linkName: namePriceComposition,
          });
          console.log('Há erros na aba formação de preço');
        }
        if (fiscal.validate()) {
          resultList.push({
            labelName: labelPriceComposition,
            linkName: namePriceComposition,
          });
          console.log('Há erros na aba fiscal');
        }
      };

      if (valueSelectedTypeProduct === SALE.name) {
        validateDataOverViewAndDetailsAndStockOrHasVariation();
        validateIsPriceFormationAndFiscal();

        if (composition.validate()) {
          resultList.push({
            labelName: labelHasComposition,
            linkName: nameHasComposition,
          });
          console.log('Há erros na aba composição');
        }
      }
      if (valueSelectedTypeProduct === SEMI_FINISHED.name) {
        validateDataOverViewAndDetailsAndStockOrHasVariation();
        if (composition.validate()) {
          resultList.push({
            labelName: labelHasComposition,
            linkName: nameHasComposition,
          });
          console.log('Há erros na aba composição');
        }
      }
      if (valueSelectedTypeProduct === RE_SALE.name) {
        validateDataOverViewAndDetailsAndStockOrHasVariation();
        validateIsPriceFormationAndFiscal();
      }
      if (
        valueSelectedTypeProduct === LOCATION.name ||
        valueSelectedTypeProduct === CONSUMER.name ||
        valueSelectedTypeProduct === RAW_MATERIAL.name
      ) {
        validateDataOverViewAndDetailsAndStockOrHasVariation();
      }
      if (resultList.length === 0) {
        console.log('Dados');
        console.log(overView);
        console.log('Detalhes');
        console.log(detail);
        console.log('Estoque');
        console.log(stocks);
        console.log('Variação');
        console.log(variationState);
        console.log('Formação de preço');
        console.log(priceCompositionState);
        console.log('Fiscal');
        console.log(fiscalState);
        console.log('Composição');
        console.log(compositionState);
      }
      return resultList;
    },
  };

  return (
    <TabCreateContext.Provider
      value={{
        overview,
        details,
        stock,
        priceComposition,
        fiscal,
        composition,
        variation,
        validation: validation,
      }}
    >
      {children}
    </TabCreateContext.Provider>
  );
};

function useTabCreate(): TabCreateContext {
  const context = useContext(TabCreateContext);

  if (!context) {
    throw new Error('useTabCreate must be used witin a TabCreateProvider');
  }

  return context;
}

export { TabCreateProvider, useTabCreate };
