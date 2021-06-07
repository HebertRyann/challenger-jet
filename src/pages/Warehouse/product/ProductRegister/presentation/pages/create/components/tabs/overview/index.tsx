import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import { useFormApplication } from '../../../../../providers/form/FormProvider'
import { useProduct } from '../../../../../providers/product/ProductProvider'
import { InputForm } from '../../form/input'
import { Container } from './styles'

export const OverviewTab = (): JSX.Element => {
  const { loadTypeProducts, loadGroupProduct } = useProduct()
  const { register } = useFormContext()
  const { errors } = useFormApplication()

  const getError = (error: any): string => {
    if (error) return 'error'
    return ''
  }

  return (
    <Container className="row">
      <div className="form-content col-md-3">
        <TooltipComponent
          label="Tipo do produto"
          message="Selecione o tipo do produto"
        />
        <select
          className={`form-control ${getError(
            errors?.overview?.selectTypeProduct
          )}`}
          {...register('overview.selectTypeProduct' as const, {
            required: true
          })}
        >
          <option className="disable" selected={true} disabled>
            selecione
          </option>
          {loadTypeProducts().map(({ key, name, label }) => (
            <option key={key} value={key + '+' + name}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-content col-md-3">
        <TooltipComponent
          label="Grupo do produto"
          message="selecione o grupo do produto"
        />
        <select
          className={`form-control ${getError(errors?.overview?.groupProduct)}`}
          {...register('overview.groupProduct' as const, {
            required: true
          })}
        >
          <option className="disable" selected={true} disabled>
            selecione
          </option>
          {loadGroupProduct().map(({ name, id }) => (
            <option key={id} value={id + '+' + name}>
              {name}
            </option>
          ))}
        </select>
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
