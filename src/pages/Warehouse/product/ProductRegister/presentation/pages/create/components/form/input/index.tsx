import React, { InputHTMLAttributes } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { NewInput } from '../../../../../../../../../../components/NewInput'
import { useFormApplication } from '../../../../../providers/form/FormProvider'
import { genericMaskNumber } from '../../../../../utils/mask'

type InputType = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  required?: boolean
  error?: boolean
  isNumber?: boolean
}

export const InputForm = ({
  name,
  required,
  error,
  isNumber,
  ...rest
}: InputType): JSX.Element => {
  const { register } = useFormContext()

  return (
    <NewInput
      {...rest}
      isNumber={isNumber}
      key={Math.random()}
      error={{ isError: !!error }}
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
