import React, { useCallback, useEffect, useState } from 'react';
import { DropdownInput } from '../../../../../../../../components/DropdownInput';
import {
  loadCategoryFinance,
  loadCategoryData,
  loadAtributes,
} from '../../../services/api';
import { Select } from '../../../../../../../../components/Select';
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent';
import Input from '../../../../../../../../components/Input';
export const labelDataOverview = 'Dados';
export const nameDataOverview = '@@tabs-overview';

type DataProtocol = {
  id: string;
  name: string;
  parent_id: string | null;
};

type TypeDataSelect = {
  name: string;
  id: number;
};

type TypeTrueOrFalse = {
  name: string;
};

const data: TypeDataSelect[] = [
  { id: 1, name: 'Materia Prima' },
  { id: 2, name: 'Semi acabado' },
  { id: 3, name: 'Venda' },
  { id: 4, name: 'Revenda' },
  { id: 5, name: 'Locação' },
  { id: 6, name: 'Consumo' },
];

const trueOrFalse: TypeTrueOrFalse[] = [
  {
    name: 'Sim',
  },
  { name: 'Não' },
];

export const DataOverview = (): JSX.Element => {
  const [oldSelect, setOldSelect] = useState<TypeDataSelect>({
    id: 0,
    name: '',
  });

  const [currentSelect, setCurrentSelect] = useState<TypeDataSelect>({
    id: 0,
    name: 'Selecione',
  });

  const handlerChangeSelect = useCallback((value: TypeDataSelect) => {
    setCurrentSelect(value);
  }, []);

  const handlerClickSelect = useCallback((value: TypeDataSelect) => {
    setOldSelect(value);
  }, []);

  useEffect(() => {
    async function load() {
      const categoryData = await loadCategoryData();
      setDataCategoryCost(categoryData);
      const categoryFinance = await loadCategoryFinance();
      setDataCategoryFinance(categoryFinance);
    }
    load();
  }, []);

  const [dataCategoryFinance, setDataCategoryFinance] = useState<
    DataProtocol[]
  >([]);
  const [categoryFinance, setCategoryFinance] = useState('');
  const handlerChangeCategoryFinance = useCallback(
    (value: any) => {
      setCategoryFinance(value);
    },
    [categoryFinance],
  );

  const [dataCategoryCost, setDataCategoryCost] = useState<DataProtocol[]>([]);
  const [categoryProduct, setCategoryProduct] = useState('');
  const handlerChangeCategoryProduct = useCallback(
    (value: any) => {
      setCategoryProduct(value);
    },
    [categoryProduct],
  );

  const [name, setName] = useState('');
  const handlerChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.currentTarget.value);
      if (event.target.value === '') {
      }
    },
    [name],
  );

  const [hasVariation, setHasvariation] = useState<TypeTrueOrFalse>({
    name: 'Selecione',
  });

  return (
    <>
      <div className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Tipo de produto"
            message="Selecione o tipo do produto"
          />
          <Select<TypeDataSelect>
            selectValue={currentSelect}
            onClickSelect={handlerClickSelect}
            onClickItem={handlerChangeSelect}
            data={data}
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Categoria custo"
            message="Selecione o tipo do produto"
          />
          <DropdownInput<DataProtocol>
            className="form-control"
            label=""
            data={dataCategoryFinance}
            onChangeCurrentRow={handlerChangeCategoryFinance}
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Grupo produto"
            message="Selecione o tipo do produto"
          />
          <DropdownInput<DataProtocol>
            className="form-control"
            label=""
            data={dataCategoryCost}
            onChangeCurrentRow={handlerChangeCategoryProduct}
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Nome do produto"
            message="Selecione o tipo do produto"
          />
          <input
            onChange={handlerChangeName}
            value={name}
            name="category"
            className="form-control"
          />
        </div>
      </div>
      <div className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Possui variação?"
            message="Selecione o tipo do produto"
          />
          <Select<TypeTrueOrFalse>
            selectValue={hasVariation}
            onClickSelect={() => {}}
            onClickItem={() => {}}
            data={trueOrFalse}
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Possui composição?"
            message="Selecione o tipo do produto"
          />
          <Select<TypeTrueOrFalse>
            selectValue={hasVariation}
            onClickSelect={() => {}}
            onClickItem={() => {}}
            data={trueOrFalse}
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Código interno"
            message="Selecione o tipo do produto"
          />
          <input
            onChange={handlerChangeName}
            value={name}
            name="category"
            className="form-control"
          />
        </div>
      </div>
    </>
  );
};
