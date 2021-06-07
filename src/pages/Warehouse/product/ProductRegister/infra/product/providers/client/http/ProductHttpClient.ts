import api from '../../../../../../../../../services/api'
import { LoadGroupProductProvider } from '../../../../../data/protocols/provider/product/load/LoadProductGroupProvider'
import { LoadCategoryCostProvider } from '../../../../../data/protocols/provider/product/load/LoadCategoryCostProvider'

export class ProductHttpClient
  implements LoadGroupProductProvider, LoadCategoryCostProvider
{
  async loadProductCategoryCost(
    url: string
  ): Promise<LoadCategoryCostProvider.LoadCategoryCostProviderResponse[]> {
    try {
      const { data } = await api.get<
        LoadCategoryCostProvider.LoadCategoryCostProviderResponse[]
      >(url)
      return data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async loadGroupProducts(
    url: string
  ): Promise<LoadGroupProductProvider.LoadGroupProductProviderResponse[]> {
    try {
      const { data } = await api.get<
        LoadGroupProductProvider.LoadGroupProductProviderResponse[]
      >(url)

      return data
    } catch (error) {
      console.error(error)
      return []
    }
  }
}
