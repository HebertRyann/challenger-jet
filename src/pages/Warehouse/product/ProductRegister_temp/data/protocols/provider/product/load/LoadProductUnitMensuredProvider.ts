import { UnitMensuredProductModel } from '../../../../../domain/models/unitMensuredProduct'

export interface LoadProductUnitMensuredProvider {
  loadProductUnitMensured: (
    url: string
  ) => Promise<LoadProductUnitMensuredProvider.Response[]>
}

export namespace LoadProductUnitMensuredProvider {
  export type Response = UnitMensuredProductModel
}
