import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ContainerDropdown, Content, IconArrowDown } from './style';

interface DropdownInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  data: T[];
}

export const DropdownInput = <
  T extends { name: string; children: { name: string }[] }
>({
  label,
  data,
  ...props
}: DropdownInputProps<T>): JSX.Element => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [inputValues, setInputValue] = useState<T[]>(data);
  const [isActiveInput, setIsActiveInput] = useState(false);
  const [selectItem, setSelectItem] = useState('selecione');
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
        <input type="text" className="form-control" />
        <div>
          <div>titulo</div>
          <ul>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
          </ul>
        </div>
      </Content>
    </ContainerDropdown>
  );
};
