import React, { useCallback, useState } from 'react';
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent';
import { Footer } from '../../footer';
import { Container, TextArea } from './style';
import { NewInput } from '../../../../../../../../components/NewInput';
import { Alert } from '../../../../../../../../components/Alert';
import { numericMask } from '../../../../../../../../utlis/mask';
import { useTabCreate } from '../../../providers/tabsProvider';
import { useTabs } from '../../../../../../../../hooks/tabs';
import { nameDataOverview } from '../DataOverview';

export const Details = (): JSX.Element => {
  const { changeCurrentTab } = useTabs();
  const [alert, setAlert] = useState<{ active: boolean; message: string }>({
    active: false,
    message: '',
  });

  const {
    getDetails,
    setDetails,
    validationAndSetErrorAllFieldsDetails,
  } = useTabCreate();
  const {
    weight,
    width,
    height,
    length,
    descriptionAndDetails,
    technicalSpecification,
    wayOfUse,
  } = getDetails();

  const handlerClickAlertConfirm = useCallback(() => {
    setAlert({ ...alert, active: false });
  }, [alert]);

  const handlerClickNextButton = useCallback(() => {
    if (validationAndSetErrorAllFieldsDetails()) {
      setAlert({
        active: true,
        message:
          'Os campos destacados na aba "Detalhes" são de preenchimento obrigatório',
      });
    }
  }, [
    weight,
    width,
    height,
    length,
    descriptionAndDetails,
    technicalSpecification,
    wayOfUse,
  ]);

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
              isError={descriptionAndDetails.error.isError}
              onChange={e =>
                setDetails({
                  ...getDetails(),
                  descriptionAndDetails: {
                    error: { isError: false },
                    value: e.target.value,
                  },
                })
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
              isError={technicalSpecification.error.isError}
              onChange={e =>
                setDetails({
                  ...getDetails(),
                  technicalSpecification: {
                    error: { isError: false },
                    value: e.target.value,
                  },
                })
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
              isError={wayOfUse.error.isError}
              onChange={e =>
                setDetails({
                  ...getDetails(),
                  wayOfUse: {
                    error: { isError: false },
                    value: e.target.value,
                  },
                })
              }
              className="form-control"
            />
          </div>
        </div>
      </div>
      <Footer
        onClickButtonNext={handlerClickNextButton}
        onClickButtonBack={() => changeCurrentTab(nameDataOverview)}
      />
      <Alert
        isActive={alert.active}
        onlyConfirm
        message={alert.message}
        onClickConfirmButton={handlerClickAlertConfirm}
      />
    </Container>
  );
};

export const labelDetails = 'Detalhes';
export const nameDetails = '@@tabs-details';
