import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { NewSelect } from '../../../../../../../../../../components/NewSelect'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import {
  typeUnitMensuredWeight,
  typeUnitMensuredDetails,
  TypeMensured
} from '../../../../../../domain/data/product/unitMensured'
import { Container } from './styles'
import { InputFormController } from '../../form/input'
import { getError } from '../../../../../utils/getErrors'
import { useFormApplication } from '../../../../../providers/form/FormProvider'

export const DetailsTab = (): JSX.Element => {
  const { register } = useFormContext()
  const { errors } = useFormApplication()
  const [selectWeight, setSelectWeight] = useState<TypeMensured[]>([])

  useEffect(() => {
    setSelectWeight(typeUnitMensuredWeight)
  }, [])

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
            {selectWeight.map(({ label, value }) => (
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
      <Container className="row">
        <div className="form-content col-md-12">
          <TooltipComponent
            label="Descrição e detalhes"
            message="Informe a descrição e detalhes"
          />
          <textarea
            className={`${getError(errors?.details?.descriptionAndDetails)}`}
            {...register('details.descriptionAndDetails', {
              required: true
            })}
          />
        </div>
      </Container>
      <Container className="row">
        <div className="form-content col-md-12">
          <TooltipComponent
            label="Especificação Técnica"
            message="Informe a especificação Técnica"
          />
          <textarea
            className={`${getError(errors?.details?.technicalSpecification)}`}
            {...register('details.technicalSpecification', {
              required: true
            })}
          />
        </div>
      </Container>
      <Container className="row">
        <div className="form-content col-md-12">
          <TooltipComponent
            label="Forma de utilização"
            message="Informe a forma de utilização"
          />
          <textarea
            className={`${getError(errors?.details?.wayOfUse)}`}
            {...register('details.wayOfUse', {
              required: true
            })}
          />
        </div>
      </Container>
    </>
  )
}
