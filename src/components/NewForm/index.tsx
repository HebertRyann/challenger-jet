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
  register?: UseFormRegister<any>
  name: string
}

export function Input({ register, name, ...rest }: InputProps) {
  return <input {...(register && register(name))} {...rest} />
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  register?: UseFormRegister<any>
  options: any[]
  name: string
}

export function Select({ register, options, name, ...rest }: SelectProps) {
  return (
    <select {...(register && register(name))} {...rest}>
      {options.map((value: any) => (
        <option key={Math.random()} value={value}>
          {value}
        </option>
      ))}
    </select>
  )
}
