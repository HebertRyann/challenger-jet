import React, { useEffect } from 'react'
import { useProduct } from '../../../provider/productProvider'
import { useTabs } from '../../../../../../../../../hooks/tabs'
import { Container } from './styles'
import { nameStock } from '../Stock'
import {
  Atributes,
  PriceResponse
} from '../../../domain/response/productResponse'
import {
  formatProductTypeToLowerCase,
  RE_SALE,
  SALE
} from '../../../../../domain/data/products'
import { TooltipComponent } from '../../../../../../../../../components/TooltipComponent'

export const labelHasVariation = 'Estoque/Variação'
export const nameHasVariation = '@@tabs-view-has-variations'

export const HasVariation = (): JSX.Element => {
  const { disableTab, activeTab } = useTabs()
  const { getProduct } = useProduct()
  const { stocks } = getProduct()

  useEffect(() => {
    if (stocks) {
      if (stocks.length > 1) {
        disableTab(nameStock)
        activeTab(nameHasVariation)
      }
      if (stocks[0].atributes) {
        disableTab(nameStock)
        activeTab(nameHasVariation)
      }
    }
  }, [getProduct()])

  const isSaleOrResaleType = (): boolean => {
    return (
      getProduct().type?.replace(' ', '-') ===
        formatProductTypeToLowerCase(RE_SALE) ||
      getProduct().type?.replace(' ', '-') ===
        formatProductTypeToLowerCase(SALE)
    )
  }

  const renderThAtributes = (): JSX.Element[] => {
    let atributesList: Atributes[] = []

    if (stocks[0].atributes) {
      atributesList = JSON.parse(stocks[0].atributes)
    }

    const capitalizeFirstLetter = (value: string) =>
      value?.[0].toUpperCase() + value?.toLowerCase().substring(1)

    return atributesList.map(({ key }) => (
      <th
        style={
          isSaleOrResaleType()
            ? {
                position: 'relative',
                lineHeight: '50px'
              }
            : {}
        }
        rowSpan={isSaleOrResaleType() ? 2 : 1}
        key={key}
        className="title"
      >
        {capitalizeFirstLetter(key)}
      </th>
    ))
  }

  if (getProduct().stocks) {
    return (
      <Container className="table table-bordered margin-bottom-0">
        <thead>
          <tr>
            <th
              style={
                isSaleOrResaleType()
                  ? {
                      position: 'relative',
                      lineHeight: '50px'
                    }
                  : {}
              }
              rowSpan={isSaleOrResaleType() ? 2 : 1}
              className="title"
            >
              Unidade de medidas
            </th>
            {renderThAtributes()}
            <th
              style={
                isSaleOrResaleType()
                  ? {
                      position: 'relative',
                      lineHeight: '50px'
                    }
                  : {}
              }
              rowSpan={isSaleOrResaleType() ? 2 : 1}
              className="title"
            >
              Estoque atual
            </th>
            <th
              style={
                isSaleOrResaleType()
                  ? {
                      position: 'relative',
                      lineHeight: '50px'
                    }
                  : {}
              }
              rowSpan={isSaleOrResaleType() ? 2 : 1}
              className="title"
            >
              <TooltipComponent
                label="Reposição de estoque"
                message="Reposição de estoque"
                bold
              />
            </th>
            {isSaleOrResaleType() && (
              <th style={{ textAlign: 'center' }} className="title" colSpan={2}>
                Preço
              </th>
            )}
          </tr>
          {isSaleOrResaleType() && (
            <tr>
              <th className="title">Custo</th>
              <th className="title">Venda</th>
            </tr>
          )}
        </thead>
        <tbody>
          {stocks.map(
            ({
              current_stock,
              replacement_point,
              details,
              atributes,
              prices
            }) => {
              let pricesStocks = {} as PriceResponse
              let unitmensured: { unit_mensured: { name: string } } = {
                unit_mensured: { name: '' }
              }

              let atributesList: Atributes[] = []

              if (details) {
                unitmensured = JSON.parse(details)
              }

              if (atributes) {
                atributesList = JSON.parse(atributes)
              }

              if (isSaleOrResaleType() && prices) {
                pricesStocks = JSON.parse(prices.toLowerCase())
              }

              return (
                <tr key={Math.random()} className="items">
                  <td>{unitmensured.unit_mensured.name}</td>
                  {atributesList.map(({ value }) => (
                    <td key={Math.random()}>{value}</td>
                  ))}
                  <td>{current_stock}</td>
                  <td>{replacement_point}</td>
                  {isSaleOrResaleType() && (
                    <>
                      <td>{pricesStocks.price_cost}</td>
                      <td>{pricesStocks.price_sale}</td>
                    </>
                  )}
                </tr>
              )
            }
          )}
        </tbody>
      </Container>
    )
  }
  return <div></div>
}
