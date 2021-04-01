import React from 'react';
import { Table } from './Table';
import { Footer } from '../../footer';
import { Container } from './styles';

export const PriceComposition = (): JSX.Element => (
  <Container>
    <Table />
    <div style={{ marginTop: '20px' }}>
      <Footer onClickButtonNext={() => {}} />
    </div>
  </Container>
);

export const labelPriceComposition = 'Formaçao de preço';
export const namePriceComposition = '@@tabs-price-training';
