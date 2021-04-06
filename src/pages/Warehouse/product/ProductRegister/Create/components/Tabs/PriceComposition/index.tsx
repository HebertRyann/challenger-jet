import React from 'react';
import { Table } from './Table';
import { Container } from './styles';

export const PriceComposition = (): JSX.Element => (
  <Container>
    <Table />
  </Container>
);

export const labelPriceComposition = 'Formaçao de preço';
export const namePriceComposition = '@@tabs-price-training';
