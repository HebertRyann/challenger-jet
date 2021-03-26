import { TypeContentTabs } from './index';

import {
  DataOverview,
  labelDataOverview,
  nameDataOverview,
} from '../Tabs/DataOverview';

export const tabs: TypeContentTabs[] = [
  {
    label: labelDataOverview,
    name: nameDataOverview,
    Component: DataOverview,
  },
];
