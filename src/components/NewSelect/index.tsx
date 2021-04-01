import React, { SelectHTMLAttributes } from 'react';
import { Container } from './styles';

export type TypeErrorSelect = {
  isError: boolean;
  descriptionError?: string;
};

export interface TypeNewSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: TypeErrorSelect;
  children: JSX.Element[];
}

export const NewSelect = ({
  children,
  error,
  ...props
}: TypeNewSelectProps): JSX.Element => {
  return (
    <Container className="selectdiv" isError={error?.isError}>
      <select className="form-control" {...props}>
        <option disabled selected>
          selecione
        </option>
        {children}
      </select>
      {error?.descriptionError && <label>{error.descriptionError}</label>}
    </Container>
  );
};
