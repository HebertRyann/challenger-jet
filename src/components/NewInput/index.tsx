import React, { InputHTMLAttributes, useState, useEffect } from 'react';
import { Container } from './styles';

export type TypeErrorInput = {
  isError: boolean;
  descriptionError?: string;
};

export interface TypeNewInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: TypeErrorInput;
  name: string;
  isNumber?: boolean;
}

export const NewInput = ({
  name,
  error,
  isNumber,
  ...props
}: TypeNewInputProps): JSX.Element => {
  const [currentError, setCurrentError] = useState<TypeErrorInput>(
    error ? error : { isError: false, descriptionError: '' },
  );

  useEffect(() => {
    setCurrentError(error ? error : { isError: false, descriptionError: '' });
  }, [error]);

  return (
    <Container isError={currentError.isError}>
      <input
        autoComplete="off"
        name={name}
        type="text"
        className="form-control"
        onKeyPress={event => {
          if (isNumber) {
            const regex = /^[0-9]+$/;
            if (!regex.test(event.key)) event.preventDefault();
          }
        }}
        {...props}
      />
      {currentError.descriptionError && (
        <label>{currentError.descriptionError}</label>
      )}
    </Container>
  );
};
