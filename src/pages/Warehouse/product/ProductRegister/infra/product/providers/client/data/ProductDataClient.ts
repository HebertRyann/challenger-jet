import { LoadProductTypeProvider } from '../../../../../data/protocols/provider/product/load/LoadProductTypeProvider'
import { productTypeData } from './data'

export class ProductDataClient implements LoadProductTypeProvider {
  async loadProductTypes(): Promise<
    LoadProductTypeProvider.LoadProductTypeProviderResponse[]
  > {
    const response: LoadProductTypeProvider.LoadProductTypeProviderResponse[] =
      productTypeData.map(({ id, label, name }) => {
        return {
          key: id.toString(),
          label,
          name
        }
      })
    return Promise.resolve(response)
  }
}
