import React, { SelectHTMLAttributes } from 'react'
import { Container, Loading } from './styles'

export type TypeErrorSelect = {
  isError: boolean
  descriptionError?: string
}

export interface TypeNewSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: TypeErrorSelect
  children?: JSX.Element[]
  isSelected?: string
  loading?: boolean
}

export const NewSelect = ({
  children,
  error,
  isSelected,
  loading,
  ...props
}: TypeNewSelectProps): JSX.Element => {
  return (
    <Container className="selectdiv" isError={error?.isError}>
      <select className="form-control" {...props}>
        <option
          style={{ display: 'none' }}
          className="disabled"
          disabled
          selected
        >
          {isSelected || 'selecione'}
        </option>
        {children}
      </select>
      {loading && <Loading />}
      {error?.descriptionError && <label>{error.descriptionError}</label>}
    </Container>
  )
}
