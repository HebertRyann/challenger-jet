import { LoadAllNCM } from '../../../../../domain/useCases/FIscal/NCM/Load'
import { LoadAllNCMData } from '../../../../../data/useCases/Fiscal/NCM/Load'
import { makeHttpClientFiscal } from '../httpClientFIscal/makeHttpClientFiscal'

export const makeLoadAllNCM = (): LoadAllNCM => {
  return new LoadAllNCMData(makeHttpClientFiscal())
}
