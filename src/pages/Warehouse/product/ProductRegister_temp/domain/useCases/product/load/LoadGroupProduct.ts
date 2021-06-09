import { GroupProductModel } from '../../../models/groupProduct'

export interface LoadGroupProduct {
  loadGroupProduct: () => Promise<LoadGroupProduct.Response[]>
}

export namespace LoadGroupProduct {
  export type Response = GroupProductModel
}
