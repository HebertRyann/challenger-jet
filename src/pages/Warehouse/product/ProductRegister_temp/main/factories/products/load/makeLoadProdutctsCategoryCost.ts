import { LoadCategoryCost } from '../../../../domain/useCases/product/load/LoadCategoryCostProduct'
import { LoadCategoryCostProduct } from '../../../../data/useCases/product/load/LoadProductsCategoryCost'
import { ProductHttpClient } from '../../../../infra/product/providers/client/http/ProductHttpClient'

export const makeLoadProdutctsCategoryCost = (): LoadCategoryCost =>
  new LoadCategoryCostProduct(
    new ProductHttpClient(),
    `${process.env.REACT_APP_API_URL}/financialCategories/`
  )
