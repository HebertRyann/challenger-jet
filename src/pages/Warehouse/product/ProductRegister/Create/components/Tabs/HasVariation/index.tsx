import React, { useCallback, useState } from 'react'
import { Container } from './styles'
import { ResponseEntiryWithIdNameWithChildren } from '../../../services/api'
import { Table } from './component/Table'
import { useTabCreate } from '../../../providers/tabsProvider'

type TypeAtributes = {
  id: string
  name: string
  parent_id: string | null
  childrenList: ResponseEntiryWithIdNameWithChildren[]
  isChecked?: boolean
}

type TypeUnitMensured = {
  id: string
  name: string
}

type TypeHasVariationProps = {
  unitMensureds: TypeUnitMensured[]
  atributes: TypeAtributes[]
}

export const HasVariation = ({
  unitMensureds,
  atributes
}: TypeHasVariationProps): JSX.Element => {
  const { variation } = useTabCreate()
  const { removeAtributes } = variation.setData
  const [atributesList, setAtributesList] =
    useState<ResponseEntiryWithIdNameWithChildren[]>(atributes)

  const handlerClickCheckBox = useCallback(
    (index: number, removeCheck: boolean, keyParent: string) => {
      if (removeCheck) {
        removeAtributes(keyParent)
      }

      atributesList[index].isChecked = !atributesList[index].isChecked
      setAtributesList([...atributesList])
    },
    [atributesList, removeAtributes]
  )

  return (
    <>
      <Container className="row">
        <div className="check-container form-content col-md-12">
          {atributesList.map(({ id, name, isChecked, parent_id }, index) => (
            <div key={id}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  handlerClickCheckBox(index, !!isChecked, String(id))
                }}
                value={id}
              />
              <label>{name}</label>
            </div>
          ))}
        </div>
      </Container>
      <div className="row">
        <Table unitMensuredList={unitMensureds} atributes={atributesList} />
      </div>
    </>
  )
}

export const labelHasVariation = 'Variação/Estoque'
export const nameHasVariation = '@@tabs-has-variation'
