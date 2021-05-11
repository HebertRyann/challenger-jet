import { LoadAllNCM } from '../../../../../domain/useCases/FIscal/NCM/Load';
import { LoadAllNCMData } from '../../../../../data/useCases/Fiscal/NCM/Load';
import { HTTPClientFiscal } from '../../../../../infra/http/axios/fiscal/HTTPClientFiscal';

export const makeLoadAllNCM = (): LoadAllNCM => {
  return new LoadAllNCMData(new HTTPClientFiscal());
};
