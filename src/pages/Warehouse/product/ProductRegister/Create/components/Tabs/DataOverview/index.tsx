import React, { useCallback, useEffect, useState } from 'react';
import { Container } from './style';
import { DropdownInput } from '../../../../../../../../components/DropdownInput';
import { SaveFooter } from '../../footer/saveFooter';
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent';
import { nameHasVariation } from '../HasVariation';
import { nameFiscal } from '../Fiscal';
import { useTabs } from '../../../../../../../../hooks/tabs';
import { nameHasComposition } from '../HasComposition';
import { namePriceComposition } from '../PriceComposition';
import { NewInput } from '../../../../../../../../components/NewInput';
import { Alert } from '../../../../../../../../components/Alert';
import {
  typeProducts,
  TypeProduct,
  SALE,
  SEMI_FINISHED,
  RE_SALE,
} from './products';
import { nameStock } from '../Stock';
import { Footer } from '../../footer';
import {
  NewSelect,
  TypeErrorSelect,
} from '../../../../../../../../components/NewSelect';
export type TypeTabNameEnableOrDisable = {
  keyTab: string;
  name: string;
  active: boolean;
};

const dataHasVariation: TypeTabNameEnableOrDisable[] = [
  {
    keyTab: nameHasVariation,
    name: 'Sim',
    active: false,
  },
  { keyTab: nameHasVariation, name: 'Não', active: false },
];

export type TypeEntityWithIdAndName = {
  id: string;
  name: string;
  parent_id: string | null;
};

export const DataOverview = ({
  categoryFinances,
  categoryProducts,
}: {
  categoryFinances: TypeEntityWithIdAndName[];
  categoryProducts: TypeEntityWithIdAndName[];
}): JSX.Element => {
  const [alert, setAlert] = useState(false);
  const { activeTab, disableTab } = useTabs();

  const [
    errorCategoryFinance,
    setErrorCategoryFinance,
  ] = useState<TypeErrorSelect>({ isError: false });
  const [categoryFinance, setCategoryFinance] = useState('');
  const handlerChangeCategoryFinance = useCallback(
    (value: any) => {
      setErrorCategoryFinance({ ...errorCategoryFinance, isError: false });
      setCategoryFinance(value);
    },
    [categoryFinance, errorCategoryFinance],
  );

  const [
    errorCategoryProduct,
    setErrorCategoryProduct,
  ] = useState<TypeErrorSelect>({ isError: false });

  const [
    categoryProduct,
    setCategoryProduct,
  ] = useState<TypeEntityWithIdAndName>();
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState<TypeErrorSelect>({
    isError: false,
  });
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
  ] = useState<TypeErrorSelect>({ isError: false });
  const [internalCode, setInternalCode] = useState('');
  const { changeCurrentTabForNext } = useTabs();

  const handlerChangeCategoryProduct = useCallback(
    (value: TypeEntityWithIdAndName) => {
      setErrorCategoryProduct({
        ...errorCategoryProduct,
        isError: false,
      });
      setCategoryProduct(value);
    },
    [categoryProduct, selectTypeProduct],
  );

  const handlerChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.currentTarget.value);
      setErrorName({ ...errorName, isError: false });
    },
    [name, errorName],
  );

  const handlerClickAlertConfirm = useCallback(() => {
    setAlert(false);
  }, [alert]);

  const handlerHasVariation = useCallback(
    (current: TypeTabNameEnableOrDisable) => {
      if (current.name.toLowerCase() === 'sim') {
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
        activeTab(namePriceComposition);
        return;
      }
      if (value.id === RE_SALE.id) {
        activeTab(nameFiscal);
        disableTab(nameHasComposition);
        activeTab(namePriceComposition);
        return;
      }
      if (value.id === SEMI_FINISHED.id) {
        activeTab(nameHasComposition);
        disableTab(nameFiscal);
        disableTab(namePriceComposition);
        return;
      }
      disableTab(nameHasComposition);
      disableTab(nameFiscal);
      disableTab(namePriceComposition);
    },
    [selectTypeProduct],
  );

  const handlerClickNextAba = useCallback(() => {
    let isError = false;
    if (selectTypeProduct.id === 0) {
      isError = true;
      setErrorSelectTypeProduct({
        isError: true,
      });
    }
    if (categoryFinance.length <= 0) {
      isError = true;
      setErrorCategoryFinance({
        isError: true,
      });
    }
    if (!categoryProduct) {
      isError = true;
      setErrorCategoryProduct({
        isError: true,
      });
    }
    if (name === '') {
      isError = true;
      setErrorName({
        isError: true,
      });
    }
    if (!isError) {
      changeCurrentTabForNext(nameDataOverview);
    } else {
      setAlert(true);
    }
  }, [selectTypeProduct, categoryFinance, categoryProduct, name]);

  const handlerOnSave = useCallback(() => {
    handlerClickNextAba();
  }, []);
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
              <option key={id} value={id + '+' + name}>
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
          <DropdownInput<TypeEntityWithIdAndName>
            error={errorCategoryFinance}
            data={categoryFinances}
            onChangeCurrentRow={handlerChangeCategoryFinance}
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Grupo produto"
            message="Selecione o tipo do produto"
          />
          <DropdownInput<TypeEntityWithIdAndName>
            error={errorCategoryProduct}
            data={categoryProducts}
            onChangeCurrentRow={handlerChangeCategoryProduct}
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Nome do produto"
            message="Selecione o tipo do produto"
          />
          <NewInput
            error={errorName}
            onChange={handlerChangeName}
            value={name}
            name="category"
          />
        </div>
      </div>
      <Container className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Possui variação?"
            message="Selecione o tipo do produto"
          />
          <NewSelect
            onChange={event => {
              const split = event.target.value.split('+');
              const active = split[0];
              const keyTab = split[1];
              const name = split[2];
              handlerHasVariation({ active: Boolean(active), keyTab, name });
            }}
          >
            {dataHasVariation.map(({ active, keyTab, name }) => (
              <option value={String(active) + '+' + keyTab + '+' + name}>
                {name}
              </option>
            ))}
          </NewSelect>
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
      <Alert
        isActive={alert}
        onlyConfirm
        message="Os campos destacados são de preenchimento obrigatório"
        onClickConfirmButton={handlerClickAlertConfirm}
      />
      <Footer onClickButtonNext={handlerClickNextAba} />
    </>
  );
};

export const labelDataOverview = 'Dados';
export const nameDataOverview = '@@tabs-overview';
