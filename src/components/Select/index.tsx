import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Container, IconArrowDown, IconSearch } from './style'

type TypeSelect<T> = {
  data: T[]
  selectValue: T
  onClickSelect?: (value: any) => void
  onClickItem?: (value: T) => void
  disable?: boolean
  search?: boolean
}

export const Select = <T extends { name: string }>({
  data,
  onClickSelect,
  onClickItem,
  selectValue,
  disable,
  search
}: TypeSelect<T>): JSX.Element => {
  const selectRef = useRef<HTMLDivElement>(null)

  const [currentValue, setCurrentValue] = useState<T>(selectValue)
  const [selectActive, setActiveSelect] = useState(false)
  const [inputSearch, setInputSearch] = useState('')

  const handleClickSelect = useCallback(
    (value: any) => {
      if (!disable && data.length > 0) {
        setActiveSelect(!selectActive)
        if (onClickSelect) onClickSelect(value)
      }
    },
    [selectActive]
  )

  const handleClickRow = useCallback(
    (value: any) => {
      if (onClickItem) onClickItem(value)
    },
    [currentValue]
  )

  const handlerChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputSearch(event.target.value)
    },
    [inputSearch]
  )

  useEffect(() => {
    setCurrentValue(selectValue)
  }, [selectValue])

  useEffect(() => {
    document.addEventListener('click', (event: any) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setActiveSelect(false)
      }
    })
  }, [])

  const renderDataSearch = (): T[] => {
    const result = data.filter(({ name }) => {
      if (name.toLowerCase().indexOf(inputSearch.toLowerCase()) > -1) {
        return true
      } else {
        return inputSearch.length > 0 && false
      }
    })
    return result
  }

  return (
    <Container
      onClick={() => {
        handleClickSelect(currentValue)
      }}
      isActive={selectActive}
      ref={selectRef}
      className="form-control"
      disable={!!disable}
    >
      <header>
        <div>{currentValue.name}</div>
        <IconArrowDown />
      </header>
      <main>
        {search ? (
          <section>
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
            {renderDataSearch().length === 0 ? (
              <div className="no-content">
                <h5>Nenhum dado encontrado</h5>
              </div>
            ) : (
              <ul>
                {renderDataSearch().map(current => (
                  <li
                    key={Math.random()}
                    onClick={() => {
                      handleClickRow(current)
                    }}
                  >
                    {current.name}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : (
          <ul>
            {data.map(current => (
              <li
                key={Math.random()}
                onClick={() => {
                  handleClickRow(current)
                }}
              >
                {current.name}
              </li>
            ))}
          </ul>
        )}
      </main>
    </Container>
  )
}
