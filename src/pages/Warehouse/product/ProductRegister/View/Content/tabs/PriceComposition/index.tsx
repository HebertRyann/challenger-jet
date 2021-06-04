import React, { useEffect } from 'react'
import {
  formatProductTypeToLowerCase,
  RE_SALE,
  SALE
} from '../../../../domain/products'
import { PriceCompositionView } from '../../../domain/response/productResponse'
import { useProduct } from '../../../provider/productProvider'
import { Container } from './style'
import { useTabs } from '../../../../../../../../hooks/tabs'

export const labelPriceComposition = 'Formação de preço'
export const namePriceComposition = '@@tabs-view-PriceComposition'

export const PriceComposition = (): JSX.Element => {
  const { getProduct } = useProduct()
  const { price_composition } = getProduct()
  let priceCompositionList: PriceCompositionView = {} as PriceCompositionView
  const { activeTab } = useTabs()

  if (price_composition) {
    priceCompositionList = JSON.parse(price_composition.toLowerCase())
  }

  useEffect(() => {
    if (
      getProduct().type?.replace(' ', '-') ===
        formatProductTypeToLowerCase(RE_SALE) ||
      getProduct().type?.replace(' ', '-') ===
        formatProductTypeToLowerCase(SALE)
    ) {
      activeTab(namePriceComposition)
    }
  }, [activeTab, getProduct])

  return (
    <Container>
      <div className="row">
        <div className="form-content col-md-3">
          <label htmlFor="Peso">Margem de lucro</label>
          <p>{priceCompositionList.dif?.toFixed(3)}</p>
        </div>
        <div className="form-content col-md-3">
          <label htmlFor="tipo do produto">Simples nacional (%)</label>
          <p>{Number(priceCompositionList.simple_national).toFixed(2)}</p>
        </div>
        <div className="form-content col-md-3">
          <label htmlFor="tipo do produto">IPI (%)</label>
          <p>{priceCompositionList.fixed_cost?.toFixed(2)}</p>
        </div>
        <div className="form-content col-md-3">
          <label htmlFor="tipo do produto">Custo fixo</label>
          <p>{priceCompositionList.ipi?.toFixed(2)}</p>
        </div>
      </div>
      <div style={{ marginTop: '20px' }} className="row">
        <div className="form-content col-md-3">
          <label htmlFor="tipo do produto">DIF ICMS</label>
          <p>{priceCompositionList.margin_profit?.toFixed(2)}</p>
        </div>
      </div>
    </Container>
  )
}
