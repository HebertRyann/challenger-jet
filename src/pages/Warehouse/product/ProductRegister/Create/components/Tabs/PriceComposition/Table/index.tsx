import React, { useCallback, useState } from 'react';
import { TooltipComponent } from '../../../../../../../../../components/TooltipComponent';
import { NewInput } from '../../../../../../../../../components/NewInput';
import { numericMask } from '../../../../../../../../../utlis/mask';
import { ContainerInput } from './style';
import { useTabCreate } from '../../../../providers/tabsProvider';
import { Footer } from '../../../footer';
import { Alert } from '../../../../../../../../../components/Alert';
import { useTabs } from '../../../../../../../../../hooks/tabs';
import { nameStock } from '../../Stock';
import { nameHasVariation } from '../../HasVariation';

export const Table = (): JSX.Element => {
  const { changeCurrentTab } = useTabs();
  const { priceComposition, overview } = useTabCreate();
  const { cost, dif, ipi, profit } = priceComposition.getData();
  const [alert, setAlert] = useState<{
    active: boolean;
    component?: () => JSX.Element;
  }>({ active: false });

  const handlerClickOnSave = () => {
    priceComposition.validate();
  };

  const handlerClickAlertConfirm = useCallback(() => {
    setAlert({ active: false });
  }, [alert]);

  const handlerOnClickButtonBack = useCallback(() => {
    console.log(overview.getData().hasVariation);
    changeCurrentTab(
      overview.getData().hasVariation.value.hasVariation
        ? nameHasVariation
        : nameStock,
    );
  }, [overview.getData().hasVariation]);

  return (
    <>
      <div className="row">
        <ContainerInput className="form-content col-md-3">
          <TooltipComponent
            label="Margem de lucro"
            message="Selecione o tipo do produto"
          />
          <NewInput
            name="input"
            value={numericMask(profit.value)}
            error={profit.error}
            onChange={e =>
              priceComposition.setData({
                ...priceComposition.getData(),
                profit: { error: { isError: false }, value: e.target.value },
              })
            }
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </ContainerInput>
        <ContainerInput className="form-content col-md-3">
          <TooltipComponent
            label="IPI (%)"
            message="Selecione o tipo do produto"
          />
          <NewInput
            name="input"
            value={numericMask(ipi.value)}
            error={ipi.error}
            onChange={e =>
              priceComposition.setData({
                ...priceComposition.getData(),
                ipi: { error: { isError: false }, value: e.target.value },
              })
            }
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </ContainerInput>
        <ContainerInput className="form-content col-md-3">
          <TooltipComponent
            label="Custo fixo"
            message="Selecione o tipo do produto"
          />
          <NewInput
            name="input"
            value={numericMask(cost.value)}
            error={cost.error}
            onChange={e =>
              priceComposition.setData({
                ...priceComposition.getData(),
                cost: { error: { isError: false }, value: e.target.value },
              })
            }
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </ContainerInput>
        <ContainerInput className="form-content col-md-3">
          <TooltipComponent
            label="DIF ICMS"
            message="Selecione o tipo do produto"
          />
          <NewInput
            name="input"
            value={numericMask(dif.value)}
            error={dif.error}
            onChange={e =>
              priceComposition.setData({
                ...priceComposition.getData(),
                dif: { error: { isError: false }, value: e.target.value },
              })
            }
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </ContainerInput>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Footer
          onClickButtonBack={handlerOnClickButtonBack}
          onSave={handlerClickOnSave}
        />
      </div>
      <Alert
        isActive={alert.active}
        onlyConfirm
        message="Os campos destacados são de preenchimento obrigatório"
        onClickConfirmButton={handlerClickAlertConfirm}
      />
    </>
  );
};
