import React, { createContext, useCallback, useContext, useState } from 'react';
import { updateProduct } from '../services/api/updateProduct';
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
import {
  initialStateComposition,
  initialStateDetails,
  initialStateFiscal,
  initialStateOverview,
  initialStatePriceComposition,
  initialStateStock,
  intialStateHasVariation,
} from './initialStates';
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
import {
  TypeDataOverViewProps,
  TypeDetailsProps,
  TypeFiscal,
  TypeGetAndSetAndValidateAba,
  TypeGetAndSetComposition,
  TypeGetAndSetFiscal,
  TypePriceCompositionProps,
  TypeStockProps,
  TypeProduct,
  TypeHasVariation,
  TypeGetAndSetHasVariation,
  TypeValitionResolve,
  ResolverComposition,
  ResolverHasVariation,
  FieldWithIdName,
  ResolverFiscal,
  TypeValidationResult,
  ResultOnSaveProdut,
  TypeProductDataOverView,
  TypeProductStock,
  TypeAtributes,
  PriceCompositionAndFiscal,
  CompositionRequest,
  AtributesList,
  TypeGenericValueWithError,
} from './domain.types';
import {
  convertValueMaskInNumber,
  convertValueWithMaskInNumber,
} from '../../../../../../utlis/mask';
interface TabCreateContext {
  overview: TypeGetAndSetAndValidateAba<TypeDataOverViewProps>;
  details: TypeGetAndSetAndValidateAba<TypeDetailsProps>;
  stock: TypeGetAndSetAndValidateAba<TypeStockProps>;
  priceComposition: TypeGetAndSetAndValidateAba<TypePriceCompositionProps>;
  fiscal: TypeGetAndSetFiscal<TypeFiscal>;
  composition: TypeGetAndSetComposition<TypeProduct[]>;
  variation: TypeGetAndSetHasVariation<TypeHasVariation[]>;
  validation: TypeValitionResolve;
  save: () => Promise<ResultOnSaveProdut>;
  addOverView: (overview: TypeDataOverViewProps) => void;
  addDetails: (details: TypeDetailsProps) => void;
  addStock: (stock: TypeStockProps) => void;
  addHasVariation: (hasVariation: TypeHasVariation) => void;
  addHasComposition: (hasComposition: TypeProduct) => void;
  addPriceComposition: (priceComposition: TypePriceCompositionProps) => void;
  addFiscal: (fiscal: TypeFiscal) => void;
}

const TabCreateContext = createContext<TabCreateContext>(
  {} as TabCreateContext,
);

const TabUpdateProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [overView, setOverView] = useState<TypeDataOverViewProps>(
    initialStateOverview,
  );
  const [producIdAndStockId, setProducIdAndStockId] = useState<
    { productId: number; stockId: number }[]
  >([{ productId: 0, stockId: 0 }]);
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

  const setDataOverView = (newOverView: TypeDataOverViewProps) =>
    setOverView(newOverView);

  const getDataOverView = (): TypeDataOverViewProps => {
    return overView;
  };

  const validationAndSetErrorAllFieldsDataOverView = useCallback(() => {
    let isError = false;

    if (overView.typeSelectProdut.value.name === '') {
      isError = true;
      setOverView(old => ({
        ...old,
        typeSelectProdut: {
          error: { isError: true },
          value: old.typeSelectProdut.value,
        },
      }));
    }
    if (overView.categoryCost.value.id === '') {
      isError = true;
      setOverView(old => ({
        ...old,
        categoryCost: {
          error: { isError: true },
          value: old.categoryCost.value,
        },
      }));
    }
    if (overView.subCategoryCost.value.id === '') {
      isError = true;
      setOverView(old => ({
        ...old,
        subCategoryCost: {
          error: { isError: true },
          value: old.subCategoryCost.value,
        },
      }));
    }
    if (overView.groupProduct.value.id === '') {
      isError = true;
      setOverView(old => ({
        ...old,
        groupProduct: {
          error: { isError: true },
          value: old.groupProduct.value,
        },
      }));
    }
    if (overView.nameProduct.value === '') {
      isError = true;
      setOverView(old => ({
        ...old,
        nameProduct: {
          error: { isError: true },
          value: old.nameProduct.value,
        },
      }));
    }

    if (overView.hasVariation.value.name === '') {
      isError = true;
      setOverView(old => ({
        ...old,
        hasVariation: {
          error: { isError: true },
          value: old.hasVariation.value,
        },
      }));
    }

    return isError;
  }, [overView]);

  const setDetails = (details: TypeDetailsProps) => setDetail(details);

  const getDetails = (): TypeDetailsProps => detail;

  const validationAndSetErrorAllFieldsDetails = useCallback(() => {
    let isError = false;

    if (detail.weight.value === '') {
      isError = true;
      setDetail(old => ({
        ...old,
        weight: { ...old.weight, error: { isError: true } },
      }));
    }
    if (detail.width.value === '') {
      isError = true;
      setDetail(old => ({
        ...old,
        width: { ...old.width, error: { isError: true } },
      }));
    }
    if (detail.height.value === '') {
      isError = true;
      setDetail(old => ({
        ...old,
        height: { ...old.height, error: { isError: true } },
      }));
    }
    if (detail.length.value === '') {
      isError = true;
      setDetail(old => ({
        ...old,
        length: { ...old.length, error: { isError: true } },
      }));
    }
    if (detail.descriptionAndDetails.value === '') {
      isError = true;
      setDetail(old => ({
        ...old,
        descriptionAndDetails: {
          ...old.descriptionAndDetails,
          error: { isError: true },
        },
      }));
    }
    if (detail.technicalSpecification.value === '') {
      isError = true;
      setDetail(old => ({
        ...old,
        technicalSpecification: {
          ...old.technicalSpecification,
          error: { isError: true },
        },
      }));
    }
    if (detail.wayOfUse.value === '') {
      isError = true;
      setDetail(old => ({
        ...old,
        wayOfUse: { ...old.wayOfUse, error: { isError: true } },
      }));
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

  const validationAndSetErrorAllFieldsStock = useCallback(() => {
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
    if (stocks.replacementPoint.value === '') {
      isError = true;
      setStocks(old => ({
        ...old,
        replacementPoint: { ...old.replacementPoint, error: { isError: true } },
      }));
    }

    if (
      overView.typeSelectProdut.value.name === SALE.name ||
      overView.typeSelectProdut.value.name === RE_SALE.name
    ) {
      if (stocks.priceCost?.value === '') {
        isError = true;
        setStocks(old => ({
          ...old,
          priceCost: { ...old?.priceCost, error: { isError: true } },
        }));
      }
    }

    return isError;
  }, [stocks, overView.typeSelectProdut]);

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
      setProducIdAndStockId([
        ...producIdAndStockId,
        { productId: 0, stockId: 0 },
      ]);
    };

    const removeComposition = (index: number) => {
      const productWithOutIndex = compositionState[index];
      const productAndStockIdWithOutIndex = producIdAndStockId[index];
      const result = compositionState.filter(
        product => product !== productWithOutIndex,
      );
      const resultProductAndStockIdWithOutIndex = producIdAndStockId.filter(
        product => product !== productAndStockIdWithOutIndex,
      );
      if (result.length === 0) {
        setCompositionState(initialStateComposition);
      } else {
        setCompositionState([...result]);
      }
      if (resultProductAndStockIdWithOutIndex.length === 0) {
        setProducIdAndStockId([{ productId: 0, stockId: 0 }]);
      } else {
        setProducIdAndStockId([...resultProductAndStockIdWithOutIndex]);
      }
    };

    const changeInputNameProduct = (name: string, index: number) => {
      let tempState: TypeProduct[] = JSON.parse(
        JSON.stringify(compositionState),
      );
      tempState.map(({ nameProduct }, key) => {
        if (key === index) {
          nameProduct.value = name;
          nameProduct.error.isError = false;
        }
      });
      setCompositionState([...tempState]);
    };

    const changeInputAmount = (newAmount: string, index: number) => {
      let tempState: TypeProduct[] = JSON.parse(
        JSON.stringify(compositionState),
      );
      tempState.map(({ cost, amount, subtotal }, key) => {
        if (key === index) {
          amount.value = newAmount;
          amount.error.isError = false;
          if (cost.value !== '') {
            subtotal.error.isError = false;
          }
        }
      });
      setCompositionState([...tempState]);
    };

    const changeInputCost = (newCost: string, index: number) => {
      let tempState: TypeProduct[] = JSON.parse(
        JSON.stringify(compositionState),
      );
      tempState.map(({ cost, amount, subtotal }, key) => {
        if (key === index) {
          cost.value = newCost;
          cost.error.isError = false;
          if (amount.value !== '') {
            subtotal.error.isError = false;
          }
        }
      });
      setCompositionState([...tempState]);
    };

    const changeInputSubTotal = (subtotal: string, index: number) => {};

    const changeInputProductIdAndStockId = (
      newProductId: number,
      newStockId: number,
      index: number,
    ) => {
      producIdAndStockId.map((_, key) => {
        if (key === index) {
          producIdAndStockId[key].productId = newProductId;
          producIdAndStockId[key].stockId = newStockId;
        }
      });
      setProducIdAndStockId([...producIdAndStockId]);
    };

    const loadInputProductIdAndStockId = (): {
      productId: number;
      stockId: number;
    }[] => producIdAndStockId;

    return {
      loadInputProductIdAndStockId,
      changeInputProductIdAndStockId,
      addComposition,
      removeComposition,
      changeInputAmount,
      changeInputCost,
      changeInputNameProduct,
      changeInputSubTotal,
    };
  };

  const validationAndSetErrorAllFieldsComposition = useCallback(() => {
    let isError = false;
    const tempState: TypeProduct[] = JSON.parse(
      JSON.stringify(compositionState),
    );

    tempState.map(({ amount, cost, nameProduct, subtotal }) => {
      if (amount.value === '') {
        isError = true;
        amount.error.isError = true;
      }
      if (cost.value === '') {
        isError = true;
        cost.error.isError = true;
        subtotal.error.isError = true;
      }
      if (nameProduct.value === '') {
        isError = true;
        nameProduct.error.isError = true;
        subtotal.error.isError = true;
      }
    });
    setCompositionState(tempState);
    return isError;
  }, [compositionState]);

  const composition: TypeGetAndSetComposition<TypeProduct[]> = {
    getData: getDataComposition,
    setData: setDataComposition(),
    validate: validationAndSetErrorAllFieldsComposition,
  };

  const getDataVariation = (): TypeHasVariation[] => variationState;

  const changeAtributes = useCallback(
    (atribute: AtributesList, x: number, y: number) => {
      let tempState: TypeHasVariation[] = JSON.parse(
        JSON.stringify(variationState),
      );
      if (tempState[x].atributes[y]) {
        tempState[x].atributes[y].error.isError = false;
        tempState[x].atributes[y].value = atribute;
        setVariationState([...tempState]);
      }
    },
    [variationState],
  );

  const addVariation = useCallback(() => {
    const temp: TypeGenericValueWithError<AtributesList>[] = [];

    for (let index = 0; index < variationState[0].atributes.length; index++) {
      temp.push({
        error: { isError: false },
        value: {
          id: '',
          keyParent: '',
          name: '',
        },
      });
    }

    const tempAtrbutes = intialStateHasVariation[0];
    tempAtrbutes.atributes = temp;
    setVariationState([...variationState, tempAtrbutes]);
  }, [variationState]);

  const removeVariation = useCallback(
    (index: number) => {
      const variationWithOutIndex = variationState[index];
      const indexRemove = variationState.indexOf(variationWithOutIndex);
      if (indexRemove >= 0) {
        variationState.splice(indexRemove, 1);
        if (variationState.length === 0) {
          setVariationState(intialStateHasVariation);
        } else {
          setVariationState([...variationState]);
        }
      }
    },
    [variationState],
  );

  const setDataVariation = (): ResolverHasVariation => {
    const changeUnitMensured = (
      newUnitMensured: FieldWithIdName,
      index: number,
    ) => {
      let tempState: TypeHasVariation[] = JSON.parse(
        JSON.stringify(variationState),
      );
      tempState.map(({ unitMensured }, key) => {
        if (key === index) {
          unitMensured.value = newUnitMensured;
          unitMensured.error.isError = false;
        }
      });
      setVariationState([...tempState]);
    };

    const changeCurrentStock = (newCurrentStock: string, index: number) => {
      let tempState: TypeHasVariation[] = JSON.parse(
        JSON.stringify(variationState),
      );
      tempState.map(({ currentStock }, key) => {
        if (key === index) {
          currentStock.value = newCurrentStock;
          currentStock.error.isError = false;
        }
      });
      setVariationState([...tempState]);
    };

    const changePriceSale = (newReplacement: string, index: number) => {
      let tempState: TypeHasVariation[] = JSON.parse(
        JSON.stringify(variationState),
      );
      tempState.map(({ replacementPoint }, key) => {
        if (key === index) {
          replacementPoint.value = newReplacement;
          replacementPoint.error.isError = false;
        }
      });
      setVariationState([...tempState]);
    };

    const changePriceCost = (newPriceCost: string, index: number) => {
      let tempState: TypeHasVariation[] = JSON.parse(
        JSON.stringify(variationState),
      );
      tempState.map(({ priceCost, priceSale }, key) => {
        if (key === index) {
          priceCost.value = newPriceCost;
          priceCost.error.isError = false;
          priceSale.error.isError = false;
        }
      });
      setVariationState([...tempState]);
    };

    const changeCurrentReplacementPoint = (
      newReplacementPoint: string,
      index: number,
    ) => {
      let tempState: TypeHasVariation[] = JSON.parse(
        JSON.stringify(variationState),
      );
      tempState.map(({ replacementPoint }, key) => {
        if (key === index) {
          replacementPoint.value = newReplacementPoint;
          replacementPoint.error.isError = false;
        }
      });
      setVariationState([...tempState]);
    };

    const addAtributes = () => {
      let tempState: TypeHasVariation[] = JSON.parse(
        JSON.stringify(variationState),
      );
      tempState.map((_, index) => {
        tempState[index].atributes.push({
          error: { isError: false },
          value: { id: '', name: '', keyParent: '' },
        });
      });
      setVariationState([...tempState]);
    };

    const removeAtributes = () => {
      let tempState: TypeHasVariation[] = JSON.parse(
        JSON.stringify(variationState),
      );
      tempState.map((_, index) => {
        tempState[index].atributes = [
          {
            error: { isError: false },
            value: { id: '', name: '', keyParent: '' },
          },
        ];
      });
      setVariationState([...tempState]);
    };

    return {
      addAtributes,
      removeAtributes,
      changeAtributes,
      addVariation,
      removeVariation,
      changeCurrentReplacementPoint,
      changeCurrentStock,
      changePriceCost,
      changePriceSale,
      changeUnitMensured,
    };
  };

  const validationAndSetErrorAllFieldsVariation = useCallback(() => {
    let isError = false;
    const tempState: TypeHasVariation[] = JSON.parse(
      JSON.stringify(variationState),
    );

    tempState.map(
      ({
        unitMensured,
        currentStock,
        priceCost,
        priceSale,
        atributes,
        replacementPoint,
      }) => {
        if (unitMensured.value.id === '') {
          isError = true;
          unitMensured.error.isError = true;
        }
        if (currentStock.value === '') {
          isError = true;
          currentStock.error.isError = true;
        }
        if (
          overView.typeSelectProdut.value.name === SALE.name ||
          overView.typeSelectProdut.value.name === RE_SALE.name
        ) {
          if (priceCost.value === '') {
            isError = true;
            priceCost.error.isError = true;
            priceSale.error.isError = true;
          }
        }
        if (atributes.length > 0) {
          atributes.map(({ value }, index) => {
            if (value.id === '') {
              atributes[index].error.isError = true;
            }
          });
        }
        if (replacementPoint.value === '') {
          isError = true;
          replacementPoint.error.isError = true;
        }
      },
    );

    setVariationState(tempState);

    return isError;
  }, [variationState, overView.typeSelectProdut]);

  const variation: TypeGetAndSetHasVariation<TypeHasVariation[]> = {
    getData: getDataVariation,
    setData: setDataVariation(),
    validate: validationAndSetErrorAllFieldsVariation,
  };

  const getDataFiscal = (): TypeFiscal => fiscalState;

  const setDataFiscal = (): ResolverFiscal => {
    const changeNCM = (value: string) => {
      fiscalState.ncm.value = value;
      fiscalState.ncm.error.isError = false;
      setFiscalState({ ...fiscalState });
    };
    const changeCFOP = (value: string) => {
      fiscalState.cfop.value = value;
      fiscalState.cfop.error.isError = false;
      setFiscalState({ ...fiscalState });
    };
    const changeCofinsTaxeIssue = (value: FieldWithIdName) => {
      fiscalState.cofins.taxesIssue.value = value;
      fiscalState.cofins.taxesIssue.error.isError = false;
      setFiscalState({ ...fiscalState });
    };
    const changeIcmsOrigem = (value: FieldWithIdName) => {
      fiscalState.icms.origem.value = value;
      fiscalState.icms.origem.error.isError = false;
      setFiscalState({ ...fiscalState });
    };
    const changeIcmsTaxeIssue = (value: FieldWithIdName) => {
      fiscalState.icms.taxesIssue.value = value;
      fiscalState.icms.taxesIssue.error.isError = false;
      setFiscalState({ ...fiscalState });
    };
    const changeIpiTaxeIssue = (value: FieldWithIdName) => {
      fiscalState.ipi.taxesIssue.value = value;
      fiscalState.ipi.taxesIssue.error.isError = false;
      setFiscalState({ ...fiscalState });
    };
    const changePisTaxeIssue = (value: FieldWithIdName) => {
      fiscalState.pis.taxesIssue.value = value;
      fiscalState.pis.taxesIssue.error.isError = false;
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

  const validationAndSetErrorAllFieldsFiscal = useCallback(() => {
    let isError = false;

    if (fiscalState.ncm.value === '') {
      isError = true;
      setFiscalState(old => ({
        ...old,
        ncm: { ...old.ncm, error: { isError: true } },
      }));
    }

    if (fiscalState.cfop.value === '') {
      isError = true;
      setFiscalState(old => ({
        ...old,
        cfop: { ...old.cfop, error: { isError: true } },
      }));
    }

    if (fiscalState.icms.taxesIssue.value.id === '') {
      isError = true;
      setFiscalState(old => ({
        ...old,
        icms: {
          ...old.icms,
          taxesIssue: {
            ...old.icms.taxesIssue,
            error: { isError: true },
          },
        },
      }));
    }

    if (fiscalState.icms.origem.value.id === '') {
      isError = true;
      setFiscalState(old => ({
        ...old,
        icms: {
          ...old.icms,
          origem: {
            ...old.icms.origem,
            error: { isError: true },
          },
        },
      }));
    }

    if (fiscalState.ipi.taxesIssue.value.id === '') {
      isError = true;
      setFiscalState(old => ({
        ...old,
        ipi: {
          ...old.ipi,
          taxesIssue: {
            ...old.ipi.taxesIssue,
            error: { isError: true },
          },
        },
      }));
    }

    if (fiscalState.pis.taxesIssue.value.id === '') {
      isError = true;
      setFiscalState(old => ({
        ...old,
        pis: {
          ...old.pis,
          taxesIssue: {
            ...old.pis.taxesIssue,
            error: { isError: true },
          },
        },
      }));
    }

    if (fiscalState.cofins.taxesIssue.value.id === '') {
      isError = true;
      setFiscalState(old => ({
        ...old,
        cofins: {
          ...old.cofins,
          taxesIssue: {
            ...old.cofins.taxesIssue,
            error: { isError: true },
          },
        },
      }));
    }

    return isError;
  }, [fiscalState]);

  const fiscal: TypeGetAndSetFiscal<TypeFiscal> = {
    getData: getDataFiscal,
    setData: setDataFiscal(),
    validate: validationAndSetErrorAllFieldsFiscal,
  };

  const validation: TypeValitionResolve = {
    validate: useCallback(() => {
      const resultList: TypeValidationResult[] = [];
      const valueSelectedTypeProduct = overView.typeSelectProdut.value.name;
      const hasVariation = overView.hasVariation.value.hasVariation;

      if (overView.typeSelectProdut.value.name === '') {
        overview.validate();
        return [{ labelName: labelDataOverview, linkName: nameDataOverview }];
      }

      const validateHasVariationOrStock = () => {
        if (hasVariation) {
          if (variation.validate()) {
            resultList.push({
              labelName: labelHasVariation,
              linkName: nameHasVariation,
            });
          }
        } else {
          if (stock.validate()) {
            resultList.push({
              labelName: labelStock,
              linkName: nameStock,
            });
          }
        }
      };

      const validateDataOverViewAndDetailsAndStockOrHasVariation = () => {
        if (overview.validate()) {
          resultList.push({
            labelName: labelDataOverview,
            linkName: nameDataOverview,
          });
        }
        if (details.validate()) {
          resultList.push({ labelName: labelDetails, linkName: nameDetails });
        }
        validateHasVariationOrStock();
      };

      const validateIsPriceFormationAndFiscal = () => {
        if (priceComposition.validate()) {
          resultList.push({
            labelName: labelPriceComposition,
            linkName: namePriceComposition,
          });
        }
        if (fiscal.validate()) {
          resultList.push({
            labelName: labelFiscal,
            linkName: nameFiscal,
          });
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
        }
      }
      if (valueSelectedTypeProduct === SEMI_FINISHED.name) {
        validateDataOverViewAndDetailsAndStockOrHasVariation();
        if (composition.validate()) {
          resultList.push({
            labelName: labelHasComposition,
            linkName: nameHasComposition,
          });
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

      return resultList;
    }, [
      overView,
      detail,
      stocks,
      priceCompositionState,
      fiscalState,
      compositionState,
      variationState,
      overView.typeSelectProdut.value.id,
      overView.hasVariation,
    ]),
  };

  const save = async (): Promise<ResultOnSaveProdut> => {
    const typeProduct = overView.typeSelectProdut.value.name;
    const hasVariationActive = overView.hasVariation.value?.hasVariation;
    const {
      categoryCost,
      groupProduct,
      hasVariation,
      nameProduct,
      subCategoryCost,
      typeSelectProdut,
      id,
    } = overView;
    const {
      descriptionAndDetails,
      height,
      length,
      technicalSpecification,
      wayOfUse,
      weight,
      width,
    } = detail;
    const {
      priceCost,
      priceSale,
      stockCurrent,
      unitMensured,
      replacementPoint,
    } = stocks;
    const variationList = variationState;

    const createRequestWithOverViewDetailsStockOrVariation = (): {
      overview_and_details: TypeProductDataOverView;
      stock: TypeProductStock[];
    } => {
      const overview_and_details: TypeProductDataOverView = {
        id: Number(id),
        details: {
          width: convertValueWithMaskInNumber(width.value),
          weight: convertValueMaskInNumber(weight.value),
          height: convertValueWithMaskInNumber(height.value),
          length: convertValueWithMaskInNumber(length.value),
          description_details: descriptionAndDetails.value,
          technical_specification: technicalSpecification.value,
          way_use: wayOfUse.value,
        },
        type: typeSelectProdut.value.name.toLowerCase().replace(' ', '-'),
        category_cost_id: parseInt(categoryCost.value.id),
        product_category_id: parseInt(groupProduct.value.id),
        subcategory_cost_id: parseInt(subCategoryCost.value.id),
        has_variation: !!hasVariation.value.hasVariation,

        name: nameProduct.value,
      };

      const stock: TypeProductStock[] = [];

      if (hasVariationActive) {
        variationList.map(
          ({
            currentStock,
            priceCost,
            priceSale,
            unitMensured,
            atributes,
            replacementPoint,
            id,
          }) => {
            const atributesList: TypeAtributes[] = [];
            atributes
              .filter(({ value }) => value.id !== '')
              .map(({ value }) => {
                atributesList.push({
                  key: parseInt(value.keyParent),
                  value: parseInt(value.id),
                });
              });
            stock.push({
              id: Number(id),
              replacement_point: parseFloat(replacementPoint.value),
              current_stock: Number(currentStock.value),
              price_cost: convertValueWithMaskInNumber(priceCost.value),
              price_sale: convertValueWithMaskInNumber(priceSale.value),
              unit_mensured_id: parseInt(unitMensured.value.id),
              atributes: atributesList,
            });
          },
        );
      } else {
        stock.push({
          id: Number(id),
          replacement_point: parseFloat(replacementPoint.value),
          price_cost: convertValueWithMaskInNumber(priceCost.value),
          price_sale: convertValueWithMaskInNumber(priceSale.value),
          unit_mensured_id: parseInt(unitMensured.value.id),
          current_stock: Number(stockCurrent.value),
          atributes: [],
        });
      }
      return {
        overview_and_details,
        stock,
      };
    };

    const createRequestWithPriceCompositionAndFiscal = (): PriceCompositionAndFiscal => {
      const { cfop, cofins, icms, ipi, ncm, pis } = fiscalState;
      const { cost, dif, profit } = priceCompositionState;
      const ipiPriceComposition = priceCompositionState.ipi;

      const priceCompositionAndFiscal: PriceCompositionAndFiscal = {
        price_composition: {
          dif: convertValueWithMaskInNumber(dif.value),
          fixed_cost: convertValueWithMaskInNumber(cost.value),
          ipi: convertValueWithMaskInNumber(ipiPriceComposition.value),
          margin_profit: convertValueWithMaskInNumber(profit.value),
        },
        fiscal: {
          cfop: convertValueWithMaskInNumber(cfop.value),
          ncm: convertValueWithMaskInNumber(ncm.value),
          icms_tax_origem: convertValueWithMaskInNumber(icms.origem.value.id),
          icms_tax_situation: convertValueWithMaskInNumber(
            icms.taxesIssue.value.id,
          ),
          ipi_tax_situation: convertValueWithMaskInNumber(
            ipi.taxesIssue.value.id,
          ),
          pis_tax_situation: convertValueWithMaskInNumber(
            pis.taxesIssue.value.id,
          ),
          cofins_tax_situation: convertValueWithMaskInNumber(
            cofins.taxesIssue.value.id,
          ),
        },
      };
      return priceCompositionAndFiscal;
    };

    const createRequestWithComposition = (): CompositionRequest[] => {
      const compositionRequest: CompositionRequest[] = [];
      compositionState.map(({ amount, cost, nameProduct }, index) => {
        compositionRequest.push({
          amount: convertValueWithMaskInNumber(amount.value),
          cost: convertValueWithMaskInNumber(cost.value),
          name: nameProduct.value,
          product_id: producIdAndStockId[index].productId,
          stock_id: producIdAndStockId[index].stockId,
        });
      });
      return compositionRequest;
    };

    if (typeProduct === SALE.name || typeProduct === RE_SALE.name) {
      if (typeProduct === SALE.name) {
        return await updateProduct({
          id,
          details_overview: createRequestWithOverViewDetailsStockOrVariation()
            .overview_and_details,
          stock: createRequestWithOverViewDetailsStockOrVariation().stock,
          price_composition_fiscal: createRequestWithPriceCompositionAndFiscal(),
          composition: createRequestWithComposition(),
        });
      }
      return await updateProduct({
        details_overview: createRequestWithOverViewDetailsStockOrVariation()
          .overview_and_details,
        stock: createRequestWithOverViewDetailsStockOrVariation().stock,
        price_composition_fiscal: createRequestWithPriceCompositionAndFiscal(),
        id,
      });
    }
    if (typeProduct === SEMI_FINISHED.name) {
      return await updateProduct({
        id,
        details_overview: createRequestWithOverViewDetailsStockOrVariation()
          .overview_and_details,
        stock: createRequestWithOverViewDetailsStockOrVariation().stock,
        composition: createRequestWithComposition(),
      });
    }
    if (typeProduct !== '') {
      return await updateProduct({
        id,
        details_overview: createRequestWithOverViewDetailsStockOrVariation()
          .overview_and_details,
        stock: createRequestWithOverViewDetailsStockOrVariation().stock,
      });
    }
    return {
      code: 500,
    };
  };

  const addOverView = (overView: TypeDataOverViewProps) => {
    setDataOverView(overView);
  };

  const addDetails = (details: TypeDetailsProps) => {
    setDetail(details);
  };

  const addStock = (stockParams: TypeStockProps) => {
    setStock(stockParams);
  };

  const addHasVariation = (hasVariation: TypeHasVariation) => {
    setVariationState(prevState => [
      ...prevState.filter(({ currentStock }) => currentStock.value !== ''),
      hasVariation,
    ]);
  };

  const addHasComposition = (composition: TypeProduct) => {
    setProducIdAndStockId(prevState => [
      ...prevState.filter(
        ({ productId, stockId }) => productId !== 0 && stockId !== 0,
      ),
      {
        productId: Number(composition?.product_id),
        stockId: Number(composition?.stock_id),
      },
    ]);
    setCompositionState(prevState => [
      ...prevState.filter(({ nameProduct }) => nameProduct.value !== ''),
      composition,
    ]);
  };

  const addPriceComposition = (priceComposition: TypePriceCompositionProps) => {
    setPriceCompositionState(priceComposition);
  };

  const addFiscal = (fiscalParams: TypeFiscal) => {
    setFiscalState(fiscalParams);
  };

  return (
    <TabCreateContext.Provider
      value={{
        overview,
        addOverView,
        details,
        addDetails,
        stock,
        addStock,
        priceComposition,
        addPriceComposition,
        fiscal,
        addFiscal,
        composition,
        addHasComposition,
        variation,
        addHasVariation,
        validation: validation,
        save,
      }}
    >
      {children}
    </TabCreateContext.Provider>
  );
};

function useTabCreate(): TabCreateContext {
  const context = useContext(TabCreateContext);

  if (!context) {
    throw new Error('useTabCreate must be used witin a TabUpdateProvider');
  }

  return context;
}

export { TabUpdateProvider, useTabCreate };
