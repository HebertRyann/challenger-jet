import { TypeProductModel } from '../../../models/typeProduct'

export interface LoadTypeProduct {
  loadTypeProduct: () => Promise<LoadTypeProduct.LoadTypeProductResponse[]>
}

export namespace LoadTypeProduct {
  export type LoadTypeProductResponse = TypeProductModel
}
