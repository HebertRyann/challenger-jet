import { LoadAllNCM } from '../../../../../../domain/useCases/FIscal/NCM/Load'

export interface HttpClientLoadNCM {
  loadAllNCM: () => Promise<LoadAllNCM.NCMResponse[]>
}
