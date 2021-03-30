import React, { useCallback, useEffect, useState } from 'react';
import { Container } from './styles';
import {
  loadAtributes,
  ResponseEntiryWithIdNameWithChildren,
} from '../../../services/api';
import { Table } from './component/Table';

export const HasVariation = (): JSX.Element => {
  const [atributesList, setAtributesList] = useState<
    ResponseEntiryWithIdNameWithChildren[]
  >([]);

  useEffect(() => {
    async function load() {
      const resultData = await loadAtributes();
      const resultList: ResponseEntiryWithIdNameWithChildren[] = resultData.filter(
        ({ parent_id }) => parent_id === null,
      );
      resultList.map(({ id }, index) => {
        resultList[index].childrenList = resultData.filter(
          ({ parent_id }) => parent_id === id,
        );
      });
      setAtributesList(resultList);
    }
    load();
  }, []);

  const handlerClickCheckBox = useCallback(
    (index: number) => {
      atributesList[index].isChecked = !atributesList[index].isChecked;
      setAtributesList([...atributesList]);
    },
    [atributesList],
  );

  return (
    <>
      <Container className="row">
        <div className="check-container form-content col-md-12">
          {atributesList.map(({ id, name, isChecked }, index) => (
            <div key={id}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  handlerClickCheckBox(index);
                }}
                value={id}
              />
              <label>{name}</label>
            </div>
          ))}
        </div>
      </Container>
      <div className="row">
        <Table
          dataRenderTable={atributesList.filter(({ isChecked }) => isChecked)}
        />
      </div>
    </>
  );
};

export const labelHasVariation = 'Variação';
export const nameHasVariation = '@@tabs-has-variation';