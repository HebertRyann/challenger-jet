import React, { useEffect, useState } from 'react'
import { NewSelect } from '../../../../../../../../../../components/NewSelect'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import { useTabCreate } from '../../../../../providers/tabsProvider'
import { useTabs } from '../../../../../../../../../../hooks/tabs'
import { LoadTaxSituations } from '../../../../../../domain/useCases/FIscal/TaxSituations/Load'

type TypePis = {
  taxSituationsLoader: LoadTaxSituations
}

export const Pis = ({ taxSituationsLoader }: TypePis): JSX.Element => {
  const { loadCurrentTab } = useTabs()
  const [taxSituations, setTaxSituations] = useState<
    LoadTaxSituations.LoadTaxSituationsResponse[]
  >([])
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    ;(async () => {
      const curretTab = loadCurrentTab()
      if (curretTab.key === nameFiscalPis && taxSituations.length < 1) {
        setLoadingData(true)
        const response = await taxSituationsLoader.loadTaxSituations()
        setTaxSituations(response)
        setLoadingData(false)
      }
    })()
  }, [loadCurrentTab()])

  const { fiscal } = useTabCreate()
  const { changePisTaxeIssue } = fiscal.setData
  const { pis } = fiscal.getData()
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
            changePisTaxeIssue({ id, name })
          }}
          error={pis.taxesIssue.error}
          loading={loadingData}
        >
          {taxSituations.map(({ id, code, descriptions }) => (
            <option
              value={`${id}+${code}`}
            >{`${code} - ${descriptions}`}</option>
          ))}
        </NewSelect>
      </div>
    </div>
  )
}

export const nameFiscalPis = '@@tabs-fiscal-pis'
export const labelFiscalPis = 'Pis'
