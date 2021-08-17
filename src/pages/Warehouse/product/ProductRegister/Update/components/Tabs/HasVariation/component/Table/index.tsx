import React from 'react'
import { Container, IconRemove, Td, Th, TextArea } from './style'
import { NewInput } from '../../../../../../../../../../components/NewInput'
import { NewSelect } from '../../../../../../../../../../components/NewSelect'
import { useTabCreate } from '../../../../../providers/tabsProvider'
import { SALE, RE_SALE } from '../../../../../domain/products'
import { ResponseEntiryWithIdNameWithChildren } from '../../../../../services/api'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import {
  typeUnitMensuredDetails,
  typeUnitMensuredWeight
} from '../../../../../../domain/details/measureds'
import { genericMaskWithTwoZero } from '../../../../../../../../../../utlis/mask'

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
  const { variation, overview } = useTabCreate()
  const { typeSelectProdut } = overview.getData()
  const variationList = variation.getData()
  const {
    changePriceCost,
    changePriceSale,
    changeUnitMensured,
    changeAtributes,
    changeDetails,
    addVariation,
    removeVariation,
    changeCurrentReplacementPoint
  } = variation.setData

  const isTypeSaleOrResale = (): boolean =>
    typeSelectProdut.value.name === SALE.name ||
    typeSelectProdut.value.name === RE_SALE.name

  const gettypeUnitMensuredDetails = (isEqual: string): string => {
    const match = typeUnitMensuredDetails.filter(
      ({ value }) => value === isEqual?.toLowerCase()
    )
    if (match && match[0]) return match[0].label
    return 'Selecione'
  }

  const getTypeUnitMensuredWeight = (isEqual: string): string => {
    const match = typeUnitMensuredWeight.filter(
      ({ value }) => value === isEqual?.toLowerCase()
    )
    if (match && match[0]) return match[0].label
    return 'Selecione'
  }

  return (
    <Container className="table-responsive">
      <table className="table table-bordered margin-bottom-0">
        <tbody>
          {variationList.map(
            (
              {
                unitMensured,
                priceSale,
                priceCost,
                atributes,
                replacementPoint,
                details
              },
              index
            ) => (
              <>
                <tr>
                  <Th active isTypeSaleOrResale={isTypeSaleOrResale()}>
                    Unidade de medidas
                  </Th>
                  {atributesList.map(
                    ({ name, parent_id, isChecked }) =>
                      parent_id === null && (
                        <Th
                          active={isChecked}
                          isTypeSaleOrResale={isTypeSaleOrResale()}
                        >
                          {name}
                        </Th>
                      )
                  )}
                  <Th active isTypeSaleOrResale={isTypeSaleOrResale()}>
                    <TooltipComponent
                      label="Reposição de estoque"
                      message="Reposição de estoque"
                      bold
                    />
                  </Th>

                  {isTypeSaleOrResale() ? (
                    <th
                      align="center"
                      style={{ textAlign: 'center' }}
                      colSpan={2}
                    >
                      Preço
                    </th>
                  ) : null}
                  <Th active isTypeSaleOrResale={isTypeSaleOrResale()}>
                    Ações
                  </Th>
                </tr>
                {isTypeSaleOrResale() && (
                  <tr>
                    <th>Custo</th>
                    <th>Venda</th>
                  </tr>
                )}
                <tr key={index}>
                  <td>
                    <NewSelect
                      isSelected={
                        variationList[index]?.unitMensured?.value.name
                      }
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
                        <option key={id} value={`${id}+${name}`}>
                          {name}
                        </option>
                      ))}
                    </NewSelect>
                  </td>
                  <>
                    {atributesList.map(
                      (
                        { parent_id, childrenList, id, isChecked },
                        indexAtribute
                      ) =>
                        parent_id === null && (
                          <Td key={Math.random()} active={isChecked}>
                            <NewSelect
                              className="form-control"
                              name="Selecione"
                              id="Selecione"
                              isSelected={atributes[indexAtribute]?.value.name}
                              error={{
                                isError:
                                  atributes[indexAtribute]?.error.isError ||
                                  false
                              }}
                              onChange={event => {
                                const split = event.target.value.split('+')
                                console.log(split)
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
                                    key={indexAtribute}
                                    value={`${index}+${indexAtribute}+${atributeChildren.id}+${atributeChildren.name}+${id}`}
                                  >
                                    {atributeChildren.name}
                                  </option>
                                ))}
                            </NewSelect>
                          </Td>
                        )
                    )}
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
                <tr style={{ borderTop: '3px solid white' }}>
                  <td colSpan={100} style={{ textAlign: 'left' }}>
                    <div className="row section">
                      <div className="form-content col-md-3">
                        <TooltipComponent
                          label="Peso medida"
                          message="Selecione a Medida de dimensão"
                        />
                        <NewSelect
                          isSelected={getTypeUnitMensuredWeight(
                            variationList[index]?.details?.value?.measureWeight
                              ?.value
                          )}
                          error={{ isError: false }}
                          onChange={event => {
                            const split = event.target.value.split('+')
                            const name = split[1]
                            changeDetails(
                              {
                                ...variation.getData()[index].details.value,
                                measureWeight: {
                                  value: name,
                                  error: { isError: false }
                                }
                              },
                              index
                            )
                          }}
                        >
                          {typeUnitMensuredWeight.map(
                            ({ label, value }: any) => {
                              return (
                                <option key={value} value={`${label}+${value}`}>
                                  {label}
                                </option>
                              )
                            }
                          )}
                        </NewSelect>
                      </div>
                      <div className="form-content col-md-3">
                        <TooltipComponent
                          label="Peso"
                          message="Infome o peso em kg"
                        />
                        <NewInput
                          isNumber
                          value={genericMaskWithTwoZero(
                            variation.getData()[index]?.details?.value?.weight
                              ?.value
                          )}
                          onChange={e =>
                            changeDetails(
                              {
                                ...variation.getData()[index].details.value,
                                weight: {
                                  value: e.target.value,
                                  error: { isError: false }
                                }
                              },
                              index
                            )
                          }
                          error={
                            variation.getData()[index].details?.value?.weight
                              ?.error
                          }
                          name="peso"
                          className="form-control"
                          type="text"
                          maxLength={12}
                          placeholder="0,00"
                        />
                      </div>
                      <div className="form-content col-md-3">
                        <TooltipComponent
                          label="Dimensão medida"
                          message="Selecione a Medida de dimensão"
                        />
                        <NewSelect
                          error={{ isError: false }}
                          isSelected={gettypeUnitMensuredDetails(
                            variationList[index]?.details?.value?.measure?.value
                          )}
                          onChange={event => {
                            const split = event.target.value.split('+')
                            const name = split[1]
                            changeDetails(
                              {
                                ...variation.getData()[index].details.value,
                                measure: {
                                  value: name,
                                  error: { isError: false }
                                }
                              },
                              index
                            )
                          }}
                        >
                          {typeUnitMensuredDetails.map(({ label, value }) => {
                            return (
                              <option key={value} value={`${label}+${value}`}>
                                {label}
                              </option>
                            )
                          })}
                        </NewSelect>
                      </div>
                      <div className="form-content col-md-3">
                        <TooltipComponent
                          label="Largura"
                          message="Informe a largura em metros"
                        />
                        <NewInput
                          isNumber
                          maxLength={12}
                          value={genericMaskWithTwoZero(
                            variation.getData()[index].details?.value?.width
                              ?.value
                          )}
                          onChange={e =>
                            changeDetails(
                              {
                                ...variation.getData()[index].details.value,
                                width: {
                                  value: e.target.value,
                                  error: { isError: false }
                                }
                              },
                              index
                            )
                          }
                          error={details?.value?.width?.error}
                          name="largura"
                          className="form-control"
                          type="text"
                          placeholder="0,00"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-content col-md-3">
                        <TooltipComponent
                          label="Altura"
                          message="Informe a altura em metros"
                        />
                        <NewInput
                          isNumber
                          maxLength={12}
                          value={genericMaskWithTwoZero(
                            variation.getData()[index].details?.value?.height
                              ?.value
                          )}
                          onChange={e =>
                            changeDetails(
                              {
                                ...variation.getData()[index].details.value,
                                height: {
                                  value: e.target.value,
                                  error: { isError: false }
                                }
                              },
                              index
                            )
                          }
                          error={
                            variation.getData()[index].details?.value?.height
                              ?.error
                          }
                          name="altura"
                          className="form-control"
                          type="text"
                          placeholder="0,00"
                        />
                      </div>
                      <div className="form-content col-md-3">
                        <TooltipComponent
                          label="Comprimento"
                          message="Informe a comprimento em metros"
                        />
                        <NewInput
                          isNumber
                          maxLength={12}
                          value={genericMaskWithTwoZero(
                            variation.getData()[index].details?.value?.length
                              ?.value
                          )}
                          onChange={e =>
                            changeDetails(
                              {
                                ...variation.getData()[index].details.value,
                                length: {
                                  value: e.target.value,
                                  error: { isError: false }
                                }
                              },
                              index
                            )
                          }
                          error={
                            variation.getData()[index].details?.value?.length
                              ?.error
                          }
                          name="comprimento"
                          className="form-control"
                          type="text"
                          placeholder="0,00"
                        />
                      </div>
                      <div className="form-content col-md-3">
                        <TooltipComponent
                          label="Espessura"
                          message="Infome a esperssura"
                        />
                        <NewInput
                          isNumber
                          value={genericMaskWithTwoZero(
                            variation.getData()[index].details?.value?.thickness
                              ?.value
                          )}
                          onChange={e =>
                            changeDetails(
                              {
                                ...variation.getData()[index].details.value,
                                thickness: {
                                  value: e.target.value,
                                  error: { isError: false }
                                }
                              },
                              index
                            )
                          }
                          error={
                            variation.getData()[index].details?.value?.thickness
                              ?.error
                          }
                          name="peso"
                          className="form-control"
                          type="text"
                          maxLength={12}
                          placeholder="0,00"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-content col-md-12">
                        <div className="form-group">
                          <label>Descrição e detalhes</label>
                          <TextArea
                            value={
                              variationList[index]?.details?.value
                                ?.descriptionAndDetails?.value
                            }
                            onChange={e =>
                              changeDetails(
                                {
                                  ...variation.getData()[index].details.value,
                                  descriptionAndDetails: {
                                    value: e.target.value,
                                    error: { isError: false }
                                  }
                                },
                                index
                              )
                            }
                            isError={
                              variation.getData()[index]?.details?.value
                                ?.descriptionAndDetails?.error?.isError
                            }
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-content col-md-12">
                        <div className="form-group">
                          <label>Especificação Técnica</label>
                          <TextArea
                            value={
                              variationList[index]?.details?.value
                                ?.technicalSpecification?.value
                            }
                            onChange={e =>
                              changeDetails(
                                {
                                  ...variation.getData()[index].details.value,
                                  technicalSpecification: {
                                    value: e.target.value,
                                    error: { isError: false }
                                  }
                                },
                                index
                              )
                            }
                            isError={
                              variation.getData()[index]?.details?.value
                                ?.technicalSpecification?.error?.isError
                            }
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-content col-md-12">
                        <div className="form-group">
                          <label>Forma de utilização</label>
                          <TextArea
                            value={
                              variationList[index]?.details?.value?.wayOfUse
                                ?.value
                            }
                            onChange={e =>
                              changeDetails(
                                {
                                  ...variation.getData()[index].details.value,
                                  wayOfUse: {
                                    value: e.target.value,
                                    error: { isError: false }
                                  }
                                },
                                index
                              )
                            }
                            isError={
                              variation.getData()[index]?.details?.value
                                ?.wayOfUse?.error?.isError
                            }
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </>
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
