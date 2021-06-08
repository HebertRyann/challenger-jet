import React from 'react'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import { Container, Th } from './styles'
import { InputForm } from '../../form/input'
import { useFormApplication } from '../../../../../providers/form/FormProvider'
import { useProduct } from '../../../../../providers/product/ProductProvider'
import { NewSelect } from '../../../../../../../../../../components/NewSelect'
import { getError } from '../../../../../utils/getErrors'
import { useFormContext } from 'react-hook-form'

export const StockTab = (): JSX.Element => {
  const { errors, getValues } = useFormApplication()
  const typeProduct = getValues('overview.typeProduct')
  const { loadUnitMensured } = useProduct()
  const { register } = useFormContext()

  const isSaleOrResale = (): boolean => {
    const productType = typeProduct?.split('+')[1]
    return productType === 'venda' || productType === 'revenda'
  }

  return (
    <Container className="table-responsive">
      <table className="table table-bordered margin-bottom-0">
        <tbody>
          <tr>
            <Th isSale={isSaleOrResale()}>
              <TooltipComponent
                label="Unidade de medidas"
                message="selecione a unidade de medidas"
                bold
              />
            </Th>
            <Th isSale={isSaleOrResale()}>
              <TooltipComponent
                label="Estoque atual"
                message="Informe o estoque atual"
                bold
              />
            </Th>
            <Th isSale={isSaleOrResale()}>
              <TooltipComponent
                label="Reposição de estoque"
                message="Reposição de estoque"
                bold
              />
            </Th>
            {isSaleOrResale() && (
              <th style={{ textAlign: 'center' }} colSpan={2}>
                Preço
              </th>
            )}
          </tr>
          {isSaleOrResale() && (
            <tr>
              <th>Custo</th>
              <th>Venda</th>
            </tr>
          )}

          <tr>
            <td>
              <NewSelect
                className={`form-control ${getError(
                  errors?.stock?.unitMensuredSelect
                )}`}
                {...register('stock.unitMensuredSelect', {
                  required: true
                })}
              >
                {loadUnitMensured().map(({ id, name }) => (
                  <option key={id} value={id + '+' + name}>
                    {name}
                  </option>
                ))}
              </NewSelect>
            </td>
            <td>
              <InputForm
                name={'stock.currentStock'}
                required
                error={errors?.stock?.currentStock}
              />
            </td>
            <td>
              <InputForm
                name={'stock.repositionPoint'}
                required
                error={errors?.stock?.repositionPoint}
              />
            </td>
            {isSaleOrResale() && (
              <td style={{ width: '150px' }}>
                <InputForm
                  name={'stock.price.cost'}
                  error={errors?.stock?.price?.cost}
                />
              </td>
            )}
            {isSaleOrResale() && (
              <td style={{ width: '150px' }}>
                <InputForm
                  disabled
                  name={'stock.price.sale'}
                  error={errors?.stock?.price?.sale}
                />
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </Container>
  )
}
