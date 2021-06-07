import React from 'react'
import { useFormContext } from 'react-hook-form'
import { NewSelect } from '../../../../../../../../../../components/NewSelect'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import { useFormApplication } from '../../../../../providers/form/FormProvider'
import { useProduct } from '../../../../../providers/product/ProductProvider'
import { InputForm } from '../../form/input'
import { Container } from './styles'

export const OverviewTab = (): JSX.Element => {
  const { loadTypeProducts, loadGroupProduct } = useProduct()
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
          error={{ isError: !!errors?.overview?.selectTypeProduct }}
        >
          {loadTypeProducts().map(({ key, name, label }) => (
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
        <NewSelect
          {...register('overview.groupProduct' as const, {
            required: true
          })}
          error={{ isError: !!errors?.overview?.groupProduct }}
        >
          {loadGroupProduct().map(({ name, id }) => (
            <option key={id} value={id + '+' + name}>
              {name}
            </option>
          ))}
        </NewSelect>
      </div>
      <div className="form-content col-md-6">
        <TooltipComponent
          label="Nome do produto"
          message="Selecione o nome do produto"
        />
        <InputForm
          name={'overview.nameProduct'}
          required
          error={errors?.overview?.nameProduct}
        />
      </div>
    </Container>
  )
}
