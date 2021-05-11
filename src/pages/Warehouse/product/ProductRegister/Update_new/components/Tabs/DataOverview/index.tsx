import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from './style';
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent';
import {
  TypeEntityWithIdAndName,
  TypeTabNameEnableOrDisable,
} from '../../../domain/types';
import {
  RE_SALE,
  SALE,
  SEMI_FINISHED,
  TypeProduct,
  typeProducts,
} from '../../../domain/products';
import { NewSelect } from '../../../../../../../../components/NewSelect';
import {
  useProduct,
  DataOvewViewActionTypes,
} from '../../../contextData/context';
import { useTabs } from '../../../../../../../../hooks/tabs';
import { nameHasComposition } from '../HasComposition';
import { nameFiscal } from '../Fiscal';
import { namePriceComposition } from '../PriceComposition';
import { NewInput } from '../../../../../../../../components/NewInput';
import { nameHasVariation } from '../HasVariation';
import { nameStock } from '../Stock';

export const DataOverview = ({
  categoryFinances,
  categoryProducts,
}: {
  categoryFinances: TypeEntityWithIdAndName[];
  categoryProducts: TypeEntityWithIdAndName[];
}): JSX.Element => {
  const { activeTab, disableTab } = useTabs();
  const { dataOverView } = useProduct();
  const { dataOvewViewState, dataOverViewDispatch } = dataOverView;
  const [subCategoryFinanceData, setSubCategoryFinanceData] = useState<
    TypeEntityWithIdAndName[]
  >([{ id: '', name: '', parent_id: '' }]);

  const dataHasVariation: TypeTabNameEnableOrDisable[] = [
    {
      keyTab: nameHasVariation,
      name: 'Sim',
      active: false,
    },
    { keyTab: nameHasVariation, name: 'Não', active: false },
  ];

  const handlerChangeCategoryCost = ({ id, name }: TypeEntityWithIdAndName) => {
    dataOverViewDispatch({
      type: DataOvewViewActionTypes.CHANGE_SELECT_CATEGORY_COST,
      payload: {
        data: {
          value: name,
          id: +id,
        },
      },
    });
    const childrens = categoryFinances.filter(
      parents => parents.parent_id == id,
    );
    setSubCategoryFinanceData(childrens);
  };

  const handlerSelectTypeProduct = ({ id, name, label }: TypeProduct) => {
    dataOverViewDispatch({
      type: DataOvewViewActionTypes.CHANGE_SELECT_TYPE_PRODUCT,
      payload: {
        data: { id, value: name, label },
      },
    });
    if (id === SALE.id) {
      activeTab(nameHasComposition);
      activeTab(nameFiscal);
      activeTab(namePriceComposition);
    }
    if (id === SALE.id) {
      activeTab(nameHasComposition);
      activeTab(nameFiscal);
      activeTab(namePriceComposition);
      return;
    }
    if (id === RE_SALE.id) {
      activeTab(nameFiscal);
      disableTab(nameHasComposition);
      activeTab(namePriceComposition);
      return;
    }
    if (id === SEMI_FINISHED.id) {
      activeTab(nameHasComposition);
      disableTab(nameFiscal);
      disableTab(namePriceComposition);
      return;
    }
    disableTab(nameHasComposition);
    disableTab(nameFiscal);
    disableTab(namePriceComposition);
  };

  const handlerChangeGroupProduct = ({
    id,
    name,
    parent_id,
  }: TypeEntityWithIdAndName) => {
    dataOverViewDispatch({
      type: DataOvewViewActionTypes.CHANGE_SELECT_GROUP_PRODUCT,
      payload: {
        data: {
          value: name,
          id: +id,
          parent_id: Number(parent_id),
        },
      },
    });
  };

  const onChangeNameProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    dataOverViewDispatch({
      type: DataOvewViewActionTypes.CHANGE_INPUT_NAME_PRODUCT,
      payload: {
        data: {
          value: event.target.value,
        },
      },
    });
    console.log(dataOvewViewState.inputs.nameProduct.value);
  };

  useEffect(() => {
    console.log('Change');
  }, [dataOverView.dataOvewViewState.inputs]);

  const handlerHasVariation = ({
    keyTab,
    name,
  }: TypeTabNameEnableOrDisable) => {
    if (name.toLowerCase() === 'sim') {
      activeTab(keyTab);
      dataOverViewDispatch({
        type: DataOvewViewActionTypes.CHANGE_SELECT_HAS_VARIATION,
        payload: {
          name: name,
          hasVariation: true,
        },
      });
      disableTab(nameStock);
    } else {
      activeTab(nameStock);
      disableTab(keyTab);
      dataOverViewDispatch({
        type: DataOvewViewActionTypes.CHANGE_SELECT_HAS_VARIATION,
        payload: {
          name: name,
          hasVariation: false,
        },
      });
    }
  };

  return (
    <div className="row">
      <div className="form-content col-md-3">
        <TooltipComponent
          label="Tipo do produto"
          message="Selecione o tipo do produto"
        />
        <NewSelect
          isSelected={dataOvewViewState.inputs.typeProduct.label}
          error={{ isError: !!dataOvewViewState.inputs.typeProduct.error }}
          onChange={event => {
            const split = event.target.value.split('+');
            const id = split[0];
            const name = split[1];
            const label = split[2];
            handlerSelectTypeProduct({ id: Number(id), name, label });
          }}
        >
          {typeProducts.map(({ id, name, label }) => (
            <option key={id} value={id + '+' + name + '+' + label}>
              {label}
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
          error={{ isError: !!dataOvewViewState.inputs.groupProduct.error }}
          onChange={event => {
            const split = event.target.value.split('+');
            const id = split[0];
            const name = split[1];

            handlerChangeGroupProduct({ id, name, parent_id: '' });
          }}
          isSelected={dataOvewViewState.inputs.groupProduct.value}
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
          onChange={onChangeNameProduct}
          className="form-control"
          // value={dataOvewViewState.inputs.nameProduct.value}
          name="category"
        />
      </div>
      <Container className="form-content col-md-3">
        <TooltipComponent
          label="Categoria de custo"
          message="Selecione o tipo do produto"
        />
        <NewSelect
          error={{ isError: !!dataOvewViewState.inputs.categoryCost.error }}
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
              <option
                key={Math.random()}
                value={id + '+' + name}
                defaultValue={name}
              >
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
          disabled={!dataOvewViewState.inputs.categoryCost.id}
          error={{ isError: !!dataOvewViewState.inputs.subcategoryCost.error }}
          onChange={event => {
            const split = event.target.value.split('+');
            const id = split[0];
            const name = split[1];
            dataOverViewDispatch({
              type: DataOvewViewActionTypes.CHANGE_SELECT_SUBCATEGORY_COST,
              payload: {
                data: {
                  value: name,
                  id: +id,
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
          error={{ isError: !!dataOvewViewState.inputs.hasVariation.error }}
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
  );
};

export const labelDataOverview = 'Dados';
export const nameDataOverview = '@@tabs-overview';
