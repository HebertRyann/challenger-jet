import React, { useCallback, useEffect, useState } from 'react';
import { Footer } from '../../../footer';
import { Container, IconRemove } from './style';

type TypeVariation = {
  key: number;
  isEnable: boolean;
};

export const Table = (): JSX.Element | null => {
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
            <th style={{ width: '50%' }}>Produto</th>
            <th>Quantidade</th>
            <th>Custo</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
          {variations
            .filter(({ isEnable }) => isEnable)
            .map(({ key, isEnable }) => (
              <tr>
                <td>
                  <input
                    placeholder="Informe o nome do produto"
                    className="form-control"
                    type="text"
                  />
                </td>
                <td>
                  <input className="form-control" type="text" />
                </td>
                <td>
                  <input className="form-control" type="text" />
                </td>
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
          produto
        </button>
      </footer>
      <div style={{ margin: '20px 20px 0 0' }}>
        <Footer onClickButtonNext={() => {}} />
      </div>
    </Container>
  );
};
