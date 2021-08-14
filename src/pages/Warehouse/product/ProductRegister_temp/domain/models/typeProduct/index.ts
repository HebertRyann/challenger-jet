export type TypeProductModel = {
  name: string
  label: string
  key: string
}

type TypeAtributes = {
  key: number
  value: number
}

export type TypeStockDetails = {
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

export type TypeProductStock = {
  unit_mensured_id: number
  replacement_point: number
  current_stock: number
  price_sale: string
  price_cost: string
  atributes: TypeAtributes[]
  details: TypeStockDetails
}
