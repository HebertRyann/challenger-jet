import { CategoryCostModel } from '../../../models/categoryCost'

export interface LoadCategoryCost {
  loadTypeProduct: () => Promise<
    LoadCategoryCost.LoadCategoryCostProductResponse[]
  >
}

export namespace LoadCategoryCost {
  export type LoadCategoryCostProductResponse = CategoryCostModel
}
