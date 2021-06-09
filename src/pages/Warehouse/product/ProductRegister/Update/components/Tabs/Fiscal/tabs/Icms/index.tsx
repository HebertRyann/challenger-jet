import React from 'react'
import { NewSelect } from '../../../../../../../../../../components/NewSelect'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import { useTabCreate } from '../../../../../providers/tabsProvider'
import { dataIcms } from './icms'
export const nameFiscalIcms = '@@tabs-fiscal-icms'
export const labelFiscalIcms = 'ICMS'

export const Icms = (): JSX.Element => {
  const { fiscal } = useTabCreate()
  const { changeIcmsTaxeIssue, changeIcmsOrigem } = fiscal.setData
  const { icms } = fiscal.getData()
  return (
    <div className="row">
      <div className="form-content col-md-6">
        <TooltipComponent
          label="Situação tributaria"
          message="Situação tributaria do produto"
        />
        <NewSelect
          onChange={event => {
            const split = event.target.value.split('+')
            const id = split[0]
            const name = split[1]
            changeIcmsTaxeIssue({ id, name })
          }}
          error={icms.taxesIssue.error}
        >
          {/* {dataIcms.map(({ id, name }) => (
            <option value={`${id}+${name}`}>{name}</option>
          ))} */}
        </NewSelect>
      </div>
      <div className="form-content col-md-6">
        <TooltipComponent label="Origem" message="Origem do produto" />
        <NewSelect
          onChange={event => {
            const split = event.target.value.split('+')
            const id = split[0]
            const name = split[1]
            changeIcmsOrigem({ id, name })
          }}
          error={icms.origem.error}
        >
          {/* {dataIcms.map(({ id, name }) => (
            <option value={`${id}+${name}`}>{name}</option>
          ))} */}
        </NewSelect>
      </div>
    </div>
  )
}
