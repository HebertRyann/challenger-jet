import { TypesDataOvewView } from '../types';
import { TypeDataOverViewActions, DataOvewViewActionTypes } from '../actions';

const {
  CHANGE_SELECT_TYPE_PRODUCT,
  CHANGE_SELECT_GROUP_PRODUCT,
  CHANGE_INPUT_NAME_PRODUCT,
  CHANGE_SELECT_CATEGORY_COST,
  CHANGE_SELECT_SUBCATEGORY_COST,
  CHANGE_SELECT_HAS_VARIATION,
} = DataOvewViewActionTypes;

export const dataOverViewReducer = (
  state: TypesDataOvewView,
  actions: TypeDataOverViewActions,
) => {
  switch (actions.type) {
    case CHANGE_SELECT_TYPE_PRODUCT:
      state.inputs.typeProduct = actions.payload.data;
      return state;
    case CHANGE_SELECT_GROUP_PRODUCT:
      state.inputs.groupProduct = actions.payload.data;
      return state;
    case CHANGE_INPUT_NAME_PRODUCT:
      state.inputs.nameProduct = actions.payload.data;
      return state;
    case CHANGE_SELECT_CATEGORY_COST:
      state.inputs.categoryCost = actions.payload.data;
      return state;
    case CHANGE_SELECT_SUBCATEGORY_COST:
      state.inputs.subcategoryCost = actions.payload.data;
      return state;
    case CHANGE_SELECT_HAS_VARIATION:
      state.inputs.hasVariation = actions.payload;
      return state;
    default:
      return state;
  }
};
