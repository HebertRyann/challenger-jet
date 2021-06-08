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

type StockType = {
  unitMensuredSelect: string
  currentStock: string
  repositionPoint: string
  price?: {
    cost: string
    sale: string
  }
}

export type FormState = {
  overview: OverViewFormTypes
  details: DetailsType
}
