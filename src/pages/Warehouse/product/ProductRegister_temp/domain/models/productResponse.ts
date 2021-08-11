export type StockResponseType = {
  id: number
  unit_mensured_id: number
  current_stock: number
  replacement_point: number
  prices: string | null
  details: string | null
  atributes: string | null
  product_units_measured: {
    id: number
    name: string
  }
}

export type AtributeResponseType = {
  id: string
  name: string
  keyParent: string
  nameParent: string
}

export type CompositionResponseType = {
  cost: number
  name: string
  amount: number
  stock_id: number
  product_id: number
}

export type PriceCompositionResponserType = {
  dif: number
  ipi: number
  fixed_cost: number
  margin_profit: number
  simple_national: number
}

export type FiscalResponseType = {
  ncm: number
  cfop: number
  icms_tax_origem: string
  ipi_tax_situation: number
  pis_tax_situation: number
  cofins_tax_situation: number
}

export type ProductResponse = {
  id: number
  name: string
  composition: string | null
  created_at: string
  deleted_at: string | null
  details: string
  financial_category_id: number
  fiscal: string | null
  price_composition: string | null
  product_category_id: number
  stocks: StockResponseType[]
  product_category: {
    id: number
    parent_id: number | null
    name: string
  }
  financial_category: {
    id: number
    parent_id: number | null
    name: string
  }
  subfinancial_category: {
    id: number
    parent_id: number | null
    name: string
  }
  type: string
  updated_at: string
}

export type DetailsResponseType = {
  width: number
  height: number
  length: number
  weight: number
  way_use: string
  description_details: string
  technical_specification: string
  measure_weight: string
  thickness: string
  measure: string
}
