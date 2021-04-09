import React, { createContext, useCallback, useContext, useState } from 'react';
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
} from './domain.types';

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
}

const TabCreateContext = createContext<TabCreateContext>(
  {} as TabCreateContext,
);

const TabCreateProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
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

  const setDataOverView = (newOverView: TypeDataOverViewProps) =>
    setOverView(newOverView);

  const getDataOverView = (): TypeDataOverViewProps => {
    return overView;
  };

  const validationAndSetErrorAllFieldsDataOverView = useCallback(() => {
    let isError = false;

    if (overView.typeSelectProdut.value.id === '') {
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

    return {
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

    const changePriceSale = (priceSale: string, index: number) => {};

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

  const validationAndSetErrorAllFieldsVariation = useCallback(() => {
    let isError = false;
    const tempState: TypeHasVariation[] = JSON.parse(
      JSON.stringify(variationState),
    );

    tempState.map(({ unitMensured, currentStock, priceCost, priceSale }) => {
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
    });

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

      if (overView.typeSelectProdut.value.id === '') {
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
            labelName: labelFiscal,
            linkName: nameFiscal,
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

      return resultList;
    }, [
      overView,
      detail,
      stocks,
      priceCompositionState,
      fiscalState,
      compositionState,
      variationState,
    ]),
  };

  const save = (): Promise<ResultOnSaveProdut> => {
    const typeProduct = overView.typeSelectProdut.value.name;
    const hasVariationActive = overView.hasVariation.value?.hasVariation;
    const {
      categoryCost,
      groupProduct,
      hasVariation,
      nameProduct,
      subCategoryCost,
      typeSelectProdut,
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
    const { priceCost, priceSale, stockCurrent, unitMensured } = stocks;
    const variationList = variationState;
    if (
      typeProduct === RAW_MATERIAL.name ||
      typeProduct === CONSUMER.name ||
      LOCATION.name
    ) {
      const requestCreateProduct: TypeProductDataOverView = {
        details: {
          width: Number(width.value),
          weight: Number(weight.value),
          height: Number(height.value),
          length: Number(length.value),
          description_details: descriptionAndDetails.value,
          technical_specification: technicalSpecification.value,
          way_use: wayOfUse.value,
        },
        type: Number(typeSelectProdut.value.id),
        category_cost_id: Number(categoryCost.value.id),
        product_category_id: Number(groupProduct.value.id),
        subcategory_cost_id: Number(subCategoryCost.value.id),
        has_variation: !!hasVariation.value.hasVariation,

        name: nameProduct.value,
      };

      const requestStockOrVariations: TypeProductStock[] = [];

      if (hasVariationActive) {
        variationList.map(
          ({
            currentStock,
            priceCost,
            priceSale,
            unitMensured,
            variations,
          }) => {
            const atributesList: TypeAtributes[] = [];
            variations.map(({ value }) => {
              atributesList.push({
                key: Number(value.id),
                value: Number(value.name),
              });
            });
            requestStockOrVariations.push({
              current_stock: Number(currentStock.value),
              price_cost: Number(priceCost.value),
              price_sale: Number(priceSale.value),
              unit_mensured_id: Number(unitMensured.value.id),
              abtributes: atributesList,
            });
          },
        );
      } else {
        requestStockOrVariations.push({
          price_cost: Number(priceCost.value),
          price_sale: Number(priceSale.value),
          unit_mensured_id: Number(unitMensured.value.id),
          current_stock: Number(stockCurrent.value),
          abtributes: [],
        });
      }

      console.log(requestCreateProduct);
      console.log(requestStockOrVariations);
    }

    return Promise.resolve({
      status: { code: 200, message: 'Produto registrado' },
    });
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
    throw new Error('useTabCreate must be used witin a TabCreateProvider');
  }

  return context;
}

export { TabCreateProvider, useTabCreate };
