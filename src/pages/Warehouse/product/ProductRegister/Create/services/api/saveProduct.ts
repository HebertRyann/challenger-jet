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
  try {
    const { status, data } = await api.post('/product', {
      params,
    });
    if (data.error) {
      return { error: { code: data.error.code, message: data.error.message } };
    }
    return {
      data,
    };
  } catch (error) {
    return {
      error: { code: 500, message: 'Não foi possivel salvar o produto' },
    };
  }
};
