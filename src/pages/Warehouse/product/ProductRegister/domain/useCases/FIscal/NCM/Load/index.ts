export interface LoadAllNCM {
  loadAllNCM: () => Promise<LoadAllNCM.NCMResponse[]>;
}

export namespace LoadAllNCM {
  export type NCMResponse = {
    id: number;
    code: string;
    descriptions: string;
    national_federal: string | null;
    imported_federal: string | null;
    state: string | null;
    municipal: string | null;
    reference: string | null;
    level: number;
  };
}
