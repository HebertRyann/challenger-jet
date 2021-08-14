import React from 'react'
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent'
import { Container, Th } from './styles'
import { useProduct } from '../../../providers/product/ProductProvider'
import { Input, Select } from '../../../../../../../../components/Form'
import { DetailsTab } from '../details'

export const StockTab = (): JSX.Element => {
  const { unitMensured, productType } = useProduct()

  const detailsFields = DetailsTab()

  const isSaleOrResale = (): boolean =>
    productType === 'venda' || productType === 'revenda'

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
              <Select
                className="form-control"
                name="overview.groupProduct"
                options={unitMensured.map(({ id, name }) => ({
                  value: id,
                  name
                }))}
                controlled
                blank
              />
            </td>
            <td>
              <Input className="form-control" name={'stock.currentStock'} />
            </td>
            <td>
              <Input className="form-control" name={'stock.repositionPoint'} />
            </td>
            {isSaleOrResale() && (
              <td style={{ width: '150px' }}>
                <Input className="form-control" name={'stock.price.cost'} />
              </td>
            )}
            {isSaleOrResale() && (
              <td style={{ width: '150px' }}>
                <Input
                  className="form-control"
                  disabled
                  name={'stock.price.sale'}
                />
              </td>
            )}
          </tr>
          <tr style={{ borderTop: '3px solid white' }}>
            <td colSpan={70}>{detailsFields}</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}
