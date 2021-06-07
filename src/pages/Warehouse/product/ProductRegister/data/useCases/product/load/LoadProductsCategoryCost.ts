import { LoadCategoryCost } from '../../../../domain/useCases/product/load/LoadCategoryCostProduct'
import { LoadCategoryCostProvider } from '../../../protocols/provider/product/load/LoadCategoryCostProvider'

export class LoadCategoryCostProduct implements LoadCategoryCost {
  constructor(
    private readonly loadCategoryCostProvider: LoadCategoryCostProvider,
    private readonly url: string
  ) {}

  async loadTypeCategoryCost(): Promise<
    LoadCategoryCost.LoadCategoryCostProductResponse[]
  > {
    const response =
      await this.loadCategoryCostProvider.loadProductCategoryCost(this.url)
    return response
  }
}
