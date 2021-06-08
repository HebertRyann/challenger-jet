import { LoadUnitMensuredProduct } from '../../../../domain/useCases/product/load/LoadUnitMensuredProduct'
import { LoadProductUnitMensuredProvider } from '../../../protocols/provider/product/load/LoadProductUnitMensuredProvider'

export class LoadProductsUnitMensured implements LoadUnitMensuredProduct {
  constructor(
    private readonly loadProductUnitMensuredProvider: LoadProductUnitMensuredProvider,
    private readonly url: string
  ) {}

  async loadUnitMensuredProduct(): Promise<LoadUnitMensuredProduct.Response[]> {
    const response =
      await this.loadProductUnitMensuredProvider.loadProductUnitMensured(
        this.url
      )
    return response
  }
}
