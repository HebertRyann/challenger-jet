import React, { useCallback, useState } from 'react';
import { Footer } from '../../../../footer';
import { Container, IconRemove } from './style';
import { NewInput } from '../../../../../../../../../../components/NewInput';
import { NewSelect } from '../../../../../../../../../../components/NewSelect';
import { useTabCreate } from '../../../../../providers/tabsProvider';
import { Alert } from '../../../../../../../../../../components/Alert';
import { SALE, RE_SALE } from '../../../DataOverview/products';

type TypeUnitMensured = {
  id: string;
  name: string;
};

type TypeTableProps = {
  unitMensuredList: TypeUnitMensured[];
};

export const Table = ({ unitMensuredList }: TypeTableProps): JSX.Element => {
  const [alert, setAlert] = useState(false);
  const { variation, overview } = useTabCreate();
  const { typeSelectProdut } = overview.getData();
  const variationList = variation.getData();
  const {
    changeCurrentStock,
    changeCost,
    changePriceSale,
    changeUnitMensured,
    addVariation,
    removeVariation,
  } = variation.setData;

  const handleClickOnSaveButton = () => {
    if (variation.validate()) {
      setAlert(true);
    }
  };

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
            {typeSelectProdut.value.name === SALE.name ||
            typeSelectProdut.value.name === RE_SALE.name ? (
              <th colSpan={2}>Preço</th>
            ) : null}
            <th>Ações</th>
          </tr>
          {variationList.map(
            ({ unitMensured, currentStock, cost, priceSale }, index) => (
              <tr>
                <td>
                  <NewSelect
                    onChange={event => {
                      const split = event.target.value.split('+');
                      const id = split[0];
                      const name = split[1];
                      changeUnitMensured({ id, name }, index);
                    }}
                    name="unitMensured"
                    className="form-control top"
                  >
                    {unitMensuredList.map(({ id, name }) => (
                      <option value={`${id}+${name}`}>{name}</option>
                    ))}
                  </NewSelect>
                </td>
                <td>
                  <NewInput
                    name="currentStock"
                    value={currentStock.value}
                    error={currentStock.error}
                    onKeyPress={event => {
                      const regex = /^[0-9]+$/;
                      if (!regex.test(event.key)) event.preventDefault();
                    }}
                    onChange={event =>
                      changeCurrentStock(event.currentTarget.value, index)
                    }
                    className="form-control top"
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
                          value={cost.value}
                          error={cost.error}
                          placeholder="0.00"
                          onKeyPress={event => {
                            const regex = /^[0-9.]+$/;
                            if (!regex.test(event.key)) event.preventDefault();
                          }}
                          onChange={event =>
                            changeCost(event.currentTarget.value, index)
                          }
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
                          disabled
                          defaultValue={priceSale.value}
                          error={priceSale.error}
                          placeholder="0.00"
                          onKeyPress={event => {
                            const regex = /^[0-9.]+$/;
                            if (!regex.test(event.key)) event.preventDefault();
                          }}
                          onChange={event =>
                            changePriceSale(event.currentTarget.value, index)
                          }
                          className="form-control"
                          type="text"
                        />
                      </tr>
                    </td>
                  </>
                ) : null}
                <td className="actions">
                  <IconRemove
                    className="top"
                    onClick={() => removeVariation(index)}
                  />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <hr />
      <button
        onClick={() => {
          addVariation();
          console.log(variation.getData());
        }}
        className="btn dark btn-sm sbold uppercase"
      >
        <span
          className="fa fa-plus"
          aria-hidden="true"
          style={{ marginRight: '5px' }}
        />
        variação
      </button>

      <div style={{ margin: '20px 0px 0 0' }}>
        <Footer onSave={handleClickOnSaveButton} />
      </div>
      <Alert
        isActive={alert}
        onlyConfirm
        message="Os campos destacados são de preenchimento obrigatório"
        onClickConfirmButton={handlerClickAlertConfirm}
      />
    </Container>
  );
};
