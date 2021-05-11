import React from 'react';
import { TypeContentTabs } from './index';

import {
  DataOverview,
  labelDataOverview,
  nameDataOverview,
  TypeEntityWithIdAndName,
} from '../Tabs/DataOverview';

import { Details, nameDetails, labelDetails } from '../Tabs/Details';

import { Fiscal, labelFiscal, nameFiscal } from '../Tabs/Fiscal';

import {
  HasVariation,
  labelHasVariation,
  nameHasVariation,
} from '../Tabs/HasVariation';

import {
  HasComposition,
  labelHasComposition,
  nameHasComposition,
} from '../Tabs/HasComposition';

import { Stock, labelStock, nameStock } from '../Tabs/Stock';

import {
  PriceComposition,
  labelPriceComposition,
  namePriceComposition,
} from '../Tabs/PriceComposition';

import { TabsProvider } from '../../../../../../../hooks/tabs';
import {
  loadCategoryFinance,
  loadUnitMensured,
  loadCategoryData,
  ResponseEntityOnlyIdAndName,
  ResponseEntiryWithIdNameWithChildren,
  loadAtributes,
} from '../../services/api';
import { makeLoadAllNCM } from '../../../main/factories/Fiscal/Load/ncm/makeLoadAllNCM';
import { makeLoadAllCfop } from '../../../main/factories/Fiscal/Load/cfop/makeLoadAllCfop';

export const makeTabs = async (): Promise<TypeContentTabs[]> => {
  const loadCategoryFinances = async (): Promise<TypeEntityWithIdAndName[]> => {
    const result = await loadCategoryFinance();
    return result;
  };
  const categoryFinances = await loadCategoryFinances();

  const loadUnitMensureds = async (): Promise<
    ResponseEntityOnlyIdAndName[]
  > => {
    const result = await loadUnitMensured();
    return result;
  };

  const unitMensureds = await loadUnitMensureds();

  const loadCategoryPorducts = async (): Promise<TypeEntityWithIdAndName[]> => {
    const result = await loadCategoryData();
    return result;
  };
  const categoryPorducts = await loadCategoryPorducts();

  const loadAtributesList = async () => {
    const resultData = await loadAtributes();
    const resultList: ResponseEntiryWithIdNameWithChildren[] = resultData.filter(
      ({ parent_id }) => parent_id === null,
    );
    resultList.map(({ id }, index) => {
      resultList[index].childrenList = resultData.filter(
        ({ parent_id }) => parent_id === id,
      );
    });
    return resultList;
  };

  const atributes = await loadAtributesList();

  return [
    {
      label: labelFiscal,
      name: nameFiscal,
      isEnable: true,
      Component: (
        <TabsProvider>
          <Fiscal ncmLoader={makeLoadAllNCM()} cfopLoader={makeLoadAllCfop()} />
        </TabsProvider>
      ),
    },
    {
      label: labelDataOverview,
      name: nameDataOverview,
      isEnable: true,
      Component: (
        <DataOverview
          categoryFinances={categoryFinances}
          categoryProducts={categoryPorducts}
        />
      ),
    },
    {
      label: labelDetails,
      name: nameDetails,
      isEnable: true,
      Component: <Details />,
    },
    {
      label: labelPriceComposition,
      name: namePriceComposition,
      isEnable: false,
      Component: <PriceComposition />,
    },
    {
      label: labelStock,
      name: nameStock,
      isEnable: true,
      Component: <Stock unitMensureds={unitMensureds} />,
    },
    {
      label: labelHasVariation,
      name: nameHasVariation,
      isEnable: false,
      Component: (
        <HasVariation atributes={atributes} unitMensureds={unitMensureds} />
      ),
    },
    // {
    //   label: labelFiscal,
    //   name: nameFiscal,
    //   isEnable: false,
    //   Component: (
    //     <TabsProvider>
    //       <Fiscal />
    //     </TabsProvider>
    //   ),
    // },
    {
      label: labelHasComposition,
      name: nameHasComposition,
      isEnable: false,
      Component: <HasComposition />,
    },
  ];
};
