import { GroupProductModel } from '../../../../../domain/models/groupProduct'

export interface LoadGroupProductProvider {
  loadGroupProducts: (
    url: string
  ) => Promise<LoadGroupProductProvider.Response[]>
}

export namespace LoadGroupProductProvider {
  export type Response = GroupProductModel
}
