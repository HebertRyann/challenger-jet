import {
  CategoryCost,
  GroupProduct,
  TypeProduct,
  SubCategoryCost,
  InputOrSelectDataOverView,
  HasVariationType,
} from '../types';

type TypeActionsMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

export enum DataOvewViewActionTypes {
  ADD_TYPE_PRODUCT = '@@ACTION/DATA_OVEW_VIEW/ADD/TYPE_PRODUCT',
  ADD_GROUP_PRODUCT = '@@ACTION/DATA_OVEW_VIEW/ADD/GROUP_PRODUCT',
  ADD_CATEGORY_COST = '@@ACTION/DATA_OVEW_VIEW/ADD/CATEGORY_COST',
  ADD_SUBCATEGORY_COST = '@@ACTION/DATA_OVEW_VIEW/ADD/SUBCATEGORY_COST',
  CHANGE_SELECT_TYPE_PRODUCT = '@@ACTION/DATA_OVEW_VIEW/CHANGE/SELECT/TYPE_PRODUCT',
  CHANGE_SELECT_GROUP_PRODUCT = '@@ACTION/DATA_OVEW_VIEW/CHANGE/SELECT/GROUP_PRODUCT',
  CHANGE_INPUT_NAME_PRODUCT = '@@ACTION/DATA_OVEW_VIEW/CHANGE/INPUT/NAME_PRODUCT',
  CHANGE_SELECT_CATEGORY_COST = '@@ACTION/DATA_OVEW_VIEW/CHANGE/SELECT/CATEGORY_COST',
  CHANGE_SELECT_SUBCATEGORY_COST = '@@ACTION/DATA_OVEW_VIEW/CHANGE/SELECT/SUBCATEGORY_COST',
  CHANGE_SELECT_HAS_VARIATION = '@@ACTION/DATA_OVEW_VIEW/CHANGE/SELECT/HAS_VARIATION',
}

type TypeDataOverViewActionsPayload = {
  [DataOvewViewActionTypes.ADD_TYPE_PRODUCT]: {
    typeProduct: TypeProduct[];
  };
  [DataOvewViewActionTypes.ADD_GROUP_PRODUCT]: {
    groupProduct: GroupProduct[];
  };
  [DataOvewViewActionTypes.ADD_CATEGORY_COST]: {
    categoryCost: CategoryCost[];
  };
  [DataOvewViewActionTypes.ADD_SUBCATEGORY_COST]: {
    subcategoryCost: SubCategoryCost[];
  };
  [DataOvewViewActionTypes.CHANGE_SELECT_TYPE_PRODUCT]: {
    data: InputOrSelectDataOverView;
  };
  [DataOvewViewActionTypes.CHANGE_SELECT_GROUP_PRODUCT]: {
    data: InputOrSelectDataOverView;
  };
  [DataOvewViewActionTypes.CHANGE_INPUT_NAME_PRODUCT]: {
    data: InputOrSelectDataOverView;
  };
  [DataOvewViewActionTypes.CHANGE_SELECT_CATEGORY_COST]: {
    data: InputOrSelectDataOverView;
  };
  [DataOvewViewActionTypes.CHANGE_SELECT_SUBCATEGORY_COST]: {
    data: InputOrSelectDataOverView;
  };
  [DataOvewViewActionTypes.CHANGE_SELECT_HAS_VARIATION]: HasVariationType;
};

export type TypeDataOverViewActions = TypeActionsMap<TypeDataOverViewActionsPayload>[keyof TypeActionsMap<TypeDataOverViewActionsPayload>];
