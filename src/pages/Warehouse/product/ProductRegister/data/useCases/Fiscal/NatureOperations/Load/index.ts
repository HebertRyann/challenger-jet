import { LoadNatureOperations } from '../../../../../domain/useCases/FIscal/NatureOperations/Load';
import { HttpClientLoadNatureOperations } from '../../../../protocols/Http/Client/NatureOperations/Load';

export class LoadAllNatureOperations implements LoadNatureOperations {
  constructor(
    private readonly httpClientNatureOperations: HttpClientLoadNatureOperations,
  ) {}
  async loadAllNatureOperations(): Promise<
    LoadNatureOperations.NatureOperationsResponse[]
  > {
    try {
      const result = await this.httpClientNatureOperations.loadAllNatureOperations();
      return result;
    } catch (error) {
      console.warn(error);
      return [];
    }
  }
}
