import React, { useCallback, useState } from 'react';
import { Container } from './style';
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent';
import { nameHasVariation } from '../HasVariation';
import { nameFiscal } from '../Fiscal';
import { useTabs } from '../../../../../../../../hooks/tabs';
import { labelHasComposition, nameHasComposition } from '../HasComposition';
import {
  labelPriceComposition,
  namePriceComposition,
} from '../PriceComposition';
import { NewInput } from '../../../../../../../../components/NewInput';
import { Alert } from '../../../../../../../../components/Alert';
import {
  typeProducts,
  TypeProduct,
  SALE,
  SEMI_FINISHED,
  RE_SALE,
  LOCATION,
} from './products';
import { labelStock, nameStock } from '../Stock';
import { Footer } from '../../footer';
import { NewSelect } from '../../../../../../../../components/NewSelect';
import { useTabCreate } from '../../../providers/tabsProvider';
import { labelDetails, nameDetails } from '../Details';
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
  const {
    activeTab,
    disableTab,
    changeCurrentTab,
    changeCurrentTabForNext,
  } = useTabs();
  const {
    overview,
    details,
    stock,
    priceComposition,
    composition,
  } = useTabCreate();
  const {
    typeSelectProdut,
    categoryCost,
    subCategoryCost,
    groupProduct,
    nameProduct,
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
    [subCategoryFinanceData, overview.getData()],
  );

  const handlerHasVariation = useCallback(
    ({ active, keyTab, name }: TypeTabNameEnableOrDisable) => {
      if (name.toLowerCase() === 'sim') {
        activeTab(keyTab);
        overview.setData({
          ...overview.getData(),
          hasVariation: {
            error: { isError: false },
            value: { name, hasVariation: active },
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
            value: { name, hasVariation: active },
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
    [typeSelectProdut, groupProduct, nameProduct],
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

  const handlerClickSaveAba = useCallback(() => {
    let activeAlert = false;
    if (
      typeSelectProdut.value.name === SALE.name ||
      typeSelectProdut.value.name === RE_SALE.name ||
      typeSelectProdut.value.name === LOCATION.name
    ) {
      if (details.validate()) {
        setLinks(oldValue => [
          ...oldValue,
          { link: nameDetails, name: labelDetails },
        ]);
        activeAlert = true;
      }
      if (stock.validate()) {
        setLinks(oldValue => [
          ...oldValue,
          { link: nameStock, name: labelStock },
        ]);
        activeAlert = true;
      }
      if (
        typeSelectProdut.value.name !== LOCATION.name &&
        priceComposition.validate()
      ) {
        setLinks(oldValue => [
          ...oldValue,
          { link: namePriceComposition, name: labelPriceComposition },
        ]);
        activeAlert = true;
      }
      if (
        typeSelectProdut.value.name === SALE.name ||
        typeSelectProdut.value.name === SEMI_FINISHED.name
      ) {
        if (composition.validate()) {
          setLinks(oldValue => [
            ...oldValue,
            { link: nameHasComposition, name: labelHasComposition },
          ]);
          activeAlert = true;
        }
      }
    }
    setAlert({ active: activeAlert });
    // if (typeSelectProdut.value.id === '') {
    //   isError = true;
    //   overview.setData({
    //     ...overview.getData(),
    //     typeSelectProdut: {
    //       ...overview.getData().typeSelectProdut,
    //       error: { isError: true },
    //     },
    //   });
    // }
    // if (categoryCost.value.id === '') {
    //   isError = true;
    //   overview.setData({
    //     ...overview.getData(),
    //     categoryCost: {
    //       ...overview.getData().categoryCost,
    //       error: { isError: true },
    //     },
    //   });
    // }
    // if (isError) {
    //   setAlert({
    //     active: true,
    //     message: 'Os campos destacados são de preenchimento obrigatório',
    //   });
    //   return;
    // }
    //
    // if (
    //   typeSelectProdut.value.name === SALE.name ||
    //   typeSelectProdut.value.name === RE_SALE.name ||
    //   typeSelectProdut.value.name === LOCATION.name
    // ) {
    //   if (typeSelectProdut.value.name !== LOCATION.name) {
    //     if (priceComposition.validate()) {
    //       setAlert({
    //         active: true,
    //         component: (): JSX.Element => (
    //           <h4 style={{ fontWeight: 300 }}>
    //             Os campos destacados na aba{' '}
    //             <span
    //               onClick={() => {
    //                 handlerClickAlertConfirm();
    //                 changeCurrentTab(namePriceComposition);
    //               }}
    //               style={{ fontWeight: 700, cursor: 'pointer' }}
    //             >
    //               Formaçao de preço{' '}
    //             </span>
    //             são de preenchimento obrigatório
    //           </h4>
    //         ),
    //       });
    //       return;
    //     }
    //   }
    //   if (details.validate()) {
    //     setAlert({
    //       active: true,
    //       component: (): JSX.Element => (
    //         <h4 style={{ fontWeight: 300 }}>
    //           Os campos destacados na aba{' '}
    //           <span
    //             onClick={() => {
    //               handlerClickAlertConfirm();
    //               changeCurrentTab(nameDetails);
    //             }}
    //             style={{ fontWeight: 700, cursor: 'pointer' }}
    //           >
    //             Detalhes{' '}
    //           </span>
    //           são de preenchimento obrigatório
    //         </h4>
    //       ),
    //     });
    //     return;
    //   }
    // }
    // if (stock.validate()) {
    //   setAlert({
    //     active: true,
    //     component: (): JSX.Element => (
    //       <h4 style={{ fontWeight: 300 }}>
    //         Os campos destacados na aba{' '}
    //         <span
    //           onClick={() => {
    //             handlerClickAlertConfirm();
    //             changeCurrentTab(nameStock);
    //           }}
    //           style={{ fontWeight: 700, cursor: 'pointer' }}
    //         >
    //           Estoque/Variação{' '}
    //         </span>
    //         são de preenchimento obrigatório
    //       </h4>
    //     ),
    //   });
    //   return;
    // }
  }, [
    details.getData(),
    overview.getData(),
    stock.getData(),
    priceComposition.getData(),
    composition.getData(),
    links,
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
        </div>
        <div className="form-content col-md-3">
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
              const parent_id = split[2];
              overview.setData({
                ...overview.getData(),
                subCategoryCost: {
                  error: { isError: false },
                  value: {
                    id,
                    name,
                    parent_id,
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
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Grupo produto"
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
                    parent_id: null,
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
      </div>
      <Container className="row">
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
      </Container>
      <Alert
        isActive={alert.active}
        onlyConfirm
        message={alert.message}
        RenderComponent={renderComponentAlertWithLink}
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
