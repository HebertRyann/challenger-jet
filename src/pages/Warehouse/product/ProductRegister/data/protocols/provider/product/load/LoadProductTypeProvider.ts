import { TypeProductModel } from '../../../../../domain/models/typeProduct'

export interface LoadProductTypeProvider {
  loadProductTypes: () => Promise<
    LoadProductTypeProvider.LoadProductTypeProviderResponse[]
  >
}

export namespace LoadProductTypeProvider {
  export type LoadProductTypeProviderResponse = TypeProductModel
}
