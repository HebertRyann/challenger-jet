import { HTTPClientFiscal } from '../../../../../infra/http/axios/fiscal/HTTPClientFiscal'

export const makeHttpClientFiscal = (): HTTPClientFiscal => {
  return new HTTPClientFiscal({
    taxeCfop: `${process.env.REACT_APP_API_URL}/taxes/cfop`,
    taxeNcms: `${process.env.REACT_APP_API_URL}/taxes/ncms`,
    taxeSituation: `${process.env.REACT_APP_API_URL}/taxes/situations`,
    taxeNatureOperations: `${process.env.REACT_APP_API_URL}/taxes/nature_operations`
  })
}
