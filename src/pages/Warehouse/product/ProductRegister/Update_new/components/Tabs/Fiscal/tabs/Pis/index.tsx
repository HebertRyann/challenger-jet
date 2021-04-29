import React from 'react';
import { NewSelect } from '../../../../../../../../../../components/NewSelect';
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent';
import { dataIcms, TypeICMS } from '../Icms/icms';
import { useTabCreate } from '../../../../../providers/tabsProvider';

export const Pis = (): JSX.Element => {
  const { fiscal } = useTabCreate();
  const { changePisTaxeIssue } = fiscal.setData;
  const { pis } = fiscal.getData();
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
            changePisTaxeIssue({ id, name });
          }}
          error={pis.taxesIssue.error}
        >
          {/* {dataIcms.map(({ id, name }) => (
            <option value={`${id}+${name}`}>{name}</option>
          ))} */}
        </NewSelect>
      </div>
    </div>
  );
};

export const nameFiscalPis = '@@tabs-fiscal-pis';
export const labelFiscalPis = 'Pis';
