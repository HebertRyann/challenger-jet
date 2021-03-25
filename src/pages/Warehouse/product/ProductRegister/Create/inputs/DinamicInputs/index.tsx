import React, { useCallback, useEffect, useState } from 'react';
import { Container, IconDelete, Wrapper } from './style';
import { Select } from '../../../../../../../components/Select';
import { loadAtributes } from '../../api/load';

type DataProtocol = {
  id: string;
  name: string;
  parent_id: string | null;
  childrenList?: DataProtocol[];
};

const DinamicInputs = (): JSX.Element => {
  const [listItems, setListItems] = useState<DataProtocol[]>([
    { id: '', name: '', parent_id: '' },
  ]);
  const [parents, setParents] = useState<DataProtocol[]>([]);
  const [currentParentSelect, setCurrentParentSelect] = useState<
    DataProtocol[]
  >([{ id: '', name: '', parent_id: '' }]);
  const [childrens, setChildrens] = useState<{ list: DataProtocol[] }[]>([
    {
      list: [{ id: '', parent_id: '', name: '' }],
    },
  ]);

  const [currentChildrenSelect, setCurrentChildrenSelect] = useState<
    DataProtocol[]
  >([
    {
      id: '',
      name: '',
      parent_id: '',
    },
  ]);

  useEffect(() => {
    async function load() {
      const resultData = await loadAtributes();
      const isParent: DataProtocol[] = resultData.filter(
        ({ parent_id }) => parent_id === null,
      );
      isParent.map(({ id }, index) => {
        isParent[index].childrenList = resultData.filter(
          ({ parent_id }) => parent_id === id,
        );
      });
      setParents(isParent);
    }
    load();
  }, []);

  const handlerClickAddFiled = useCallback(() => {
    setListItems([...listItems, { id: '', parent_id: '', name: '' }]);
    setCurrentParentSelect([
      ...currentParentSelect,
      { id: '', name: '', parent_id: '' },
    ]);
    setCurrentChildrenSelect([
      ...currentChildrenSelect,
      { id: '', name: '', parent_id: '' },
    ]);
    setChildrens([
      ...childrens,
      { list: [{ id: '', name: '', parent_id: '' }] },
    ]);
  }, [listItems, parents, childrens]);

  const handlerClickDelete = useCallback(
    (indexArray: number) => {
      if (listItems.length > 1) {
        const result = listItems.filter((_, index) => index !== indexArray);
        const resultCurrentParentSelect = currentParentSelect.filter(
          (_, index) => index !== indexArray,
        );
        const resultCurrentChildren = currentChildrenSelect.filter(
          (_, index) => index !== indexArray,
        );
        setListItems(result);
        setCurrentParentSelect(resultCurrentParentSelect);
        setCurrentChildrenSelect(resultCurrentChildren);
      }
    },
    [listItems, currentParentSelect, currentChildrenSelect],
  );

  const handlerClickRowParent = useCallback(
    (value: DataProtocol, index: number) => {
      let parentSelected = currentParentSelect;
      parentSelected[index] = value;

      let currentChildren = currentChildrenSelect;
      currentChildren[index] = { id: '', name: '', parent_id: '' };

      setCurrentChildrenSelect(JSON.parse(JSON.stringify(currentChildren)));
      setCurrentParentSelect(JSON.parse(JSON.stringify(parentSelected)));

      let children = childrens;
      children[index].list =
        value.childrenList !== undefined ? value.childrenList : [];
      setChildrens(JSON.parse(JSON.stringify(children)));
    },
    [currentParentSelect, currentChildrenSelect, childrens],
  );

  const handlerClickRowChildren = useCallback(
    (value: DataProtocol, index: number) => {
      let childrenSelect = currentChildrenSelect;
      childrenSelect[index] = value;
      setCurrentChildrenSelect(JSON.parse(JSON.stringify(childrenSelect)));
    },
    [currentParentSelect],
  );

  return (
    <Container>
      <hr />
      {listItems.map((_, index) => (
        <div key={Math.random()} className="row">
          <div className="form-content col-md-3">
            <label htmlFor="form">Descrição</label>
            <Select<DataProtocol>
              onClickItem={current => {
                handlerClickRowParent(current, index);
              }}
              data={parents}
              selectValue={currentParentSelect[index].name}
            />
          </div>
          <div className="form-content col-md-3 ">
            <label htmlFor="form">Conteúdo</label>
            <Select<DataProtocol>
              data={childrens[index].list}
              selectValue={currentChildrenSelect[index].name}
              onClickItem={current => {
                handlerClickRowChildren(current, index);
              }}
            />
          </div>
          <div className="form-content col-md-1">
            <Wrapper>
              <IconDelete onClick={() => handlerClickDelete(index)} />
            </Wrapper>
          </div>
        </div>
      ))}
      <div className="row">
        <div className="form-content col-md-3">
          <button
            className="btn dark btn-sm sbold uppercase"
            onClick={handlerClickAddFiled}
          >
            Adicionar atributos
          </button>
        </div>
      </div>
    </Container>
  );
};

export default DinamicInputs;
