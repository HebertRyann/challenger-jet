import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../../../../services/api'
import { useToast } from '../../../../../hooks/toast'
import { useLoading } from '../../../../../hooks/loading'
import { useUpdateDataTable } from '../../../../../hooks/dataTable'
import { apiCreate, apiUpdate } from '../../domain/api'
import { nameActions } from '../../domain/info'

import Button from '../../../../../components/Button'
import Form, { Input, Select } from '../../../../../components/Form'
import { FormContent } from './styles'

type IsOpenInModalProps = {
  idParent: number
  handleOnClose: () => void
}

type MenuData = {
  name?: string
  type?: 'cake' | 'front'
  controller?: string
  method?: string
  action?: string
}

type TypesFormProps = {
  isOpenInModal?: false | IsOpenInModalProps
  initialValues?: MenuData & {
    idUpdate: number
  }
  typeForm: 'create' | 'update'
}

export const FormMenu = ({
  isOpenInModal,
  initialValues,
  typeForm
}: TypesFormProps): JSX.Element => {
  const { addToast } = useToast()
  const history = useHistory()
  const { updateDataTable } = useUpdateDataTable()
  const [defaultValues, setDefaultValues] = useState<MenuData>()

  const [id, setId] = useState<number>()

  useEffect(() => {
    if (initialValues) {
      setId(initialValues.idUpdate)
      setDefaultValues({
        name: initialValues.name,
        controller: initialValues.controller,
        method: initialValues.method,
        action: initialValues.action,
        type: initialValues.type
      })
    }
  }, [initialValues])

  const { activeLoading, disableLoading } = useLoading()

  const onSubmitForm = async (data: MenuData) => {
    try {
      if (typeForm === 'create') {
        if (isOpenInModal) {
          const { handleOnClose, idParent } = isOpenInModal
          const dataCreate = {
            ...data,
            parent_id: idParent
          }
          activeLoading()
          try {
            await api.post(apiCreate(), dataCreate)
            handleOnClose()
            disableLoading()
            updateDataTable()
            addToast({
              type: 'success',
              title: 'Registro criado',
              description: 'Registro criado com sucesso'
            })
          } catch (error) {
            addToast({
              type: 'error',
              title: 'Erro ao adicionar o registro',
              description:
                'Ocorreu um erro ao fazer cadastro, por favor, tente novamente.'
            })
            handleOnClose()
            disableLoading()
            updateDataTable()
          }
        } else {
          try {
            const dataCreate = {
              ...data
            }
            activeLoading()
            await api.post(apiCreate(), dataCreate)
            disableLoading()
            updateDataTable()
            addToast({
              type: 'success',
              title: 'Registro criado',
              description: 'Registro criado com sucesso'
            })
            history.push(nameActions.read.to)
          } catch (error) {
            addToast({
              type: 'error',
              title: 'Erro ao adicionar o registro',
              description:
                'Ocorreu um erro ao fazer cadastro, por favor, tente novamente.'
            })
            disableLoading()
            updateDataTable()
          }
        }
      } else {
        if (isOpenInModal) {
          const { handleOnClose } = isOpenInModal
          const dataUpdate = {
            ...data
          }

          try {
            activeLoading()
            await api.put(apiUpdate(String(id)), dataUpdate)
            updateDataTable()
            disableLoading()
            handleOnClose()
            addToast({
              type: 'success',
              title: 'Registro atualizado',
              description: 'Registro alterado com sucesso'
            })
          } catch (error) {
            disableLoading()
            handleOnClose()
            addToast({
              type: 'error',
              title: 'Erro ao atualizar o registro',
              description:
                'Ocorreu um erro ao fazer a atualização, por favor, tente novamente.'
            })
          }
        } else {
          const dataUpdate = {
            ...data
          }

          try {
            activeLoading()
            await api.put(apiUpdate(String(id)), dataUpdate)
            updateDataTable()
            disableLoading()
            history.push(nameActions.read.to)
            addToast({
              type: 'success',
              title: 'Registro atualizado',
              description: 'Registro alterado com sucesso'
            })
          } catch (error) {
            history.push(nameActions.read.to)
            addToast({
              type: 'error',
              title: 'Erro ao atualizar o registro',
              description:
                'Ocorreu um erro ao fazer a atualização, por favor, tente novamente.'
            })
          }
        }
      }
      disableLoading()
    } catch (err) {
      if (typeForm === 'create') {
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer cadastro, por favor, tente novamente.'
        })
        if (isOpenInModal) isOpenInModal.handleOnClose()
      }
    }
  }

  return (
    <Form onSubmit={onSubmitForm} defaultValues={defaultValues}>
      <>
        <div className="row">
          <FormContent modal={!!isOpenInModal}>
            <Input
              name="name"
              className="form-control"
              label="Nome"
              rules={{ required: true }}
            />
            <Select
              name="type"
              label="Type"
              options={[
                { value: 'cake', name: 'cake' },
                { value: 'front', name: 'front' }
              ]}
            />
            <Input
              name="controller"
              className="form-control"
              label="Controller"
            />
            <Input name="method" className="form-control" label="Method" />
            <Input name="action" className="form-control" label="Action" />
          </FormContent>
        </div>
        {isOpenInModal && typeForm === 'create' ? (
          <hr className="divider" />
        ) : (
          <div style={{ margin: '10px 0' }} />
        )}
        <div className="form-actions right">
          {isOpenInModal && (
            <button
              onClick={isOpenInModal.handleOnClose}
              type="reset"
              className="btn btn-default btn-sm sbold uppercase"
            >
              Fechar
            </button>
          )}
          <Button type="submit" className="btn dark btn-sm sbold uppercase">
            Salvar
          </Button>
        </div>
      </>
    </Form>
  )
}
