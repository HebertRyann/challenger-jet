import React from 'react';
import { TypeContentTabs } from './index';

import {
  DataOverview,
  labelDataOverview,
  nameDataOverview,
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

export const makeTabs = (): TypeContentTabs[] => [
  {
    label: labelDataOverview,
    name: nameDataOverview,
    isEnable: true,
    Component: <DataOverview />,
  },
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
    label: labelPriceComposition,
    name: namePriceComposition,
    isEnable: false,
    Component: <PriceComposition />,
  },
  {
    label: labelFiscal,
    name: nameFiscal,
    isEnable: false,
    Component: (
      <TabsProvider>
        <Fiscal />
      </TabsProvider>
    ),
  },
  {
    label: labelHasComposition,
    name: nameHasComposition,
    isEnable: false,
    Component: <HasComposition />,
  },
];
