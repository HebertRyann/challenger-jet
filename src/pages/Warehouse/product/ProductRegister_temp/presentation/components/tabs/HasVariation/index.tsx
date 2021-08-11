import React, { useCallback, useState, useEffect } from 'react'
import { Container } from './styles'
import { Table } from './component/Table'
import { useProduct } from '../../../providers/product/ProductProvider'

export const HasVariationTab = (): JSX.Element => {
  const { attributes } = useProduct()
  const [attributesList, setAttributesList] = useState<any[]>([])

  useEffect(() => {
    setAttributesList(attributes)
  }, [attributes])

  const handlerClickCheckBox = useCallback(
    (index: number) => {
      attributesList[index].isChecked = !attributesList[index].isChecked
      setAttributesList([...attributesList])
    },
    [attributesList]
  )

  const table = Table({ attributesList })

  return (
    <>
      <Container className="row">
        <p>kd checks</p>
        <div className="check-container form-content col-md-12">
          {attributesList.map(
            ({ id, name, isChecked, parent_id }, index) =>
              parent_id === null && (
                <div key={id}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      handlerClickCheckBox(index)
                    }}
                    value={id}
                  />
                  <label>{name}</label>
                </div>
              )
          )}
        </div>
      </Container>
      <div className="row">{table}</div>
    </>
  )
}

export const labelHasVariation = 'Variação/Estoque'
export const nameHasVariation = '@@tabs-has-variation'
