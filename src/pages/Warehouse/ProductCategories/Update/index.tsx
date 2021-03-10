import React, { useCallback, useRef, useEffect } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useParams, useHistory } from 'react-router-dom';

import Container from '../../../../components/Container';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import api from '../../../../services/api';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utlis/getValidationErros';

interface ProductCategoryFormData {
  parent_id?: number;
  name: string;
}

const ProductCategoriesUpdate: React.FC = () => {
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
      name: 'Editar',
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

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { addToast } = useToast();

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

        await api.put(`/productCategories/update/${id}`, data);

        history.goBack();
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
    [addToast, history, id],
  );

  useEffect(() => {
    async function loadCategory(): Promise<void> {
      const response = await api.get(`/productCategories/view/${id}`);

      formRef.current?.setData(response.data);
      // setIsLoading(false);
    }

    loadCategory();
  }, [id]);

  return (
    <Container
      pageTitle="Categorias de produtos"
      portletTitle="Editar"
      breadcrumb={breadcrumb}
      tools={tools}
    >
      <div className="form-body">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-3">
              <Input name="name" className="form-control" label="Nome" />
            </div>
          </div>

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

export default ProductCategoriesUpdate;
