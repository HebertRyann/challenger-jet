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
import { CustomSelect } from './styles'

type IsOpenInModalProps = {
  idParent: number
  handleOnClose: () => void
}

type TypesFormProps = {
  isOpenInModal?: false | IsOpenInModalProps
  initialValues?: {
    idUpdate: number
    name?: string
    type?: 'cake' | 'front'
    controller?: string
    method?: string
    action?: string
    idParentUpdate?: string
  }
  typeForm: 'create' | 'update'
}

export const FormMenu = ({
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
  const [controller, setController] = useState<string>()
  const [method, setMethod] = useState<string>()
  const [action, setAction] = useState<string>()
  const [type, setType] = useState<'cake' | 'front' | undefined>()

  useEffect(() => {
    if (typeForm !== 'create' && initialValues) {
      setId(initialValues.idUpdate)
      setName(initialValues.name)
      setController(initialValues.controller)
      setMethod(initialValues.method)
      setAction(initialValues.action)
      setType(initialValues.type)
    }
  }, [isOpenInModal, typeForm, initialValues])

  const { activeLoading, disableLoading } = useLoading()

  const onSubmitForm = async () => {
    const data = {
      name,
      type,
      controller,
      method,
      action
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
          <div className="form-content col-md-3">
            <Input name="id" value={id} style={{ display: 'none' }} />
            <Input
              name="name"
              className="form-control"
              label="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <CustomSelect>
              <label htmlFor="">Type</label>
              <NewSelect
                value={type}
                onChange={e => setType(e.target.value as 'cake' | 'front')}
                name="type"
                id="type"
              >
                <option selected value="cake">
                  cake
                </option>
                <option value="front">front</option>
              </NewSelect>
            </CustomSelect>
            <Input
              name="controller"
              className="form-control"
              label="Controller"
              value={controller}
              onChange={e => setController(e.target.value)}
            />
            <Input
              name="method"
              className="form-control"
              label="Method"
              value={method}
              onChange={e => setMethod(e.target.value)}
            />
            <Input
              name="action"
              className="form-control"
              label="Action"
              value={action}
              onChange={e => setAction(e.target.value)}
            />
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
