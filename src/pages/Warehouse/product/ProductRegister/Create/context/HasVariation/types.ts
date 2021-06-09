type TypeActionsMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] }
}

export type Atribute = {
  id: number
  name: string
  parent_id?: number
  isChecked?: boolean
  error?: boolean
}

type Input = {
  value: string
  error?: boolean
}

export type InputsHasVariation = {
  unitMensured: Input
  currentStock: Input
  replamenentPoint: Input
  atributes: Atribute[]
  price: {
    cost: Input
    sale: Input
  }
}

export type TypeHasVariationState = {
  hasVariation: { inputs: InputsHasVariation[] }
}

export enum HasVariationActionTypes {
  LOAD_ATRIBUTES = '@@ACTIONS/ATRIBUTE/LOAD',
  TOGGLE_SELECT_ATRIBUTE = '@@ACTIONS/ATRIBUTE/TOGGLE/SELECTED',
  SELECT_UNIT_MENSURED = '@@ACTIONS/INPUT/SELECT/UNIT_MENSURED',
  CHANGE_CURRENT_STOCK = '@@ACTIONS/INPUT/CHANGE/CURRENT_STOCK',
  CHANGE_REPLACEMENT_POINT = '@@ACTIONS/INPUT/CHANGE/REPLACEMENT_POINT',
  CHANGE_COST = '@@ACTIONS/INPUT/CHANGE/COST'
}

export type TypeHasVariationActionPayload = {
  [HasVariationActionTypes.TOGGLE_SELECT_ATRIBUTE]: {
    id: number
    name: string
  }
  [HasVariationActionTypes.SELECT_UNIT_MENSURED]: {
    index: number
    value: string
  }
  [HasVariationActionTypes.CHANGE_CURRENT_STOCK]: {
    index: number
    value: string
  }
  [HasVariationActionTypes.CHANGE_REPLACEMENT_POINT]: {
    index: number
    value: string
  }
  [HasVariationActionTypes.CHANGE_COST]: {
    index: number
    value: string
  }
}

export type TypeHasVariationAction =
  TypeActionsMap<TypeHasVariationActionPayload>[keyof TypeActionsMap<TypeHasVariationActionPayload>]
