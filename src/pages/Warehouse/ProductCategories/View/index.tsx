import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { FormCategory } from '../components/Form';
import Container, {
  ToolsContainerProps,
} from '../../../../components/Container';
import Tabs from '../../../../components/Tabs';
import Tab from '../../../../components/Tabs/Tab';
import DataTable from '../../../../components/DataTable';
import api from '../../../../services/api';
import { useToast } from '../../../../hooks/toast';
import Modal from '../../../../components/Modal';
import { useLoading } from '../../../../hooks/loading';
import { Alert } from '../../../../components/Alert';

interface ProductCategorytData {
  id: number;
  parent_id: number | null;
  name: string;
  created_at: string;
  updated_at: string;
}

const ProductCategoriesView: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  const location = useLocation<{ id: string; value: string }>();

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

  const [
    productCategory,
    setProductCategory,
  ] = useState<ProductCategorytData | null>(null);

  const { addToast } = useToast();

  const headers = [
    { name: 'Cód.', field: 'id', sortable: true },
    { name: 'Nome', field: 'name', sortable: true },
    { name: 'Ações', field: 'actions', sortable: false },
  ];

  const searchParametersAuditLog = [
    { entity: 'ProductCategory', entity_id: id },
  ];
  const searchProductCategories = [{ parent_id: id }];

  const [isUpdateTable, setIsUpdateTable] = useState(false);
  const [isOpenModaCreate, setIsOpenModaCreate] = useState(false);

  const handleClickOnClose = useCallback(() => {
    setIsOpenModaCreate(false);
    setIsUpdateTable(!isUpdateTable);
  }, [isUpdateTable, isOpenModaCreate]);

  const handleClickOnOpenModalCreate = useCallback(() => {
    setIsOpenModaCreate(true);
  }, [isOpenModaCreate]);

  const refModal = useRef(null);
  const { disableLoading, activeLoading } = useLoading();

  useEffect(() => {
    async function loadCategory(): Promise<void> {
      activeLoading();
      try {
        const response = await api.get<ProductCategorytData>(
          `/productCategories/view/${location.state.id}`,
        );
        const { data } = response;
        setProductCategory(data);
        disableLoading();
      } catch (err) {
        disableLoading();
        addToast({
          type: 'error',
          title: 'Error ao carregar a categoria',
          description:
            'Houve um error ao carregar a categoria, tente novamente mais tarde!',
        });
      }
    }
    loadCategory();
  }, [id, addToast]);

  const tools: Array<ToolsContainerProps> = [
    {
      name: 'Editar',
      to: `/productCategories/update/${id}`,
      hasParams: false,
      icon: 'fa fa-edit',
    },
    {
      name: 'Remover',
      to: '#!',
      icon: 'fa fa-remove',
      handleDelete: () => handlerOpenAlert(),
      hasParams: false,
    },
    {
      name: 'Adicionar',
      to: `/productCategories/create`,
      icon: 'fa fa-plus',
      hasParams: false,
    },
    {
      name: 'Listar',
      to: '/productCategories',
      icon: 'fa fa-list',
      hasParams: false,
    },
  ];

  const [isActiveAlert, setIsActiveAlert] = useState(false);

  const handlerOpenAlert = useCallback(() => {
    setIsActiveAlert(true);
  }, [isActiveAlert]);

  const handlerClickButtonCancellAlert = useCallback(() => {
    setIsActiveAlert(false);
    addToast({
      type: 'info',
      title: 'Operação cancelada.',
    });
  }, [isActiveAlert]);

  const handlerClickButtonConfirmAlert = useCallback(async () => {
    try {
      await api.delete(`/productCategories/${id}`);
      setIsActiveAlert(false);
      addToast({
        type: 'success',
        title: 'Categoria removida com sucesso.',
      });
      history.goBack();
    } catch (err) {
      setIsActiveAlert(false);
      addToast({
        type: 'error',
        title: 'Categoria não removida, pois ainda está sendo usada.',
      });
    }
  }, [isActiveAlert]);

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
                          onClick={handleClickOnOpenModalCreate}
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
                        actionsButtons={{
                          onClickEdit: 'modal',
                        }}
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
        isOpenModal={isOpenModaCreate}
        pageTitle="Adicionar"
        Children={
          <FormCategory
            typeForm="create"
            isOpenInModal={{
              handleOnClose: handleClickOnClose,
              idParent: Number(id),
            }}
          />
        }
      />
      <Alert
        message={`Tem certeza que deseja excluir o registro ${productCategory?.name} ?`}
        onClickCancellButton={handlerClickButtonCancellAlert}
        onClickConfirmButton={handlerClickButtonConfirmAlert}
        isActive={isActiveAlert}
      />
    </>
  );
};

export default ProductCategoriesView;
