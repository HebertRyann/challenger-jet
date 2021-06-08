import React, { useState } from 'react'
import { Container, IconRemove } from './style'
import { NewInput } from '../../../../../../../../../../components/NewInput'
import { NewSelect } from '../../../../../../../../../../components/NewSelect'
import { useTabCreate } from '../../../../../providers/tabsProvider'
import { SALE, RE_SALE } from '../../../../../../domain/products'
import { ResponseEntiryWithIdNameWithChildren } from '../../../../../services/api'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import ReactTooltip from 'react-tooltip'

type TypeUnitMensured = {
  id: string
  name: string
}

type TypeAtributes = {
  id: string
  name: string
  parent_id: string | null
  childrenList: ResponseEntiryWithIdNameWithChildren[]
  isChecked?: boolean
}

type TypeTableProps = {
  unitMensuredList: TypeUnitMensured[]
  atributes: TypeAtributes[]
}

export const Table = (tableProps: TypeTableProps): JSX.Element => {
  const { unitMensuredList } = tableProps
  const atributesList = tableProps.atributes
  const [alert, setAlert] = useState(false)
  const { variation, overview } = useTabCreate()
  const { typeSelectProdut } = overview.getData()
  const variationList = variation.getData()
  const {
    changeCurrentStock,
    changePriceCost,
    changePriceSale,
    changeUnitMensured,
    changeAtributes,
    addVariation,
    removeVariation,
    changeCurrentReplacementPoint
  } = variation.setData

  const handleClickOnSaveButton = () => {
    if (variation.validate()) {
      setAlert(true)
    }
  }

  const isTypeSaleOrResale = (): boolean =>
    typeSelectProdut.value.name === SALE.name ||
    typeSelectProdut.value.name === RE_SALE.name

  return (
    <Container className="table-responsive">
      <table className="table table-bordered margin-bottom-0">
        <tbody>
          <tr>
            <th
              style={
                isTypeSaleOrResale()
                  ? {
                      position: 'relative',
                      lineHeight: '50px'
                    }
                  : {}
              }
              rowSpan={isTypeSaleOrResale() ? 2 : 1}
            >
              Unidade de medidas
            </th>

            {atributesList.map(
              ({ name, parent_id }) =>
                parent_id === null && (
                  <th
                    style={
                      isTypeSaleOrResale()
                        ? {
                            position: 'relative',
                            lineHeight: '50px'
                          }
                        : {}
                    }
                    rowSpan={isTypeSaleOrResale() ? 2 : 1}
                  >
                    {name}
                  </th>
                )
            )}
            <th
              style={
                isTypeSaleOrResale()
                  ? {
                      position: 'relative',
                      lineHeight: '50px'
                    }
                  : {}
              }
              rowSpan={isTypeSaleOrResale() ? 2 : 1}
            >
              Estoque atual
            </th>

            <th
              style={
                isTypeSaleOrResale()
                  ? {
                      position: 'relative',
                      lineHeight: '50px'
                    }
                  : {}
              }
              rowSpan={isTypeSaleOrResale() ? 2 : 1}
            >
              <TooltipComponent
                label="Reposição de estoque"
                message="Reposição de estoque"
                bold
              />
            </th>
            {isTypeSaleOrResale() ? (
              <th align="center" style={{ textAlign: 'center' }} colSpan={2}>
                Preço
              </th>
            ) : null}
            <th
              style={
                isTypeSaleOrResale()
                  ? {
                      position: 'relative',
                      lineHeight: '50px'
                    }
                  : {}
              }
              rowSpan={isTypeSaleOrResale() ? 2 : 1}
            >
              Ações
            </th>
          </tr>
          {isTypeSaleOrResale() && (
            <tr>
              <th>Custo</th>
              <th>Venda</th>
            </tr>
          )}
          {variationList.map(
            (
              {
                unitMensured,
                currentStock,
                priceSale,
                priceCost,
                atributes,
                replacementPoint
              },
              index
            ) => (
              <tr>
                <td>
                  <NewSelect
                    isSelected={variationList[index]?.unitMensured?.value.name}
                    onChange={event => {
                      const split = event.target.value.split('+')
                      const id = split[0]
                      const name = split[1]
                      changeUnitMensured({ id, name }, index)
                    }}
                    name="unitMensured"
                    className="form-control"
                    error={unitMensured.error}
                  >
                    {unitMensuredList.map(({ id, name }) => (
                      <option value={`${id}+${name}`}>{name}</option>
                    ))}
                  </NewSelect>
                </td>
                <>
                  {atributesList.map(
                    ({ parent_id, childrenList, id }, indexAtribute) =>
                      parent_id === null && (
                        <td key={Math.random()}>
                          <NewSelect
                            className="form-control"
                            name="Selecione"
                            id="Selecione"
                            isSelected={atributes[indexAtribute]?.value.name}
                            error={{
                              isError:
                                atributes[indexAtribute]?.error.isError || false
                            }}
                            onChange={event => {
                              const split = event.target.value.split('+')
                              const x = Number(split[0])
                              const y = Number(split[1])
                              const id = split[2]
                              const name = split[3]
                              const keyParent = split[4]
                              changeAtributes(
                                {
                                  id,
                                  name,
                                  keyParent
                                },
                                x,
                                y
                              )
                            }}
                          >
                            {childrenList
                              .sort((a, b) => {
                                if (a.name > b.name) return 1
                                if (a.name < b.name) return -1
                                return 0
                              })
                              .map(atributeChildren => (
                                <option
                                  value={`${index}+${indexAtribute}+${atributeChildren.id}+${atributeChildren.name}+${id}`}
                                >
                                  {atributeChildren.name}
                                </option>
                              ))}
                          </NewSelect>
                        </td>
                      )
                  )}
                  <td>
                    <NewInput
                      name="currentStock"
                      value={currentStock.value}
                      error={currentStock.error}
                      isNumber
                      onChange={event =>
                        changeCurrentStock(event.currentTarget.value, index)
                      }
                      className="form-control"
                      type="text"
                    />
                  </td>
                  <td>
                    <NewInput
                      name="replacementPoint"
                      value={replacementPoint.value}
                      error={replacementPoint.error}
                      isNumber
                      onChange={event =>
                        changeCurrentReplacementPoint(
                          event.currentTarget.value,
                          index
                        )
                      }
                      className="form-control"
                      type="text"
                    />
                  </td>
                </>
                {isTypeSaleOrResale() && (
                  <>
                    <td style={{ width: '150px' }}>
                      <tr>
                        <NewInput
                          name="cost"
                          value={priceCost.value}
                          error={priceCost.error}
                          placeholder="0.00"
                          onKeyPress={event => {
                            const regex = /^[0-9.]+$/
                            if (!regex.test(event.key)) event.preventDefault()
                          }}
                          onChange={event =>
                            changePriceCost(event.currentTarget.value, index)
                          }
                          className="form-control"
                          type="text"
                        />
                      </tr>
                    </td>
                    <td style={{ width: '150px' }}>
                      <tr>
                        <NewInput
                          name="priceSale"
                          disabled
                          defaultValue={priceSale.value}
                          error={priceSale.error}
                          placeholder="0.00"
                          onKeyPress={event => {
                            const regex = /^[0-9.]+$/
                            if (!regex.test(event.key)) event.preventDefault()
                          }}
                          onChange={event =>
                            changePriceSale(event.currentTarget.value, index)
                          }
                          className="form-control"
                          type="text"
                        />
                      </tr>
                    </td>
                  </>
                )}
                <td className="actions">
                  <IconRemove
                    className="top"
                    onClick={() => removeVariation(index)}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <hr />
      <button
        onClick={() => {
          addVariation()
        }}
        className="btn dark btn-sm sbold uppercase"
      >
        <span
          className="fa fa-plus"
          aria-hidden="true"
          style={{ marginRight: '5px' }}
        />
        variação
      </button>
    </Container>
  )
}
