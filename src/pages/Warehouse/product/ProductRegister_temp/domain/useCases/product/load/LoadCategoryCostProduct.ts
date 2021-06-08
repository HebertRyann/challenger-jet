import { CategoryCostModel } from '../../../models/categoryCost'

export interface LoadCategoryCost {
  loadTypeCategoryCost: () => Promise<LoadCategoryCost.Response[]>
}

export namespace LoadCategoryCost {
  export type Response = CategoryCostModel
}
