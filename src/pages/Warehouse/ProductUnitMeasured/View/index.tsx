import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Container from '../../../../components/Container';
import Tabs from '../../../../components/Tabs';
import Tab from '../../../../components/Tabs/Tab';
import DataTable from '../../../../components/DataTable';
import api from '../../../../services/api';
import { useToast } from '../../../../hooks/toast';
import { useLoading } from '../../../../hooks/loading';
import { nameActions, nameEntity, namePageTitle } from '../domain/info';
import { apiList } from '../domain/api';
import { breadcrumbView } from '../domain/breadcrumb';
import {
  toolsViewCreate,
  toolsViewDelete,
  toolsViewUpdate,
  toolsViewList,
} from '../domain/tools';

interface ProductCategorytData {
  id: number;
  parent_id: number | null;
  name: string;
  created_at: string;
  updated_at: string;
}

const View: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const location = useLocation<{ id: string; value: string }>();
  const [
    productCategory,
    setProductCategory,
  ] = useState<ProductCategorytData | null>(null);
  const { addToast } = useToast();
  const searchParametersAuditLog = [{ entity: nameEntity, entity_id: id }];

  const { disableLoading, activeLoading } = useLoading();

  useEffect(() => {
    async function loadCategory(): Promise<void> {
      activeLoading();
      try {
        const response = await api.get<ProductCategorytData>(
          apiList(location.state.id),
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

  return (
    <>
      <Container
        pageTitle={namePageTitle}
        portletTitle={nameActions.read.name}
        breadcrumb={breadcrumbView}
        tools={[
          toolsViewUpdate(String(id)),
          toolsViewDelete(),
          toolsViewCreate(),
          toolsViewList(),
        ]}
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
                {[
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
                  </Tab>,
                ]}
              </Tabs>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default View;
