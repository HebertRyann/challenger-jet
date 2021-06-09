import { LoadGroupProduct } from '../../../../domain/useCases/product/load/LoadGroupProduct'
import { LoadGroupProductProvider } from '../../../protocols/provider/product/load/LoadProductGroupProvider'

export class LoadProductsGroup implements LoadGroupProduct {
  constructor(
    private readonly loadGroupProductProvider: LoadGroupProductProvider,
    private readonly url: string
  ) {}

  async loadGroupProduct(): Promise<LoadGroupProduct.Response[]> {
    try {
      const response = await this.loadGroupProductProvider.loadGroupProducts(
        this.url
      )
      return response
    } catch (error) {
      return []
    }
  }
}
