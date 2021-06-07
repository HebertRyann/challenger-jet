import { CategoryCostModel } from '../../../models/categoryCost'

export interface LoadCategoryCost {
  loadTypeCategoryCost: () => Promise<
    LoadCategoryCost.LoadCategoryCostProductResponse[]
  >
}

export namespace LoadCategoryCost {
  export type LoadCategoryCostProductResponse = CategoryCostModel
}
