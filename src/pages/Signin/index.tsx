import React, { useCallback, useRef } from 'react'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import getValidationErros from '../../utlis/getValidationErros'
import logoImg from '../../assets/logo-multfluxo.png'
import { Contanier, Content } from './styles'
import Form, { Input } from '../../components/Form'
import { ButtonPrimary } from '../../components/Button'

interface SingInFormData {
  username: string
  password: string
}

const SignUp = (): JSX.Element => {
  const formRef = useRef<FormHandles>(null)

  const { signIn } = useAuth()
  const { addToast } = useToast()
  const history = useHistory()

  const onSubmit = useCallback(
    async (data: SingInFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          username: Yup.string().required('Usuário obrigatório'),
          password: Yup.string().min(6, 'Senha obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await signIn({
          username: data.username,
          password: data.password
        })

        history.push('/dashboard')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err)
          formRef.current?.setErrors(erros)
          return
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Confira seus dados de acesso.'
        })
      }
    },
    [signIn, addToast, history]
  )

  return (
    <Contanier>
      <Content>
        <div className="logo">
          <a href="#ss">
            <img className="logo-light" src={logoImg} alt="" width="200px" />
          </a>
        </div>
        <div className="content">
          <Form onSubmit={onSubmit} className="login-form">
            <h3 className="form-title font-dark">Autenticação</h3>
            <Input
              className="form-control form-control-solid placeholder-no-fix input"
              autoComplete="off"
              placeholder="Usuário"
              name="username"
              rules={{ required: true }}
            />
            <Input
              className="form-control form-control-solid placeholder-no-fix"
              type="password"
              autoComplete="off"
              placeholder="Senha"
              name="password"
              rules={{ required: true }}
            />
            <div className="form-actions">
              <ButtonPrimary type="submit">Entrar</ButtonPrimary>
              <div>
                <label
                  htmlFor="remember"
                  className="rememberme check mt-checkbox mt-checkbox-outline"
                >
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember_me"
                    value="1"
                  />
                  Me lembre
                  <span />
                </label>
              </div>
            </div>
          </Form>
        </div>
      </Content>
    </Contanier>
  )
}
export default SignUp