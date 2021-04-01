import React, { useCallback, useState } from 'react';
import { Footer } from '../../../../footer';
import { Container } from './style';
import {
  NewInput,
  TypeErrorInput,
} from '../../../../../../../../../../components/NewInput';
import { NewSelect } from '../../../../../../../../../../components/NewSelect';
import { useTabs } from '../../../../../../../../../../hooks/tabs';
import { Alert } from '../../../../../../../../../../components/Alert';

type TypeUnitMensured = {
  id: string;
  name: string;
};

type TypeVariation = {
  key: number;
  isEnable: boolean;
};

type TypeTableProps = {
  unitMensured: TypeUnitMensured[];
};

export const Table = ({ unitMensured }: TypeTableProps): JSX.Element => {
  const { changeCurrentTabForNext } = useTabs();
  const [alert, setAlert] = useState(false);

  const [
    selectUnitMensured,
    setSelectUnitMensured,
  ] = useState<TypeUnitMensured>({ id: '', name: '' });

  const [stock, setStock] = useState('');

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
      setStock(currentStock);
    },
    [stock],
  );

  const handlerClickButtonNextTab = useCallback(() => {
    let isError = false;

    if (selectUnitMensured.id === '') {
      isError = true;
      setErrorUnitMensured({ isError: true });
    }

    if (stock === '') {
      isError = true;
      setErrorStock({ isError: true });
    }

    if (!isError) {
    } else {
      setAlert(true);
    }
  }, [unitMensured, stock]);

  const handlerClickAlertConfirm = useCallback(() => {
    setAlert(false);
  }, [alert]);

  return (
    <Container className="table-responsive">
      <table className="table table-bordered margin-bottom-0">
        <tbody>
          <tr>
            <th>Unidade de medidas</th>
            <th>Estoque atual</th>
          </tr>
          <tr>
            <td>
              <NewSelect
                error={errorUnitMensured}
                onChange={event => {
                  const id = event.target.value.split('+')[0];
                  const name = event.target.value.split('+')[1];
                  if (id && name) {
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
                onChange={event => handlerChangeStock(event.target.value)}
                error={errorStock}
                name="stock"
                className="form-control"
                type="text"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Footer onClickButtonNext={handlerClickButtonNextTab} />
      <Alert
        isActive={alert}
        onlyConfirm
        message="Os campos destacados são de preenchimento obrigatório"
        onClickConfirmButton={handlerClickAlertConfirm}
      />
    </Container>
  );
};
