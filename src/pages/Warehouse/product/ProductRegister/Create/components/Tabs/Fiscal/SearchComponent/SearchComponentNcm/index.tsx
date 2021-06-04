import React, { useEffect, useRef, useState } from 'react'
import { LoadAllNCM } from '../../../../../../domain/useCases/FIscal/NCM/Load'
import { ContainerSearch } from './styles'

type TypeSearchComponentFiscalProps = {
  data: LoadAllNCM.NCMResponse[]
  active: boolean
  onClickRow?: (currentRow: LoadAllNCM.NCMResponse) => void
  disableSearch: () => void
}

export const SearchComponentNcm = ({
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

  const handlerClickCurrentRow = (current: LoadAllNCM.NCMResponse) => {
    if (onClickRow) onClickRow(current)
  }

  return (
    <ContainerSearch ref={searchRef} active={active}>
      <ul>
        {data.map(({ code, descriptions, ...rest }) => (
          <li
            onClick={() =>
              handlerClickCurrentRow({ code, descriptions, ...rest })
            }
          >{`${code} - ${descriptions}`}</li>
        ))}
      </ul>
    </ContainerSearch>
  )
}
