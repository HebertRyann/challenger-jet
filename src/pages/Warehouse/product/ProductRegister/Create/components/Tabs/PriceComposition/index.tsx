import React from 'react';
import { Table } from './Table';
import { FooterCreateProduct } from '../../footer';
import { SaveFooter } from '../../footer/saveFooter';

export const PriceComposition = (): JSX.Element => (
  <div className="row">
    <Table />
    <div style={{padding: '0 20px'}}>
      <hr />
      <FooterCreateProduct onClickButtonNext={() => {}} />
      <hr />
      <SaveFooter onSave={() => {}} />
    </div>
  </div>
);

export const labelPriceComposition = 'Composição de preço';
export const namePriceComposition = '@@tabs-price-composition';
