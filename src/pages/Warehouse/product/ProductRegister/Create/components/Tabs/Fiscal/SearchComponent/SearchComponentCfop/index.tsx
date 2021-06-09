import React, { useEffect, useRef } from 'react'
import { LoadAllCFOP } from '../../../../../../domain/useCases/FIscal/CFOP/Load'
import { ContainerSearch } from './styles'

type TypeSearchComponentFiscalProps = {
  data: LoadAllCFOP.CFOPResponse[]
  active: boolean
  onClickRow?: (currentRow: LoadAllCFOP.CFOPResponse) => void
  disableSearch: () => void
}

export const SearchComponentCFOP = ({
  data,
  active,
  onClickRow,
  disableSearch
}: TypeSearchComponentFiscalProps): JSX.Element => {
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener('click', (event: any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        disableSearch()
      }
    })
  }, [])

  const handlerClickCurrentRow = (current: LoadAllCFOP.CFOPResponse) => {
    if (onClickRow) onClickRow(current)
  }

  return (
    <ContainerSearch ref={searchRef} active={active}>
      <ul>
        {data.map(({ code, descriptions, ...rest }) => (
          <li
            key={Math.random()}
            onClick={() =>
              handlerClickCurrentRow({ code, descriptions, ...rest })
            }
          >{`${code} - ${descriptions}`}</li>
        ))}
      </ul>
    </ContainerSearch>
  )
}
