import React from 'react';
import { Table } from './Table';
import { Footer } from '../../footer';
import { Container } from './styles';

export const PriceComposition = (): JSX.Element => (
  <Container>
    <Table />
    <Footer onClickButtonNext={() => {}} />
  </Container>
);

export const labelPriceComposition = 'Composição de preço';
export const namePriceComposition = '@@tabs-price-composition';
