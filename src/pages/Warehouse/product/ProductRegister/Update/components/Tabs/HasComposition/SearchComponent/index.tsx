import React, { useEffect, useRef, useState } from 'react'
import { ContainerSearch } from './styles'

type TypeSearchComponentHasCompositionProps = {
  data: any
  active?: boolean
  onClickRow?: (currentRow: any) => void
}

type ListData = {
  name: string
  stocks: { atributes: string; product_id: number; id: number }[]
}

export const SearchComponentHasComposition = ({
  data,
  active,
  onClickRow
}: TypeSearchComponentHasCompositionProps): JSX.Element => {
  const searchRef = useRef<HTMLDivElement>(null)
  const [activeSeach, setActiveSearch] = useState(!!active)

  useEffect(() => {
    document.addEventListener('click', (event: any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setActiveSearch(false)
      }
    })
  }, [])

  const handlerClickCurrentRow = (current: any) => {
    if (onClickRow) onClickRow(current)
  }

  return (
    <ContainerSearch ref={searchRef} active={activeSeach}>
      <ul>
        {data &&
          data.map(({ name, stocks }: ListData, indexProductList: number) => (
            <section>
              <h5>{name}</h5>
              <table className="table-bordered">
                {stocks &&
                  stocks.map(({ atributes, product_id, id }, indexStock) => {
                    if (atributes) {
                      const atributeList = JSON.parse(atributes.toLowerCase())
                      const headers: { name: string }[] = []
                      const body: { name: string }[] = []
                      for (let i = 0; i < atributeList.length; i++) {
                        headers.push({ name: atributeList[i].key })
                        body.push({ name: atributeList[i].value })
                      }
                      return (
                        <>
                          <thead>
                            {headers.map((_, index) => {
                              return (
                                indexStock === 0 && (
                                  <th className="header">
                                    <h5>{headers[index].name}</h5>
                                  </th>
                                )
                              )
                            })}
                          </thead>
                          <tbody>
                            <tr>
                              {body.map((_: any, index) => (
                                <th>
                                  <h5
                                    onClick={() =>
                                      handlerClickCurrentRow({
                                        name: body[index].name,
                                        product_id,
                                        stock_id: id
                                      })
                                    }
                                  >
                                    {body[index].name}
                                  </h5>
                                </th>
                              ))}
                            </tr>
                          </tbody>
                        </>
                      )
                    }
                  })}
              </table>
            </section>
          ))}
      </ul>
    </ContainerSearch>
  )
}
