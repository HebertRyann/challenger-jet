import { LoadGroupProductProvider } from '../../../../../data/protocols/provider/product/load/LoadProductGroupProvider'
import axios from 'axios'
export class ProductHttpClient implements LoadGroupProductProvider {
  async loadGroupProducts(
    url: string
  ): Promise<LoadGroupProductProvider.LoadGroupProductProviderResponse[]> {
    try {
      const response = await axios.get<
        LoadGroupProductProvider.LoadGroupProductProviderResponse[]
      >(url)

      console.log(response)

      return []
    } catch (error) {
      console.error(error)
      return []
    }
  }
}
