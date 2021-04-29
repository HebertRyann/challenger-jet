export type TypeProduct = {
  id: number;
  name: string;
  error?: boolean;
};

export type GroupProduct = {
  id: number;
  name: string;
  error?: boolean;
};

export type CategoryCost = {
  id: number;
  name: string;
  parent_id?: number;
  error?: boolean;
};

export type SubCategoryCost = {
  id: number;
  parent_id?: number;
  name: string;
  error?: boolean;
};

export type InputOrSelectDataOverView = {
  id?: number;
  parent_id?: number;
  value: string;
  error?: boolean;
};

export type SelectTypeProduct = {
  id?: number;
  parent_id?: number;
  value: string;
  label?: string;
  error?: boolean;
};

export type HasVariationType = {
  name: string;
  hasVariation: boolean;
  error?: boolean;
};

export type TypesDataOvewView = {
  typeProductList: TypeProduct[];
  groupProductList: GroupProduct[];
  categoryCostList: CategoryCost[];
  subcategoryCostList: SubCategoryCost[];
  inputs: {
    typeProduct: SelectTypeProduct;
    groupProduct: InputOrSelectDataOverView;
    nameProduct: InputOrSelectDataOverView;
    categoryCost: InputOrSelectDataOverView;
    subcategoryCost: InputOrSelectDataOverView;
    hasVariation: HasVariationType;
  };
};
