import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ContainerDropdown, Content, IconArrowDown, IconSearch } from './style';

interface DropdownInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  data: T[];
  onChangeCurrentRow?: (value: any) => void;
}

export const DropdownInput = <
  T extends { id: string; name: string; parent_id: string | null }
>({
  label,
  data,
  onChangeCurrentRow,
  ...props
}: DropdownInputProps<T>): JSX.Element => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [inputValues, setInputValue] = useState<T[]>(data);
  const [isActiveInput, setIsActiveInput] = useState(false);
  const [selectItem, setSelectItem] = useState('selecione');
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
  }, []);

  const handleClickRow = useCallback(
    (value: string) => {
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
    console.log(result);
    return [];
  };

  return (
    <ContainerDropdown ref={inputRef}>
      <label htmlFor={label}>{label}</label>
      <header>
        <div onClick={handleFocusInput} {...props}>
          {selectItem.toUpperCase()}
          <IconArrowDown />
        </div>
      </header>
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
          {inputValues
            .filter(({ name }) => {
              if (name.toLowerCase().indexOf(inputSearch.toLowerCase()) > -1) {
                return true;
              } else {
                return inputSearch.length > 0 && false;
              }
            })
            .map(({ name, parent_id, id }) =>
              parent_id === null ? (
                <div
                  style={{ cursor: isParent(id) ? 'pointer' : 'default' }}
                  onClick={() => {
                    if (isParent(id)) {
                      handleClickRow(name);
                    }
                  }}
                >
                  {name}
                </div>
              ) : (
                <>
                  <ul>
                    <li
                      onClick={() => {
                        handleClickRow(name);
                      }}
                    >
                      {name}
                    </li>
                  </ul>
                </>
              ),
            )}
        </div>
      </Content>
    </ContainerDropdown>
  );
};
