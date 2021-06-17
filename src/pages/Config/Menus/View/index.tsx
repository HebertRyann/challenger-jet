import React, { useEffect, useRef, useState } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { FormMenu } from '../components/Form'
import Container from '../../../../components/Container'
import Tabs from '../../../../components/Tabs'
import Tab from '../../../../components/Tabs/Tab'
import DataTable from '../../../../components/DataTable'
import api from '../../../../services/api'
import { useToast } from '../../../../hooks/toast'
import Modal from '../../../../components/Modal'
import { useLoading } from '../../../../hooks/loading'
import { Alert } from '../../../../components/Alert'
import { useUpdateDataTable } from '../../../../hooks/dataTable'
import {
  nameActions,
  nameEntity,
  namePageTitle,
  nameSource
} from '../domain/info'
import { apiDelete, apiList } from '../domain/api'
import { headers } from '../domain/headers'
import { breadcrumbView } from '../domain/breadcrumb'
import {
  toolsViewCreate,
  toolsViewDelete,
  toolsViewUpdate,
  toolsViewList
} from '../domain/tools'

interface MenuData {
  id: number
  parent_id: number | null
  name: string
  type: 'cake' | 'front'
  controller: string
  method: string
  action: string
  created_at: string
  updated_at: string
}

const MenuView = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const location = useLocation<{ id: string; value: string }>()
  const { updateDataTable } = useUpdateDataTable()
  const [menu, setMenu] = useState<MenuData | null>(null)
  const { addToast } = useToast()
  const [alert, setIsActiveAlert] = useState<{
    isActive: boolean
    id: number
    name: string
  }>({
    id: 0,
    isActive: false,
    name: ''
  })

  const [currentItemUpdate, setCurrentItemUpdate] = useState<MenuData>(
    {} as MenuData
  )

  const [modalEdit, setModalEdit] = useState(false)
  const [modalCreate, setModalCreate] = useState(false)

  const handleClickOnClose = () => {
    setModalCreate(false)
    setModalEdit(false)
    updateDataTable()
  }
  const handlerOnClickButtonEditInCurrentRow = (currentValue: MenuData) => {
    setCurrentItemUpdate(currentValue)
    setModalEdit(true)
  }

  const handleClickOnOpenModalCreate = () => {
    setModalCreate(true)
  }

  const refModal = useRef(null)
  const { disableLoading, activeLoading } = useLoading()

  useEffect(() => {
    async function loadCategory(): Promise<void> {
      activeLoading()
      try {
        const response = await api.get<MenuData>(apiList(location.state.id))
        const { data } = response
        setMenu(data)
        disableLoading()
      } catch (err) {
        disableLoading()
        addToast({
          type: 'error',
          title: 'Error ao carregar a categoria',
          description:
            'Houve um error ao carregar a categoria, tente novamente mais tarde!'
        })
      }
    }
    loadCategory()
  }, [activeLoading, addToast, disableLoading])

  const handlerOnClickButtonRemoveInCurrentRow = ({ id, name }: MenuData) => {
    setIsActiveAlert({ id, name, isActive: true })
  }

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
        portletTitle={nameActions.read.name}
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
                <p>{menu?.id}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="name" className="control-label">
                  Nome
                </label>
                <p>{menu?.name}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="created" className="control-label">
                  Cadastrado em
                </label>
                <p>{menu?.created_at}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="updated" className="control-label">
                  Atualizado em
                </label>
                <p>{menu?.updated_at}</p>
              </div>
            </div>
          </div>
          <p>&nbsp;</p>
          <div className="row">
            <div className="col-md-12">
              <Tabs>
                <Tab title="Submenus">
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
                        format={{ orderBy: 'name' }}
                        source={nameSource}
                        entity={nameEntity}
                        headers={headers}
                        parentId={id}
                        onActions={{
                          onClickButtonEdit:
                            handlerOnClickButtonEditInCurrentRow,
                          onClickButtonRemove:
                            handlerOnClickButtonRemoveInCurrentRow
                        }}
                      />
                    </div>
                  </div>
                </Tab>
                <Tab title="Histórico">
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
        isOpenModal={modalCreate}
        pageTitle={'Adicionar'}
        Children={
          <FormMenu
            typeForm="create"
            isOpenInModal={{
              handleOnClose: handleClickOnClose,
              idParent: Number(id)
            }}
          />
        }
      />
      <Modal
        refModal={refModal}
        onClickButtonCancel={handleClickOnClose}
        isOpenModal={modalEdit}
        pageTitle={'Editar'}
        Children={
          <FormMenu
            typeForm="update"
            initialValues={{
              idUpdate: currentItemUpdate.id,
              name: currentItemUpdate.name,
              type: currentItemUpdate.type,
              controller: currentItemUpdate.controller,
              method: currentItemUpdate.method,
              action: currentItemUpdate.action
            }}
            isOpenInModal={{
              handleOnClose: handleClickOnClose,
              idParent: Number(id)
            }}
          />
        }
      />
      <Alert
        message={`Tem certeza que deseja excluir o registro ${alert.name} ?`}
        onClickCancellButton={handlerClickButtonCancellAlert}
        onClickConfirmButton={() => {
          handlerClickButtonConfirmAlert(String(alert.id))
        }}
        isActive={alert.isActive}
      />
      <Alert
        message={`Tem certeza que deseja excluir o registro ${menu?.name} ?`}
        onClickCancellButton={handlerOnClickButtonCancelRemoveParent}
        onClickConfirmButton={() =>
          handlerOnClickButtonConfirmRemoveParent(Number(menu?.id))
        }
        isActive={alertRemoveParent}
      />
    </>
  )
}

export default MenuView
