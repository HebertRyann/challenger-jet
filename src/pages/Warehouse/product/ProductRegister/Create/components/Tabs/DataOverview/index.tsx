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
} from '../../../domain/products';
import { nameStock } from '../Stock';
import { Footer } from '../../footer';
import { NewSelect } from '../../../../../../../../components/NewSelect';
import { useTabCreate } from '../../../providers/tabsProvider';
import { useToast } from '../../../../../../../../hooks/toast';

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
  const { addToast } = useToast();
  const {
    activeTab,
    disableTab,
    changeCurrentTab,
    changeCurrentTabForNext,
  } = useTabs();
  const { overview, validation, save } = useTabCreate();
  const {
    typeSelectProdut,
    categoryCost,
    subCategoryCost,
    groupProduct,
    nameProduct,
    hasVariation,
  } = overview.getData();
  const [alert, setAlert] = useState<{
    active: boolean;
    message?: string;
    component?: () => JSX.Element;
  }>({
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

  const handlerChangeCategoryCost = useCallback(
    ({ id, name }: TypeEntityWithIdAndName) => {
      overview.setData({
        ...overview.getData(),
        categoryCost: {
          value: {
            id,
            name,
          },
          error: { isError: false },
        },
      });
      const childrens = categoryFinances.filter(
        parents => parents.parent_id == id,
      );
      setSubCategoryFinanceData(childrens);
    },
    [subCategoryFinanceData, categoryCost, overview.getData()],
  );

  const handlerHasVariation = useCallback(
    ({ keyTab, name }: TypeTabNameEnableOrDisable) => {
      if (name.toLowerCase() === 'sim') {
        activeTab(keyTab);
        overview.setData({
          ...overview.getData(),
          hasVariation: {
            error: { isError: false },
            value: { name, hasVariation: true },
          },
        });
        disableTab(nameStock);
      } else {
        activeTab(nameStock);
        disableTab(keyTab);
        overview.setData({
          ...overview.getData(),
          hasVariation: {
            error: { isError: false },
            value: { name, hasVariation: false },
          },
        });
      }
    },
    [overview.getData()],
  );

  const handlerSelectTypeProduct = useCallback(
    (value: TypeProduct) => {
      overview.setData({
        ...overview.getData(),
        typeSelectProdut: {
          value: {
            id: value.id.toString(),
            name: value.name,
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
    [
      typeSelectProdut,
      groupProduct,
      subCategoryCost,
      categoryCost,
      nameProduct,
      overview.getData().hasVariation,
    ],
  );

  const handlerClickNextAba = useCallback(() => {
    changeCurrentTabForNext(nameDataOverview);
  }, []);

  type Link = {
    link: string;
    name: string;
  };

  const [links, setLinks] = useState<Link[]>([{ link: '', name: '' }]);

  const handlerClickAlertConfirm = useCallback(() => {
    setAlert({ active: false, message: '' });
    setLinks([]);
  }, [alert, links]);

  const renderComponentAlertWithLink = useCallback(
    (): JSX.Element => (
      <h4 style={{ fontWeight: 300 }}>
        Os campos destacados na aba(s){' '}
        {links
          .filter(({ link }) => link !== '')
          .map(({ link, name }, index) => (
            <>
              <span
                onClick={() => {
                  handlerClickAlertConfirm();
                  changeCurrentTab(link);
                }}
                style={{ fontWeight: 700, cursor: 'pointer' }}
              >
                {name}
                {', '}
              </span>
            </>
          ))}
        são de preenchimento obrigatório
      </h4>
    ),
    [links],
  );

  const handlerClickOnSaveButton = async () => {
    const tabsErrorList = validation.validate();
    setLinks([]);
    tabsErrorList.map(({ labelName, linkName }) => {
      setLinks(old => {
        return [
          ...old,
          {
            link: linkName,
            name: labelName,
          },
        ];
      });
    });
    if (tabsErrorList.length !== 0) {
      setAlert({ active: true });
      return;
    }

    const { code } = await save();

    if (code === 200) {
      addToast({
        type: 'success',
        title: 'Produto adicionado',
        description: 'Produto salvo com sucesso',
      });
    } else {
      addToast({
        type: 'error',
        title: 'Erro ao salvar o produto',
        description: 'Não foi possivel salvar o produto',
      });
    }
  };

  return (
    <>
      <div className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Tipo do produto"
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
            label="Grupo do produto"
            message="Selecione Categoria custo"
          />
          <NewSelect
            error={groupProduct.error}
            onChange={event => {
              const split = event.target.value.split('+');
              const id = split[0];
              const name = split[1];
              overview.setData({
                ...overview.getData(),
                groupProduct: {
                  error: { isError: false },
                  value: {
                    id,
                    name,
                  },
                },
              });
            }}
          >
            {categoryProducts.map(({ id, name }) => (
              <option key={id} value={id + '+' + name}>
                {name}
              </option>
            ))}
          </NewSelect>
        </div>
        <div className="form-content col-md-6">
          <TooltipComponent
            label="Nome do produto"
            message="Selecione o tipo do produto"
          />
          <NewInput
            error={nameProduct.error}
            onChange={event => {
              overview.setData({
                ...overview.getData(),
                nameProduct: {
                  error: { isError: false },
                  value: event.target.value,
                },
              });
            }}
            value={nameProduct.value}
            name="category"
          />
        </div>
        <Container className="form-content col-md-3">
          <TooltipComponent
            label="Categoria de custo"
            message="Selecione o tipo do produto"
          />
          <NewSelect
            error={categoryCost.error}
            onChange={event => {
              const split = event.target.value.split('+');
              const id = split[0];
              const name = split[1];
              handlerChangeCategoryCost({ id, name, parent_id: null });
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
        </Container>
        <Container className="form-content col-md-3">
          <TooltipComponent
            label="Subcategoria custo"
            message="Selecione o tipo do produto"
          />
          <NewSelect
            disabled={categoryCost.value.id === ''}
            error={subCategoryCost.error}
            onChange={event => {
              const split = event.target.value.split('+');
              const id = split[0];
              const name = split[1];
              overview.setData({
                ...overview.getData(),
                subCategoryCost: {
                  error: { isError: false },
                  value: {
                    id,
                    name,
                  },
                },
              });
            }}
          >
            {subCategoryFinanceData.map(({ id, name, parent_id }) => (
              <option key={id} value={id + '+' + name + '+' + parent_id}>
                {name}
              </option>
            ))}
          </NewSelect>
        </Container>
        <Container className="form-content col-md-3">
          <TooltipComponent
            label="Possui variação?"
            message="Selecione o tipo do produto"
          />
          <NewSelect
            error={hasVariation.error}
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
        </Container>
      </div>
      <Alert
        isActive={alert.active}
        onlyConfirm
        message={alert.message}
        RenderComponent={renderComponentAlertWithLink}
        onClickConfirmButton={handlerClickAlertConfirm}
      />
      <Footer
        onClickButtonNext={handlerClickNextAba}
        onSave={handlerClickOnSaveButton}
      />
    </>
  );
};

export const labelDataOverview = 'Dados';
export const nameDataOverview = '@@tabs-overview';
