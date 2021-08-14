import React from 'react'
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent'
import {
  typeUnitMensuredWeight,
  typeUnitMensuredDetails
} from '../../../../domain/data/products/unitMensured'
import { Container } from './styles'
import { getError } from '../../../utils/getErrors'
import { useFormApplication } from '../../../providers/form/FormProvider'
import {
  Input,
  Select,
  Textarea
} from '../../../../../../../../components/Form'

export const DetailsTab = (): JSX.Element => {
  const { errors } = useFormApplication()

  return (
    <>
      <Container className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Peso medida"
            message="Selecione a unidade de medida"
          />
          <Select
            name="details_overview.details.measure_weight"
            className="form-control"
            options={typeUnitMensuredWeight.map(({ label, value }) => ({
              value: value,
              name: label
            }))}
            controlled
            blank
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent label="Peso" message="Informe o peso" />
          <Input className="form-control" name="details_overview.details.weight" />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Dimensão medida"
            message="Selecione a unidade de medida"
          />
          <Select
            name="details_overview.details.measure"
            className="form-control"
            options={typeUnitMensuredDetails.map(({ label, value }) => ({
              value: value,
              name: label
            }))}
            controlled
            blank
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent label="Largura" message="Informe a largura" />
          <Input className="form-control" name="details_overview.details.width" />
        </div>
      </Container>
      <Container className="row">
        <div className="form-content col-md-3">
          <TooltipComponent label="Altura" message="Informe a altura" />
          <Input className="form-control" name="details_overview.details.height" />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Comprimento"
            message="Informe o comprimento"
          />
          <Input className="form-control" name="details_overview.details.length" />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent label="Espessura" message="Informe a espessura" />
          <Input className="form-control" name="details_overview.details.thickness" />
        </div>
      </Container>
      <Container className="row">
        <div className="form-content col-md-12">
          <TooltipComponent
            label="Descrição e detalhes"
            message="Informe a descrição e detalhes"
          />
          <Textarea
            name="details_overview.details.description_details"
            className="form-control"
          />
        </div>
      </Container>
      <Container className="row">
        <div className="form-content col-md-12">
          <TooltipComponent
            label="Especificação Técnica"
            message="Informe a especificação Técnica"
          />
          <Textarea
            name="details_overview.details.technical_specification"
            className="form-control"
          />
        </div>
      </Container>
      <Container className="row">
        <div className="form-content col-md-12">
          <TooltipComponent
            label="Forma de utilização"
            message="Informe a forma de utilização"
          />
          <Textarea name="details_overview.details.way_use" className="form-control" />
        </div>
      </Container>
    </>
  )
}
