import React, { useCallback, useEffect, useState } from 'react';
import { Footer } from '../../../../footer';
import { Container, IconRemove } from './style';
import { NewInput } from '../../../../../../../../../../components/NewInput';
import { useTabCreate } from '../../../../../providers/tabsProvider';
import { Alert } from '../../../../../../../../../../components/Alert';
import { SALE, RE_SALE } from '../../../DataOverview/products';

export const Table = (): JSX.Element => {
  const [alert, setAlert] = useState(false);
  const { variation, overview } = useTabCreate();
  const { typeSelectProdut } = overview.getData();
  const variationList = variation.getData();
  const {
    changeCurrentStock,
    changeCost,
    changePriceSale,
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
          {variationList.map(({ currentStock, cost, priceSale }, index) => (
            <tr>
              <td>
                <NewInput
                  name="unitMensured"
                  className="form-control top"
                  type="text"
                />
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
          ))}
        </tbody>
      </table>
      <hr />
      <button
        onClick={addVariation}
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
