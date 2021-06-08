import { TypeProductModel } from '../../../models/typeProduct'

export interface LoadTypeProduct {
  loadTypeProduct: () => Promise<LoadTypeProduct.Response[]>
}

export namespace LoadTypeProduct {
  export type Response = TypeProductModel
}
