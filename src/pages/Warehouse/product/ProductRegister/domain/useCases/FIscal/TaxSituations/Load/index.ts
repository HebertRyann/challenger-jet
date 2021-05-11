export interface LoadTaxSituations {
  loadTaxSituations: () => Promise<
    LoadTaxSituations.LoadTaxSituationsResponse[]
  >;
}

export namespace LoadTaxSituations {
  export type LoadTaxSituationsResponse = {
    id: number;
    code: string;
    descriptions: string;
    reference?: string;
    regime?: string;
    attributes?: string;
    tag?: string;
    active?: boolean;
  };
}
