import React from 'react';
import { NewSelect } from '../../../../../../../../../../components/NewSelect';
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent';
import { dataIcms } from '../Icms/icms';
import { useTabCreate } from '../../../../../providers/tabsProvider';

export const Confins = (): JSX.Element => {
  const { fiscal } = useTabCreate();
  const { changeCofinsTaxeIssue } = fiscal.setData;
  const { cofins } = fiscal.getData();

  return (
    <div className="row">
      <div className="form-content col-md-6">
        <TooltipComponent
          label="Situação tributaria"
          message="Selecione o tipo do produto"
        />
        <NewSelect
          onChange={event => {
            const split = event.target.value.split('+');
            const id = split[0];
            const name = split[1];
            changeCofinsTaxeIssue({ id, name });
          }}
          error={cofins.taxesIssue.error}
        >
          {/* {dataIcms.map(({ id, name }) => (
            <option value={`${id}+${name}`}>{name}</option>
          ))} */}
        </NewSelect>
      </div>
    </div>
  );
};

export const labelFiscalConfins = 'Confins';
export const nameFiscalConfins = '@@tabs-fiscal-cofins';
