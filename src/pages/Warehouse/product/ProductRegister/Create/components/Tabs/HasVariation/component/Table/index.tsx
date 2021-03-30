import React, { useCallback, useEffect, useState } from 'react';
import { Container, IconRemove } from './style';
import { Select } from '../../../../../../../../../../components/Select';
import { ResponseEntiryWithIdNameWithChildren } from '../../../../../services/api';

type TypeUnitMensured = {
  id: string;
  name: string;
};

type TypeTableProps = {
  dataRenderTable: ResponseEntiryWithIdNameWithChildren[];
  unitMensured: TypeUnitMensured[];
};

type TypeVariation = {
  key: number;
  isEnable: boolean;
};

export const Table = ({
  dataRenderTable,
  unitMensured,
}: TypeTableProps): JSX.Element | null => {
  const [variations, setVariations] = useState<TypeVariation[]>([
    { isEnable: true, key: Math.random() },
  ]);

  const handlerAddNewVariation = useCallback(() => {
    variations.push({ isEnable: true, key: Math.random() });
    setVariations([...variations]);
  }, [variations]);

  const handleRemoveVariation = useCallback(
    (keyVariation: TypeVariation) => {
      variations.map(({ key }, index) => {
        if (key === keyVariation.key) {
          variations[index].isEnable = false;
        }
      });
      setVariations([...variations]);
    },
    [variations],
  );

  return (
    <Container className="table-responsive">
      <table className="table table-bordered margin-bottom-0">
        <tbody>
          <tr>
            <th>Unidade de medidas</th>
            {dataRenderTable.map(
              ({ name, parent_id }) => parent_id === null && <th>{name}</th>,
            )}
            <th>Estoque atual</th>
            <th>Ações</th>
          </tr>
          {variations
            .filter(({ isEnable }) => isEnable)
            .map(({ key, isEnable }, index) => (
              <tr>
                <td>
                  <select
                    className="form-control"
                    name="Selecione"
                    id="Selecione"
                    defaultValue="Selecione"
                  >
                    <option value="litro">litro</option>
                    <option value="grama">grama</option>
                    <option value="quilo">quilo</option>
                  </select>
                </td>
                {dataRenderTable.map(
                  ({ parent_id, childrenList }, index) =>
                    parent_id === null && (
                      <td key={index}>
                        <select
                          className="form-control"
                          name="Selecione"
                          id="Selecione"
                        >
                          {childrenList.map(({ name }) => (
                            <option value={name}>{name}</option>
                          ))}
                        </select>
                      </td>
                    ),
                )}
                <td>
                  <input className="form-control" type="text" />
                </td>
                <td className="actions">
                  <IconRemove
                    onClick={() => handleRemoveVariation({ key, isEnable })}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <footer>
        <button
          onClick={handlerAddNewVariation}
          className="btn dark btn-sm sbold uppercase"
        >
          <span
            className="fa fa-plus"
            aria-hidden="true"
            style={{ marginRight: '5px' }}
          />
          variação
        </button>
      </footer>
    </Container>
  );
};
