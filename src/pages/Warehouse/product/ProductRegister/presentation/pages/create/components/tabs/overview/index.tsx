import React from 'react'
import { useFormContext } from 'react-hook-form'
import { NewSelect } from '../../../../../../../../../../components/NewSelect'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import { useProduct } from '../../../../../providers/product/ProductProvider'
import { Container } from './styles'
import { InputForm } from '../../form/input'
import { useFormApplication } from '../../../../../providers/form/FormProvider'

export const OverviewTab = (): JSX.Element => {
  const { loadTypeProducts } = useProduct()
  const productTypes = loadTypeProducts()
  const { register } = useFormContext()
  const { errors } = useFormApplication()

  return (
    <Container className="row">
      <div className="form-content col-md-3">
        <TooltipComponent
          label="Tipo do produto"
          message="Selecione o tipo do produto"
        />
        <NewSelect
          {...register('overview.selectTypeProduct' as const, {
            required: true
          })}
        >
          {productTypes.map(({ key, name, label }) => (
            <option key={key} value={key + '+' + name}>
              {label}
            </option>
          ))}
        </NewSelect>
      </div>
      <div className="form-content col-md-3">
        <TooltipComponent
          label="Grupo do produto"
          message="selecione o grupo do produto"
        />
        <InputForm
          key={Math.random()}
          name={'overview.productName'}
          error={errors?.overview?.productName}
          required
        />
      </div>
    </Container>
  )
}
