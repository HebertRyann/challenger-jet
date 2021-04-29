import {
  HasVariationActionTypes,
  TypeHasVariationAction,
  TypeHasVariationState,
} from './types';

export const hasVariationReducer = (
  state: TypeHasVariationState,
  actions: TypeHasVariationAction,
) => {
  console.log('Teste');
  switch (actions.type) {
    case HasVariationActionTypes.SELECT_UNIT_MENSURED:
      state.hasVariation.inputs[actions.payload.index].unitMensured.value =
        actions.payload.value;
      console.log(actions.type);
      return state;
    case HasVariationActionTypes.CHANGE_CURRENT_STOCK:
      console.log(actions.type);
      return state;
    case HasVariationActionTypes.CHANGE_REPLACEMENT_POINT:
      console.log(actions.type);
      return state;
    case HasVariationActionTypes.CHANGE_COST:
      console.log('testetste');
      console.log(actions.type);
      return state;
    case HasVariationActionTypes.TOGGLE_SELECT_ATRIBUTE:
      console.log(actions.type);
      return state;
    default:
      return state;
  }
};

export const hasVariationMainReducer = (
  { hasVariation }: { hasVariation: TypeHasVariationState },
  action: TypeHasVariationAction,
) => ({
  hasVariation: hasVariationReducer(hasVariation, action),
});
