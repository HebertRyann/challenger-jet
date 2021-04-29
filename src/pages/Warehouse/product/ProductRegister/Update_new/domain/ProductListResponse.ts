export type ProductListResponse = {
  id: string;
  product_category_id: number;
  financial_category_id: number;
  type: string;
  name: string;
  details: string;
  composition: string | null;
  fiscal: string | null;
  price_composition: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
