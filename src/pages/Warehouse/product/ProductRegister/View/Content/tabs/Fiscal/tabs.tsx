import React from 'react';
import { labelFiscalIcms, nameFiscalIcms, Icms } from './tabs/Icms';
import { labelFiscalIpi, nameFiscalIpi, Ipi } from './tabs/Ipi';
import { labelFiscalPis, nameFiscalPis, Pis } from './tabs/Pis';
import { labelFiscalConfins, nameFiscalConfins, Confins } from './tabs/Cofins';
import { TypeContentTabsFiscal } from '../../../../Create/components/Tabs/Fiscal';

export const makeTabsFiscal = (): TypeContentTabsFiscal[] => [
  {
    label: labelFiscalIcms,
    name: nameFiscalIcms,
    isEnable: true,
    Component: <Icms />,
  },
  {
    label: labelFiscalIpi,
    name: nameFiscalIpi,
    isEnable: true,
    Component: <Ipi />,
  },
  {
    label: labelFiscalPis,
    name: nameFiscalPis,
    isEnable: true,
    Component: <Pis />,
  },
  {
    label: labelFiscalConfins,
    name: nameFiscalConfins,
    isEnable: true,
    Component: <Confins />,
  },
];
