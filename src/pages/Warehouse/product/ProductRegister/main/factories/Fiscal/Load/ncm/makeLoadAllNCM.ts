import { LoadAllNCM } from '../../../../../domain/useCases/FIscal/NCM/Load';
import { LoadAllNCMData } from '../../../../../data/useCases/Fiscal/NCM/Load';
import { HTTPClientFiscal } from '../../../../../infra/http/axios/fiscal/HTTPClientFiscal';

export const makeLoadAllNCM = (): LoadAllNCM => {
  const urlLoadAllNCM = `${process.env.REACT_APP_API_URL}taxes/ncms`;
  return new LoadAllNCMData(
    new HTTPClientFiscal({ BASE_LOAD_URL: urlLoadAllNCM }),
  );
};
