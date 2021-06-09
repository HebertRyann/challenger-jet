import React, { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import api from '../../../../../../services/api'
import getValidationErrors from '../../../../../../utlis/getValidationErros'
import FormComponent from '../../../../../../components/Form'
import Input from '../../../../../../components/Input'
import Button from '../../../../../../components/Button'
import { FormHandles } from '@unform/core'
import { useHistory } from 'react-router-dom'
import { useToast } from '../../../../../../hooks/toast'
import { useLoading } from '../../../../../../hooks/loading'
import { useUpdateDataTable } from '../../../../../../hooks/dataTable'
import { FormDataProtocol } from '../../domain/protocols'
import { apiCreate, apiUpdate } from '../../domain/api'
import { nameActions } from '../../domain/info'

type IsOpenInModalProps = {
  idParent: number
  handleOnClose: () => void
}

type TypesFormProps = {
  valueInput?: string
  isOpenInModal?: false | IsOpenInModalProps
  typeForm:
    | 'create'
    | {
        idUpdate: number
        inputValue: string
        idParentUpdate?: string
      }
}

export const FormCategory = ({
  isOpenInModal,
  typeForm,
  valueInput
}: TypesFormProps): JSX.Element => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, setId] = useState<any>(0)
  const { updateDataTable } = useUpdateDataTable()
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    if (valueInput !== undefined) {
      setInputValue(valueInput)
    }
    if (typeForm.valueOf() !== 'create') {
      setId(typeForm)
      const obj = typeForm as {
        idUpdate: number
        inputValue: string
        idParentUpdate?: string
      }
      formRef.current?.setFieldValue('id', obj.idUpdate)
      formRef.current?.setFieldValue('name', obj.inputValue)
    }
  }, [valueInput, isOpenInModal, typeForm])

  const { activeLoading, disableLoading } = useLoading()

  const onSubmitForm = async (data: FormDataProtocol) => {
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
          const dataCreate: { name: string; parent_id: number } = {
            name: data.name,
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
            const dataCreate: { name: string } = {
              name: data.name
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
          const id = data.id
          const dataUpdate: { name: string } = {
            name: data.name
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
          const dataUpdate: { name: string } = {
            name: data.name
          }
          const id = data.id

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

  useEffect(() => {
    if (typeForm !== 'create') {
      setInputValue(typeForm.inputValue)
    }
  }, [typeForm])

  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.currentTarget.value)
  }
  return (
    <FormComponent formRef={formRef} onSubmitForm={onSubmitForm}>
      <>
        <div className="row">
          <div className="form-content col-md-3">
            <Input
              onChange={handleChangeInputValue}
              value={inputValue}
              name="name"
              className="form-control"
              label="Nome"
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
