import { LoadTaxSituations } from '../../../../../domain/useCases/FIscal/TaxSituations/Load'
import { HttpClientLoadTaxSituations } from '../../../../protocols/Http/Client/TaxSituations/Load'

export class LoadAllTaxSituations implements LoadTaxSituations {
  constructor(
    private readonly httpClientLoadTaxSituations: HttpClientLoadTaxSituations
  ) {}

  async loadTaxSituations(): Promise<
    LoadTaxSituations.LoadTaxSituationsResponse[]
  > {
    try {
      const result =
        await this.httpClientLoadTaxSituations.loadAllTaxSituations()
      return result
    } catch (error) {
      console.warn(error)
      return []
    }
  }
}
