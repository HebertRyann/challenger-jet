import React, { useEffect, useState } from 'react';
import { Footer } from '../../../footer';
import { Container, FooterStyled, IconRemove } from './style';

type Product = {
  name: string;
  amount: string;
  cost: string;
  subtotal: string;
};

export const Table = (): JSX.Element | null => {
  const initialStateProduct = { amount: '', cost: '', name: '', subtotal: '' };
  const [total, setTotal] = useState(0);
  const [productList, setProductList] = useState<Product[]>([
    initialStateProduct,
  ]);

  const handlerAddNewVariation = () => {
    setProductList([...productList, initialStateProduct]);
  };

  const handlerChangeInputName = (name: string, index: number) => {
    productList[index].name = name;
    setProductList([...productList]);
  };

  const handlerChangeInputAmount = (amount: string, index: number) => {
    productList[index].amount = amount;
    setProductList([...productList]);
  };

  const handlerChangeInputCost = (cost: string, index: number) => {
    productList[index].cost = cost;
    setProductList([...productList]);
  };

  const handlerChangeInputNameSubTotal = (subtotal: string, index: number) => {
    productList[index].subtotal = subtotal;
    setProductList([...productList]);
  };

  const handleRemoveProduct = (index: number) => {
    const productWithOutIndex = productList[index];
    const result = productList.filter(
      product => product !== productWithOutIndex,
    );
    setProductList([...result]);
  };

  useEffect(() => {
    let soma = 0;
    for (let i = 0; i < productList.length; i++) {
      soma += Number(productList[i].subtotal);
    }
    setTotal(soma);
  }, [productList]);

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
          {productList.map(({ amount, cost, name, subtotal }, index) => (
            <tr>
              <td>
                <input
                  placeholder="Informe o nome do produto"
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={event => {
                    handlerChangeInputName(event.currentTarget.value, index);
                  }}
                />
              </td>
              <td>
                <input
                  value={amount}
                  onChange={event => {
                    handlerChangeInputAmount(event.currentTarget.value, index);
                  }}
                  className="form-control"
                  type="text"
                />
              </td>
              <td>
                <input
                  value={cost}
                  onChange={event => {
                    handlerChangeInputCost(event.currentTarget.value, index);
                  }}
                  className="form-control"
                  type="text"
                />
              </td>
              <td>
                <input
                  value={subtotal}
                  onChange={event => {
                    handlerChangeInputNameSubTotal(
                      event.currentTarget.value,
                      index,
                    );
                  }}
                  className="form-control"
                  type="text"
                />
              </td>
              <td className="actions">
                <IconRemove onClick={() => handleRemoveProduct(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <FooterStyled>
        <button
          onClick={handlerAddNewVariation}
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
        <Footer onClickButtonNext={() => console.log(productList)} />
      </div>
    </Container>
  );
};
