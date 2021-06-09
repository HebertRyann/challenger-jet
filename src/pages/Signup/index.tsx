import React, { useCallback, useRef } from 'react'
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'

import { useToast } from '../../hooks/toast'
import api from '../../services/api'
import getValidationErros from '../../utlis/getValidationErros'
import logoImg from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Contanier, Content, Background } from './styles'

interface SigUpFormData {
  name: string
  email: string
  password: string
}

const Signup: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: SigUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .required('E-mail Obrigatório')
            .email('Digite um e-mail valido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await api.post('/users', data)

        history.push('/')

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode realizar seu logon no Gobaber'
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err)
          formRef.current?.setErrors(erros)
          return
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer seu cadastro. Tente novamente.'
        })
      }
    },
    [addToast, history]
  )

  return (
    <Contanier>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBaber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
        <Link to="/">
          <FiArrowLeft />
          Voltar para logon
        </Link>
      </Content>
    </Contanier>
  )
}
export default Signup
