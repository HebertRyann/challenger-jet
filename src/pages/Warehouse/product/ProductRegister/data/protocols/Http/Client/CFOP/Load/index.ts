import { LoadAllCFOP } from '../../../../../../domain/useCases/FIscal/CFOP/Load';

export interface HttpClientLoadCFOP {
  loadAllCFOP: () => Promise<LoadAllCFOP.CFOPResponse[]>;
}
