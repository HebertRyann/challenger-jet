import React, { InputHTMLAttributes, useState, useEffect, useRef } from 'react';
import { Container, ContainerSearch } from './styles';

export type TypeErrorInput = {
  isError: boolean;
  descriptionError?: string;
};

export interface TypeNewInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: TypeErrorInput;
  name: string;
  isNumber?: boolean;
  search?: boolean;
  data?: any;
  onClickSearchRow?: (params: any) => void;
}

export const NewInput = ({
  name,
  error,
  isNumber,
  search,
  data,
  onClickSearchRow,
  ...props
}: TypeNewInputProps): JSX.Element => {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeSearch, setActiveSearch] = useState(false);
  const [currentError, setCurrentError] = useState<TypeErrorInput>(
    error ? error : { isError: false, descriptionError: '' },
  );

  useEffect(() => {
    setCurrentError(error ? error : { isError: false, descriptionError: '' });
  }, [error]);

  useEffect(() => {
    document.addEventListener('click', (event: any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setActiveSearch(false);
      }
    });
  }, []);

  return (
    <Container isError={currentError.isError}>
      <input
        ref={inputRef}
        autoComplete="off"
        name={name}
        type="text"
        className="form-control"
        onChangeCapture={() => {
          if (inputRef?.current?.value === '') {
            setActiveSearch(false);
          }
        }}
        onKeyPress={event => {
          if (isNumber) {
            const regex = /^[0-9]+$/;
            if (!regex.test(event.key)) event.preventDefault();
          }
          if (search && data && data.length > 0) {
            setActiveSearch(true);
          }
        }}
        {...props}
      />
      {currentError.descriptionError && (
        <label>{currentError.descriptionError}</label>
      )}
      {search && activeSearch && (
        <ContainerSearch active={activeSearch} ref={searchRef}>
          <ul>
            {data !== undefined &&
              data.map(({ name }: { id: string; name: string }) => (
                <li
                  onClick={() => {
                    setActiveSearch(false);
                    if (onClickSearchRow) {
                      onClickSearchRow(name);
                    }
                  }}
                >
                  {name}
                </li>
              ))}
          </ul>
        </ContainerSearch>
      )}
    </Container>
  );
};
