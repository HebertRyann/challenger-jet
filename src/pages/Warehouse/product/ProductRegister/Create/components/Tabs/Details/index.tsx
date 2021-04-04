import React, { useCallback, useState } from 'react';
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent';
import { Footer } from '../../footer';
import { Container, TextArea } from './style';
import {
  NewInput,
  TypeErrorInput,
} from '../../../../../../../../components/NewInput';
import { useTabs } from '../../../../../../../../hooks/tabs';
import { Alert } from '../../../../../../../../components/Alert';
import { numericMask } from '../../../../../../../../utlis/mask';

export const labelDetails = 'Detalhes';
export const nameDetails = '@@tabs-details';

export const Details = (): JSX.Element => {
  const { changeCurrentTabForNext } = useTabs();
  const [alert, setAlert] = useState(false);

  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [largura, setLargura] = useState('');
  const [comprimento, setComprimento] = useState('');
  const [descriptionAndDetails, setDescriptionAndDetails] = useState('');
  const [especification, setEspecification] = useState('');
  const [wayOfUse, setWayOfUse] = useState('');

  const [errorPeso, setErrorPeso] = useState<TypeErrorInput>({
    isError: false,
  });

  const [errorLargura, setErrorLargura] = useState<TypeErrorInput>({
    isError: false,
  });

  const [errorAltura, setErrorAltura] = useState<TypeErrorInput>({
    isError: false,
  });

  const [errorComprimento, setErrorComprimento] = useState<TypeErrorInput>({
    isError: false,
  });

  const [
    errorDescriptionAndDetails,
    setErrorDescriptionAndDetails,
  ] = useState<TypeErrorInput>({
    isError: false,
  });

  const [
    errorEspecification,
    setErrorEspecification,
  ] = useState<TypeErrorInput>({
    isError: false,
  });

  const [errorWayOfUse, setErrorWayOfUse] = useState<TypeErrorInput>({
    isError: false,
  });

  const handlerChangerPeso = useCallback(
    (value: string) => {
      setErrorPeso({ isError: false });
      setPeso(value);
    },
    [peso],
  );

  const handlerChangerLargura = useCallback(
    (value: string) => {
      setErrorLargura({ isError: false });
      setLargura(value);
    },
    [largura],
  );

  const handlerChangerAltura = useCallback(
    (value: string) => {
      setErrorAltura({ isError: false });
      setAltura(value);
    },
    [altura],
  );

  const handlerChangerComprimento = useCallback(
    (value: string) => {
      setErrorComprimento({ isError: false });
      setComprimento(value);
    },
    [comprimento],
  );

  const handlerChangerDescriptionAndDetails = useCallback(
    (value: string) => {
      setErrorDescriptionAndDetails({ isError: false });
      setDescriptionAndDetails(value);
    },
    [descriptionAndDetails],
  );

  const handlerChangerEspecification = useCallback(
    (value: string) => {
      setErrorEspecification({ isError: false });
      setEspecification(value);
    },
    [especification],
  );

  const handlerChangerWayOfUse = useCallback(
    (value: string) => {
      setErrorWayOfUse({ isError: false });
      setWayOfUse(value);
    },
    [comprimento],
  );

  const handlerClickNextButton = useCallback(() => {
    let isError = false;

    if (peso === '') {
      isError = true;
      setErrorPeso({ isError: true });
    }
    if (altura === '') {
      isError = true;
      setErrorAltura({ isError: true });
    }
    if (largura === '') {
      isError = true;
      setErrorLargura({ isError: true });
    }
    if (comprimento === '') {
      isError = true;
      setErrorComprimento({ isError: true });
    }
    if (descriptionAndDetails === '') {
      isError = true;
      setErrorDescriptionAndDetails({ isError: true });
    }
    if (especification === '') {
      isError = true;
      setErrorEspecification({ isError: true });
    }
    if (wayOfUse === '') {
      isError = true;
      setErrorWayOfUse({ isError: true });
    }

    if (!isError) {
      changeCurrentTabForNext(nameDetails);
    } else {
      setAlert(true);
    }
  }, [
    errorPeso,
    errorLargura,
    errorAltura,
    errorComprimento,
    descriptionAndDetails,
    especification,
    wayOfUse,
  ]);

  const handlerClickAlertConfirm = useCallback(() => {
    setAlert(false);
  }, [alert]);

  return (
    <Container>
      <div className="row">
        <div className="form-content col-md-3">
          <TooltipComponent label="Peso (kg)" message="Infome o peso em kg" />
          <NewInput
            value={numericMask(peso)}
            onChange={e => setPeso(e.target.value)}
            error={errorPeso}
            name="peso"
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Largura (m)"
            message="Informe a largura em metros"
          />
          <NewInput
            onKeyPress={event => {
              const regex = /^[0-9.]+$/;
              if (regex.test(event.key)) {
                handlerChangerAltura(event.currentTarget.value);
                return;
              }
              event.preventDefault();
            }}
            error={errorLargura}
            name="largura"
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Altura (m)"
            message="Informe a altura em metros"
          />
          <NewInput
            onKeyPress={event => {
              const regex = /^[0-9.]+$/;
              if (regex.test(event.key)) {
                handlerChangerAltura(event.currentTarget.value);
                return;
              }
              event.preventDefault();
            }}
            error={errorAltura}
            name="altura"
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Comprimento (m)"
            message="Informe a comprimento em metros"
          />
          <NewInput
            onKeyPress={event => {
              const regex = /^[0-9.]+$/;
              if (regex.test(event.key)) {
                handlerChangerComprimento(event.currentTarget.value);
                return;
              }
              event.preventDefault();
            }}
            error={errorComprimento}
            name="comprimento"
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </div>
      </div>
      <div className="row">
        <div className="form-content col-md-12">
          <div className="form-group">
            <label>Descrição e detalhes</label>
            <TextArea
              isError={errorDescriptionAndDetails.isError}
              onChange={event =>
                handlerChangerDescriptionAndDetails(event.target.value)
              }
              className="form-control"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="form-content col-md-12">
          <div className="form-group">
            <label>Especificação Técnica</label>
            <TextArea
              isError={errorEspecification.isError}
              onChange={event =>
                handlerChangerEspecification(event.target.value)
              }
              className="form-control"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="form-content col-md-12">
          <div className="form-group">
            <label>Forma de utilização</label>
            <TextArea
              isError={errorWayOfUse.isError}
              onChange={event => handlerChangerWayOfUse(event.target.value)}
              className="form-control"
            />
          </div>
        </div>
      </div>
      <Footer onClickButtonNext={handlerClickNextButton} />
      <Alert
        isActive={alert}
        onlyConfirm
        message="Os campos destacados são de preenchimento obrigatório"
        onClickConfirmButton={handlerClickAlertConfirm}
      />
    </Container>
  );
};
