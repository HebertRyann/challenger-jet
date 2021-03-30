import React, { useCallback, useEffect, useState } from 'react';
import { Container } from './style';
import { DropdownInput } from '../../../../../../../../components/DropdownInput';
import { loadCategoryFinance, loadCategoryData } from '../../../services/api';
import { Select } from '../../../../../../../../components/Select';
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent';
import { nameHasVariation } from '../HasVariation';
import { nameFiscal } from '../Fiscal';
import { useTabs } from '../../../../../../../../hooks/tabs';
import { nameHasComposition } from '../HasComposition';
import {
  typeProducts,
  TypeProduct,
  SALE,
  SEMI_FINISHED,
  RE_SALE,
} from './products';
import { nameStock } from '../Stock';
import { FooterCreateProduct } from '../../footer';

export const labelDataOverview = 'Dados';
export const nameDataOverview = '@@tabs-overview';

type DataProtocol = {
  id: string;
  name: string;
  parent_id: string | null;
};

export type TypeTabNameEnableOrDisable = {
  keyTab: string;
  name: string;
  active: boolean;
};

const dataHasVariation: TypeTabNameEnableOrDisable[] = [
  {
    keyTab: nameHasVariation,
    name: 'Sim',
    active: true,
  },
  { keyTab: nameHasVariation, name: 'Não', active: false },
];

export const DataOverview = (): JSX.Element => {
  const { activeTab, disableTab } = useTabs();
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
  const [categoryProduct, setCategoryProduct] = useState<DataProtocol>();
  const [name, setName] = useState('');
  const [hasVariation, setHasvariation] = useState<TypeTabNameEnableOrDisable>({
    keyTab: '',
    name: 'Selecione',
    active: true,
  });
  const [
    hasComposition,
    setHasComposition,
  ] = useState<TypeTabNameEnableOrDisable>({
    keyTab: '',
    name: 'Selecione',
    active: true,
  });
  const [selectTypeProduct, setSelectTypeProduct] = useState<TypeProduct>({
    id: 0,
    name: 'Selecione',
  });
  const [internalCode, setInternalCode] = useState('');

  const handlerChangeCategoryProduct = useCallback(
    (value: DataProtocol) => {},
    [categoryProduct, selectTypeProduct],
  );

  useEffect(() => {
    console.log('UPDATE SELECTED');
    console.log(selectTypeProduct);
  }, [selectTypeProduct]);

  const handlerChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.currentTarget.value);
      if (event.target.value === '') {
      }
    },
    [name],
  );

  const handlerHasVariation = useCallback(
    (current: TypeTabNameEnableOrDisable) => {
      if (current.active) {
        activeTab(current.keyTab);
        setHasvariation(current);
        disableTab(nameStock);
      } else {
        activeTab(nameStock);
        disableTab(current.keyTab);
        setHasvariation(current);
      }
    },
    [hasVariation],
  );

  const handlerSelectTypeProduct = useCallback(
    (value: TypeProduct) => {
      setSelectTypeProduct(value);
      if (value === SALE) {
        activeTab(nameHasComposition);
        activeTab(nameFiscal);
        return;
      }
      if (value === RE_SALE) {
        activeTab(nameFiscal);
        disableTab(nameHasComposition);
        return;
      }
      if (value === SEMI_FINISHED) {
        activeTab(nameHasComposition);
        disableTab(nameFiscal);
        return;
      }
      disableTab(nameHasComposition);
      disableTab(nameFiscal);
    },
    [selectTypeProduct],
  );

  useEffect(() => {
    async function load() {
      const categoryData = await loadCategoryData();
      setDataCategoryCost(categoryData);
      const categoryFinance = await loadCategoryFinance();
      setDataCategoryFinance(categoryFinance);
    }
    load();
  }, []);

  const handlerClickNextAba = useCallback(() => {
    console.log('Validar');
  }, []);

  return (
    <>
      <div className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Tipo de produto"
            message="Selecione o tipo do produto"
          />
          <Select<TypeProduct>
            selectValue={selectTypeProduct}
            onClickItem={handlerSelectTypeProduct}
            data={typeProducts}
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
      <Container className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Possui variação?"
            message="Selecione o tipo do produto"
          />
          <Select<TypeTabNameEnableOrDisable>
            selectValue={hasVariation}
            onClickItem={handlerHasVariation}
            data={dataHasVariation}
          />
        </div>
        <div className="form-content col-md-3">
          <input
            disabled
            value={internalCode}
            name="category"
            type="hidden"
            className="form-control"
          />
        </div>
      </Container>
      <hr />
      <FooterCreateProduct onClickButtonNext={handlerClickNextAba} />
    </>
  );
};
