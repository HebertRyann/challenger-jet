import { LoadTaxSituations } from '../../../../../../domain/useCases/FIscal/TaxSituations/Load'

export interface HttpClientLoadTaxSituations {
  loadAllTaxSituations: () => Promise<
    LoadTaxSituations.LoadTaxSituationsResponse[]
  >
}
