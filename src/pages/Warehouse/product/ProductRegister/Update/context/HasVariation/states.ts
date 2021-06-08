import { TypeHasVariationState } from './types'

export const initialStateHasVariation: TypeHasVariationState = {
  hasVariation: {
    inputs: [
      {
        unitMensured: {
          value: ''
        },
        currentStock: {
          value: ''
        },
        replamenentPoint: { value: '' },
        price: {
          cost: { value: '' },
          sale: { value: '' }
        },
        atributes: [{ id: 0, name: '' }]
      }
    ]
  }
}
