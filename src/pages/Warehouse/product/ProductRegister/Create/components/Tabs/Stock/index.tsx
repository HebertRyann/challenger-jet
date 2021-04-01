import React, { useEffect, useState } from 'react';
import { Table } from './component/Table';
import { FooterCreateProduct } from '../../footer';
import { SaveFooter } from '../../footer/saveFooter';

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
      <div style={{ padding: '0 20px' }}>
        <hr />
        <FooterCreateProduct onClickButtonNext={() => {}} />
        <hr />
        <SaveFooter onSave={() => {}} />
      </div>
    </div>
  );
};

export const labelStock = 'Estoque';
export const nameStock = '@@tabs-stock';
