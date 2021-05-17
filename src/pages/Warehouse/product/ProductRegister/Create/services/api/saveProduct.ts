import {
  CompositionRequest,
  PriceCompositionAndFiscal,
  TypeProductStock,
  TypeProductDataOverView,
  ResultOnSaveProdut,
} from '../../providers/domain.types';
import api from '../../../../../../../services/api';
type SaveProductParams = {
  user_id: string;
  composition?: CompositionRequest[];
  price_composition_fiscal?: PriceCompositionAndFiscal;
  stock: TypeProductStock[];
  details_overview: TypeProductDataOverView;
};

export const saveProduct = async (
  params: SaveProductParams,
): Promise<ResultOnSaveProdut> => {
  const { status, data } = await api.post('/product', {
    params,
  });

  return { code: status, data };
};
