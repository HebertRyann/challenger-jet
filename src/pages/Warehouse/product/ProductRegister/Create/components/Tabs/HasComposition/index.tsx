import React, { useCallback, useEffect, useState } from 'react';
import { Container } from './styles';
import {
  loadAtributes,
  ResponseEntiryWithIdNameWithChildren,
} from '../../../services/api';
import { Table } from './Table';

export const HasComposition = (): JSX.Element => {
  const [atributesList, setAtributesList] = useState<
    ResponseEntiryWithIdNameWithChildren[]
  >([]);

  return (
    <div className="row">
      <Table />
    </div>
  );
};

export const labelHasComposition = 'Composição';
export const nameHasComposition = '@@tabs-has-composition';
