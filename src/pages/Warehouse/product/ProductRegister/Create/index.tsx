import React, { useCallback, useRef } from 'react';
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
import { fakeFinancy } from './fakeData';

const ProductAtributesCreate = (): JSX.Element => {
  const formRef = useRef<FormHandles>(null);

  const onSubmitForm = useCallback(async (data: FormDataProtocol) => {}, []);

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
              <div className="form-content col-md-12">
                <Wrapper>
                  <header>
                    <p>
                      Os campos marcados com <strong>*</strong> são obrigatórios
                    </p>
                  </header>

                  <main>
                    <span>Dados Gerais</span>
                    <section>
                      <span>
                        Tipos de produtos <strong>*</strong>
                      </span>
                      <main>
                        <div>
                          <input type="radio" />
                          <label htmlFor="name">Materia Prima</label>
                        </div>
                        <div>
                          <input type="radio" />
                          <label htmlFor="name">Semi acabado</label>
                        </div>
                        <div>
                          <input type="radio" />
                          <label htmlFor="name">Venda</label>
                        </div>
                        <div>
                          <input type="radio" />
                          <label htmlFor="name">Revenda</label>
                        </div>
                        <div>
                          <input type="radio" />
                          <label htmlFor="name">Locação</label>
                        </div>
                        <div>
                          <input type="radio" />
                          <label htmlFor="name">Consumo</label>
                        </div>
                      </main>
                    </section>
                  </main>
                </Wrapper>
              </div>
            </div>
            <div className="row" style={{ marginBottom: '20px' }}>
              <div className="form-content col-md-6 ">
                <DropdownInput<{
                  name: string;
                  children: { name: string }[];
                }>
                  className="form-control"
                  label="Categoria financeira"
                  data={fakeFinancy}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-content col-md-6">
                <Input
                  onChange={() => {}}
                  value={''}
                  name="category"
                  className="form-control"
                  label="Nome"
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
    </Container>
  );
};

export default ProductAtributesCreate;
