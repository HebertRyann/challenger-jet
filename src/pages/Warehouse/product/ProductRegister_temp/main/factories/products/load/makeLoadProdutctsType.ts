import { LoadTypeProduct } from '../../../../domain/useCases/product/load/LoadTypeProduct'
import { LoadProductsType } from '../../../../data/useCases/product/load/LoadProductsType'
import { ProductDataClient } from '../../../../infra/product/providers/client/data/ProductDataClient'

export const makeLoadProdutctsType = (): LoadTypeProduct =>
  new LoadProductsType(new ProductDataClient())
