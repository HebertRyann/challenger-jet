import React, { useCallback, useState } from 'react';
import { Container } from './styles';
import { ResponseEntiryWithIdNameWithChildren } from '../../../services/api';
import { Table } from './component/Table';

type TypeAtributes = {
  id: string;
  name: string;
  parent_id: string | null;
  childrenList: ResponseEntiryWithIdNameWithChildren[];
  isChecked?: boolean;
};

type TypeUnitMensured = {
  id: string;
  name: string;
};

type TypeHasVariationProps = {
  unitMensureds: TypeUnitMensured[];
  atributes: TypeAtributes[];
};

export const HasVariation = ({
  unitMensureds,
  atributes,
}: TypeHasVariationProps): JSX.Element => {
  const [atributesList, setAtributesList] = useState<
    ResponseEntiryWithIdNameWithChildren[]
  >(atributes);

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
        <Table />
      </div>
    </>
  );
};

export const labelHasVariation = 'Estoque/Variação';
export const nameHasVariation = '@@tabs-has-variation';
