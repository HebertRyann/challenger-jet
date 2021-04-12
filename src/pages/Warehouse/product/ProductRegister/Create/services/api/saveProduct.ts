import {
  CompositionRequest,
  PriceCompositionAndFiscal,
  TypeProductStock,
  TypeProductDataOverView,
  ResultOnSaveProdut,
} from '../../providers/domain.types';
import api from '../../../../../../../services/api';
type SaveProductParams = {
  composition?: CompositionRequest[];
  price_composition_fiscal?: PriceCompositionAndFiscal;
  stock: TypeProductStock[];
  details_overview: TypeProductDataOverView;
};

export const saveProduct = async (
  params: SaveProductParams,
): Promise<ResultOnSaveProdut> => {
  console.log(params);
  const { status } = await api.post('/product', { params });
  if (status !== 201) {
    return {
      status: { code: status, message: 'Erro ao cadastrar o produto' },
    };
  }
  return {
    status: {
      code: 201,
      message: 'Produto cadastrado com sucesso',
    },
  };
};
