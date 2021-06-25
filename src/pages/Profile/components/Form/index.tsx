import React, { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import api from '../../../../services/api'
import getValidationErrors from '../../../../utlis/getValidationErros'
import FormComponent from '../../../../components/Form'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import { FormHandles } from '@unform/core'
import { useToast } from '../../../../hooks/toast'
import { useLoading } from '../../../../hooks/loading'
import { apiUpdate } from '../../domain/api'
import {
  FormProfileContainer,
  ChangePasswordContainer,
  FormProfileWrapper
} from './styles'
import { useAuth } from '../../../../hooks/auth'

type TypesFormProps = {
  initialValues?: {
    name?: string
    email?: string
    username?: string
  }
  typeForm: 'create' | 'update'
}

export const FormProfile = ({
  initialValues,
  typeForm
}: TypesFormProps): JSX.Element => {
  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [oldPassword, setOldPassword] = useState<string>()

  const formRef = useRef<FormHandles>(null)
  const { updateUser } = useAuth()

  const { addToast } = useToast()
  const { activeLoading, disableLoading } = useLoading()

  useEffect(() => {
    if (typeForm !== 'create' && initialValues) {
      setName(initialValues.name)
      setEmail(initialValues.email)
      setUsername(initialValues.username)
    }
  }, [typeForm, initialValues])

  const onSubmitForm = async () => {
    const pass = password === '' ? undefined : password
    const oldPass = oldPassword === '' ? undefined : oldPassword

    const data = {
      name,
      email,
      password: pass,
      old_password: oldPass
    }

    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })

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
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
      }
    }
  }

  return (
    <FormProfileWrapper>
      <FormComponent formRef={formRef} onSubmitForm={onSubmitForm}>
        <>
          <FormProfileContainer className="form-content">
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
            <Input
              name="username"
              className="form-control"
              label="Usuário"
              value={username}
              disabled={true}
              onChange={e => setUsername(e.target.value)}
            />
          </FormProfileContainer>
          <ChangePasswordContainer>
            <h4>Mudar Senha</h4>
            <Input
              type="password"
              name="old_password"
              className="form-control"
              label="Senha Atual"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              className="form-control"
              label="Nova Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </ChangePasswordContainer>
          <div className="form-actions right" style={{ paddingBottom: '0px' }}>
            <Button type="submit" className="btn dark btn-sm sbold uppercase">
              Salvar
            </Button>
          </div>
        </>
      </FormComponent>
    </FormProfileWrapper>
  )
}
