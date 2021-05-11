import { LoadAllCFOP } from '../../../../../domain/useCases/FIscal/CFOP/Load';
import { LoadAllCFOPData } from '../../../../../data/useCases/Fiscal/CFOP/Load';
import { HTTPClientFiscal } from '../../../../../infra/http/axios/fiscal/HTTPClientFiscal';

export const makeLoadAllCfop = (): LoadAllCFOP => {
  return new LoadAllCFOPData(new HTTPClientFiscal());
};
