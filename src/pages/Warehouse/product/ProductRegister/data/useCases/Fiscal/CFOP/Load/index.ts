import { LoadAllCFOP } from '../../../../../domain/useCases/FIscal/CFOP/Load'
import { HttpClientLoadCFOP } from '../../../../protocols/Http/Client/CFOP/Load'

export class LoadAllCFOPData implements LoadAllCFOP {
  constructor(private readonly httpClientLoadCFOP: HttpClientLoadCFOP) {}

  async loadAllCFOP(): Promise<LoadAllCFOP.CFOPResponse[]> {
    try {
      const result = await this.httpClientLoadCFOP.loadAllCFOP()
      return result
    } catch (error) {
      console.warn(error)
      return []
    }
  }
}
