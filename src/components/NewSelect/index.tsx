import React, { SelectHTMLAttributes } from 'react'
import { Container } from './styles'
import loadingSvg from '../../assets/image/svg/loading.svg'

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
      {loading && (
        <img className="loading" alt="image-loading" src={loadingSvg} />
      )}
      {error?.descriptionError && <label>{error.descriptionError}</label>}
    </Container>
  )
}
