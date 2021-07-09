import React, {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useEffect
} from 'react'
import { useForm, UseFormRegister } from 'react-hook-form'

export function Form({ defaultValues, children, onSubmit }: any) {
  const { handleSubmit, register, reset } = useForm({ defaultValues })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  type ReactChild = {
    props: {
      children: any
      type: { name: string }
    }
    type: any
  }

  function registeredInput(child: any) {
    return React.createElement(child.type, {
      ...{
        ...child.props,
        register,
        key: child.props.name
      }
    })
  }

  function buildChildren(children: any): any {
    if (Array.isArray(children)) {
      return children.map((child: ReactChild) => {
        if (!React.isValidElement(child)) {
          return child
        }
        if (child.props.children) {
          const childCopy = React.cloneElement(child, {
            children: buildChildren(child.props.children)
          })
          return childCopy
        }
        return child.type?.name === 'Input' || child.type?.name === 'Select'
          ? registeredInput(child)
          : child
      })
    }
    if (children.props?.children) {
      const childCopy = React.cloneElement(children, {
        children: buildChildren(children.props.children)
      })
      return childCopy
    }
    return children.type?.name === 'Input' || children.type?.name === 'Select'
      ? registeredInput(children)
      : children
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
