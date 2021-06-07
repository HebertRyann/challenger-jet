import { GroupProductModel } from '../../../../../domain/models/groupProduct'

export interface LoadGroupProductProvider {
  loadGroupProducts: (
    url: string
  ) => Promise<LoadGroupProductProvider.LoadGroupProductProviderResponse[]>
}

export namespace LoadGroupProductProvider {
  export type LoadGroupProductProviderResponse = GroupProductModel
}
