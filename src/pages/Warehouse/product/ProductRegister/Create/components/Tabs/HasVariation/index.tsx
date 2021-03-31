import React, { useCallback, useEffect, useState } from 'react';
import { Container } from './styles';
import {
  loadAtributes,
  loadUnitMensured,
  ResponseEntiryWithIdNameWithChildren,
} from '../../../services/api';
import { Table } from './component/Table';
import { FooterCreateProduct } from '../../footer';
import { SaveFooter } from '../../footer/saveFooter';

export const HasVariation = (): JSX.Element => {
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
          unitMensured={unitMensured}
          dataRenderTable={atributesList.filter(({ isChecked }) => isChecked)}
        />
      </div>
      <div style={{ padding: '0 20px' }}>
        <hr />
        <FooterCreateProduct onClickButtonNext={() => {}} />
        <hr />
        <SaveFooter onSave={() => {}} />
      </div>
    </>
  );
};

export const labelHasVariation = 'Variação';
export const nameHasVariation = '@@tabs-has-variation';
