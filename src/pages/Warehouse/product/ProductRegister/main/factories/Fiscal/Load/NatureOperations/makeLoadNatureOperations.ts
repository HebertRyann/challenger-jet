import { LoadNatureOperations } from '../../../../../domain/useCases/FIscal/NatureOperations/Load'
import { LoadAllNatureOperations } from '../../../../../data/useCases/Fiscal/NatureOperations/Load'
import { makeHttpClientFiscal } from '../httpClientFIscal/makeHttpClientFiscal'

export const makeLoadNatureOperations = (): LoadNatureOperations => {
  return new LoadAllNatureOperations(makeHttpClientFiscal())
}
