export type Atributes = {
  key: string;
  value: string;
};

export type CompositonView = {
  name: string;
  cost: number;
  amount: number;
};

export type FiscalView = {
  ncm: number;
  cfop: number;
  icms_tax_origem: number;
  icms_tax_situation: number;
  ipi_tax_situation: number;
  pis_tax_situation: number;
  cofins_tax_situation: number;
};

export type PriceCompositionView = {
  dif: number;
  ipi: number;
  fixed_cost: number;
  margin_profit: number;
};

export type PriceResponse = {
  price_cost: number;
  price_sale: number;
};

export type ProductResponse = {
  id: number;
  name: string;
  composition: string | undefined;
  created_at: string;
  updated_at: string;
  deleted_at: string | undefined;
  details: string;
  fiscal: string | null;
  price_composition: string | null;
  type: string;
  subfinancial_category: {
    id: number;
    name: string;
  };
  financial_category: {
    id: number;
    name: string;
  };
  product_category: {
    id: number;
    name: string;
  };
  stocks: [
    {
      unit_mensured_id: number;
      current_stock: number;
      replacement_point: number;
      prices: string | null;
      atributes: string | null;
      details: string | null;
    },
  ];
  prices: string;
};
