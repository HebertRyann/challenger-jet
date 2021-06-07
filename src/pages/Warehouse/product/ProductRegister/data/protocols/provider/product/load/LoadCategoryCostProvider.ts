import { CategoryCostModel } from '../../../../../domain/models/categoryCost'

export interface LoadCategoryCostProvider {
  loadProductCategoryCost: () => Promise<
    LoadCategoryCostProvider.LoadCategoryCostProviderResponse[]
  >
}

export namespace LoadCategoryCostProvider {
  export type LoadCategoryCostProviderResponse = CategoryCostModel
}
