import apiAxios from '../../../../../../../../services/api';
import { HttpClientLoadNCM } from '../../../../data/protocols/Http/Client/NCM/Load';
import { HttpClientLoadCFOP } from '../../../../data/protocols/Http/Client/CFOP/Load';
import { HttpClientLoadTaxSituations } from '../../../../data/protocols/Http/Client/TaxSituations/Load';
import { LoadAllNCM } from '../../../../domain/useCases/FIscal/NCM/Load';
import { LoadAllCFOP } from '../../../../domain/useCases/FIscal/CFOP/Load';
import { LoadTaxSituations } from '../../../../domain/useCases/FIscal/TaxSituations/Load';

export class HTTPClientFiscal
  implements
    HttpClientLoadNCM,
    HttpClientLoadCFOP,
    HttpClientLoadTaxSituations {
  constructor(
    private readonly baseUrlLoadersFiscal: {
      taxeSituation: string;
      taxeCfop: string;
      taxeNcms: string;
    },
  ) {}

  async loadAllTaxSituations(): Promise<
    LoadTaxSituations.LoadTaxSituationsResponse[]
  > {
    try {
      console.log(`consulta API ${this.baseUrlLoadersFiscal.taxeSituation}`);
      const { data, status } = await apiAxios.get<
        LoadTaxSituations.LoadTaxSituationsResponse[]
      >(this.baseUrlLoadersFiscal.taxeSituation);
      if (status === 200) {
        return data;
      }
      return [];
    } catch (error) {
      console.warn(error);
      return [];
    }
  }
  async loadAllCFOP(): Promise<LoadAllCFOP.CFOPResponse[]> {
    try {
      console.log(`consulta API ${this.baseUrlLoadersFiscal.taxeCfop}`);
      const { data, status } = await apiAxios.get<LoadAllCFOP.CFOPResponse[]>(
        this.baseUrlLoadersFiscal.taxeCfop,
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
      console.log(`consulta API ${this.baseUrlLoadersFiscal.taxeNcms}`);
      const { data, status } = await apiAxios.get<LoadAllNCM.NCMResponse[]>(
        this.baseUrlLoadersFiscal.taxeNcms,
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
