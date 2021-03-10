import React, { useEffect, useState } from 'react';
//import { FormHandles } from '@unform/core';
import { Link, useParams, useHistory } from 'react-router-dom';

import Container from '../../../../components/Container';
import Tabs from '../../../../components/Tabs';
import Tab from '../../../../components/Tabs/Tab';
import DataTable from '../../../../components/DataTable';

import api from '../../../../services/api';
import { useToast } from '../../../../hooks/toast';


interface ProductCategorytData {
  id: number;
  parent_id: number | null;
  name: string;
  created_at: string;
  updated_at: string;
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
      handleDelete: () => handleDelete()
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
  const [productCategory, setProductCategory] = useState<ProductCategorytData | null>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const headers = [
    { name: 'Cód.', field: 'id', sortable: true },
    { name: 'Nome', field: 'name', sortable: true },
    { name: 'Ações', field: 'actions', sortable: false },
  ];

  const searchParametersAuditLog = [{ entity: 'ProductCategory', entity_id: id }];
  const searchProductCategories = [{ parent_id: id }];
  const urlCreateSubCategory =  `/productCategories/create?parent_id=${id}`;

  useEffect(() => {
    async function loadCategory(): Promise<void> {
      try {
        const response = await api.get<ProductCategorytData>(`/productCategories/view/${id}`);
        const { data } = response;
        setProductCategory(data);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error ao carregar a categoria',
        description:
          'Houve um error ao carregar a categoria, tente novamente mais tarde!',
      });
    } finally {
      //setIsLoading(false);
    }
  }
  loadCategory();
  },[id, addToast]);

  async function handleDelete() {
		const confirm = window.confirm(`Tem certeza que deseja excluir o registro ${productCategory?.name} ?`);

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
      history.push('/productCategories');
		} catch (err) {
      addToast({
        type: 'error',
        title: 'Categoria não removida, pois ainda está sendo usada.',
      });
		}
	}

  return (
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
              <label htmlFor="id" className="control-label">Cód.</label>
              <p>{productCategory?.id}</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="name" className="control-label">Nome</label>
              <p>{productCategory?.name}</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="created" className="control-label">Cadastrado em</label>
              <p>{productCategory?.created_at}</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="updated" className="control-label">Atualizado em</label>
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
                    <Link key="createSubCategory" to={urlCreateSubCategory}>
                      <i className="fa fa-plus" /> Adicionar
                    </Link>
                  </div>
                </div>
                <div className="portlet-body form">
                  <DataTable source="productCategories" entity="ProductCategory" headers={headers} searchParameters={searchProductCategories}/>
                </div>
              </div>
            </Tab>
            <Tab title="Logs">
              <div className="portlet light">
                <div className="portlet-title">
                  <div className="caption">Listagem</div>
                  <div className="tools">

                  </div>
                </div>
                <div className="portlet-body form">
                  <DataTable source="auditLogs" entity="AuditLog" searchParameters={searchParametersAuditLog} />
                </div>
              </div>
            </Tab>
          </Tabs>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductCategoriesView;
