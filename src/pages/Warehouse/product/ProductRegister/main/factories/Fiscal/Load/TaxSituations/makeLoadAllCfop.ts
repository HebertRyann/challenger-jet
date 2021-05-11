import { LoadTaxSituations } from '../../../../../domain/useCases/FIscal/TaxSituations/Load';
import { LoadAllTaxSituations } from '../../../../../data/useCases/Fiscal/TaxSituations/Load';
import { makeHttpClientFiscal } from '../httpClientFIscal/makeHttpClientFiscal';

export const makeLoadAllTaxSituations = (): LoadTaxSituations => {
  return new LoadAllTaxSituations(makeHttpClientFiscal());
};
