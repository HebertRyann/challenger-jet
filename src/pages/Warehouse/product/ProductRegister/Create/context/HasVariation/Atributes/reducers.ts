type TypeAtributesActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

export enum AtributesTypesActions {
  addAtribute = '@@ACTIONS/ATRIBUTE/ADD',
  removeAtribute = '@@ACTIONS/ATRIBUTE/REMOVE',
}

type Atribute = {
  id: number;
  parent_id: number;
  name: string;
  isChecked: boolean;
};

type AtributePayload = {
  [AtributesTypesActions.addAtribute]: {
    id: number;
    parent_id: number;
    name: string;
    isChecked: boolean;
  };
  [AtributesTypesActions.removeAtribute]: {
    id: number;
  };
};

export type AtributeActions = TypeAtributesActionMap<AtributePayload>[keyof TypeAtributesActionMap<AtributePayload>];

export const atributesReducer = (
  state: Atribute[],
  action: AtributeActions,
) => {
  switch (action.type) {
    case AtributesTypesActions.addAtribute:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          parent_id: action.payload.parent_id,
          isChecked: action.payload.isChecked,
        },
      ];
    case AtributesTypesActions.removeAtribute:
      return [...state.filter(atribute => atribute.id !== action.payload.id)];
    default:
      return state;
  }
};
