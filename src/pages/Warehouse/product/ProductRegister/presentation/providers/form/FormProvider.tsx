import React, { createContext, useContext } from 'react'
import {
  useForm,
  FormProvider as FormContextRHF,
  useWatch
} from 'react-hook-form'

type FormContextType = {
  control: any
  errors: any
}

const FormContext = createContext<FormContextType>({} as FormContextType)

type FormProviderType = {
  children: JSX.Element
}

export const FormProvider = ({ children }: FormProviderType): JSX.Element => {
  const methods = useForm()
  const { handleSubmit, control, formState } = methods
  const errors = formState.errors

  const typeProductSelected = useWatch({
    control,
    name: 'overview.selectTypeProduct'
  })

  console.log(typeProductSelected)

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <FormContext.Provider value={{ control, errors }}>
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
