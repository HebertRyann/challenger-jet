import React, { useCallback, useEffect, useState } from 'react';
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent';
import { Footer } from '../../footer';
import { Container, TextArea } from './style';
import { NewInput } from '../../../../../../../../components/NewInput';
import { Alert } from '../../../../../../../../components/Alert';
import { numericMask } from '../../../../../../../../utlis/mask';
import { useTabCreate } from '../../../providers/tabsProvider';

export const labelDetails = 'Detalhes';
export const nameDetails = '@@tabs-details';

export const Details = (): JSX.Element => {
  const [alert, setAlert] = useState<{ active: boolean; message: string }>({
    active: false,
    message: '',
  });

  const { getDetails, setDetails } = useTabCreate();
  const { weight, width, height, length } = getDetails();

  const handlerClickAlertConfirm = useCallback(() => {
    setAlert({ ...alert, active: false });
  }, [alert]);

  const handlerClickNextButton = useCallback(() => {
    let isError = false;

    if (weight.value === '') {
      isError = true;
      setDetails({
        ...getDetails(),
        weight: { ...weight, error: { isError: true } },
      });
    }
    if (width.value === '') {
      isError = true;
      setDetails({
        ...getDetails(),
        width: { ...width, error: { isError: true } },
      });
    }

    if (isError) {
      setAlert({
        active: true,
        message:
          'Os campos destacados na aba "Detalhes" são de preenchimento obrigatório',
      });
    }
  }, [weight, width]);

  return (
    <Container>
      <div className="row">
        <div className="form-content col-md-3">
          <TooltipComponent label="Peso (kg)" message="Infome o peso em kg" />
          <NewInput
            value={numericMask(weight.value)}
            onChange={e =>
              setDetails({
                ...getDetails(),
                weight: { error: { isError: false }, value: e.target.value },
              })
            }
            error={weight.error}
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
            value={numericMask(width.value)}
            onChange={e =>
              setDetails({
                ...getDetails(),
                width: { error: { isError: false }, value: e.target.value },
              })
            }
            error={width.error}
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
            value={numericMask(height.value)}
            onChange={e =>
              setDetails({
                ...getDetails(),
                height: { error: { isError: false }, value: e.target.value },
              })
            }
            error={height.error}
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
            value={numericMask(length.value)}
            onChange={e =>
              setDetails({
                ...getDetails(),
                length: { error: { isError: false }, value: e.target.value },
              })
            }
            error={length.error}
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
              // isError={errorDescriptionAndDetails.isError}
              isError={false}
              // onChange={event =>
              //   handlerChangerDescriptionAndDetails(event.target.value)
              // }
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
              // isError={errorEspecification.isError}
              isError={false}
              // onChange={event =>
              //   handlerChangerEspecification(event.target.value)
              // }
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
              // isError={errorWayOfUse.isError}
              isError={false}
              // onChange={event => handlerChangerWayOfUse(event.target.value)}
              className="form-control"
            />
          </div>
        </div>
      </div>
      <Footer onClickButtonNext={handlerClickNextButton} />
      <Alert
        isActive={alert.active}
        onlyConfirm
        message={alert.message}
        onClickConfirmButton={handlerClickAlertConfirm}
      />
    </Container>
  );
};
