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

  const [
    selectUnitMensured,
    setSelectUnitMensured,
  ] = useState<TypeUnitMensured>({ id: '', name: '' });

  const [stocks, setStocks] = useState('');

  const [errorUnitMensured, setErrorUnitMensured] = useState<TypeErrorInput>({
    isError: false,
  });
  const [errorStock, setErrorStock] = useState<TypeErrorInput>({
    isError: false,
  });

  const handlerChangeSelectUnitMensured = useCallback(
    (currentSelectedUnitMensured: TypeUnitMensured) => {
      setErrorUnitMensured({ isError: false });
      setSelectUnitMensured(currentSelectedUnitMensured);
    },
    [unitMensured],
  );

  const handlerChangeStock = useCallback(
    (currentStock: string) => {
      setErrorStock({ isError: false });
      setStocks(currentStock);
    },
    [stocks],
  );

  const handlerClickButtonNextTab = useCallback(() => {
    let isError = false;

    if (selectUnitMensured.id === '') {
      isError = true;
      setErrorUnitMensured({ isError: true });
    }

    if (stocks === '') {
      isError = true;
      setErrorStock({ isError: true });
    }

    if (!isError) {
    } else {
      setAlert(true);
    }
  }, [unitMensured, stocks]);

  const handlerClickAlertConfirm = useCallback(() => {
    setAlert(false);
  }, [alert]);

  const { stock } = useTabCreate();
  const { stockCurrent } = stock.getData();
  const unitMensureds = stock.getData().unitMensured;

  const validate = () => {
    stock.validate();
  };

  return (
    <Container className="table-responsive">
      <table className="table table-bordered margin-bottom-0">
        <tbody>
          <tr>
            <th>Unidade de medidas</th>
            <th>Estoque atual</th>
            <th colSpan={2}>Preço</th>
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
                    handlerChangeSelectUnitMensured({ id, name });
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
            <td style={{ width: '150px' }}>
              <tr>
                <th>Custo</th>
              </tr>
              <tr>
                <input className="form-control" type="text" />
              </tr>
            </td>
            <td style={{ width: '150px' }}>
              <tr>
                <th>Venda</th>
              </tr>
              <tr>
                <input disabled className="form-control" type="text" />
              </tr>
            </td>
          </tr>
        </tbody>
      </table>
      <Footer
        onClickButtonBack={() => changeCurrentTab(nameDetails)}
        onSave={validate}
        onClickButtonNext={handlerClickButtonNextTab}
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
