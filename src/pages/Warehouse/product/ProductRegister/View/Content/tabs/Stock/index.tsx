import React from 'react';
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent';
import {
  formatProductTypeToLowerCase,
  RE_SALE,
  SALE,
} from '../../../../Create/domain/products';
import { PriceResponse } from '../../../domain/response/productResponse';
import { useProduct } from '../../../provider/productProvider';
import { Container } from './style';

type Stock = {};

export const Stock = (): JSX.Element => {
  const { getProduct } = useProduct();
  const { stocks } = getProduct();
  let pricesStock = {} as PriceResponse;

  const isSaleOrResaleType = (): boolean => {
    return (
      getProduct().type?.replace(' ', '-') ===
        formatProductTypeToLowerCase(RE_SALE) ||
      getProduct().type?.replace(' ', '-') ===
        formatProductTypeToLowerCase(SALE)
    );
  };

  if (stocks) {
    const { current_stock, replacement_point, details, prices } = stocks[0];

    let unitMensured: { unit_mensured: { name: string } } = {
      unit_mensured: { name: '' },
    };

    if (details) {
      unitMensured = JSON.parse(details);
    }

    if (isSaleOrResaleType() && prices) {
      pricesStock = JSON.parse(prices?.toLowerCase());
    }

    return (
      <Container className="table table-bordered margin-bottom-0">
        <thead>
          <tr>
            <th
              className="title"
              style={
                isSaleOrResaleType()
                  ? {
                      position: 'relative',
                      lineHeight: '50px',
                    }
                  : {}
              }
              rowSpan={isSaleOrResaleType() ? 2 : 1}
            >
              Unidade de medidas
            </th>
            <th
              style={
                isSaleOrResaleType()
                  ? {
                      position: 'relative',
                      lineHeight: '50px',
                    }
                  : {}
              }
              rowSpan={isSaleOrResaleType() ? 2 : 1}
              className="title"
            >
              Estoque atual
            </th>
            <th
              style={
                isSaleOrResaleType()
                  ? {
                      position: 'relative',
                      lineHeight: '50px',
                    }
                  : {}
              }
              rowSpan={isSaleOrResaleType() ? 2 : 1}
              className="title"
            >
              <TooltipComponent
                label="Ponto de reposição"
                message="Ponto de reposição"
                bold
              />
            </th>
            {isSaleOrResaleType() && (
              <th style={{ textAlign: 'center' }} colSpan={2}>
                Preço
              </th>
            )}
          </tr>
          {isSaleOrResaleType() && (
            <tr>
              <th>Custo</th>
              <th>Venda</th>
            </tr>
          )}
          {}
        </thead>
        <tbody>
          <tr className="items">
            <td>{unitMensured.unit_mensured.name}</td>
            <td>{current_stock}</td>
            <td>{replacement_point}</td>
            {isSaleOrResaleType() && (
              <>
                <td>{pricesStock.price_cost}</td>
                <td>{pricesStock.price_sale}</td>
              </>
            )}
          </tr>
        </tbody>
      </Container>
    );
  }
  return <div />;
};

export const labelStock = 'Estoque';
export const nameStock = '@@tabs-view-stocks';
