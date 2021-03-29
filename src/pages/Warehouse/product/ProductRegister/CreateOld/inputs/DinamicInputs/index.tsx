import React, { useCallback, useEffect, useState } from 'react';
import { Container, IconDelete, Wrapper } from './style';
import { Select } from '../../../../../../../components/Select';
import { loadAtributes } from '../../api/load';
import { TooltipComponent } from '../../../../../../../components/TooltipComponent';

type DataProtocol = {
  id: string;
  name: string;
  parent_id: string | null;
  childrenList?: DataProtocol[];
  isSelected?: boolean;
};

type TypeDinamicInputsProps = {
  indexItem: number;
  onClickRemoveButton?: (index: number) => void;
};

const DinamicInputs = ({
  indexItem,
  onClickRemoveButton,
}: TypeDinamicInputsProps): JSX.Element => {
  const [listItems, setListItems] = useState<DataProtocol[]>([
    { id: '', name: 'selecione', parent_id: '' },
  ]);
  const [parents, setParents] = useState<DataProtocol[]>([]);
  const [currentParentSelect, setCurrentParentSelect] = useState<
    DataProtocol[]
  >([{ id: '', name: 'selecione', parent_id: '' }]);
  const [childrens, setChildrens] = useState<{ list: DataProtocol[] }[]>([
    {
      list: [{ id: '', parent_id: 'selecione', name: 'selecione' }],
    },
  ]);

  const [currentChildrenSelect, setCurrentChildrenSelect] = useState<
    DataProtocol[]
  >([
    {
      id: '',
      name: 'selecione',
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
    if (parents.length - 1 >= listItems.length) {
      setListItems([
        ...listItems,
        { id: '', parent_id: '', name: 'selecione' },
      ]);
      setCurrentParentSelect([
        ...currentParentSelect,
        { id: '', name: 'selecione', parent_id: '' },
      ]);
      setCurrentChildrenSelect([
        ...currentChildrenSelect,
        { id: '', name: 'selecione', parent_id: '' },
      ]);
      setChildrens([
        ...childrens,
        { list: [{ id: '', name: 'selecione', parent_id: '' }] },
      ]);
    }
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
        parents[indexArray].isSelected = false;
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
      parentSelected[index].isSelected = true;

      let currentChildren = currentChildrenSelect;
      currentChildren[index] = { id: '', name: 'selecione', parent_id: '' };

      setCurrentChildrenSelect(JSON.parse(JSON.stringify(currentChildren)));
      setCurrentParentSelect(JSON.parse(JSON.stringify(parentSelected)));

      let children = childrens;
      children[index].list =
        value.childrenList !== undefined ? value.childrenList : [];
      setChildrens(JSON.parse(JSON.stringify(children)));
    },
    [currentParentSelect, currentChildrenSelect, childrens, parents],
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
      <h4>Variação</h4>
      <hr />
      {listItems.map((_, index) => (
        <>
          <div key={Math.random()} className="row">
            <div className="form-content col-md-3">
              <label htmlFor="form">Atributo</label>
              {/* <Select<DataProtocol>
                onClickItem={current => {
                  handlerClickRowParent(current, index);
                }}
                data={parents.filter(({ isSelected }) => isSelected !== true)}
                selectValue={currentParentSelect[index].name}
                disable={currentParentSelect[index].isSelected}
              />
            </div>
            <div className="form-content col-md-3 ">
              <TooltipComponent label="Valor" message="Informe o valor" />
              <Select<DataProtocol>
                data={childrens[index].list.filter(
                  ({ name }) => name !== 'selecione',
                )}
                selectValue={currentChildrenSelect[index].name}
                onClickItem={current => {
                  handlerClickRowChildren(current, index);
                }}
                search
              /> */}
            </div>
            <div className="form-content col-md-1">
              <Wrapper>
                <IconDelete onClick={() => handlerClickDelete(index)} />
              </Wrapper>
            </div>
          </div>
        </>
      ))}
      <div className="row">
        <div className="form-content col-md-3">
          <button
            className="btn dark btn-sm sbold uppercase"
            onClick={handlerClickAddFiled}
          >
            <span className="fa fa-plus" style={{ marginRight: '5px' }} />
            Adicionar
          </button>
          {/* <button
            onClick={() => {
              if (onClickRemoveButton) {
                onClickRemoveButton(indexItem);
              }
            }}
            style={{ marginLeft: '15px' }}
            className="btn btn-sm sbold uppercase"
          >
            <span className="fa fa-remove" style={{ marginRight: '10px' }} />
            Remover
          </button> */}
        </div>
      </div>
    </Container>
  );
};

export default DinamicInputs;
