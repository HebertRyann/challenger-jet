import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ContainerDropdown, Content, IconArrowDown, IconSearch } from './style';

interface DropdownInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  data: T[];
  onChangeCurrentRow?: (value: any) => void;
}

export const DropdownInput = <
  T extends { name: string; children: { name: string }[] }
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
              return name.toLowerCase().indexOf(inputSearch.toLowerCase()) > -1;
            })
            .map(({ children, name }) => {
              return (
                <>
                  <div>{name}</div>
                  {children.length > 0 && (
                    <ul>
                      {children.map(({ name }) => (
                        <li
                          onClick={() => {
                            handleClickRow(name);
                          }}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              );
            })}
        </div>
      </Content>
    </ContainerDropdown>
  );
};

// inputValues.map(({ children, name }) => {
//   return children.length > 0 ? (
//     <>
//       <div>{name}</div>
//       <ul>
//         {children
//           .filter(
//             ({ name }) =>
//               name
//                 .toLocaleLowerCase()
//                 .indexOf(inputSearch.toLocaleLowerCase()) > -1,
//           )
//           .map(currentChildren => (
//             <li
//               onClick={() => {
//                 handleClickRow(currentChildren.name);
//               }}
//             >
//               {currentChildren.name}
//             </li>
//           ))}
//       </ul>
//     </>
//   ) : (
//     children
//       .filter(
//         ({ name }) =>
//           name
//             .toLocaleUpperCase()
//             .indexOf(inputSearch.toLocaleLowerCase()) > -1,
//       )
//       .map(({ name }) => <div>{name}</div>)
//   );
// })
