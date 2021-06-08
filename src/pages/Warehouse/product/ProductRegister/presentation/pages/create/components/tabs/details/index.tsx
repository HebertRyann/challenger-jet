import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { NewSelect } from '../../../../../../../../../../components/NewSelect'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import { typeUnitMensuredWeight } from '../../../../../../domain/data/product/unitMensured'
import { useFormApplication } from '../../../../../providers/form/FormProvider'
import { InputForm } from '../../form/input'
import InputMask from 'react-input-mask'

import { Container } from './styles'
import { NewInput } from '../../../../../../../../../../components/NewInput'
import { genericMaskNumber } from '../../../../../utils/mask'

export const DetailsTab = (): JSX.Element => {
  const { register } = useFormContext()
  const { control, setValue, getValues } = useFormApplication()

  return (
    <Container className="row">
      <div className="form-content col-md-3">
        <TooltipComponent
          label="Peso medida"
          message="Selecione a unidade de medida"
        />
        <NewSelect
          {...register('details.weightSelect', {
            required: true
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
        {/* <InputForm
          name={'details.weight'}
          required
          error={errors?.details?.weight}
        /> */}
        <Controller
          name="details.height"
          control={control}
          render={({ field }) => {
            return (
              <NewInput
                {...field}
                placeholder="0,00"
                value={genericMaskNumber(getValues('details.height'))}
                onChange={e => {
                  setValue('details.height', genericMaskNumber(e.target.value))
                  field.onChange(e.target.value)
                }}
              />
            )
          }}
        />
      </div>
    </Container>
  )
}
