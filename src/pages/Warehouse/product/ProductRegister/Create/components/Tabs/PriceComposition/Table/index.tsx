import React, { useCallback, useState } from 'react';
import { TooltipComponent } from '../../../../../../../../../components/TooltipComponent';
import {
  NewInput,
  TypeErrorInput,
} from '../../../../../../../../../components/NewInput';
import { numericMask } from '../../../../../../../../../utlis/mask';
import { ContainerInput } from './style';

export const Table = (): JSX.Element => {
  const [alert, setAlert] = useState(false);
  const [profit, setProif] = useState('');
  const [ipi, setIpi] = useState('');
  const [cost, setCost] = useState('');
  const [dif, setDif] = useState('');

  const [errorProfit, setErrorProfit] = useState<TypeErrorInput>({
    isError: false,
  });

  const [errorIpi, setErrorIpi] = useState<TypeErrorInput>({
    isError: false,
  });

  const [errorCost, setErrorCost] = useState<TypeErrorInput>({
    isError: false,
  });

  const [errorDif, setErrorDif] = useState<TypeErrorInput>({
    isError: false,
  });

  const handlerChangeProfit = useCallback(
    (value: string) => {
      setErrorProfit({ isError: false });
      setProif(value);
    },
    [profit],
  );
  const handlerChangeIpi = useCallback(
    (value: string) => {
      setErrorIpi({ isError: false });
      setIpi(value);
    },
    [ipi],
  );
  const handlerChangeCost = useCallback(
    (value: string) => {
      setErrorCost({ isError: false });
      setCost(value);
    },
    [cost],
  );
  const handlerChangeDif = useCallback(
    (value: string) => {
      setErrorDif({ isError: false });
      setDif(value);
    },
    [dif],
  );

  const handlerClickNextButton = useCallback(() => {}, [
    errorProfit,
    errorIpi,
    errorCost,
    errorDif,
  ]);

  const handlerClickAlertConfirm = useCallback(() => {
    setAlert(false);
  }, [alert]);

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
            value={numericMask(profit)}
            onChange={e => setProif(e.target.value)}
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
            value={numericMask(ipi)}
            onChange={e => setIpi(e.target.value)}
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
            value={numericMask(cost)}
            onChange={e => setCost(e.target.value)}
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
            value={numericMask(dif)}
            onChange={e => setDif(e.target.value)}
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </ContainerInput>
      </div>
    </>
  );
};
