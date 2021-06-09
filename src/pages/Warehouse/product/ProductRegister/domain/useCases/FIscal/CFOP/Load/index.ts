export interface LoadAllCFOP {
  loadAllCFOP: () => Promise<LoadAllCFOP.CFOPResponse[]>
}

export namespace LoadAllCFOP {
  export type CFOPResponse = {
    id: number
    created_at?: string
    updated_at?: string
    deleted_at?: string
    code: string
    descriptions: string
    applications: string
    reference: string
  }
}
