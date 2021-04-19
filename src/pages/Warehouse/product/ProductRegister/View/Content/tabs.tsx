import React from 'react';
import { TypeContentTabs } from './index';

import { Details, labelDetails, nameDetails } from './tabs/Details';
import { Stock, labelStock, nameStock } from './tabs/Stock';

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
  ];
};
