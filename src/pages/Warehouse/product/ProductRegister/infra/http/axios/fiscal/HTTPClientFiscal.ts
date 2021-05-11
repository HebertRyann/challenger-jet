import { HttpClientLoadNCM } from '../../../../data/protocols/Http/Client/NCM/Load';
import { HttpClientLoadCFOP } from '../../../../data/protocols/Http/Client/CFOP/Load';
import { LoadAllNCM } from '../../../../domain/useCases/FIscal/NCM/Load';
import apiAxios from '../../../../../../../../services/api';
import { LoadAllCFOP } from '../../../../domain/useCases/FIscal/CFOP/Load';

export class HTTPClientFiscal implements HttpClientLoadNCM, HttpClientLoadCFOP {
  async loadAllCFOP(): Promise<LoadAllCFOP.CFOPResponse[]> {
    try {
      console.log('consulta API /taxes/cfop');
      const { data, status } = await apiAxios.get<LoadAllCFOP.CFOPResponse[]>(
        `${process.env.REACT_APP_API_URL}taxes/cfop`,
      );
      if (status === 200) {
        return data;
      }
      return [];
    } catch (error) {
      console.warn(error);
      return [];
    }
  }

  async loadAllNCM(): Promise<LoadAllNCM.NCMResponse[]> {
    try {
      console.log('consulta API /taxes/ncms');
      const { data, status } = await apiAxios.get<LoadAllNCM.NCMResponse[]>(
        `${process.env.REACT_APP_API_URL}taxes/ncms`,
      );
      if (status === 200) {
        return data;
      }
      return [];
    } catch (error) {
      console.warn(error);
      return [];
    }
  }
}
