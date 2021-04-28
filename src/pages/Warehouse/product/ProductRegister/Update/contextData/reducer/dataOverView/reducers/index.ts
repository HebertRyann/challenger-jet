import { TypesDataOvewView } from '../types';
import { TypeDataOverViewActions, DataOvewViewActionTypes } from '../actions';

const {
  CHANGE_SELECT_TYPE_PRODUCT,
  CHANGE_SELECT_GROUP_PRODUCT,
  CHANGE_INPUT_NAME_PRODUCT,
  CHANGE_SELECT_CATEGORY_COST,
  CHANGE_SELECT_SUBCATEGORY_COST,
  CHANGE_SELECT_HAS_VARIATION,
  VALIDATE_DATA_OVER_VIEW,
} = DataOvewViewActionTypes;

export const dataOverViewReducer = (
  state: TypesDataOvewView,
  actions: TypeDataOverViewActions,
) => {
  switch (actions.type) {
    case CHANGE_SELECT_TYPE_PRODUCT:
      actions.payload.data.error = false;
      state.inputs.typeProduct = actions.payload.data;
      return { ...state };
    case CHANGE_SELECT_GROUP_PRODUCT:
      actions.payload.data.error = false;
      state.inputs.groupProduct = actions.payload.data;
      return { ...state };
    case CHANGE_INPUT_NAME_PRODUCT:
      state.inputs.nameProduct = actions.payload.data;
      return { ...state };
    case CHANGE_SELECT_CATEGORY_COST:
      state.inputs.categoryCost = actions.payload.data;
      return state;
    case CHANGE_SELECT_SUBCATEGORY_COST:
      state.inputs.subcategoryCost = actions.payload.data;
      return state;
    case CHANGE_SELECT_HAS_VARIATION:
      state.inputs.hasVariation = actions.payload;
      return state;
    case VALIDATE_DATA_OVER_VIEW:
      if (state.inputs.typeProduct.value === '')
        state.inputs.typeProduct.error = true;
      if (state.inputs.groupProduct.value === '')
        state.inputs.groupProduct.error = true;
      console.log(state.inputs);
      return { ...state };
    default:
      return state;
  }
};
