import React, { useCallback, useEffect, useState } from 'react';
import { Footer } from '../../../footer';
import { Container, FooterStyled, IconRemove } from './style';
import { NewInput } from '../../../../../../../../../components/NewInput';
import { useTabCreate } from '../../../../providers/tabsProvider';
import { Alert } from '../../../../../../../../../components/Alert';
import { SEMI_FINISHED } from '../../DataOverview/products';
import { useTabs } from '../../../../../../../../../hooks/tabs';
import { nameHasVariation } from '../../HasVariation';
import { nameStock } from '../../Stock';

type Product = {
  name: string;
  amount: string;
  cost: string;
  subtotal: string;
};

export const Table = (): JSX.Element => {
  const [alert, setAlert] = useState(false);
  const { composition, overview } = useTabCreate();
  const { typeSelectProdut, hasVariation } = overview.getData();
  const { changeCurrentTab } = useTabs();
  const products = composition.getData();

  const {
    removeComposition,
    addComposition,
    changeInputNameProduct,
    changeInputAmount,
    changeInputCost,
    changeInputSubTotal,
  } = composition.setData;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let soma = 0;
    for (let i = 0; i < products.length; i++) {
      soma += Number(products[i].subtotal.value);
    }
    setTotal(soma);
  }, [products]);

  const handleClickOnSaveButton = () => {
    if (composition.validate()) {
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
            <th style={{ width: '50%' }}>Produto</th>
            <th>Quantidade</th>
            <th>Custo</th>
            <th>Subtotal</th>
            <th>Ações</th>
          </tr>
          {products.map(({ amount, cost, nameProduct, subtotal }, index) => (
            <tr>
              <td>
                <NewInput
                  name="nameProduct"
                  placeholder="Informe o nome do produto"
                  className="form-control"
                  type="text"
                  value={nameProduct.value}
                  error={nameProduct.error}
                  onChange={event =>
                    changeInputNameProduct(event.currentTarget.value, index)
                  }
                />
              </td>
              <td>
                <NewInput
                  name="amount"
                  value={amount.value}
                  error={amount.error}
                  placeholder="0"
                  onKeyPress={event => {
                    const regex = /^[0-9]+$/;
                    if (!regex.test(event.key)) event.preventDefault();
                  }}
                  onChange={event =>
                    changeInputAmount(event.currentTarget.value, index)
                  }
                  className="form-control"
                  type="text"
                />
              </td>
              <td>
                <NewInput
                  name="input"
                  value={cost.value}
                  error={cost.error}
                  placeholder="0.00"
                  onKeyPress={event => {
                    const regex = /^[0-9.]+$/;
                    if (!regex.test(event.key)) event.preventDefault();
                  }}
                  onChange={event =>
                    changeInputCost(event.currentTarget.value, index)
                  }
                  className="form-control"
                  type="text"
                />
              </td>
              <td>
                <NewInput
                  name="input"
                  value={subtotal.value}
                  error={subtotal.error}
                  placeholder="0.00"
                  onKeyPress={event => {
                    const regex = /^[0-9.]+$/;
                    if (!regex.test(event.key)) event.preventDefault();
                  }}
                  onChange={event =>
                    changeInputSubTotal(event.currentTarget.value, index)
                  }
                  className="form-control"
                  type="text"
                />
              </td>
              <td className="actions">
                <IconRemove onClick={() => removeComposition(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <FooterStyled>
        <button
          onClick={addComposition}
          className="btn dark btn-sm sbold uppercase"
        >
          <span
            className="fa fa-plus"
            aria-hidden="true"
            style={{ marginRight: '5px' }}
          />
          produto
        </button>
        <div>
          <h4>Total</h4>
          <h6>{total}</h6>
        </div>
      </FooterStyled>
      <div style={{ margin: '20px 0px 0 0' }}>
        <Footer
          onSave={handleClickOnSaveButton}
          onClickButtonBack={() => {
            if (typeSelectProdut.value.name === SEMI_FINISHED.name) {
              if (hasVariation.value.hasVariation) {
                changeCurrentTab(nameHasVariation);
              } else {
                changeCurrentTab(nameStock);
              }
            }
          }}
        />
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
