import React, { useEffect } from 'react';
import { useTabs } from '../../../../../../../../hooks/tabs';
import {
  formatProductTypeToLowerCase,
  SALE,
  SEMI_FINISHED,
} from '../../../../Create/domain/products';
import { CompositonView } from '../../../domain/response/productResponse';
import { useProduct } from '../../../provider/productProvider';
import { Container } from './style';

export const HasComposition = (): JSX.Element => {
  const { getProduct } = useProduct();

  const { activeTab } = useTabs();

  useEffect(() => {
    if (
      getProduct().type?.replace(' ', '-') ===
        formatProductTypeToLowerCase(SEMI_FINISHED) ||
      getProduct().type?.replace(' ', '-') ===
        formatProductTypeToLowerCase(SALE)
    ) {
      activeTab(nameHasComposition);
    }
  }, [getProduct()]);

  const { composition } = getProduct();

  let compositionList: CompositonView[] = [];

  if (composition) {
    compositionList = JSON.parse(composition.toLowerCase());
  }

  let total = compositionList.reduce(
    (sum, { amount, cost }) => sum + cost * amount,
    0,
  );

  return (
    <>
      {compositionList.map(({ amount, cost, name }) => (
        <Container className="row">
          <div className="form-content col-md-6">
            <label htmlFor="Peso">Produto</label>
            <p>{name}</p>
          </div>
          <div className="form-content col-md-2">
            <label htmlFor="tipo do produto">Quantidade</label>
            <p>{amount}</p>
          </div>
          <div className="form-content col-md-2">
            <label htmlFor="tipo do produto">Custo</label>
            <p>{cost}</p>
          </div>
          <div className="form-content col-md-2">
            <label htmlFor="tipo do produto">Subtotal</label>
            <p>{(amount * cost).toFixed(2)}</p>
          </div>
        </Container>
      ))}
      <hr />
      <Container
        className="form-content total col-md-12"
        style={{ textAlign: 'end' }}
      >
        <label htmlFor="tipo do produto">Total</label>
        <p>{total}</p>
      </Container>
    </>
  );
};

export const labelHasComposition = 'Composição';
export const nameHasComposition = '@@tabs-view-has-composition';
