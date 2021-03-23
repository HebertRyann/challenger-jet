import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { Container, IconArrowDown } from './style';

type TypeSelect = {
  data: any[];
  selectValue: string;
  onClickSelect?: (value: any) => void;
  onClickItem?: (value: any) => void;
};

export const Select = ({
  data,
  onClickSelect,
  onClickItem,
  selectValue,
}: TypeSelect): JSX.Element => {
  const selectRef = useRef<HTMLDivElement>(null);

  const [currentValue, setCurrentValue] = useState(selectValue);
  const [selectActive, setActiveSelect] = useState(false);

  const handleClickSelect = useCallback(
    (value: any) => {
      setActiveSelect(!selectActive);
      if (onClickSelect) onClickSelect(value);
    },
    [selectActive],
  );

  const handleClickRow = useCallback(
    (value: any) => {
      if (onClickItem) onClickItem(value);
    },
    [currentValue],
  );

  useEffect(() => {
    setCurrentValue(selectValue);
  }, [selectValue]);

  useEffect(() => {
    document.addEventListener('click', (event: any) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setActiveSelect(false);
      }
    });
  }, []);

  return (
    <Container
      onClick={() => {
        handleClickSelect(currentValue);
      }}
      isActive={selectActive}
      ref={selectRef}
      className="form-control"
    >
      <header>
        <div>{currentValue.toUpperCase()}</div>
        <IconArrowDown />
      </header>
      <ul>
        {data.map((dataValue: string) => (
          <li
            onClick={() => {
              handleClickRow(dataValue);
            }}
          >
            {dataValue.toUpperCase()}
          </li>
        ))}
      </ul>
    </Container>
  );
};
