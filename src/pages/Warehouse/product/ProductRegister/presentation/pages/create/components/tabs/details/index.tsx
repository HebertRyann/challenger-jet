import React from 'react'
import { useFormContext } from 'react-hook-form'
import { NewSelect } from '../../../../../../../../../../components/NewSelect'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import {
  typeUnitMensuredWeight,
  typeUnitMensuredDetails
} from '../../../../../../domain/data/product/unitMensured'
import { Container } from './styles'
import { InputFormController } from '../../form/input'

export const DetailsTab = (): JSX.Element => {
  const { register } = useFormContext()

  return (
    <>
      <Container className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Peso medida"
            message="Selecione a unidade de medida"
          />
          <NewSelect
            {...register('details.weightSelect', {
              required: false
            })}
          >
            {typeUnitMensuredWeight.map(({ label, value }) => (
              <option key={Math.random()} value={value + '+' + label}>
                {label}
              </option>
            ))}
          </NewSelect>
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent label="Peso" message="Informe o peso" />
          <InputFormController name="details.weight" />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Dimensão medida"
            message="Selecione a unidade de medida"
          />
          <NewSelect
            {...register('details.measureSelect', {
              required: false
            })}
          >
            {typeUnitMensuredDetails.map(({ label, value }) => (
              <option key={Math.random()} value={value + '+' + label}>
                {label}
              </option>
            ))}
          </NewSelect>
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent label="Largura" message="Informe a largura" />
          <InputFormController name="details.width" />
        </div>
      </Container>
      <Container className="row">
        <div className="form-content col-md-3">
          <TooltipComponent label="Altura" message="Informe a altura" />
          <InputFormController name="details.height" />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Comprimento"
            message="Informe o comprimento"
          />
          <InputFormController name="details.length" />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent label="Espessura" message="Informe a espessura" />
          <InputFormController name="details.thickness" />
        </div>
      </Container>
    </>
  )
}
