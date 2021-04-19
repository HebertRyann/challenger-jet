export type ProductResponse = {
  id: 4;
  name: string;
  composition: string | undefined;
  created_at: string;
  updated_at: string;
  deleted_at: string | undefined;
  details: string;
  financial_category_id: 12;
  fiscal: null;
  price_composition: null;
  product_category_id: 1;
  type: string;
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
};
