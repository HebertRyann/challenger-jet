import React, { useEffect, useState } from 'react'
import api from '../../../../../services/api'
import Form, { Input, Select } from '../../../../../components/Form'
import Button from '../../../../../components/Button'
import { useHistory } from 'react-router-dom'
import { useToast } from '../../../../../hooks/toast'
import { useLoading } from '../../../../../hooks/loading'
import { useUpdateDataTable } from '../../../../../hooks/dataTable'
import { apiCreate, apiUpdate } from '../../domain/api'
import { nameActions } from '../../domain/info'
import { FormContainer } from './styles'

type IsOpenInModalProps = {
  idParent: number
  handleOnClose: () => void
}

type UserData = {
  name?: string
  role_id?: string
  email?: string
  username?: string
  password?: string
  active?: boolean
}

type TypesFormProps = {
  isOpenInModal?: false | IsOpenInModalProps
  initialValues?: UserData & {
    idUpdate: number
  }
  typeForm: 'create' | 'update'
}

type Role = {
  id: number
  name: string
}

export const FormUser = ({
  isOpenInModal,
  initialValues,
  typeForm
}: TypesFormProps): JSX.Element => {
  const { addToast } = useToast()
  const history = useHistory()
  const { updateDataTable } = useUpdateDataTable()

  const [defaultValues, setDefaultValues] = useState<UserData>()

  const [roles, setRoles] = useState<{ value: number; name: string }[]>([
    { value: 0, name: '' }
  ])

  useEffect(() => {
    if (initialValues) {
      setDefaultValues({
        name: initialValues.name,
        email: initialValues.email,
        username: initialValues.username,
        role_id: initialValues.role_id,
        active: initialValues.active
      })
    }
  }, [initialValues])

  const { activeLoading, disableLoading } = useLoading()

  async function getRoles() {
    const roles = (await api.get('/roles/')).data
    const rolesSelect = roles?.map((role: Role) => ({
      value: role.id,
      name: role.name
    }))
    setRoles(rolesSelect)
  }

  useEffect(() => {
    getRoles()
  }, [])

  const onSubmitForm = async (data: UserData) => {
    const id = initialValues?.idUpdate
    if (data.active) {
      data = {
        ...data,
        active: JSON.parse(String(data.active))
      }
    }
    console.log(data)

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
          <FormContainer className="form-content">
            <Input
              name="name"
              className="form-control"
              label="Nome"
              rules={{ required: true }}
            />
            <Input
              name="email"
              className="form-control"
              label="Email"
              rules={{ required: true }}
            />
            <Select name="role_id" label="Role" options={roles} />
            <Input
              name="username"
              className="form-control"
              label="Username"
              rules={{ required: true }}
            />
            <Input
              type="password"
              name="password"
              className="form-control"
              label="Senha"
              rules={{ required: true }}
            />
            <Select
              name="active"
              label="Ativo"
              options={[
                { value: 'true', name: 'Sim' },
                { value: 'false', name: 'Não' }
              ]}
            />
          </FormContainer>
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
