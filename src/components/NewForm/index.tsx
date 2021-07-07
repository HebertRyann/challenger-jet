import React, { InputHTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'

export function Form({ defaultValues, children, onSubmit }: any) {
  const { handleSubmit, register } = useForm({ defaultValues })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map(child => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name
                  }
                })
              : child
          })
        : children}
    </form>
  )
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  register: (name: string) => void
  name: string
}

export function Input({ register, name, ...rest }: InputProps) {
  return <input {...register(name)} {...rest} />
}

export function Select({ register, options, name, ...rest }: any) {
  return (
    <select {...register(name)} {...rest}>
      {options.map((value: any) => (
        <option key={Math.random()} value={value}>
          {value}
        </option>
      ))}
    </select>
  )
}
