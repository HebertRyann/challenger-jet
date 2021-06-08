import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { NewInput } from '../../../../../../../../../../components/NewInput'
import { useFormApplication } from '../../../../../providers/form/FormProvider'
import { genericMaskNumber } from '../../../../../utils/mask'

type InputType = {
  name: string
  required?: boolean
  error?: boolean
}

export const InputForm = ({
  name,
  required,
  error
}: InputType): JSX.Element => {
  const { register } = useFormContext()

  return (
    <input
      className={error ? 'form-control error' : 'form-control'}
      key={Math.random()}
      {...register(name, { required })}
    />
  )
}

export const InputFormController = ({
  name
}: {
  name: string
}): JSX.Element => {
  const { control, setValue, getValues } = useFormApplication()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <NewInput
            {...field}
            placeholder="0,00"
            value={genericMaskNumber(getValues(name as any))}
            onChange={e => {
              setValue(name as any, genericMaskNumber(e.target.value))
              field.onChange(e.target.value)
            }}
          />
        )
      }}
    />
  )
}
