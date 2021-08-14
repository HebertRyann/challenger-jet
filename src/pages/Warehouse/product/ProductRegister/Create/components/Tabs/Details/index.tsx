import React from 'react'
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent'
import { Container, TextArea } from './style'
import { NewInput } from '../../../../../../../../components/NewInput'
import { genericMaskWithTwoZero } from '../../../../../../../../utlis/mask'
import { useTabCreate } from '../../../providers/tabsProvider'
import { NewSelect } from '../../../../../../../../components/NewSelect'
import {
  typeUnitMensuredDetails,
  typeUnitMensuredWeight
} from '../../../../domain/details/measureds'

export const Details = (): JSX.Element => {
  const { details, stock } = useTabCreate()
  const {
    weight,
    width,
    height,
    length,
    thickness,
    descriptionAndDetails,
    technicalSpecification,
    wayOfUse
  } = details.getData()

  return (
    <Container>
      <div className="row section">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Peso medida"
            message="Selecione a Medida de dimensão"
          />
          <NewSelect
            error={{ isError: false }}
            onChange={event => {
              const split = event.target.value.split('+')
              stock.setData({
                ...stock.getData(),
                details: {
                  error: { isError: false },
                  value: {
                    ...stock.getData().details.value,
                    measureWeight: {
                      error: { isError: false },
                      value: split[1]
                    }
                  }
                }
              })
            }}
          >
            {typeUnitMensuredWeight.map(({ label, value }) => {
              return (
                <option key={value} value={`${label}+${value}`}>
                  {label}
                </option>
              )
            })}
          </NewSelect>
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent label="Peso" message="Infome o peso em kg" />
          <NewInput
            isNumber
            value={genericMaskWithTwoZero(
              stock.getData().details.value.weight.value
            )}
            onChange={e =>
              stock.setData({
                ...stock.getData(),
                details: {
                  error: { isError: false },
                  value: {
                    ...stock.getData().details.value,
                    weight: {
                      error: { isError: false },
                      value: e.target.value
                    }
                  }
                }
              })
            }
            error={weight.error}
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
            onChange={event => {
              const split = event.target.value.split('+')
              stock.setData({
                ...stock.getData(),
                details: {
                  error: { isError: false },
                  value: {
                    ...stock.getData().details.value,
                    measure: {
                      error: { isError: false },
                      value: split[1]
                    }
                  }
                }
              })
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
            value={genericMaskWithTwoZero(width.value)}
            onChange={e =>
              stock.setData({
                ...stock.getData(),
                details: {
                  error: { isError: false },
                  value: {
                    ...stock.getData().details.value,
                    width: {
                      error: { isError: false },
                      value: e.target.value
                    }
                  }
                }
              })
            }
            error={width.error}
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
            value={genericMaskWithTwoZero(height.value)}
            onChange={e =>
              stock.setData({
                ...stock.getData(),
                details: {
                  error: { isError: false },
                  value: {
                    ...stock.getData().details.value,
                    height: {
                      error: { isError: false },
                      value: e.target.value
                    }
                  }
                }
              })
            }
            error={height.error}
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
            value={genericMaskWithTwoZero(length.value)}
            onChange={e =>
              stock.setData({
                ...stock.getData(),
                details: {
                  error: { isError: false },
                  value: {
                    ...stock.getData().details.value,
                    length: {
                      error: { isError: false },
                      value: e.target.value
                    }
                  }
                }
              })
            }
            error={length.error}
            name="comprimento"
            className="form-control"
            type="text"
            placeholder="0,00"
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent label="Espessura" message="Infome a esperssura" />
          <NewInput
            isNumber
            value={genericMaskWithTwoZero(thickness.value)}
            onChange={e =>
              stock.setData({
                ...stock.getData(),
                details: {
                  error: { isError: false },
                  value: {
                    ...stock.getData().details.value,
                    thickness: {
                      error: { isError: false },
                      value: e.target.value
                    }
                  }
                }
              })
            }
            error={weight.error}
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
              isError={descriptionAndDetails.error.isError}
              onChange={e =>
                stock.setData({
                  ...stock.getData(),
                  details: {
                    error: { isError: false },
                    value: {
                      ...stock.getData().details.value,
                      descriptionAndDetails: {
                        error: { isError: false },
                        value: e.target.value
                      }
                    }
                  }
                })
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
              isError={technicalSpecification.error.isError}
              onChange={e =>
                stock.setData({
                  ...stock.getData(),
                  details: {
                    error: { isError: false },
                    value: {
                      ...stock.getData().details.value,
                      technicalSpecification: {
                        error: { isError: false },
                        value: e.target.value
                      }
                    }
                  }
                })
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
              isError={wayOfUse.error.isError}
              onChange={e =>
                stock.setData({
                  ...stock.getData(),
                  details: {
                    error: { isError: false },
                    value: {
                      ...stock.getData().details.value,
                      wayOfUse: {
                        error: { isError: false },
                        value: e.target.value
                      }
                    }
                  }
                })
              }
              className="form-control"
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export const labelDetails = 'Detalhe e medida'
export const nameDetails = '@@tabs-details'
