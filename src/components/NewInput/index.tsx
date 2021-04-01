import React, {
  InputHTMLAttributes,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { Container } from './styles';

export type TypeErrorInput = {
  isError: boolean;
  descriptionError?: string;
};

export interface TypeNewInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: TypeErrorInput;
  name: string;
}

export const NewInput = ({
  name,
  error,
  ...props
}: TypeNewInputProps): JSX.Element => {
  const [currentError, setCurrentError] = useState<TypeErrorInput>(
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
      {currentError.descriptionError && (
        <label>{currentError.descriptionError}</label>
      )}
    </Container>
  );
};
