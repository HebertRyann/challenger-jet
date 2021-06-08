import { UnitMensuredProductModel } from '../../../models/unitMensuredProduct'

export interface LoadTypeProduct {
  loadTypeProduct: () => Promise<LoadTypeProduct.Response[]>
}

export namespace LoadTypeProduct {
  export type Response = UnitMensuredProductModel
}
