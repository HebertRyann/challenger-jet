import React, { useCallback, useEffect, useState } from 'react';
import { Container, IconRemove } from './style';
import { ResponseEntiryWithIdNameWithChildren } from '../../../../../services/api';
import { useTabCreate } from '../../../../../providers/tabsProvider';
import { RE_SALE, SALE } from '../../../DataOverview/products';
import { NewSelect } from '../../../../../../../../../../components/NewSelect';

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
  unitPrice: {
    id: string;
    value: string;
  };
  priceCost: string;
};

export const Table = ({
  dataRenderTable,
  unitMensured,
}: TypeTableProps): JSX.Element | null => {
  const { getDataOverView } = useTabCreate();
  const selectType = getDataOverView().typeSelectProdut;
  const initialState: TypeVariation = {
    key: Math.random(),
    unitPrice: {
      id: '',
      value: '',
    },
    priceCost: '',
  };
  const [variations, setVariations] = useState<TypeVariation[]>([initialState]);

  const [pricesCost, setPricesCost] = useState(['']);

  const handlerAddNewVariation = useCallback(() => {
    variations.push({ ...initialState, key: Math.random() });
    setVariations([...variations]);
  }, [variations]);

  const handleRemoveVariation = useCallback(
    (keyVariation: number) => {
      const result = variations.filter(({ key }) => key !== keyVariation);
      if (result.length === 0) {
        setVariations([initialState]);
      } else {
        setVariations([...result]);
      }
    },
    [variations],
  );

  const handlerChangeSelect = useCallback(
    (currentVariation: {
      key: number;
      unitPrice: {
        id: string;
        value: string;
      };
    }) => {
      const result = variations.filter(
        ({ key }) => key === currentVariation.key,
      );
      const index = variations.indexOf(result[0]);
      variations[index].unitPrice = currentVariation.unitPrice;
      setVariations([...variations]);
    },
    [variations],
  );

  const handlerChangePriceCost = useCallback(
    (keyInput: number, value: string) => {
      const result = variations.filter(({ key }) => key === keyInput);
      const index = variations.indexOf(result[0]);
      variations[index].priceCost = value;
      setVariations([...variations]);
      console.log(value);
    },
    [variations],
  );

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
          {variations.map(({ key, unitPrice, priceCost }, index) => (
            <tr key={key}>
              <td>
                <NewSelect
                  onChange={event => {
                    const split = event.target.value.split('+');
                    const key = split[0];
                    const id = split[1];
                    const value = split[2];
                    handlerChangeSelect({
                      key: Number(key),
                      unitPrice: {
                        id,
                        value,
                      },
                    });
                  }}
                  className="select form-control"
                  name="Selecione"
                >
                  {unitPrice.id !== '' ? (
                    <option style={{ display: 'none' }} selected>
                      {unitPrice.value}
                    </option>
                  ) : (
                    <div />
                  )}
                  <>
                    {unitMensured.map(({ id, name }) => (
                      <option value={`${key}+${id}+${name}`}>{name}</option>
                    ))}
                  </>
                </NewSelect>
              </td>
              {dataRenderTable.map(
                ({ parent_id, childrenList }, index) =>
                  parent_id === null && (
                    <td key={key}>
                      <NewSelect
                        className="form-control"
                        name="Selecione"
                        id="Selecione"
                      >
                        {childrenList.map(({ name }) => (
                          <option value={name}>{name}</option>
                        ))}
                      </NewSelect>
                    </td>
                  ),
              )}
              <td>
                <input className="form-control" type="text" />
              </td>
              {selectType.name == SALE.name ||
              selectType.name == RE_SALE.name ? (
                <td>
                  <input
                    key={key}
                    value={priceCost}
                    onChange={event => {
                      handlerChangePriceCost(key, event.target.value);
                    }}
                    className="form-control"
                    type="text"
                  />
                </td>
              ) : null}

              <td className="actions">
                <IconRemove onClick={() => handleRemoveVariation(key)} />
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
