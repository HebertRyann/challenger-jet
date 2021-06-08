import { LoadUnitMensuredProduct } from '../../../../domain/useCases/product/load/LoadUnitMensuredProduct'
import { LoadProductsUnitMensured } from '../../../../data/useCases/product/load/LoadProductsUnitMensured'
import { ProductHttpClient } from '../../../../infra/product/providers/client/http/ProductHttpClient'

export const makeLoadProdutctsUnitMensured = (): LoadUnitMensuredProduct =>
  new LoadProductsUnitMensured(
    new ProductHttpClient(),
    `${process.env.REACT_APP_API_URL}/productUnitMeasured/`
  )
