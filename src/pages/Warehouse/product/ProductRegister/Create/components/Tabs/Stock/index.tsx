import React from 'react';
import { Table } from './component/Table';

type TypeHasVariationProps = {
  unitMensureds: {
    id: string;
    name: string;
  }[];
};

export const Stock = ({
  unitMensureds,
}: TypeHasVariationProps): JSX.Element => {
  return (
    <div className="row">
      <Table unitMensured={unitMensureds} />
    </div>
  );
};

export const labelStock = 'Estoque';
export const nameStock = '@@tabs-stock';
