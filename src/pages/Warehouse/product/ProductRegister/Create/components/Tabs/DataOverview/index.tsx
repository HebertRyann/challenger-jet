import React, { useCallback, useEffect, useState } from 'react';
import { Container, Select } from './style';
import { DropdownInput } from '../../../../../../../../components/DropdownInput';
import { loadCategoryFinance, loadCategoryData } from '../../../services/api';
// import { Select } from '../../../../../../../../components/Select';
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
import {
  NewSelect,
  TypeErrorSelect,
} from '../../../../../../../../components/NewSelect';

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
  const [
    errorCategoryFinance,
    setErrorCategoryFinance,
  ] = useState<TypeErrorSelect>({ isError: false, descriptionError: '' });
  const [categoryFinance, setCategoryFinance] = useState('');
  const handlerChangeCategoryFinance = useCallback(
    (value: any) => {
      setErrorCategoryFinance({ ...errorCategoryFinance, isError: false });
      setCategoryFinance(value);
    },
    [categoryFinance, errorCategoryFinance],
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
  const [
    errorSelectTypeProduct,
    setErrorSelectTypeProduct,
  ] = useState<TypeErrorSelect>({ isError: false, descriptionError: '' });
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
      setErrorSelectTypeProduct({ ...errorSelectTypeProduct, isError: false });
      setSelectTypeProduct(value);
      if (value.id === SALE.id) {
        activeTab(nameHasComposition);
        activeTab(nameFiscal);
        return;
      }
      if (value.id === RE_SALE.id) {
        activeTab(nameFiscal);
        disableTab(nameHasComposition);
        return;
      }
      if (value.id === SEMI_FINISHED.id) {
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
    if (selectTypeProduct.id === 0) {
      setErrorSelectTypeProduct({
        isError: true,
        descriptionError: 'Campo não selecionado',
      });
    }
    if (categoryFinance.length <= 0) {
      setErrorCategoryFinance({
        isError: true,
        descriptionError: 'Campo não selecionado',
      });
    }
  }, [selectTypeProduct, categoryFinance]);

  return (
    <>
      <div className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Tipo de produto"
            message="Selecione o tipo do produto"
          />
          <NewSelect
            error={errorSelectTypeProduct}
            onChange={event => {
              const split = event.target.value.split('+');
              const id = split[0];
              const name = split[1];
              handlerSelectTypeProduct({ id: Number(id), name });
            }}
          >
            {typeProducts.map(({ id, name }) => (
              <option data-icon="glyphicon-music" value={id + '+' + name}>
                {name}
              </option>
            ))}
          </NewSelect>
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Categoria custo"
            message="Selecione o tipo do produto"
          />
          <DropdownInput<DataProtocol>
            error={errorCategoryFinance}
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
          {/* <Select<TypeTabNameEnableOrDisable>
            selectValue={hasVariation}
            onClickItem={handlerHasVariation}
            data={dataHasVariation}
          /> */}
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

export const labelDataOverview = 'Dados';
export const nameDataOverview = '@@tabs-overview';
