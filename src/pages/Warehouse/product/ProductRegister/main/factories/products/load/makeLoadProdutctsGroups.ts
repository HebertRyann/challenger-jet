import { LoadGroupProduct } from '../../../../domain/useCases/product/load/LoadGroupProduct'
import { LoadProductsGroup } from '../../../../data/useCases/product/load/LoadProductsGroup'
import { ProductHttpClient } from '../../../../infra/product/providers/client/http/ProductHttpClient'

export const makeLoadProdutctsGroups = (): LoadGroupProduct =>
  new LoadProductsGroup(
    new ProductHttpClient(),
    'http://localhost:3333/product/productCategories'
  )
