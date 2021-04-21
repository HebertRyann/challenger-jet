import React from 'react';
import { PriceCompositionView } from '../../../domain/response/productResponse';
import { useProduct } from '../../../provider/productProvider';
import { Container } from './style';

export const PriceComposition = (): JSX.Element => {
  const { getProduct } = useProduct();
  const { price_composition } = getProduct();
  let priceCompositionList: PriceCompositionView = {} as PriceCompositionView;

  if (price_composition) {
    priceCompositionList = JSON.parse(price_composition.toLowerCase());
  }

  return (
    <Container>
      <div className="row">
        <div className="form-content col-md-3">
          <label htmlFor="Peso">Margem de lucro</label>
          <p>{priceCompositionList.dif?.toFixed(3)}</p>
        </div>
        <div className="form-content col-md-3">
          <label htmlFor="tipo do produto">IPI (%)</label>
          <p>{priceCompositionList.fixed_cost?.toFixed(2)}</p>
        </div>
        <div className="form-content col-md-3">
          <label htmlFor="tipo do produto">Custo fixo</label>
          <p>{priceCompositionList.ipi?.toFixed(2)}</p>
        </div>
        <div className="form-content col-md-3">
          <label htmlFor="tipo do produto">DIF ICMS</label>
          <p>{priceCompositionList.margin_profit?.toFixed(2)}</p>
        </div>
      </div>
    </Container>
  );
};

export const labelPriceComposition = 'Formação de preço';
export const namePriceComposition = '@@tabs-view-PriceComposition';
