import React, { useCallback, useState } from 'react';
import DinamicInputs from '../../inputs/DinamicInputs';

import { Container } from './style';

export const AddChildren = (): JSX.Element => {
  const [listItem, setListItem] = useState<{ index: number }[]>([{ index: 0 }]);

  const handlerOnClickAddChildren = useCallback(() => {
    setListItem([...listItem, { index: listItem.length++ }]);
  }, [listItem]);

  const handlerRemoveItem = useCallback(
    (index: number) => {
      if (listItem.length > 1) {
        const resultListItem = listItem.filter(
          (_, indexItem) => index !== indexItem,
        );

        setListItem(resultListItem);
      }
    },
    [listItem],
  );

  return (
    <Container>
      {listItem.map(({ index }) => (
        <div className="row">
          <div className="col-md-12">
            <DinamicInputs
              indexItem={index}
              onClickRemoveButton={handlerRemoveItem}
            />
            <hr/>
          </div>
        </div>
      ))}
      <button
        onClick={handlerOnClickAddChildren}
        className="btn dark btn-sm sbold uppercase"
      >
        <span className="fa fa-plus" style={{ marginRight: '5px' }} />
        Variação
      </button>
    </Container>
  );
};
