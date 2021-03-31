import React, { useEffect, useState } from 'react';
import { Container } from './style';
import { ResponseEntityOnlyIdAndName } from '../../../../../services/api';
import { loadUnitMensured } from '../../../../../services/api';

type TypeUnitMensured = {
  id: string;
  name: string;
};

type TypeVariation = {
  key: number;
  isEnable: boolean;
};

export const Table = (): JSX.Element => {
  const [variations, setVariations] = useState<TypeVariation[]>([
    { isEnable: true, key: Math.random() },
  ]);

  const [unitMensureds, setUnitMensured] = useState<
    ResponseEntityOnlyIdAndName[]
  >([]);

  // const handlerAddNewVariation = useCallback(() => {
  //   variations.push({ isEnable: true, key: Math.random() });
  //   setVariations([...variations]);
  // }, [variations]);

  // const handleRemoveVariation = useCallback(
  //   (keyVariation: TypeVariation) => {
  //     variations.map(({ key }, index) => {
  //       if (key === keyVariation.key) {
  //         variations[index].isEnable = false;
  //       }
  //     });
  //     setVariations([...variations]);
  //   },
  //   [variations],
  // );

  useEffect(() => {
    async function load() {
      const result = await loadUnitMensured();
      setUnitMensured(result);
    }
    load();
  }, []);

  return (
    <Container className="table-responsive">
      <table className="table table-bordered margin-bottom-0">
        <tbody>
          <tr>
            <th>Unidade de medidas</th>
            <th>Estoque atual</th>
            {/* <th>Ações</th> */}
          </tr>
          {variations
            .filter(({ isEnable }) => isEnable)
            .map(({ key, isEnable }, index) => (
              <tr>
                <td>
                  <select
                    className="select form-control"
                    name="Selecione"
                    id="Selecione"
                    defaultValue="Selecione"
                  >
                    <option className="disabled" disabled selected>
                      Selecione
                    </option>
                    {unitMensureds.map(
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
                {/* <td className="actions">
                  <IconRemove
                    onClick={() => handleRemoveVariation({ key, isEnable })}
                  />
                </td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
};
