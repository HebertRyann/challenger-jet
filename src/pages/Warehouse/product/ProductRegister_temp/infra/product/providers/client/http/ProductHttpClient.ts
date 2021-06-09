import api from '../../../../../../../../../services/api'
import { LoadGroupProductProvider } from '../../../../../data/protocols/provider/product/load/LoadProductGroupProvider'
import { LoadCategoryCostProvider } from '../../../../../data/protocols/provider/product/load/LoadCategoryCostProvider'
import { LoadProductUnitMensuredProvider } from '../../../../../data/protocols/provider/product/load/LoadProductUnitMensuredProvider'

export class ProductHttpClient
  implements
    LoadGroupProductProvider,
    LoadCategoryCostProvider,
    LoadProductUnitMensuredProvider
{
  async loadProductUnitMensured(
    url: string
  ): Promise<LoadProductUnitMensuredProvider.Response[]> {
    try {
      const { data } = await api.get<
        LoadProductUnitMensuredProvider.Response[]
      >(url)

      return data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async loadProductCategoryCost(
    url: string
  ): Promise<LoadCategoryCostProvider.Response[]> {
    try {
      const { data } = await api.get<LoadCategoryCostProvider.Response[]>(url)
      return data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async loadGroupProducts(
    url: string
  ): Promise<LoadGroupProductProvider.Response[]> {
    try {
      const { data } = await api.get<LoadGroupProductProvider.Response[]>(url)

      return data
    } catch (error) {
      console.error(error)
      return []
    }
  }
}
