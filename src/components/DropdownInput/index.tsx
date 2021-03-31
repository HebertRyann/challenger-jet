import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ContainerDropdown, Content, IconArrowDown, IconSearch } from './style';

type TypeError = {
  isError: boolean;
  descriptionError: string;
};

interface DropdownInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  data: T[];
  onChangeCurrentRow?: (value: any) => void;
  error?: TypeError;
}

export const DropdownInput = <
  T extends { id: string; name: string; parent_id: string | null }
>({
  label,
  data,
  onChangeCurrentRow,
  error,
  ...props
}: DropdownInputProps<T>): JSX.Element => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [inputValues, setInputValue] = useState<T[]>(data);
  const [isActiveInput, setIsActiveInput] = useState(false);
  const [selectItem, setSelectItem] = useState<{
    id: string;
    name: string;
    parent_id: string | null;
  }>({
    id: '0',
    name: 'selecione',
    parent_id: null,
  });
  const [inputSearch, setInputSearch] = useState('');
  const handleFocusInput = useCallback(() => {
    setIsActiveInput(true);
  }, []);

  useEffect(() => {
    document.addEventListener('click', (event: any) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsActiveInput(false);
      }
    });
    setInputValue(data);
  }, [data]);

  const handleClickRow = useCallback(
    (value: T) => {
      setSelectItem(value);
      if (onChangeCurrentRow) onChangeCurrentRow(value);
      setIsActiveInput(false);
    },
    [selectItem, isActiveInput],
  );

  const handlerChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputSearch(event.target.value);
    },
    [inputSearch, inputValues],
  );

  const isParent = (id: string): boolean => {
    return inputValues.filter(({ parent_id }) => parent_id === id).length === 0;
  };

  const renderDataSearch = (): T[] => {
    const result = inputValues.filter(({ name }) => {
      if (name.toLowerCase().indexOf(inputSearch.toLowerCase()) > -1) {
        return true;
      } else {
        return inputSearch.length > 0 && false;
      }
    });
    return result;
  };

  return (
    <ContainerDropdown isError={error?.isError} ref={inputRef}>
      {label && <label htmlFor={label}>{label}</label>}
      <header>
        <div className="form-control" onClick={handleFocusInput} {...props}>
          {selectItem.name}
          <IconArrowDown />
        </div>
      </header>
      {error?.isError && <label>{error.descriptionError}</label>}
      <Content isActive={isActiveInput}>
        <header>
          <input
            value={inputSearch}
            placeholder="Buscar"
            type="text"
            className="form-control"
            onChange={handlerChangeInput}
          />
          <IconSearch />
        </header>
        <div>
          {renderDataSearch().length === 0 ? (
            <div className="no-content">
              <h5>Nenhum dado encontrado</h5>
            </div>
          ) : (
            renderDataSearch().map((current: T) =>
              current.parent_id === null ? (
                <div
                  key={Math.random()}
                  style={{
                    cursor: isParent(current.id) ? 'pointer' : 'default',
                  }}
                  onClick={() => {
                    if (isParent(current.id)) {
                      handleClickRow(current);
                    }
                  }}
                >
                  {current.name}
                </div>
              ) : (
                <>
                  <ul key={Math.random()}>
                    <li
                      onClick={() => {
                        handleClickRow(current);
                      }}
                    >
                      {current.name}
                    </li>
                  </ul>
                </>
              ),
            )
          )}
        </div>
      </Content>
    </ContainerDropdown>
  );
};
