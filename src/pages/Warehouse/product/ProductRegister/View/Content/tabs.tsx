import React from 'react';
import { TypeContentTabs } from './index';

import { Details, labelDetails, nameDetails } from './tabs/Details';
import { Stock, labelStock, nameStock } from './tabs/Stock';
import { Fiscal, labelFiscal, nameFiscal } from './tabs/Fiscal';
import {
  PriceComposition,
  labelPriceComposition,
  namePriceComposition,
} from './tabs/PriceComposition';
import {
  HasVariation,
  labelHasVariation,
  nameHasVariation,
} from './tabs/HasVariation';
import {
  HasComposition,
  labelHasComposition,
  nameHasComposition,
} from './tabs/HasComposition';

export const makeTabs = async (): Promise<TypeContentTabs[]> => {
  return [
    {
      label: labelDetails,
      name: nameDetails,
      isEnable: true,
      Component: <Details />,
    },
    {
      label: labelStock,
      name: nameStock,
      isEnable: true,
      Component: <Stock />,
    },
    {
      label: labelHasVariation,
      name: nameHasVariation,
      isEnable: false,
      Component: <HasVariation />,
    },
    {
      label: labelHasComposition,
      name: nameHasComposition,
      isEnable: false,
      Component: <HasComposition />,
    },
    {
      label: labelPriceComposition,
      name: namePriceComposition,
      isEnable: true,
      Component: <PriceComposition />,
    },
    {
      label: labelFiscal,
      name: nameFiscal,
      isEnable: true,
      Component: <Fiscal />,
    },
  ];
};
