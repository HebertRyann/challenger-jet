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

type TypeUnitMensured = {
  id: string;
  name: string;
};

type TypeTableProps = {
  unitMensured: TypeUnitMensured[];
};

export const Table = ({ unitMensured }: TypeTableProps): JSX.Element => {
  const [alert, setAlert] = useState(false);
  const { changeCurrentTab } = useTabs();
  const { overview, validation } = useTabCreate();
  const { typeSelectProdut } = overview.getData();

  const handlerClickAlertConfirm = useCallback(() => {
    setAlert(false);
  }, [alert]);

  const { stock } = useTabCreate();
  const { stockCurrent, priceCost, priceSale } = stock.getData();
  const unitMensureds = stock.getData().unitMensured;

  return (
    <Container className="table-responsive">
      <table className="table table-bordered margin-bottom-0">
        <tbody>
          <tr>
            <th>Unidade de medidas</th>
            <th>Estoque atual</th>
            {typeSelectProdut.value.name === SALE.name ||
            typeSelectProdut.value.name === RE_SALE.name ? (
              <th colSpan={2}>Preço</th>
            ) : null}
          </tr>
          <tr>
            <td>
              <NewSelect
                style={{
                  marginTop: '18px',
                }}
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
                style={{
                  marginTop: '18px',
                }}
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
            {typeSelectProdut.value.name === SALE.name ||
            typeSelectProdut.value.name === RE_SALE.name ? (
              <>
                <td style={{ width: '150px' }}>
                  <tr>
                    <th>Custo</th>
                  </tr>
                  <tr>
                    <NewInput
                      name="cost"
                      value={priceCost.value}
                      error={priceCost.error}
                      placeholder="0.00"
                      onKeyPress={event => {
                        const regex = /^[0-9.]+$/;
                        if (!regex.test(event.key)) event.preventDefault();
                      }}
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
                    <th>Venda</th>
                  </tr>
                  <tr>
                    <NewInput
                      name="priceSale"
                      value={(Number(priceCost.value) * 1.5).toString()}
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
        onClickButtonBack={() => changeCurrentTab(nameDetails)}
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
