import React, { createContext, useContext } from 'react'
import {
  useForm,
  FormProvider as FormContextRHF,
  useWatch,
  UseFormGetValues,
  UseFormSetValue
} from 'react-hook-form'
import { FormState } from './types'

type FormContextType = {
  control: any
  errors: any
  getValues: UseFormGetValues<FormState>
  setValue: UseFormSetValue<FormState>
}

const FormContext = createContext<FormContextType>({} as FormContextType)

type FormProviderType = {
  children: JSX.Element
}

export const FormProvider = ({ children }: FormProviderType): JSX.Element => {
  const methods = useForm<FormState>()
  const { handleSubmit, control, formState, getValues, setValue } = methods
  const errors = formState.errors

  const changeSelectProductType = useWatch({
    control,
    name: 'overview.typeProduct'
  })

  const changeSelectHasVariationType = useWatch({
    control,
    name: 'overview.hasVariation'
  })

  console.log(changeSelectProductType, changeSelectHasVariationType)

  const onSubmit = (data: FormState) => {
    console.log(data)
  }

  return (
    <FormContext.Provider value={{ control, errors, getValues, setValue }}>
      <div>
        <FormContextRHF {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {children}
            <button type="submit">Enviar</button>
          </form>
        </FormContextRHF>
      </div>
    </FormContext.Provider>
  )
}

export const useFormApplication = (): FormContextType => {
  const context = useContext(FormContext)
  if (!context) throw new Error('Context form context not found')
  return context
}
