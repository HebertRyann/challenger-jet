type OverViewFormTypes = {
  typeProduct: string
  groupProduct: string
  nameProduct: string
  categoryCost: string
  subcategoryCost: string
  hasVariation: string
}

type DetailsType = {
  weightSelect: string
  weight: string
  measure: string
  width: string
  height: string
  length: string
  thickness: string
}

export type FormState = {
  overview: OverViewFormTypes
  details: DetailsType
}
