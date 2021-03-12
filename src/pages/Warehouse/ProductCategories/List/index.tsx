import React, { useCallback, useRef, useState } from 'react';
import Form from '../../../../components/Form';
import Container from '../../../../components/Container';
import DataTable from '../../../../components/DataTable';
import Modal from '../../../../components/Modal';
import { ProductCategoryFormData } from '../Create';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import api from '../../../../services/api';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utlis/getValidationErros';
import { useHistory } from 'react-router-dom';
import Button from '../../../../components/Button';
import { useForceUpdate } from '../../../../hooks/forceUpdate';

const ProductCategoriesList: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const forceUpdate = useForceUpdate();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleClickOnClose = () => {
    setIsOpenModal(false);
  };

  const handleClickOnOpen = () => {
    console.log('Open');
  };

  const refModal = useRef(null);

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
    },
  ];
  const tools: Array<any> = [
    {
      name: 'Adicionar',
      to: '/productCategories/create',
      icon: 'fa fa-plus',
      modal: true,
      onClick: () => setIsOpenModal(true),
    },
  ];

  const headers = [
    { name: 'Cód.', field: 'id', sortable: true },
    { name: 'Nome', field: 'name', sortable: true },
    { name: 'Ações', field: 'actions', sortable: false },
  ];

  const formRef = useRef<FormHandles>(null);

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

        setIsOpenModal(false);
        forceUpdate();
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
    [addToast, history, isOpenModal],
  );

  const renderContentModal = (): JSX.Element => {
    return (
      <Form<ProductCategoryFormData>
        formRef={formRef}
        onSubmitForm={handleSubmit}
      >
        <div className="form-actions right">
          <Button
            onClick={handleClickOnOpen}
            type="submit"
            className="btn dark btn-sm sbold uppercase"
          >
            Salvar
          </Button>
          <button
            type="reset"
            style={{ marginLeft: '15px' }}
            className="btn dark btn-sm sbold uppercase"
            onClick={handleClickOnClose}
          >
            Cancelar
          </button>
        </div>
      </Form>
    );
  };

  return (
    <>
      <Container
        pageTitle="Categorias de produtos"
        portletTitle="Listagem"
        breadcrumb={breadcrumb}
        tools={tools}
      >
        <DataTable
          source="productCategories"
          entity="ProductCategory"
          headers={headers}
        />
      </Container>
      <Modal
        refModal={refModal}
        onClickButtonCancel={handleClickOnClose}
        onClickButtonSave={handleClickOnOpen}
        isOpenModal={isOpenModal}
        pageTitle="Categorias de produtos"
        portletTitle="Adicionar novo produto"
        Children={renderContentModal}
      />
    </>
  );
};

export default ProductCategoriesList;
