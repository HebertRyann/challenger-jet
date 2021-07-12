import React, {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useEffect,
  ReactElement
} from 'react'
import { useForm, UseFormRegister } from 'react-hook-form'

export function Form({ defaultValues, children, onSubmit }: any) {
  const { handleSubmit, register, reset } = useForm({ defaultValues })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  function registeredField(child: ReactElement) {
    return React.createElement(child.type, {
      ...{
        ...child.props,
        register,
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

    if (children.props?.children) {
      const childCopy = React.cloneElement(children, {
        key,
        children: buildChildren(children.props.children)
      })
      return childCopy
    }
    return children.props?.name ? registeredField(children) : children
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>{buildChildren(children)}</form>
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
