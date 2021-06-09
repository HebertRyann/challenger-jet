import { TypeProductModel } from '../../../../../domain/models/typeProduct'

export interface LoadProductTypeProvider {
  loadProductTypes: () => Promise<LoadProductTypeProvider.Response[]>
}

export namespace LoadProductTypeProvider {
  export type Response = TypeProductModel
}
