import { GroupProductModel } from '../../../models/groupProduct'

export interface LoadGroupProduct {
  loadGroupProduct: () => Promise<LoadGroupProduct.LoadGroupProductResponse[]>
}

export namespace LoadGroupProduct {
  export type LoadGroupProductResponse = GroupProductModel
}
