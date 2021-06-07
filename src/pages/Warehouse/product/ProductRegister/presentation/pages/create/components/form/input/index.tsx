import React from 'react'
import { useFormContext } from 'react-hook-form'

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

  console.log(name)

  return (
    <input
      className={error ? 'form-control error' : 'form-control'}
      key={Math.random()}
      {...register(name, { required })}
    />
  )
}
