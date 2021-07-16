import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../../../../services/api'
import { useToast } from '../../../../../hooks/toast'
import { useLoading } from '../../../../../hooks/loading'
import { useUpdateDataTable } from '../../../../../hooks/dataTable'
import { apiCreate, apiUpdate } from '../../domain/api'
import { nameActions } from '../../domain/info'

import Form, { Input } from '../../../../../components/Form'
import Button from '../../../../../components/Button'
import { FormContent } from './styles'

type RoleData = {
  name: string
  description: string
}

type TypesFormProps = {
  initialValues?: RoleData & {
    idUpdate: number
  }
  typeForm: 'create' | 'update'
}

export const FormRoles = ({
  typeForm,
  initialValues
}: TypesFormProps): JSX.Element => {
  const { addToast } = useToast()
  const history = useHistory()
  const { updateDataTable } = useUpdateDataTable()
  const [defaultValues, setDefaultValues] = useState<RoleData>()
  const { activeLoading, disableLoading } = useLoading()

  useEffect(() => {
    if (initialValues) {
      setDefaultValues({
        name: initialValues.name,
        description: initialValues.description
      })
    }
  }, [initialValues])

  const onSubmit = async (data: RoleData) => {
    try {
      if (typeForm === 'create') {
        try {
          const dataCreate = {
            ...data
          }
          activeLoading()
          await api.post(apiCreate(), dataCreate)
          disableLoading()
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
      } else {
        const dataUpdate = {
          ...data
        }
        const id = initialValues?.idUpdate

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
      disableLoading()
    } catch (err) {
      if (typeForm === 'create') {
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer cadastro, por favor, tente novamente.'
        })
      }
    }
  }

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <div className="row">
        <FormContent>
          <Input
            label="Nome"
            name="name"
            className="form-control"
            rules={{ required: true }}
          />
          <Input
            label="Descrição"
            name="description"
            className="form-control"
            rules={{ required: true }}
          />
        </FormContent>
      </div>
      <div className="form-actions right">
        <Button type="submit" className="btn dark btn-sm sbold uppercase">
          Salvar
        </Button>
      </div>
    </Form>
  )
}
