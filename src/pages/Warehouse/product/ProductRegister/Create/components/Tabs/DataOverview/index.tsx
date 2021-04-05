import React, { useCallback, useState } from 'react';
import { Container } from './style';
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
import { useTabCreate } from '../../../providers/tabsProvider';
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
  const { activeTab, disableTab, changeCurrentTabForNext } = useTabs();
  const { overview, details } = useTabCreate();
  const { typeSelectProdut, categoryCost } = overview.getData();
  const [alert, setAlert] = useState<{ active: boolean; message: string }>({
    active: false,
    message: '',
  });

  const initialState: TypeEntityWithIdAndName = {
    id: '',
    name: '',
    parent_id: null,
  };

  const [subCategoryFinanceData, setSubCategoryFinanceData] = useState<
    TypeEntityWithIdAndName[]
  >([initialState]);
  const [
    subCategoryFinance,
    setSubCategoryFinance,
  ] = useState<TypeEntityWithIdAndName>(initialState);
  const [
    categoryProduct,
    setCategoryProduct,
  ] = useState<TypeEntityWithIdAndName>(initialState);

  const [name, setName] = useState('');

  const [hasVariation, setHasvariation] = useState<TypeTabNameEnableOrDisable>({
    keyTab: '',
    name: 'Selecione',
    active: true,
  });

  const [
    errorCategoryProduct,
    setErrorCategoryProduct,
  ] = useState<TypeErrorSelect>({ isError: false });

  const handlerChangeCategoryFinance = useCallback(
    ({ id, name, parent_id }: TypeEntityWithIdAndName) => {
      overview.setData({
        ...overview.getData(),
        categoryCost: {
          error: { isError: false },
          value: { id, name, parent_id },
        },
      });
      const childrens = categoryFinances.filter(
        parents => parents.parent_id == id,
      );
      setSubCategoryFinanceData(childrens);
    },
    [categoryCost, subCategoryFinanceData],
  );

  const [
    errorSubCategoryFinance,
    setErrorSubCategoryFinance,
  ] = useState<TypeErrorSelect>({
    isError: false,
  });

  const handlerChangeSubCategoryFinance = useCallback(
    (value: TypeEntityWithIdAndName) => {
      setErrorSubCategoryFinance({ isError: false });
      setSubCategoryFinance(value);
    },
    [subCategoryFinance],
  );

  const [errorName, setErrorName] = useState<TypeErrorSelect>({
    isError: false,
  });

  const [internalCode, setInternalCode] = useState('');

  const handlerChangeCategoryProduct = useCallback(
    (value: TypeEntityWithIdAndName) => {
      setErrorCategoryProduct({
        ...errorCategoryProduct,
        isError: false,
      });
      setCategoryProduct(value);
    },
    [categoryProduct, typeSelectProdut],
  );

  const handlerChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.currentTarget.value);
      setErrorName({ ...errorName, isError: false });
    },
    [name, errorName],
  );

  const handlerClickAlertConfirm = useCallback(() => {
    setAlert({ active: false, message: '' });
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
      overview.setData({
        ...overview.getData(),
        typeSelectProdut: {
          value: {
            id: value.id.toString(),
            name: value.name,
            parent_id: null,
          },
          error: { isError: false },
        },
      });
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
    [typeSelectProdut],
  );

  const handlerClickNextAba = useCallback(() => {
    changeCurrentTabForNext(nameDataOverview);
  }, []);

  const handlerClickSaveAba = useCallback(() => {
    const error = {
      active: false,
      message: 'Os campos destacados são de preenchimento obrigatório',
    };
    if (subCategoryFinance.id === '') {
      error.active = true;
      setErrorSubCategoryFinance({
        isError: true,
      });
    }
    if (categoryProduct.id === '') {
      error.active = true;
      setErrorCategoryProduct({
        isError: true,
      });
    }
    if (name === '') {
      error.active = true;
      setErrorName({
        isError: true,
      });
    }
    console.log(overview.getData());
    if (!error.active) {
      // overview.setData({
      //   typeSelectProdut: {
      //     id: selectTypeProduct.id.toString(),
      //     name: selectTypeProduct.name,
      //     parent_id: null,
      //   },
      //   categoryCost: categoryFinance,
      //   subCategoryCost: categoryFinance,
      //   groupProduct: categoryProduct,
      //   nameProduct: name,
      //   hasVariation: {
      //     name: hasVariation.name,
      //     hasVariation: hasVariation.active,
      //   },
      // });
      if (details.validate()) {
        setAlert({
          active: true,
          message:
            'Os campos destacados na aba "Detalhes" são de preenchimento obrigatório',
        });
        return;
      }
    } else {
      setAlert(error);
    }
  }, [
    typeSelectProdut,
    categoryCost,
    subCategoryFinance,
    categoryProduct,
    name,
    details.getData(),
  ]);

  return (
    <>
      <div className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Tipo de produto"
            message="Selecione o tipo do produto"
          />
          <NewSelect
            error={typeSelectProdut.error}
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
          <NewSelect
            error={categoryCost.error}
            onChange={event => {
              const split = event.target.value.split('+');
              const id = split[0];
              const name = split[1];
              handlerChangeCategoryFinance({ id, name, parent_id: null });
            }}
          >
            {categoryFinances
              .filter(({ parent_id }) => parent_id === null)
              .map(({ id, name }) => (
                <option key={id} value={id + '+' + name}>
                  {name}
                </option>
              ))}
          </NewSelect>
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Subcategoria custo"
            message="Selecione o tipo do produto"
          />
          <NewSelect
            disabled={categoryCost.value.id === ''}
            error={errorSubCategoryFinance}
            onChange={event => {
              const split = event.target.value.split('+');
              const id = split[0];
              const name = split[1];
              const parent_id = split[2];
              handlerChangeSubCategoryFinance({
                id,
                name,
                parent_id,
              });
            }}
          >
            {subCategoryFinanceData.map(({ id, name, parent_id }) => (
              <option key={id} value={id + '+' + name + '+' + parent_id}>
                {name}
              </option>
            ))}
          </NewSelect>
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Grupo produto"
            message="Selecione Categoria custo"
          />
          <NewSelect
            error={errorCategoryProduct}
            onChange={event => {
              const split = event.target.value.split('+');
              const id = split[0];
              const name = split[1];
              handlerChangeCategoryProduct({ id, name, parent_id: null });
            }}
          >
            {categoryProducts.map(({ id, name }) => (
              <option key={id} value={id + '+' + name}>
                {name}
              </option>
            ))}
          </NewSelect>
        </div>
      </div>
      <Container className="row">
        <div className="form-content col-md-6">
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
        isActive={alert.active}
        onlyConfirm
        message={alert.message}
        onClickConfirmButton={handlerClickAlertConfirm}
      />
      <Footer
        onClickButtonNext={handlerClickNextAba}
        onSave={handlerClickSaveAba}
      />
    </>
  );
};

export const labelDataOverview = 'Dados';
export const nameDataOverview = '@@tabs-overview';
