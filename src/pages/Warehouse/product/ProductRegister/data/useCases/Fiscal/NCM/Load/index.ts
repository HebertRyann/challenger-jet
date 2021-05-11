import { LoadAllNCM } from '../../../../../domain/useCases/FIscal/NCM/Load';
import { HttpClientLoadNCM } from '../../../../protocols/Http/Client/NCM/Load';

export class LoadAllNCMData implements LoadAllNCM {
  constructor(private readonly httpClientLoadNCM: HttpClientLoadNCM) {}

  async loadAllNCM(): Promise<LoadAllNCM.NCMResponse[]> {
    try {
      const result = await this.httpClientLoadNCM.loadAllNCM();
      return result;
    } catch (error) {
      console.warn(error);
      return [];
    }
  }
}
