import React, {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useEffect,
  ReactElement
} from 'react'
import {
  FieldError,
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
    formState: { errors }
  } = useForm({ defaultValues })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  function registeredField(child: ReactElement) {
    return React.createElement(child.type, {
      ...{
        ...child.props,
        register,
        error: errors[child.props.name],
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
  error?: FieldError
  label?: string
  icon?: React.ComponentType<IconBaseProps>
}

export function Input({
  register,
  name,
  label,
  icon: Icon,
  rules,
  error,
  ...rest
}: InputProps) {
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
  options: any[]
  name: string
  label: string
}

export function Select({
  register,
  options,
  name,
  label,
  ...rest
}: SelectProps) {
  return (
    <SelectContanier>
      {label && (
        <label htmlFor={name} className="control-label">
          {label}
        </label>
      )}
      <div>
        <select {...(register && register(name))} {...rest}>
          {options.map((value: any) => (
            <option key={Math.random()} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </SelectContanier>
  )
}
