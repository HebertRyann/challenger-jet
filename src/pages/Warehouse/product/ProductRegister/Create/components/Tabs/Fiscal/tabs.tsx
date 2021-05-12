import React, { useState } from 'react';
import { TypeContentTabsFiscal } from '.';
import { labelFiscalIcms, nameFiscalIcms, Icms } from './tabs/Icms';
import { labelFiscalIpi, nameFiscalIpi, Ipi } from './tabs/Ipi';
import { labelFiscalPis, nameFiscalPis, Pis } from './tabs/Pis';
import { labelFiscalConfins, nameFiscalConfins, Confins } from './tabs/Cofins';
import { makeLoadAllTaxSituations } from '../../../../main/factories/Fiscal/Load/TaxSituations/makeLoadAllCfop';
import { makeLoadNatureOperations } from '../../../../main/factories/Fiscal/Load/NatureOperations/makeLoadNatureOperations';

export const makeTabsFiscal = (): TypeContentTabsFiscal[] => [
  {
    label: labelFiscalIcms,
    name: nameFiscalIcms,
    isEnable: true,
    Component: (
      <Icms
        taxSituationsLoader={makeLoadAllTaxSituations()}
        natureOperationsLoader={makeLoadNatureOperations()}
      />
    ),
  },
  {
    label: labelFiscalIpi,
    name: nameFiscalIpi,
    isEnable: true,
    Component: <Ipi taxSituationsLoader={makeLoadAllTaxSituations()} />,
  },
  {
    label: labelFiscalPis,
    name: nameFiscalPis,
    isEnable: true,
    Component: <Pis taxSituationsLoader={makeLoadAllTaxSituations()} />,
  },
  {
    label: labelFiscalConfins,
    name: nameFiscalConfins,
    isEnable: true,
    Component: <Confins taxSituationsLoader={makeLoadAllTaxSituations()} />,
  },
];
