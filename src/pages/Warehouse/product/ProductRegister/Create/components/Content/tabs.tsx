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
    label: labelFiscal,
    name: labelFiscal,
    isEnable: true,
    Component: (
      <TabsProvider>
        <Fiscal />
      </TabsProvider>
    ),
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
];
