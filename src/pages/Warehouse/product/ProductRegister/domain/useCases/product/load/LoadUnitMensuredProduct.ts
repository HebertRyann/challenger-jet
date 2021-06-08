import { UnitMensuredProductModel } from '../../../models/unitMensuredProduct'

export interface LoadUnitMensuredProduct {
  loadUnitMensuredProduct: () => Promise<
    LoadUnitMensuredProduct.LoadUnitMensuredProductResponse[]
  >
}

export namespace LoadUnitMensuredProduct {
  export type LoadUnitMensuredProductResponse = UnitMensuredProductModel
}
