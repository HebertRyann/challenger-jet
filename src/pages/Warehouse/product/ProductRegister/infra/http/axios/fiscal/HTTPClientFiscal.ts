import apiAxios from '../../../../../../../../services/api'
import { HttpClientLoadNCM } from '../../../../data/protocols/Http/Client/NCM/Load'
import { HttpClientLoadCFOP } from '../../../../data/protocols/Http/Client/CFOP/Load'
import { HttpClientLoadTaxSituations } from '../../../../data/protocols/Http/Client/TaxSituations/Load'
import { HttpClientLoadNatureOperations } from '../../../../data/protocols/Http/Client/NatureOperations/Load'
import { LoadAllNCM } from '../../../../domain/useCases/FIscal/NCM/Load'
import { LoadAllCFOP } from '../../../../domain/useCases/FIscal/CFOP/Load'
import { LoadTaxSituations } from '../../../../domain/useCases/FIscal/TaxSituations/Load'
import { LoadNatureOperations } from '../../../../domain/useCases/FIscal/NatureOperations/Load'

export class HTTPClientFiscal
  implements
    HttpClientLoadNCM,
    HttpClientLoadCFOP,
    HttpClientLoadTaxSituations,
    HttpClientLoadNatureOperations {
  constructor(
    private readonly baseUrlLoadersFiscal: {
      taxeSituation: string
      taxeCfop: string
      taxeNcms: string
      taxeNatureOperations: string
    }
  ) {}

  async loadAllNatureOperations(): Promise<
    LoadNatureOperations.NatureOperationsResponse[]
  > {
    try {
      const { data, status } = await apiAxios.get<
        LoadNatureOperations.NatureOperationsResponse[]
      >(this.baseUrlLoadersFiscal.taxeNatureOperations)
      if (status === 200) {
        return data
      }
      return []
    } catch (error) {
      console.warn(error)
      return []
    }
  }

  async loadAllTaxSituations(): Promise<
    LoadTaxSituations.LoadTaxSituationsResponse[]
  > {
    try {
      const { data, status } = await apiAxios.get<
        LoadTaxSituations.LoadTaxSituationsResponse[]
      >(this.baseUrlLoadersFiscal.taxeSituation)
      if (status === 200) {
        return data
      }
      return []
    } catch (error) {
      console.warn(error)
      return []
    }
  }

  async loadAllCFOP(): Promise<LoadAllCFOP.CFOPResponse[]> {
    try {
      const { data, status } = await apiAxios.get<LoadAllCFOP.CFOPResponse[]>(
        this.baseUrlLoadersFiscal.taxeCfop
      )
      if (status === 200) {
        return data
      }
      return []
    } catch (error) {
      console.warn(error)
      return []
    }
  }

  async loadAllNCM(): Promise<LoadAllNCM.NCMResponse[]> {
    try {
      const { data, status } = await apiAxios.get<LoadAllNCM.NCMResponse[]>(
        this.baseUrlLoadersFiscal.taxeNcms
      )
      if (status === 200) {
        return data
      }
      return []
    } catch (error) {
      console.warn(error)
      return []
    }
  }
}
