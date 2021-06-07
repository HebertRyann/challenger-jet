import React from 'react'
import { useFormContext } from 'react-hook-form'
import { NewSelect } from '../../../../../../../../../../components/NewSelect'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import { useProduct } from '../../../../../providers/product/ProductProvider'
import { Container } from './styles'

export const DetailsTab = (): JSX.Element => {
  const { loadTypeProducts } = useProduct()
  const productTypes = loadTypeProducts()
  const { register } = useFormContext()

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
    </Container>
  )
}
