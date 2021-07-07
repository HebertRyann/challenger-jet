import React, { ButtonHTMLAttributes } from 'react'

import * as S from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string
  loading?: boolean
}

const Button = ({ children, ...rest }: ButtonProps) => (
  <S.Contanier type="button" {...rest}>
    {children}
  </S.Contanier>
)

export default Button

export const ButtonPrimary = ({ children, loading, ...props }: ButtonProps) => {
  return (
    <S.ContainerButton>
      <button {...props}>
        {loading ? <div className="loading"></div> : children}
      </button>
    </S.ContainerButton>
  )
}
