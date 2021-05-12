export interface LoadNatureOperations {
  loadAllNatureOperations: () => Promise<
    LoadNatureOperations.NatureOperationsResponse[]
  >;
}

export namespace LoadNatureOperations {
  export type NatureOperationsResponse = {
    id: number;
    name: string;
    standard: string;
    tax_cfop_id: number;
  };
}
