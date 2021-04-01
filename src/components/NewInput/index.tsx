import React, {
  InputHTMLAttributes,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { Container } from './styles';

export type TypeErrorSelect = {
  isError: boolean;
  descriptionError?: string;
};

export interface TypeNewInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: TypeErrorSelect;
  name: string;
}

export const NewInput = ({
  name,
  error,
  ...props
}: TypeNewInputProps): JSX.Element => {
  const [currentError, setCurrentError] = useState<TypeErrorSelect>(
    error ? error : { isError: false, descriptionError: '' },
  );

  useEffect(() => {
    setCurrentError(error ? error : { isError: false, descriptionError: '' });
  }, [error]);

  const handlerOnBlur = useCallback(
    (value: string) => {
      if (value === '')
        setCurrentError({
          isError: true,
          descriptionError: 'Campo não preenchido',
        });
    },
    [error],
  );

  return (
    <Container isError={currentError.isError}>
      <input
        onBlur={event => {
          handlerOnBlur(event.target.value);
        }}
        autoComplete="off"
        name={name}
        type="text"
        className="form-control"
        {...props}
      />
      {currentError.descriptionError && <label>{currentError.descriptionError}</label>}
    </Container>
  );
};
