import React, { useCallback, useEffect, useState } from 'react';
import { Container, IconRemove } from './style';
import { Select } from '../../../../../../../../../../components/Select';
import { ResponseEntiryWithIdNameWithChildren } from '../../../../../services/api';

type TypeTableProps = {
  dataRenderTable: ResponseEntiryWithIdNameWithChildren[];
};

type TypeVariation = {
  key: number;
  isEnable: boolean;
};

export const Table = ({
  dataRenderTable,
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
      console.log(variations);
      setVariations([...variations]);
    },
    [variations],
  );


  return dataRenderTable.length > 0 ? (
    <Container className="table-responsive">
      <table className="table table-bordered margin-bottom-0">
        <tbody>
          <tr>
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
                {dataRenderTable.map(
                  ({ parent_id, childrenList }, index) =>
                    parent_id === null && (
                      <td key={index}>
                        <Select<ResponseEntiryWithIdNameWithChildren>
                          selectValue={{
                            id: '',
                            name: 'Selecione',
                            parent_id: null,
                            childrenList: [],
                          }}
                          data={childrenList}
                        />
                      </td>
                    ),
                )}
                <td>
                  <input
                    defaultValue={key}
                    className="form-control"
                    type="text"
                  />
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
          Inserir nova variação
        </button>
      </footer>
    </Container>
  ) : (
    <div></div>
  );
};
