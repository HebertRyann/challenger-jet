import React from 'react';
import { NewSelect } from '../../../../../../../../../../components/NewSelect';
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent';
import { dataIcms, TypeICMS } from '../Icms/icms';
import { useTabCreate } from '../../../../../providers/tabsProvider';

export const Ipi = (): JSX.Element => {
  const { fiscal } = useTabCreate();
  const { changeIpiTaxeIssue } = fiscal.setData;
  const { ipi } = fiscal.getData();
  return (
    <div className="row">
      <div className="form-content col-md-6">
        <TooltipComponent
          label="Situação tributaria"
          message="Situação tributaria do produto"
        />
        <NewSelect
          onChange={event => {
            const split = event.target.value.split('+');
            const id = split[0];
            const name = split[1];
            changeIpiTaxeIssue({ id, name });
          }}
          error={ipi.taxesIssue.error}
        >
          {dataIcms.map(({ id, name }) => (
            <option value={`${id}+${name}`}>{name}</option>
          ))}
        </NewSelect>
      </div>
    </div>
  );
};

export const nameFiscalIpi = '@@tabs-fiscal-ipi';
export const labelFiscalIpi = 'IPI';
