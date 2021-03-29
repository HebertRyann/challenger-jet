import React from 'react';
import { Select } from '../../../../../../../../../../components/Select';
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent';
import { dataIcms, TypeICMS } from '../Icms/icms';
export const nameFiscalPis = '@@tabs-fiscal-pis';
export const labelFiscalPis = 'Pis';

export const Pis = (): JSX.Element => {
  return (
    <div className="row">
      <div className="form-content col-md-6">
        <TooltipComponent
          label="Situação tributaria"
          message="Selecione o tipo do produto"
        />
        <Select<TypeICMS>
          data={dataIcms}
          selectValue={{ id: 0, name: 'Selecione' }}
        ></Select>
      </div>
    </div>
  );
};
