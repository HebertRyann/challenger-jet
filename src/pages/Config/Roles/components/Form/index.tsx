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

type IsOpenInModalProps = {
  idParent: number
  handleOnClose: () => void
}

type TypesFormProps = {
  initialValues?: {
    idUpdate: number
    idParentUpdate?: string
    name: string
    description: string
  }
  isOpenInModal?: false | IsOpenInModalProps
  typeForm: 'create' | 'update'
}

export const FormRoles = ({
  isOpenInModal,
  typeForm,
  initialValues
}: TypesFormProps): JSX.Element => {
  const formRef = useRef<FormHandles>(null)
  const [name, setName] = useState<string>()
  const [description, setDescription] = useState<string>()

  const { addToast } = useToast()
  const history = useHistory()
  const { updateDataTable } = useUpdateDataTable()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {
    setName(initialValues?.name)
    setDescription(initialValues?.description)
  }, [initialValues, isOpenInModal, typeForm])

  const { activeLoading, disableLoading } = useLoading()

  const onSubmitForm = async () => {
    const data = {
      name,
      description
    }

    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        description: Yup.string().required('Descrição obrigatória')
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
          const id = initialValues?.idUpdate
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
          <div className="form-content col-md-3">
            <Input
              onChange={e => setName(e.target.value)}
              value={name}
              name="name"
              className="form-control"
              label="Nome"
            />
            <Input
              onChange={e => setDescription(e.target.value)}
              value={description}
              name="description"
              className="form-control"
              label="Description"
            />
            <Input name="id" style={{ display: 'none' }} />
          </div>
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
