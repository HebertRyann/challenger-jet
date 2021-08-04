import React, {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useEffect,
  ReactElement
} from 'react'
import {
  Controller,
  RegisterOptions,
  useForm,
  UseFormRegister
} from 'react-hook-form'

import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { Contanier, Error, SelectContanier } from './styles'

export default function Form({ defaultValues, children, onSubmit }: any) {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors }
  } = useForm({ defaultValues })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  function registeredField(child: ReactElement) {
    if (child.props.controlled) {
      return (
        <Controller
          control={control}
          name={child.props.name}
          rules={child.props.rules}
          render={({ field }) => {
            return React.createElement(child.type, {
              ...{
                ...child.props,
                ...field,
                onChange: (e: any) => {
                  field.onChange(e)
                  child.props.onChange && child.props.onChange(e)
                },
                errors,
                key: child.props.name
              }
            })
          }}
        />
      )
    }
    return React.createElement(child.type, {
      ...{
        ...child.props,
        register,
        errors,
        key: child.props.name
      }
    })
  }

  function buildChildren(children: ReactElement, key = 0): any {
    if (Array.isArray(children)) {
      return children.map((child: ReactElement, index) => {
        return buildChildren(child, index)
      })
    }

    if (children?.props?.children) {
      const childCopy = React.cloneElement(children, {
        key,
        children: buildChildren(children.props.children)
      })
      return childCopy
    }
    return children?.props?.name ? registeredField(children) : children
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>{buildChildren(children)}</form>
  )
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegister<any>
  name: string
  rules?: RegisterOptions
  errors?: any
  label?: string
  controlled?: boolean
  icon?: React.ComponentType<IconBaseProps>
}

export function Input({
  register,
  name,
  label,
  icon: Icon,
  rules,
  errors,
  ...rest
}: InputProps) {
  const keys = name.split('.')
  const error = keys.length > 1 ? errors?.[keys[0]]?.[keys[1]] : errors?.[name]

  return (
    <Contanier>
      {Icon && <Icon size={20} />}
      {label && (
        <label htmlFor={name} className="control-label">
          {label}
        </label>
      )}
      <div>
        <input {...(register && register(name, rules))} {...rest} />
        {error?.message && (
          <Error title={error.message}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
        {error?.type === 'required' && (
          <Error title={`O campo ${label} é obrigatório`}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </div>
    </Contanier>
  )
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  register?: UseFormRegister<any>
  options: Array<{
    value: string | number
    name: string | number
  }>
  name: string
  label?: string
  rules?: RegisterOptions
  errors?: any
  controlled?: boolean
  blank?: boolean
}

export function Select({
  register,
  options,
  name,
  label,
  rules,
  errors,
  blank,
  ...rest
}: SelectProps) {
  const keys = name.split('.')
  const error = keys.length > 1 ? errors?.[keys[0]]?.[keys[1]] : errors?.[name]

  return (
    <SelectContanier erro={error}>
      {label && (
        <label htmlFor={name} className="control-label">
          {label}
        </label>
      )}
      <div>
        <select {...(register && register(name, rules))} {...rest}>
          {blank && (
            <option key={Math.random()} disabled selected>
              selecione
            </option>
          )}
          {options.map(option => (
            <option key={Math.random()} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </SelectContanier>
  )
}
