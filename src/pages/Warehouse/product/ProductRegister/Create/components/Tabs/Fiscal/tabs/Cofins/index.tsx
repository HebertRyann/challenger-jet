import React, { useEffect, useState } from 'react';
import { NewSelect } from '../../../../../../../../../../components/NewSelect';
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent';
import { dataIcms } from '../Icms/icms';
import { useTabCreate } from '../../../../../providers/tabsProvider';
import { LoadTaxSituations } from '../../../../../../domain/useCases/FIscal/TaxSituations/Load';
import { useTabs } from '../../../../../../../../../../hooks/tabs';

type TypeConfins = {
  taxSituationsLoader: LoadTaxSituations;
};

export const Confins = ({ taxSituationsLoader }: TypeConfins): JSX.Element => {
  const { fiscal } = useTabCreate();
  const { changeCofinsTaxeIssue } = fiscal.setData;
  const { cofins } = fiscal.getData();
  const { loadCurrentTab } = useTabs();
  const [taxSituations, setTaxSituations] = useState<
    LoadTaxSituations.LoadTaxSituationsResponse[]
  >([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    (async () => {
      const curretTab = loadCurrentTab();
      if (curretTab.key === nameFiscalConfins && taxSituations.length < 1) {
        setLoadingData(true);
        const response = await taxSituationsLoader.loadTaxSituations();
        setTaxSituations(response);
        setLoadingData(false);
      }
    })();
  }, [loadCurrentTab()]);

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
          loading={loadingData}
          error={cofins.taxesIssue.error}
        >
          {taxSituations.map(({ id, code, descriptions }) => (
            <option
              value={`${id}+${code}`}
            >{`${code} - ${descriptions}`}</option>
          ))}
        </NewSelect>
      </div>
    </div>
  );
};

export const labelFiscalConfins = 'Confins';
export const nameFiscalConfins = '@@tabs-fiscal-cofins';
