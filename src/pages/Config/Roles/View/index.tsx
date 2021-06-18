import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import Container from '../../../../components/Container'
import Tabs from '../../../../components/Tabs'
import Tab from '../../../../components/Tabs/Tab'
import DataTable from '../../../../components/DataTable'
import api from '../../../../services/api'
import { useToast } from '../../../../hooks/toast'
import { useLoading } from '../../../../hooks/loading'
import { Alert } from '../../../../components/Alert'
import { nameEntity, namePageTitle } from '../domain/info'
import { apiDelete, apiList } from '../domain/api'
import { breadcrumbView } from '../domain/breadcrumb'
import {
  toolsViewCreate,
  toolsViewDelete,
  toolsViewUpdate,
  toolsViewList
} from '../domain/tools'

interface RoleData {
  id: number
  parent_id: number | null
  name: string
  description: string
  created_at: string
  updated_at: string
}

const RolesView: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const location = useLocation<{ id: string; value: string }>()
  const [role, setRole] = useState<RoleData | null>(null)
  const { addToast } = useToast()
  const searchParametersAuditLog = [{ entity: nameEntity, entity_id: id }]
  const [alert, setIsActiveAlert] = useState<{
    isActive: boolean
    id: number
    name: string
  }>({
    id: 0,
    isActive: false,
    name: ''
  })

  const { disableLoading, activeLoading } = useLoading()

  useEffect(() => {
    async function loadRole(): Promise<void> {
      activeLoading()
      try {
        const response = await api.get<RoleData>(apiList(location.state.id))
        const { data } = response
        setRole(data)
        disableLoading()
      } catch (err) {
        disableLoading()
        addToast({
          type: 'error',
          title: 'Error ao carregar o Grupo de usuário',
          description:
            'Houve um error ao carregar o grupo, tente novamente mais tarde!'
        })
      }
    }
    loadRole()
  }, [addToast, activeLoading, disableLoading])

  const handlerClickButtonCancellAlert = () => {
    setIsActiveAlert({
      id: 0,
      isActive: false,
      name: ''
    })
    addToast({
      type: 'info',
      title: 'Operação cancelada.'
    })
  }

  const handlerClickButtonConfirmAlert = async (id: string) => {
    try {
      await api.delete(apiDelete(id))
      setIsActiveAlert({
        id: 0,
        isActive: false,
        name: ''
      })
      addToast({
        type: 'success',
        title: 'Atributo removido com sucesso.'
      })
    } catch (err) {
      setIsActiveAlert({
        id: 0,
        isActive: false,
        name: ''
      })
      addToast({
        type: 'error',
        title: 'Atributo não removido, pois ainda está sendo usada.'
      })
    }
  }

  const [alertRemoveParent, setAlertRemoveParent] = useState(false)

  const handleOnClickRemoveParent = () => {
    setAlertRemoveParent(true)
  }

  const handlerOnClickButtonConfirmRemoveParent = async (id: number) => {
    try {
      await api.delete(apiDelete(String(id)))
      setAlertRemoveParent(false)
      addToast({
        type: 'success',
        title: 'Atributo removido com sucesso.'
      })
      history.goBack()
    } catch (err) {
      setAlertRemoveParent(false)
      addToast({
        type: 'error',
        title: 'Atributo não removido, pois ainda está sendo usada.'
      })
    }
  }

  const handlerOnClickButtonCancelRemoveParent = () => {
    setAlertRemoveParent(false)
  }

  return (
    <>
      <Container
        pageTitle={namePageTitle}
        portletTitle={'Visualizar'}
        breadcrumb={breadcrumbView}
        tools={[
          toolsViewUpdate(String(id)),
          toolsViewDelete(() => {
            handleOnClickRemoveParent()
          }),
          toolsViewCreate(),
          toolsViewList()
        ]}
      >
        <div className="form-body">
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="id" className="control-label">
                  Cód.
                </label>
                <p>{role?.id}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="name" className="control-label">
                  Nome
                </label>
                <p>{role?.name}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="created" className="control-label">
                  Cadastrado em
                </label>
                <p>{role?.created_at}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="updated" className="control-label">
                  Atualizado em
                </label>
                <p>{role?.updated_at}</p>
              </div>
            </div>
          </div>
          <p>&nbsp;</p>
          <div className="row">
            <div className="col-md-12">
              <Tabs>
                {[
                  <Tab key={Math.random()} title="Histórico">
                    <div className="portlet light">
                      <div className="portlet-title">
                        <div className="caption">Listagem</div>
                        <div className="tools"></div>
                      </div>
                      <div className="portlet-body form">
                        <DataTable
                          entityId={id}
                          format={{ orderBy: '' }}
                          source="auditLogs"
                          entity="AuditLog"
                          searchParameters={searchParametersAuditLog}
                        />
                      </div>
                    </div>
                  </Tab>
                ]}
              </Tabs>
            </div>
          </div>
        </div>
      </Container>
      <Alert
        message={`Tem certeza que deseja excluir o registro ${alert.name} ?`}
        onClickCancellButton={handlerClickButtonCancellAlert}
        onClickConfirmButton={() => {
          handlerClickButtonConfirmAlert(String(alert.id))
        }}
        isActive={alert.isActive}
      />
      <Alert
        message={`Tem certeza que deseja excluir o registro ${role?.name} ?`}
        onClickCancellButton={handlerOnClickButtonCancelRemoveParent}
        onClickConfirmButton={() =>
          handlerOnClickButtonConfirmRemoveParent(Number(role?.id))
        }
        isActive={alertRemoveParent}
      />
    </>
  )
}

export default RolesView
