import { HttpClientLoadNCM } from '../../../../data/protocols/Http/Client/NCM/Load';
import { LoadAllNCM } from '../../../../domain/useCases/FIscal/NCM/Load';
import apiAxios from '../../../../../../../../services/api';

export class HTTPClientFiscal implements HttpClientLoadNCM {
  constructor(private readonly url: { BASE_LOAD_URL: string }) {}

  async loadAllNCM(): Promise<LoadAllNCM.NCMResponse[]> {
    try {
      console.log('consulta API');
      const { data, status } = await apiAxios.get<LoadAllNCM.NCMResponse[]>(
        this.url.BASE_LOAD_URL,
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
