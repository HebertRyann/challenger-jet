import React, { useState } from 'react';
import { ResponseEntiryWithIdNameWithChildren } from '../../../services/api';
import { Table } from './Table';
import { FooterCreateProduct } from '../../footer';
import { SaveFooter } from '../../footer/saveFooter';

export const HasComposition = (): JSX.Element => {
  const [atributesList, setAtributesList] = useState<
    ResponseEntiryWithIdNameWithChildren[]
  >([]);

  return (
    <div className="row">
      <Table />
      <div>
        <hr />
        <FooterCreateProduct onClickButtonNext={() => {}} />
        <hr />
        <SaveFooter onSave={() => {}} />
      </div>
    </div>
  );
};

export const labelHasComposition = 'Composição';
export const nameHasComposition = '@@tabs-has-composition';
