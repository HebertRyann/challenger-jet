import React, { InputHTMLAttributes, useState, useEffect, useRef } from 'react'
import { Container, ContainerSearch, ContainerInput } from './styles'
import loadingSvg from '../../assets/image/svg/loading.svg'

export type TypeErrorInput = {
  isError: boolean
  descriptionError?: string
}

export interface TypeNewInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: TypeErrorInput
  name: string
  isNumber?: boolean
  search?: boolean
  data?: any
  onClickSearchRow?: (params: any) => void
  RenderSearchComponent?: () => JSX.Element
  loading?: boolean
}

export const NewInput = ({
  name,
  error,
  isNumber,
  search,
  data,
  onClickSearchRow,
  RenderSearchComponent,
  loading,
  ...props
}: TypeNewInputProps): JSX.Element => {
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [activeSearch, setActiveSearch] = useState(false)
  const [currentError, setCurrentError] = useState<TypeErrorInput>(
    error || { isError: false, descriptionError: '' }
  )

  useEffect(() => {
    setCurrentError(error || { isError: false, descriptionError: '' })
  }, [error])

  useEffect(() => {
    document.addEventListener('click', (event: any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setActiveSearch(false)
      }
    })
  }, [])

  return (
    <Container isError={currentError.isError}>
      <ContainerInput>
        <input
          ref={inputRef}
          autoComplete="off"
          name={name}
          type="text"
          className="form-control"
          onChangeCapture={() => {
            if (inputRef?.current?.value === '') {
              setActiveSearch(false)
            }
          }}
          onKeyPress={event => {
            if (isNumber) {
              const regex = /^[0-9]+$/
              if (!regex.test(event.key)) event.preventDefault()
            }
            if (search && data && data.length > 0) {
              setActiveSearch(true)
            }
          }}
          {...props}
        />
        {loading && (
          <img className="loading" alt="image-loading" src={loadingSvg} />
        )}
      </ContainerInput>

      {currentError.descriptionError && (
        <label>{currentError.descriptionError}</label>
      )}
      {search &&
        (RenderSearchComponent ? (
          <RenderSearchComponent />
        ) : (
          activeSearch && (
            <ContainerSearch active={activeSearch} ref={searchRef}>
              <ul>
                {data !== undefined &&
                  data.map(({ name }: { id: string; name: string }) => (
                    <li
                      key={Math.random()}
                      onClick={() => {
                        setActiveSearch(false)
                        if (onClickSearchRow) {
                          onClickSearchRow(name)
                        }
                      }}
                    >
                      {name}
                    </li>
                  ))}
              </ul>
            </ContainerSearch>
          )
        ))}
    </Container>
  )
}
