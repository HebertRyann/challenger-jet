import React, { useCallback, useState } from 'react';
import { Footer } from '../../../../footer';
import { Container } from './style';
import {
  NewInput,
  TypeErrorInput,
} from '../../../../../../../../../../components/NewInput';
import { NewSelect } from '../../../../../../../../../../components/NewSelect';
import { useTabCreate } from '../../../../../providers/tabsProvider';
import { Alert } from '../../../../../../../../../../components/Alert';
import { nameDetails } from '../../../Details';
import { useTabs } from '../../../../../../../../../../hooks/tabs';
import { RE_SALE, SALE } from '../../../../../domain/products';
import { nameStock } from '../..';

type TypeUnitMensured = {
  id: string;
  name: string;
};

type TypeTableProps = {
  unitMensured: TypeUnitMensured[];
};

export const Table = ({ unitMensured }: TypeTableProps): JSX.Element => {
  const [alert, setAlert] = useState(false);
  const { changeCurrentTabForNext, changeCurrentTabForPrevious } = useTabs();
  const { overview, validation } = useTabCreate();
  const { typeSelectProdut } = overview.getData();

  const handlerClickAlertConfirm = useCallback(() => {
    setAlert(false);
  }, [alert]);

  const { stock } = useTabCreate();
  const {
    stockCurrent,
    priceCost,
    priceSale,
    replacementPoint,
  } = stock.getData();
  const unitMensureds = stock.getData().unitMensured;

  const isTypeSaleOrResale = (): boolean =>
    typeSelectProdut.value.name === SALE.name ||
    typeSelectProdut.value.name === RE_SALE.name;

  return (
    <Container className="table-responsive">
      <table className="table table-bordered margin-bottom-0">
        <tbody>
          <tr>
            <th
              style={
                isTypeSaleOrResale()
                  ? {
                      position: 'relative',
                      lineHeight: '50px',
                    }
                  : {}
              }
              rowSpan={isTypeSaleOrResale() ? 2 : 1}
            >
              Unidade de medidas
            </th>
            <th
              style={
                isTypeSaleOrResale()
                  ? {
                      position: 'relative',
                      lineHeight: '50px',
                    }
                  : {}
              }
              rowSpan={isTypeSaleOrResale() ? 2 : 1}
            >
              Estoque atual
            </th>
            <th
              style={
                isTypeSaleOrResale()
                  ? {
                      position: 'relative',
                      lineHeight: '50px',
                    }
                  : {}
              }
              rowSpan={isTypeSaleOrResale() ? 2 : 1}
            >
              Ponto de reposição
            </th>
            {typeSelectProdut.value.name === SALE.name ||
            typeSelectProdut.value.name === RE_SALE.name ? (
              <th style={{ textAlign: 'center' }} colSpan={2}>
                Preço
              </th>
            ) : null}
          </tr>
          {isTypeSaleOrResale() && (
            <tr>
              <th>Custo</th>
              <th>Venda</th>
            </tr>
          )}
          <tr>
            <td>
              <NewSelect
                error={unitMensureds.error}
                onChange={event => {
                  const id = event.target.value.split('+')[0];
                  const name = event.target.value.split('+')[1];
                  if (id && name) {
                    stock.setData({
                      ...stock.getData(),
                      unitMensured: {
                        error: { isError: false },
                        value: { id, name },
                      },
                    });
                  }
                }}
                className="select form-control"
                name="Selecione"
              >
                {unitMensured.map(
                  ({ id, name }) => (
                    <option value={`${id}+${name}`}>{name}</option>
                  ),
                  [],
                )}
              </NewSelect>
            </td>
            <td>
              <NewInput
                isNumber
                onChange={event => {
                  stock.setData({
                    ...stock.getData(),
                    stockCurrent: {
                      error: { isError: false },
                      value: event.currentTarget.value,
                    },
                  });
                }}
                error={stockCurrent.error}
                name="stock"
                className="form-control"
                type="text"
              />
            </td>
            <td>
              <NewInput
                isNumber
                onChange={event => {
                  stock.setData({
                    ...stock.getData(),
                    replacementPoint: {
                      error: { isError: false },
                      value: event.currentTarget.value,
                    },
                  });
                }}
                error={replacementPoint.error}
                value={replacementPoint.value}
                name="replacementPoint"
                className="form-control"
                type="text"
              />
            </td>
            {typeSelectProdut.value.name === SALE.name ||
            typeSelectProdut.value.name === RE_SALE.name ? (
              <>
                <td style={{ width: '150px' }}>
                  <tr>
                    <NewInput
                      isNumber
                      name="cost"
                      value={priceCost.value}
                      error={priceCost.error}
                      placeholder="0.00"
                      onChange={event => {
                        stock.setData({
                          ...stock.getData(),
                          priceCost: {
                            error: { isError: false },
                            value: event.currentTarget.value,
                          },
                        });
                      }}
                      className="form-control"
                      type="text"
                    />
                  </tr>
                </td>
                <td style={{ width: '150px' }}>
                  <tr>
                    <NewInput
                      isNumber
                      name="priceSale"
                      value={Number(priceCost.value).toString()}
                      disabled
                      error={priceSale.error}
                      placeholder="0.00"
                      className="form-control"
                      type="text"
                    />
                  </tr>
                </td>
              </>
            ) : null}
          </tr>
        </tbody>
      </table>
      <Footer
        onClickButtonNext={() => changeCurrentTabForNext(nameStock)}
        onClickButtonBack={() => changeCurrentTabForPrevious(nameStock)}
        onSave={() => validation.validate()}
      />
      <Alert
        isActive={alert}
        onlyConfirm
        message="Os campos destacados são de preenchimento obrigatório"
        onClickConfirmButton={handlerClickAlertConfirm}
      />
    </Container>
  );
};
