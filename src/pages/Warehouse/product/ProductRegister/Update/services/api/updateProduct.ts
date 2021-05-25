import {
  CompositionRequest,
  PriceCompositionAndFiscal,
  TypeProductStock,
  TypeProductDataOverView,
  ResultOnSaveProdut,
} from '../../providers/domain.types';
import api from '../../../../../../../services/api';
type UpdateProductParams = {
  composition?: CompositionRequest[];
  price_composition_fiscal?: PriceCompositionAndFiscal;
  stock: TypeProductStock[];
  details_overview: TypeProductDataOverView;
  id: string;
};

export const updateProduct = async (
  params: UpdateProductParams,
): Promise<ResultOnSaveProdut> => {
  const { status, data } = await api.put(
    `/product/update/${params.details_overview.id}`,
    {
      params,
    },
  );


  return { code: status, data };
};
