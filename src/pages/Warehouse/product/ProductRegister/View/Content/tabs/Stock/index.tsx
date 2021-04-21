import React from 'react';
import { useProduct } from '../../../provider/productProvider';
import { Container } from './style';

type Stock = {};

export const Stock = (): JSX.Element => {
  const { getProduct } = useProduct();
  const { stocks } = getProduct();

  if (stocks) {
    const { current_stock, replacement_point, details } = stocks[0];

    let unitMensured: { unit_mensured: { name: string } } = {
      unit_mensured: { name: '' },
    };

    if (details) {
      unitMensured = JSON.parse(details);
    }

    return (
      <Container>
        <div className="row">
          <div className="form-content col-md-4">
            <label htmlFor="Peso">Unidade de medidas</label>
            <p>{unitMensured.unit_mensured.name}</p>
          </div>
          <div className="form-content col-md-4">
            <label htmlFor="tipo do produto">Estoque atual</label>
            <p>{current_stock}</p>
          </div>
          <div className="form-content col-md-4">
            <label htmlFor="tipo do produto">Ponto de reposição</label>
            <p>{replacement_point}</p>
          </div>
        </div>
        <hr />
      </Container>
    );
  }
  return <div />;
};

export const labelStock = 'Estoque';
export const nameStock = '@@tabs-view-stocks';
