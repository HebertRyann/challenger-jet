import api from '../../../../../../../../../services/api'
import { LoadGroupProductProvider } from '../../../../../data/protocols/provider/product/load/LoadProductGroupProvider'

export class ProductHttpClient implements LoadGroupProductProvider {
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
