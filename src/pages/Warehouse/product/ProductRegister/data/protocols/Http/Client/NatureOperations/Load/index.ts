import { LoadNatureOperations } from '../../../../../../domain/useCases/FIscal/NatureOperations/Load'

export interface HttpClientLoadNatureOperations {
  loadAllNatureOperations: () => Promise<
    LoadNatureOperations.NatureOperationsResponse[]
  >
}
