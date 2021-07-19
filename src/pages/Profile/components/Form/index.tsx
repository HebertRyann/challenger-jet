import React, { useEffect, useState } from 'react'
import api from '../../../../services/api'
import Form, { Input } from '../../../../components/Form'
import Button from '../../../../components/Button'
import { useToast } from '../../../../hooks/toast'
import { useLoading } from '../../../../hooks/loading'
import { apiUpdate } from '../../domain/api'
import {
  FormProfileContainer,
  ChangePasswordContainer,
  FormProfileWrapper
} from './styles'
import { useAuth } from '../../../../hooks/auth'

type ProfileData = {
  name?: string
  email?: string
  username?: string
}
type TypesFormProps = {
  initialValues?: ProfileData
  typeForm: 'create' | 'update'
}

export const FormProfile = ({ initialValues }: TypesFormProps): JSX.Element => {
  const [defaultValues, setDefaultValues] = useState<ProfileData>()

  const { updateUser } = useAuth()

  const { addToast } = useToast()
  const { activeLoading, disableLoading } = useLoading()

  useEffect(() => {
    if (initialValues) {
      setDefaultValues({
        name: initialValues.name,
        email: initialValues.email,
        username: initialValues.username
      })
    }
  }, [initialValues])

  const onSubmitForm = async (data: ProfileData) => {
    try {
      try {
        activeLoading()
        await api.put(apiUpdate(), data)

        disableLoading()
        addToast({
          type: 'success',
          title: 'Perfil atualizado',
          description: 'Perfil alterado com sucesso'
        })
        updateUser()
      } catch (error) {
        const defaultMessage = error.response.data.message
        let displayMessage
        switch (defaultMessage) {
          case 'Old password does not match.':
            displayMessage = 'Senha atual incorreta!'
            break
          case 'You need to inform the old password to set a new password.':
            displayMessage = 'Informe a senha atual para configurar uma nova!'
            break
          case 'E-mail already in use.':
            displayMessage = 'Este email já está sendo utilizado!'
            break
          default:
            displayMessage = 'Erro ao atualizar o perfil. Tente novamente!'
        }

        const validation = error.response.data.validation
        let validationMessage
        if (validation) {
          validationMessage = validation.body.message
          switch (validationMessage) {
            case '"email" must be a valid email':
              displayMessage = 'Email inválido'
              break
            default:
              displayMessage = 'Erro ao atualizar o perfil. Tente novamente!'
          }
        }
        addToast({
          type: 'error',
          title: 'Erro ao atualizar o perfil',
          description: displayMessage
        })
      }
      disableLoading()
    } catch (err) {}
  }

  return (
    <FormProfileWrapper>
      <Form onSubmit={onSubmitForm} defaultValues={defaultValues}>
        <>
          <FormProfileContainer className="form-content">
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
            <Input
              name="username"
              className="form-control"
              label="Usuário"
              disabled={true}
            />
          </FormProfileContainer>
          <ChangePasswordContainer>
            <h4>Mudar Senha</h4>
            <Input
              type="password"
              name="old_password"
              className="form-control"
              label="Senha Atual"
            />
            <Input
              type="password"
              name="password"
              className="form-control"
              label="Nova Senha"
            />
          </ChangePasswordContainer>
          <div className="form-actions right" style={{ paddingBottom: '0px' }}>
            <Button type="submit" className="btn dark btn-sm sbold uppercase">
              Salvar
            </Button>
          </div>
        </>
      </Form>
    </FormProfileWrapper>
  )
}
