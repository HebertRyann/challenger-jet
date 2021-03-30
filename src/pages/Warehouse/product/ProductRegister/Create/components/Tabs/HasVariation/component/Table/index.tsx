import React, { useCallback, useState } from 'react';
import { Container, IconRemove } from './style';
import { Select } from '../../../../../../../../../../components/Select';
import { ResponseEntiryWithIdNameWithChildren } from '../../../../../services/api';

type TypeTableProps = {
  dataRenderTable: ResponseEntiryWithIdNameWithChildren[];
};

export const Table = ({
  dataRenderTable,
}: TypeTableProps): JSX.Element | null => {
  const [sizeVariation, setSizeVariation] = useState<number[]>([1]);

  const handlerAddNewVariation = useCallback(() => {
    sizeVariation.push(Math.random());
    setSizeVariation([...sizeVariation]);
  }, [sizeVariation]);

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
          {sizeVariation.map(() => (
            <tr>
              {dataRenderTable.map(
                ({ parent_id, childrenList }) =>
                  parent_id === null && (
                    <td>
                      <Select<ResponseEntiryWithIdNameWithChildren>
                        selectValue={{
                          id: '',
                          name: 'Selecione',
                          parent_id: null,
                          childrenList: [],
                        }}
                        data={childrenList}
                      ></Select>
                    </td>
                  ),
              )}
              <td>
                <input className="form-control" type="text" />
              </td>
              <td className="actions">
                <IconRemove />
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
