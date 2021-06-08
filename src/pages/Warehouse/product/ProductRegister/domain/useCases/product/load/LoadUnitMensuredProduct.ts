import { UnitMensuredProductModel } from '../../../models/unitMensuredProduct'

export interface LoadUnitMensuredProduct {
  loadUnitMensuredProduct: () => Promise<LoadUnitMensuredProduct.Response[]>
}

export namespace LoadUnitMensuredProduct {
  export type Response = UnitMensuredProductModel
}
