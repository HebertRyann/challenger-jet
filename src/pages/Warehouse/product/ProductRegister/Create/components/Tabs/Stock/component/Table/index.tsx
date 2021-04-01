import React, { useEffect, useState } from 'react';
import { Container } from './style';

type TypeUnitMensured = {
  id: string;
  name: string;
};

type TypeVariation = {
  key: number;
  isEnable: boolean;
};

type TypeTableProps = {
  unitMensured: TypeUnitMensured[];
};

export const Table = ({ unitMensured }: TypeTableProps): JSX.Element => {
  const [variations, setVariations] = useState<TypeVariation[]>([
    { isEnable: true, key: Math.random() },
  ]);

  return (
    <Container className="table-responsive">
      <table className="table table-bordered margin-bottom-0">
        <tbody>
          <tr>
            <th>Unidade de medidas</th>
            <th>Estoque atual</th>
          </tr>
          <tr>
            <td>
              <select className="select form-control" name="Selecione">
                <option className="disabled" disabled selected>
                  Selecione
                </option>
                {unitMensured.map(
                  ({ id, name }) => (
                    <option value={`${id}+${name}`}>{name}</option>
                  ),
                  [],
                )}
              </select>
            </td>
            <td>
              <input className="form-control" type="text" />
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};
