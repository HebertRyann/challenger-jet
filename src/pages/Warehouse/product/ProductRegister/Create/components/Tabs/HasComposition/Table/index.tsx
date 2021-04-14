import React, { useCallback, useEffect, useState } from 'react';
import { Footer } from '../../../footer';
import { Container, FooterStyled, IconRemove } from './style';
import { NewInput } from '../../../../../../../../../components/NewInput';
import { useTabCreate } from '../../../../providers/tabsProvider';
import { Alert } from '../../../../../../../../../components/Alert';
import { useTabs } from '../../../../../../../../../hooks/tabs';
import { loadProductByType } from '../../../../services/api/loadProductByType';
import { nameHasComposition } from '..';

type ProductByTypeSelected = {
  id: string;
  name: string;
};

export const Table = (): JSX.Element => {
  const [alert, setAlert] = useState(false);
  const [productListByTypeSelected, setProductListByTypeSelected] = useState<
    ProductByTypeSelected[]
  >([]);
  const { composition, overview } = useTabCreate();
  const {
    changeCurrentTabForNext,
    changeCurrentTabForPrevious,
    loadCurrentTab,
  } = useTabs();
  const products = composition.getData();
  const { typeSelectProdut } = overview.getData();
  const {
    removeComposition,
    addComposition,
    changeInputNameProduct,
    changeInputAmount,
    changeInputCost,
  } = composition.setData;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let soma = 0;
    for (let i = 0; i < products.length; i++) {
      const subtotal =
        Number(products[i].amount.value) * Number(products[i].cost.value);
      soma += subtotal;
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

  useEffect(() => {
    (async () => {
      if (loadCurrentTab().key === nameHasComposition) {
        const products = await loadProductByType(
          typeSelectProdut.value.name.replace(' ', '-').toLowerCase(),
        );
        setProductListByTypeSelected(products);
      }
    })();
  }, [typeSelectProdut.value, loadCurrentTab().key]);

  const handlerChangeNameProduct = (value: string, index: number) => {
    changeInputNameProduct(value, index);
    console.log(productListByTypeSelected);
  };

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
                    handlerChangeNameProduct(event.target.value, index)
                  }
                />
              </td>
              <td>
                <NewInput
                  name="amount"
                  value={amount.value}
                  error={amount.error}
                  placeholder="0"
                  isNumber
                  onChange={event =>
                    changeInputAmount(event.currentTarget.value, index)
                  }
                  className="form-control"
                  type="text"
                />
              </td>
              <td>
                <NewInput
                  name="cost"
                  value={cost.value}
                  error={cost.error}
                  placeholder="0.00"
                  isNumber
                  onChange={event =>
                    changeInputCost(event.currentTarget.value, index)
                  }
                  className="form-control"
                  type="text"
                />
              </td>
              <td>
                <NewInput
                  name="subtotal"
                  disabled
                  value={(Number(amount.value) * Number(cost.value)).toFixed(2)}
                  error={subtotal.error}
                  placeholder="0.00"
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
          <h6>{total.toFixed(2)}</h6>
        </div>
      </FooterStyled>
      <div style={{ margin: '20px 0px 0 0' }}>
        <Footer
          onSave={handleClickOnSaveButton}
          onClickButtonNext={() => changeCurrentTabForNext(nameHasComposition)}
          onClickButtonBack={() =>
            changeCurrentTabForPrevious(nameHasComposition)
          }
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
