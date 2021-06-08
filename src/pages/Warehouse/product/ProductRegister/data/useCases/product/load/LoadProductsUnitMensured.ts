import { LoadTypeProduct } from '../../../../domain/useCases/product/load/LoadTypeProduct'
import { LoadProductUnitMensuredProvider } from '../../../protocols/provider/product/load/LoadProductUnitMensuredProvider'

export class LoadProductsUnitMensured implements LoadTypeProduct {
  constructor(
    private readonly loadProductUnitMensuredProvider: LoadProductUnitMensuredProvider,
    private readonly url: string
  ) {}

  async loadTypeProduct(): Promise<LoadTypeProduct.Response[]> {
    const response =
      await this.loadProductUnitMensuredProvider.loadProductUnitMensured(
        this.url
      )
    return response
  }
}
