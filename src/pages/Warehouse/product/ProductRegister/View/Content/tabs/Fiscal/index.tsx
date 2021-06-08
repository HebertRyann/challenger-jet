import React, { useEffect } from 'react'
import { useTabs } from '../../../../../../../../hooks/tabs'
import {
  formatProductTypeToLowerCase,
  RE_SALE,
  SALE
} from '../../../../domain/products'
import { FiscalView } from '../../../domain/response/productResponse'
import { useProduct } from '../../../provider/productProvider'
import { Container } from './style'

export const labelFiscal = 'Fiscal'
export const nameFiscal = '@@tabs-view-fiscal'

export const Fiscal = (): JSX.Element => {
  const { getProduct } = useProduct()
  const { fiscal } = getProduct()
  const { activeTab } = useTabs()

  let fiscalList: FiscalView = {} as FiscalView

  useEffect(() => {
    if (
      getProduct().type?.replace(' ', '-') ===
        formatProductTypeToLowerCase(RE_SALE) ||
      getProduct().type?.replace(' ', '-') ===
        formatProductTypeToLowerCase(SALE)
    ) {
      activeTab(nameFiscal)
    }
  }, [getProduct()])

  if (fiscal) {
    fiscalList = JSON.parse(fiscal.toLowerCase())
  }

  return (
    <Container>
      <div className="row">
        <div className="form-content col-md-6">
          <label htmlFor="Peso">NCM</label>
          <p>{fiscalList.ncm}</p>
        </div>
        <div className="form-content col-md-6">
          <label htmlFor="tipo do produto">CFOP</label>
          <p>{fiscalList.cfop}</p>
        </div>
      </div>
      <hr />
      <table className="table table-bordered margin-bottom-0">
        <thead>
          <tr>
            <th colSpan={2} style={{ width: '25%' }} className="title">
              ICMS
            </th>
            <th colSpan={2} style={{ width: '25%' }} className="title">
              IPI
            </th>
            <th colSpan={2} style={{ width: '25%' }} className="title">
              PIS
            </th>
            <th colSpan={2} style={{ width: '25%' }} className="title">
              COFINS
            </th>
          </tr>
          <tr>
            <th style={{ width: '12.5%' }} className="title">
              Situação tributaria
            </th>
            <th style={{ width: '12.5%' }} className="title">
              Origem
            </th>
            <th colSpan={2} style={{ width: '25%' }} className="title">
              Situação tributaria
            </th>
            <th colSpan={2} style={{ width: '25%' }} className="title">
              Situação tributaria
            </th>
            <th colSpan={2} style={{ width: '25%' }} className="title">
              Situação tributaria
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="items">
            <td>{fiscalList?.icms_tax_situation?.toFixed(2)}</td>
            <td>{fiscalList?.icms_tax_origem?.toFixed(2)}</td>
            <td colSpan={2}>{fiscalList?.ipi_tax_situation?.toFixed(2)}</td>
            <td colSpan={2}>{fiscalList?.pis_tax_situation?.toFixed(2)}</td>
            <td colSpan={2}>{fiscalList?.cofins_tax_situation?.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}
