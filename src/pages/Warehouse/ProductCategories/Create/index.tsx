import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Form from '../../../../components/Form/';
import Container from '../../../../components/Container';
import Button from '../../../../components/Button';
import api from '../../../../services/api';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utlis/getValidationErros';

export interface ProductCategoryFormData {
  parent_id?: number;
  name: string;
}

const ProductCategoriesCreate: React.FC = () => {
  const breadcrumb: Array<any> = [
    {
      name: 'Início',
      to: '/',
    },
    {
      name: 'Almoxarifado',
    },
    {
      name: 'Produtos',
    },
    {
      name: 'Categorias',
      to: '/productCategories',
    },
    {
      name: 'Adicionar',
    },
  ];
  const tools: Array<any> = [
    {
      name: 'Listar',
      to: '/productCategories',
      icon: 'fa fa-list',
      modal: false,
    },
  ];

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProductCategoryFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/productCategories', data);

        history.push('/productCategories');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer cadastro, por favor, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container
      pageTitle="Categorias de produtos"
      portletTitle="Adicionar"
      breadcrumb={breadcrumb}
      tools={tools}
    >
      <div className="form-body">
        <Form<ProductCategoryFormData>
          formRef={formRef}
          onSubmitForm={handleSubmit}
        >
          <div className="form-actions right">
            <Button type="submit" className="btn dark btn-sm sbold uppercase">
              Salvar
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default ProductCategoriesCreate;
