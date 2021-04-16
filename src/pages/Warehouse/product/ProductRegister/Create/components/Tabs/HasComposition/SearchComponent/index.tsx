import React from 'react';
import { ContainerSearch } from './styles';

export const SearchComponentHasComposition = (): JSX.Element => {
  const data: any = [];

  return (
    <ContainerSearch active>
      <ul>
        <table className="table table-bordered margin-bottom-0">
          <tbody>
            <h5>Materia prima</h5>
            <tr>
              <th>Custo</th>
              <th>Venda</th>
              <th>Venda</th>
            </tr>
            <tr>
              <th>Custo</th>
              <th>Venda</th>
              <th>Venda</th>
            </tr>
            <tr>
              <th>Custo</th>
              <th>Venda</th>
              <th>Venda</th>
            </tr>
            <h5>Materia prima</h5>
            <tr>
              <th>Custo</th>
              <th>Venda</th>
              <th>Venda</th>
            </tr>
            <tr>
              <th>Custo</th>
              <th>Venda</th>
              <th>Venda</th>
            </tr>
            <tr>
              <th>Custo</th>
              <th>Venda</th>
              <th>Venda</th>
            </tr>
          </tbody>
        </table>
      </ul>
    </ContainerSearch>
  );
};
