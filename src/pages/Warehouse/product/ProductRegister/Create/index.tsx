import React, { useCallback, useEffect, useRef, useState } from 'react';
import Container from '../../../../../components/Container';
import { namePageTitle, nameActions } from '../domain/info';
import { breadcrumbCreate } from '../domain/breadcrumb';
import { toolsCreate } from '../domain/tools/create';
import { FormHandles } from '@unform/core';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import FormComponent from '../../../../../components/Form';
import { FormDataProtocol } from '../domain/protocols';
import { VisibleContent, Wrapper } from './style';
import { DropdownInput } from '../../../../../components/DropdownInput';
import { fakeData } from './data';
import { Alert } from '../../../../../components/Alert';
import { Select } from '../../../../../components/Select';
import { useLocation } from 'react-router';
import { DefaultInputs } from './inputs/Defaults';
import { loadCategoryData } from './api/loadCategoryCost';

type DataProtocol = {
  id: string;
  name: string;
  parent_id: string | null;
};

const ProductAtributesCreate = (): JSX.Element => {
  let { search } = useLocation();
  const formRef = useRef<FormHandles>(null);
  const onSubmitForm = useCallback(async (data: FormDataProtocol) => {}, []);
  const [alert, setAlert] = useState<{ isActive: boolean; message: string }>({
    isActive: false,
    message: '',
  });
  const [name, setName] = useState('');
  const [categoryFinance, setCategoryFinance] = useState('');
  const [categoryProduct, setCategoryProduct] = useState('');
  const [currentValue, setCurrentValue] = useState('Selecione');
  const [oldValueSelect, setOldValueSelect] = useState('');
  const [isFilled, setIsFilled] = useState(false);
  const [isVisibleInputMateriaPrima, setIsVisibleInputMateriaPrima] = useState(
    false,
  );
  const [isVisibleInputSemiAcabado, setIsVisibleInputSemiAcabado] = useState(
    false,
  );
  const [isVisibleInputVenda, setIsVisibleInputVenda] = useState(false);
  const [isVisibleInputRevenda, setIsVisibleInputRevenda] = useState(false);
  const [isVisibleInputLocacao, setIsVisibleInputLocacao] = useState(false);
  const [isVisibleInputConsumo, setIsVisibleInputConsumo] = useState(false);
  const [isVisibleDefault, setIsVisibleDefault] = useState(false);

  const [dataCategoryCost, setDataCategoryCost] = useState<DataProtocol[]>([]);

  useEffect(() => {
    async function load() {
      const result = await loadCategoryData();
      console.log(result);
      setDataCategoryCost(result);
    }
    load();
  }, []);

  const data: string[] = [
    'Materia Prima',
    'Semi acabado',
    'Venda',
    'Revenda',
    'Locação',
    'Consumo',
  ];

  const handlerChangeCategoryFinance = useCallback(
    (value: any) => {
      setCategoryFinance(value);
      setIsFilled(true);
    },
    [categoryFinance, isFilled],
  );

  const handlerChangeCategoryProduct = useCallback(
    (value: any) => {
      setCategoryProduct(value);
      setIsFilled(true);
    },
    [categoryProduct, isFilled],
  );

  const handlerChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.currentTarget.value);
      if (event.target.value === '') {
        setIsFilled(false);
      }
    },
    [name, isFilled],
  );

  const onChangeSelect = useCallback(
    value => {
      setOldValueSelect(value);
    },
    [oldValueSelect],
  );

  useEffect(() => {
    setIsFilled(true);
  }, [isFilled]);

  useEffect(() => {
    if (currentValue.toLowerCase() === 'Materia Prima'.toLowerCase()) {
      setIsVisibleInputMateriaPrima(true);
      setIsVisibleDefault(true);
      setIsVisibleInputConsumo(false);
      setIsVisibleInputLocacao(false);
      setIsVisibleInputRevenda(false);
      setIsVisibleInputSemiAcabado(false);
      setIsVisibleInputVenda(false);
    }
    if (currentValue.toLowerCase() === 'Semi acabado'.toLowerCase()) {
      setIsVisibleInputSemiAcabado(true);
      setIsVisibleDefault(true);
      setIsVisibleInputMateriaPrima(false);
      setIsVisibleInputConsumo(false);
      setIsVisibleInputLocacao(false);
      setIsVisibleInputRevenda(false);
      setIsVisibleInputVenda(false);
    }
    if (currentValue.toLowerCase() === 'Venda'.toLowerCase()) {
      setIsVisibleInputVenda(true);
      setIsVisibleDefault(true);
      setIsVisibleInputMateriaPrima(false);
      setIsVisibleInputConsumo(false);
      setIsVisibleInputLocacao(false);
      setIsVisibleInputRevenda(false);
      setIsVisibleInputSemiAcabado(false);
    }
    if (currentValue.toLowerCase() === 'Revenda'.toLowerCase()) {
      setIsVisibleInputRevenda(true);
      setIsVisibleDefault(true);
      setIsVisibleInputMateriaPrima(false);
      setIsVisibleInputConsumo(false);
      setIsVisibleInputLocacao(false);
      setIsVisibleInputSemiAcabado(false);
      setIsVisibleInputVenda(false);
    }
    if (currentValue.toLowerCase() === 'Locação'.toLowerCase()) {
      setIsVisibleInputLocacao(true);
      setIsVisibleDefault(true);
      setIsVisibleInputMateriaPrima(false);
      setIsVisibleInputConsumo(false);
      setIsVisibleInputRevenda(false);
      setIsVisibleInputSemiAcabado(false);
      setIsVisibleInputVenda(false);
    }
    if (currentValue.toLowerCase() === 'Consumo'.toLowerCase()) {
      setIsVisibleInputConsumo(true);
      setIsVisibleDefault(true);
      setIsVisibleInputMateriaPrima(false);
      setIsVisibleInputLocacao(false);
      setIsVisibleInputRevenda(false);
      setIsVisibleInputSemiAcabado(false);
      setIsVisibleInputVenda(false);
    }
  }, [currentValue]);

  useEffect(() => {
    const query = new URLSearchParams(search);
    const queryParams = query.get('type');
    const result = data.filter((name: string) => {
      return name.toLowerCase() == queryParams?.toLowerCase();
    });

    if (result.length === 1) {
      setCurrentValue(result[0]);
    }
  }, []);

  const onChangeSelectItem = useCallback(
    value => {
      setCurrentValue(value);

      if (isFilled) {
        setAlert({
          isActive: true,
          message:
            'Os campos preenchidos poderão ser perdidos, deseja continuar?',
        });
      }
    },
    [alert, currentValue, categoryFinance, name, isFilled],
  );

  const onClickButtonConfirm = useCallback(() => {
    setAlert({ ...alert, isActive: false });
  }, [alert]);

  const onClickButtonCancel = useCallback(() => {
    setAlert({ ...alert, isActive: false });
    setCurrentValue(oldValueSelect);
  }, [alert, currentValue, oldValueSelect]);

  return (
    <Container
      pageTitle={namePageTitle}
      portletTitle={nameActions.create.name}
      breadcrumb={breadcrumbCreate}
      tools={[toolsCreate]}
    >
      <div className="form-body">
        <FormComponent<FormDataProtocol>
          formRef={formRef}
          onSubmitForm={onSubmitForm}
        >
          <>
            <div className="row">
              <div className="form-content col-md-3">
                <Wrapper>
                  <label htmlFor="form">Tipo de produto</label>
                  <Select
                    selectValue={currentValue}
                    onClickSelect={onChangeSelect}
                    onClickItem={onChangeSelectItem}
                    data={data}
                  />
                </Wrapper>
              </div>
            </div>
            <div className="row">
              <div className="form-content col-md-3">
                <DropdownInput<DataProtocol>
                  className="form-control"
                  label="Categoria custo"
                  data={dataCategoryCost}
                  onChangeCurrentRow={handlerChangeCategoryFinance}
                />
              </div>
              <div className="form-content col-md-3 ">
                <DropdownInput<DataProtocol>
                  className="form-control"
                  label="Grupo produto"
                  data={fakeData}
                  onChangeCurrentRow={handlerChangeCategoryProduct}
                />
              </div>
              <div className="form-content col-md-6">
                <Input
                  onChange={handlerChangeName}
                  value={name}
                  name="category"
                  className="form-control"
                  label="Nome do produto"
                />
              </div>
            </div>

            <VisibleContent id="content-default" isVisible={isVisibleDefault}>
              <DefaultInputs />
            </VisibleContent>
            <div className="form-actions right">
              <Button type="submit" className="btn dark btn-sm sbold uppercase">
                Salvar
              </Button>
            </div>
          </>
        </FormComponent>
      </div>
      <Alert
        isActive={alert.isActive}
        onClickCancellButton={onClickButtonCancel}
        onClickConfirmButton={onClickButtonConfirm}
        message={alert.message}
      />
    </Container>
  );
};

export default ProductAtributesCreate;
