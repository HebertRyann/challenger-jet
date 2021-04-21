import React, { useEffect } from 'react';
import { useTabs } from '../../../../../../../../hooks/tabs';
import {
  formatProductTypeToLowerCase,
  SALE,
  SEMI_FINISHED,
} from '../../../../Create/domain/products';
import { FiscalView } from '../../../domain/response/productResponse';
import { useProduct } from '../../../provider/productProvider';
import { Container } from './style';

export const Fiscal = (): JSX.Element => {
  const { getProduct } = useProduct();
  const { fiscal } = getProduct();
  const { activeTab } = useTabs();

  let fiscalList: FiscalView = {} as FiscalView;

  useEffect(() => {
    if (
      getProduct().type?.replace(' ', '-') ===
        formatProductTypeToLowerCase(SEMI_FINISHED) ||
      getProduct().type?.replace(' ', '-') ===
        formatProductTypeToLowerCase(SALE)
    ) {
      activeTab(nameFiscal);
    }
  }, [getProduct()]);

  if (fiscal) {
    fiscalList = JSON.parse(fiscal.toLowerCase());
  }

  return (
    <Container>
      <div className="row">
        <div className="form-content col-md-6">
          <label htmlFor="Peso">NCM</label>
          <p>{fiscalList.ncm}</p>
        </div>
        <div className="form-content col-md-6">
          <label htmlFor="tipo do produto">CFOP</label>
          <p>{fiscalList.cfop}</p>
        </div>
      </div>
      <hr />
    </Container>
  );
};

export const labelFiscal = 'Fiscal';
export const nameFiscal = '@@tabs-view-fiscal';
