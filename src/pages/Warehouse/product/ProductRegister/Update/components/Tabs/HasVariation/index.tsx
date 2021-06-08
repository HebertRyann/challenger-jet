import React, { useCallback, useEffect, useState } from 'react'
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
  const { addAtributes, removeAtributes } = variation.setData
  const [atributesList, setAtributesList] =
    useState<ResponseEntiryWithIdNameWithChildren[]>(atributes)

  useEffect(() => {
    variation.getData()[0].atributes.forEach(result => {
      atributesList.forEach((atribute, index) => {
        if (atribute.id.toString() === result.value.keyParent) {
          atributesList[index].isChecked = true
        }
      })
    })
  }, [variation.getData()])

  const handlerClickCheckBox = useCallback(
    (index: number) => {
      atributesList[index].isChecked = !atributesList[index].isChecked
      setAtributesList([...atributesList])
      removeAtributes()
      atributesList
        .filter(({ isChecked }) => isChecked)
        .forEach(() => {
          addAtributes()
        })
    },
    [atributesList, variation.getData()]
  )

  return (
    <>
      <Container className="row">
        <div className="check-container form-content col-md-12">
          {atributesList.map(({ id, name, isChecked }, index) => (
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
