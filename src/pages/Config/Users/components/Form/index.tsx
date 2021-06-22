import React, { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import api from '../../../../../services/api'
import getValidationErrors from '../../../../../utlis/getValidationErros'
import FormComponent from '../../../../../components/Form'
import Input from '../../../../../components/Input'
import Button from '../../../../../components/Button'
import { FormHandles } from '@unform/core'
import { useHistory } from 'react-router-dom'
import { useToast } from '../../../../../hooks/toast'
import { useLoading } from '../../../../../hooks/loading'
import { useUpdateDataTable } from '../../../../../hooks/dataTable'
import { apiCreate, apiUpdate } from '../../domain/api'
import { nameActions } from '../../domain/info'
import { NewSelect } from '../../../../../components/NewSelect'
import { CustomSelect, FormContainer } from './styles'

type IsOpenInModalProps = {
  idParent: number
  handleOnClose: () => void
}

type TypesFormProps = {
  isOpenInModal?: false | IsOpenInModalProps
  initialValues?: {
    idUpdate: number
    name?: string
    role_id?: string
    email?: string
    username?: string
    password?: string
    active?: boolean
  }
  typeForm: 'create' | 'update'
}

interface Role {
  id: number
  name: string
}

export const FormUser = ({
  isOpenInModal,
  initialValues,
  typeForm
}: TypesFormProps): JSX.Element => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()
  const { updateDataTable } = useUpdateDataTable()

  const [id, setId] = useState<number>()
  const [name, setName] = useState<string>()
  const [roleId, setRoleId] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [active, setActive] = useState<boolean>()

  const [roles, setRoles] = useState<Role[]>([])

  useEffect(() => {
    if (typeForm !== 'create' && initialValues) {
      setId(initialValues.idUpdate)
      setName(initialValues.name)
      setRoleId(initialValues.role_id)
      setEmail(initialValues.email)
      setUsername(initialValues.username)
      setPassword(initialValues.password)
      setActive(initialValues.active)
    }
  }, [isOpenInModal, typeForm, initialValues])

  const { activeLoading, disableLoading } = useLoading()

  async function getRoles() {
    const roles = (await api.get('/roles/')).data
    setRoles(roles)
  }

  useEffect(() => {
    if (initialValues?.role_id) {
      getRoles()
    }
  }, [initialValues?.role_id])

  const onSubmitForm = async () => {
    const data = {
      name,
      role_id: roleId,
      email,
      username,
      password,
      active
    }

    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })

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
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
        return
      }

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
    <FormComponent formRef={formRef} onSubmitForm={onSubmitForm}>
      <>
        <div className="row">
          <FormContainer className="form-content">
            <Input name="id" value={id} style={{ display: 'none' }} />
            <Input
              name="name"
              className="form-control"
              label="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Input
              name="email"
              className="form-control"
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <CustomSelect>
              <label htmlFor="">Grupo</label>
              <NewSelect
                value={roleId}
                onChange={e => setRoleId(e.target.value)}
                name="role"
                id="role"
              >
                {roles.map(role => (
                  <option key={role.id} selected value={role.id}>
                    {role.name}
                  </option>
                ))}
              </NewSelect>
            </CustomSelect>
            <Input
              name="username"
              className="form-control"
              label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              className="form-control"
              label="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <CustomSelect>
              <label htmlFor="">Ativo</label>
              <NewSelect
                value={active ? 1 : 0}
                onChange={e => setActive(Number(e.target.value) === 1)}
                name="active"
                id="active"
              >
                <option value={1}> Sim </option>
                <option value={0}> Não </option>
              </NewSelect>
            </CustomSelect>
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
    </FormComponent>
  )
}
