import React, { useCallback, useEffect, useRef, useState } from 'react';
//import { FormHandles } from '@unform/core';
import { useParams, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import Form from '../components/Form';
import Container from '../../../../components/Container';
import Tabs from '../../../../components/Tabs';
import Tab from '../../../../components/Tabs/Tab';
import DataTable from '../../../../components/DataTable';
import * as Yup from 'yup';
import api from '../../../../services/api';
import { useToast } from '../../../../hooks/toast';
import Modal from '../../../../components/Modal';
import getValidationErrors from '../../../../utlis/getValidationErros';
import Button from '../../../../components/Button';

interface ProductCategorytData {
  id: number;
  parent_id: number | null;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ProductCategoryFormData {
  parent_id?: number;
  name: string;
}

const ProductCategoriesView: React.FC = () => {
  const { id } = useParams<{ id: string }>();

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
      name: 'Visualizar',
    },
  ];
  const tools: Array<any> = [
    {
      name: 'Editar',
      to: `/productCategories/update/${id}`,
      icon: 'fa fa-edit',
      modal: false,
    },
    {
      name: 'Remover',
      to: '#!',
      icon: 'fa fa-remove',
      modal: false,
      handleDelete: () => handleDelete(),
    },
    {
      name: 'Adicionar',
      to: `/productCategories/create`,
      icon: 'fa fa-plus',
      modal: false,
    },
    {
      name: 'Listar',
      to: '/productCategories',
      icon: 'fa fa-list',
      modal: false,
    },
  ];

  //const formRef = useRef<FormHandles>(null);

  //const [isLoading, setIsLoading] = useState(true);
  const [
    productCategory,
    setProductCategory,
  ] = useState<ProductCategorytData | null>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const headers = [
    { name: 'Cód.', field: 'id', sortable: true },
    { name: 'Nome', field: 'name', sortable: true },
    { name: 'Ações', field: 'actions', sortable: false },
  ];

  const searchParametersAuditLog = [
    { entity: 'ProductCategory', entity_id: id },
  ];
  const searchProductCategories = [{ parent_id: id }];
  const urlCreateSubCategory = `/productCategories/create?parent_id=${id}`;
  const formRef = useRef<FormHandles>(null);

  const [isUpdateTable, setIsUpdateTable] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleClickOnClose = () => {
    setIsOpenModal(false);
  };

  const handleClickOnOpen = useCallback(() => {
    setIsOpenModal(true);
  }, [isOpenModal]);

  const refModal = useRef(null);
  useEffect(() => {
    async function loadCategory(): Promise<void> {
      try {
        const response = await api.get<ProductCategorytData>(
          `/productCategories/view/${id}`,
        );
        const { data } = response;
        console.log(data);
        setProductCategory(data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error ao carregar a categoria',
          description:
            'Houve um error ao carregar a categoria, tente novamente mais tarde!',
        });
      } finally {
      }
    }
    loadCategory();
  }, [id, addToast]);

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

        data.parent_id = Number(id);
        await api.post('/productCategories', data);

        setIsUpdateTable(!isUpdateTable);
        setIsOpenModal(false);
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

  const renderContentModal = (): JSX.Element => {
    return (
      <Form<ProductCategoryFormData>
        formRef={formRef}
        onSubmitForm={handleSubmit}
      >
        <div className="form-actions right">
          <button
            onClick={handleClickOnClose}
            type="reset"
            className="btn btn-default btn-sm sbold uppercase"
          >
            Fechar
          </button>
          <Button type="submit" className="btn dark btn-sm sbold uppercase">
            Salvar
          </Button>
        </div>
      </Form>
    );
  };

  async function handleDelete() {
    const confirm = window.confirm(
      `Tem certeza que deseja excluir o registro ${productCategory?.name} ?`,
    );

    if (!confirm) {
      addToast({
        type: 'info',
        title: 'Operação cancelada.',
      });
      return;
    }

    try {
      await api.delete(`/productCategories/${id}`);
      addToast({
        type: 'success',
        title: 'Categoria removida com sucesso.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Categoria não removida, pois ainda está sendo usada.',
      });
    }
  }

  return (
    <>
      <Container
        pageTitle="Categorias de produtos"
        portletTitle="Visualizar"
        breadcrumb={breadcrumb}
        tools={tools}
      >
        <div className="form-body">
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="id" className="control-label">
                  Cód.
                </label>
                <p>{productCategory?.id}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="name" className="control-label">
                  Nome
                </label>
                <p>{productCategory?.name}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="created" className="control-label">
                  Cadastrado em
                </label>
                <p>{productCategory?.created_at}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="updated" className="control-label">
                  Atualizado em
                </label>
                <p>{productCategory?.updated_at}</p>
              </div>
            </div>
          </div>
          <p>&nbsp;</p>
          <div className="row">
            <div className="col-md-12">
              <Tabs>
                <Tab title="Subcategoria">
                  <div className="portlet light">
                    <div className="portlet-title">
                      <div className="caption">Listagem</div>
                      <div className="tools">
                        <div
                          onClick={handleClickOnOpen}
                          style={{ cursor: 'pointer' }}
                        >
                          <i className="fa fa-plus" /> Adicionar
                        </div>
                      </div>
                    </div>
                    <div className="portlet-body form">
                      <DataTable
                        isUpdateTable={isUpdateTable}
                        source="productCategories"
                        entity="ProductCategory"
                        headers={headers}
                        searchParameters={searchProductCategories}
                      />
                    </div>
                  </div>
                </Tab>
                <Tab title="Logs">
                  <div className="portlet light">
                    <div className="portlet-title">
                      <div className="caption">Listagem</div>
                      <div className="tools"></div>
                    </div>
                    <div className="portlet-body form">
                      <DataTable
                        source="auditLogs"
                        entity="AuditLog"
                        searchParameters={searchParametersAuditLog}
                      />
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </Container>
      <Modal
        refModal={refModal}
        onClickButtonCancel={handleClickOnClose}
        isOpenModal={isOpenModal}
        pageTitle="Adicionar"
        Children={renderContentModal}
      />
    </>
  );
};

export default ProductCategoriesView;
