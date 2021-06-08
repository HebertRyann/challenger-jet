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
  measureSelect: string
  width: string
  height: string
  length: string
  thickness: string
  descriptionAndDetails: string
  technicalSpecification: string
  wayOfUse: string
}

export type FormState = {
  overview: OverViewFormTypes
  details: DetailsType
}
