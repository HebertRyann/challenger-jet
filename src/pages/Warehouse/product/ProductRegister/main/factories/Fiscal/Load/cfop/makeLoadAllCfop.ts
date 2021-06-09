import { LoadAllCFOP } from '../../../../../domain/useCases/FIscal/CFOP/Load'
import { LoadAllCFOPData } from '../../../../../data/useCases/Fiscal/CFOP/Load'
import { makeHttpClientFiscal } from '../httpClientFIscal/makeHttpClientFiscal'

export const makeLoadAllCfop = (): LoadAllCFOP => {
  return new LoadAllCFOPData(makeHttpClientFiscal())
}
