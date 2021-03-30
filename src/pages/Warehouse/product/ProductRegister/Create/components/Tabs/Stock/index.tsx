import React, { useCallback, useEffect, useState } from 'react';
import { Container } from './styles';
import {
  loadAtributes,
  loadUnitMensured,
  ResponseEntiryWithIdNameWithChildren,
} from '../../../services/api';
import { Table } from './component/Table';

export const Stock = (): JSX.Element => {
  const [atributesList, setAtributesList] = useState<
    ResponseEntiryWithIdNameWithChildren[]
  >([]);

  const [unitMensured, setUnitMensured] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    async function load() {
      const unitMensured = await loadUnitMensured();
      const resultData = await loadAtributes();
      const resultList: ResponseEntiryWithIdNameWithChildren[] = resultData.filter(
        ({ parent_id }) => parent_id === null,
      );
      resultList.map(({ id }, index) => {
        resultList[index].childrenList = resultData.filter(
          ({ parent_id }) => parent_id === id,
        );
      });
      setUnitMensured(unitMensured);
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
    <div className="row">
      <Table
        unitMensured={unitMensured}
        dataRenderTable={atributesList.filter(({ isChecked }) => isChecked)}
      />
    </div>
  );
};

export const labelStock = 'Estoque';
export const nameStock = '@@tabs-stock';
