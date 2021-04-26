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
      <Container className="table table-bordered margin-bottom-0">
        <thead>
          <tr>
            <th className="title">Unidade de medidas</th>
            <th className="title">Estoque atual</th>
            <th className="title">Ponto de reposição</th>
          </tr>
        </thead>
        <tbody>
          <tr className="items">
            <td>{unitMensured.unit_mensured.name}</td>
            <td>{current_stock}</td>
            <td>{replacement_point}</td>
          </tr>
        </tbody>
      </Container>
    );
  }
  return <div />;
};

export const labelStock = 'Estoque';
export const nameStock = '@@tabs-view-stocks';
