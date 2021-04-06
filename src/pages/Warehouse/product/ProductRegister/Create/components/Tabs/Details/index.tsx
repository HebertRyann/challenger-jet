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
import { nameStock } from '../Stock';
import { nameHasVariation } from '../HasVariation';
import { LOCATION, SALE } from '../DataOverview/products';
import { RE_SALE } from '../Fiscal/tabs/Icms/icms';

export const Details = (): JSX.Element => {
  const { changeCurrentTab } = useTabs();
  const [alert, setAlert] = useState<{
    active: boolean;
    message?: string;
    component?: () => JSX.Element;
  }>({
    active: false,
    message: '',
  });

  const { details, overview, stock } = useTabCreate();
  const { typeSelectProdut } = overview.getData();
  const {
    weight,
    width,
    height,
    length,
    descriptionAndDetails,
    technicalSpecification,
    wayOfUse,
  } = details.getData();

  const handlerClickAlertConfirm = useCallback(() => {
    setAlert({ ...alert, active: false });
  }, [alert]);

  const handlerClickNextButton = useCallback(() => {
    if (
      typeSelectProdut.value.name === SALE.name ||
      typeSelectProdut.value.name === RE_SALE.name ||
      typeSelectProdut.value.name === LOCATION.name
    ) {
      if (details.validate()) {
        setAlert({
          active: true,
          message: 'Os campos destacados são de preenchimento obrigatório',
        });
        return;
      }
    }
    if (overview.validate()) {
      setAlert({
        active: true,
        component: (): JSX.Element => (
          <h4 style={{ fontWeight: 300 }}>
            Os campos destacados na aba{' '}
            <span
              onClick={() => {
                handlerClickAlertConfirm();
                changeCurrentTab(nameDataOverview);
              }}
              style={{ fontWeight: 700, cursor: 'pointer' }}
            >
              Dados{' '}
            </span>
            são de preenchimento obrigatório
          </h4>
        ),
      });
      return;
    }
    if (stock.validate()) {
      setAlert({
        active: true,
        component: (): JSX.Element => (
          <h4 style={{ fontWeight: 300 }}>
            Os campos destacados na aba{' '}
            <span
              onClick={() => {
                handlerClickAlertConfirm();
                changeCurrentTab(nameStock);
              }}
              style={{ fontWeight: 700, cursor: 'pointer' }}
            >
              Estoque/Variação{' '}
            </span>
            são de preenchimento obrigatório
          </h4>
        ),
      });
      return;
    }
  }, [details.getData(), overview.getData(), stock.getData()]);

  return (
    <Container>
      <div className="row">
        <div className="form-content col-md-3">
          <TooltipComponent label="Peso (kg)" message="Infome o peso em kg" />
          <NewInput
            value={numericMask(weight.value)}
            onChange={e =>
              details.setData({
                ...details.getData(),
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
              details.setData({
                ...details.getData(),
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
              details.setData({
                ...details.getData(),
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
              details.setData({
                ...details.getData(),
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
                details.setData({
                  ...details.getData(),
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
                details.setData({
                  ...details.getData(),
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
                details.setData({
                  ...details.getData(),
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
        onClickButtonNext={() =>
          changeCurrentTab(
            overview.getData().hasVariation.value.hasVariation
              ? nameHasVariation
              : nameStock,
          )
        }
        onClickButtonBack={() => changeCurrentTab(nameDataOverview)}
        onSave={handlerClickNextButton}
      />
      <Alert
        isActive={alert.active}
        onlyConfirm
        message={alert.message}
        RenderComponent={alert.component}
        onClickConfirmButton={handlerClickAlertConfirm}
      />
    </Container>
  );
};

export const labelDetails = 'Detalhes';
export const nameDetails = '@@tabs-details';
