import {
  HasVariationActionTypes,
  TypeHasVariationAction,
  TypeHasVariationState,
} from './types';

export const hasVariationReducer = (
  state: TypeHasVariationState,
  actions: TypeHasVariationAction,
) => {
  switch (actions.type) {
    case HasVariationActionTypes.SELECT_UNIT_MENSURED:
      state.hasVariation.inputs[actions.payload.index].unitMensured.value =
        actions.payload.value;
      return state;
    case HasVariationActionTypes.CHANGE_CURRENT_STOCK:
      return state;
    case HasVariationActionTypes.CHANGE_REPLACEMENT_POINT:
      return state;
    case HasVariationActionTypes.CHANGE_COST:
      return state;
    case HasVariationActionTypes.TOGGLE_SELECT_ATRIBUTE:
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
