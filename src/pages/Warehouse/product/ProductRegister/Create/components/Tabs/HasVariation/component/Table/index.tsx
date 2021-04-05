import React, { useCallback, useEffect, useState } from 'react';
import { Container, IconRemove } from './style';
import { ResponseEntiryWithIdNameWithChildren } from '../../../../../services/api';
import { useTabCreate } from '../../../../../providers/tabsProvider';
import { RE_SALE, SALE } from '../../../DataOverview/products';

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
    (keyVariation: TypeVariation, index: number) => {
      const result = variations.filter(({ key }) => key !== keyVariation.key);
      if (result.length === 0) {
        const initialState: TypeVariation = {
          isEnable: true,
          key: Math.random(),
        };
        setVariations([initialState]);
      } else {
        setVariations([...result]);
      }
    },
    [variations],
  );

  const { getDataOverView } = useTabCreate();
  const selectType = getDataOverView().typeSelectProdut;

  return (
    <Container className="table-responsive">
      <table
        key={Math.random()}
        className="table table-bordered margin-bottom-0"
      >
        <tbody>
          <tr>
            <th>Unidade de medidas</th>
            {dataRenderTable.map(
              ({ name, parent_id }) => parent_id === null && <th>{name}</th>,
            )}
            <th>Estoque atual</th>
            {selectType.name == SALE.name || selectType.name == RE_SALE.name ? (
              <th>Preço de custo</th>
            ) : null}
            <th>Ações</th>
          </tr>
          {variations
            .filter(({ isEnable }) => isEnable)
            .map(({ key, isEnable }, index) => (
              <tr key={index}>
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
                {selectType.name == SALE.name ||
                selectType.name == RE_SALE.name ? (
                  <td>
                    <input className="form-control" type="text" />
                  </td>
                ) : null}

                <td className="actions">
                  <IconRemove
                    onClick={() =>
                      handleRemoveVariation({ key, isEnable }, index)
                    }
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
