import { CategoryCostModel } from '../../../../../domain/models/categoryCost'

export interface LoadCategoryCostProvider {
  loadProductCategoryCost: (
    url: string
  ) => Promise<LoadCategoryCostProvider.Response[]>
}

export namespace LoadCategoryCostProvider {
  export type Response = CategoryCostModel
}
