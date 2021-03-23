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
import { Wrapper } from './style';
import { DropdownInput } from '../../../../../components/DropdownInput';
import { fakeFinancy, fakeCatetory } from './fakeData';
import { Alert } from '../../../../../components/Alert';
import { Select } from '../../../../../components/Select';

const ProductAtributesCreate = (): JSX.Element => {
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
      console.log(isFilled);
      console.log(event.target.value);
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

  const data: string[] = [
    'Materia Prima',
    'Semi acabado',
    'Venda',
    'Revenda',
    'Locação',
    'Consumo',
  ];

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
            <div className="row" style={{ marginBottom: '20px' }}>
              <div className="form-content col-md-3">
                <DropdownInput<{
                  name: string;
                  children: { name: string }[];
                }>
                  className="form-control"
                  label="Categoria custo"
                  data={fakeFinancy}
                  onChangeCurrentRow={handlerChangeCategoryFinance}
                />
              </div>
              <div className="form-content col-md-3 ">
                <DropdownInput<{
                  name: string;
                  children: { name: string }[];
                }>
                  className="form-control"
                  label="Grupo produto"
                  data={fakeCatetory}
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
