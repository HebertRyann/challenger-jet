import { LoadTypeProduct } from '../../../../domain/useCases/product/load/LoadTypeProduct'
import { LoadProductTypeProvider } from '../../../protocols/provider/product/load/LoadProductTypeProvider'

export class LoadProductsType implements LoadTypeProduct {
  constructor(
    private readonly loadProductTypeProvider: LoadProductTypeProvider
  ) {}

  async loadTypeProduct(): Promise<LoadTypeProduct.LoadTypeProductResponse[]> {
    const response = await this.loadProductTypeProvider.loadProductTypes()
    return response
  }
}
