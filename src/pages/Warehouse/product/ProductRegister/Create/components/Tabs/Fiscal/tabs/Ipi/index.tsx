import React, { useEffect, useState } from 'react'
import { NewSelect } from '../../../../../../../../../../components/NewSelect'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import { useTabCreate } from '../../../../../providers/tabsProvider'
import { useTabs } from '../../../../../../../../../../hooks/tabs'
import { LoadTaxSituations } from '../../../../../../domain/useCases/FIscal/TaxSituations/Load'

type TypeIpi = {
  taxSituationsLoader: LoadTaxSituations
}

export const Ipi = ({ taxSituationsLoader }: TypeIpi): JSX.Element => {
  const { loadCurrentTab } = useTabs()
  const [taxSituations, setTaxSituations] = useState<
    LoadTaxSituations.LoadTaxSituationsResponse[]
  >([])
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    ;(async () => {
      const curretTab = loadCurrentTab()
      if (curretTab.key === nameFiscalIpi && taxSituations.length < 1) {
        setLoadingData(true)
        const response = await taxSituationsLoader.loadTaxSituations()
        setTaxSituations(response)
        setLoadingData(false)
      }
    })()
  }, [loadCurrentTab()])

  const { fiscal } = useTabCreate()
  const { changeIpiTaxeIssue } = fiscal.setData
  const { ipi } = fiscal.getData()
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
            changeIpiTaxeIssue({ id, name })
          }}
          error={ipi.taxesIssue.error}
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

export const nameFiscalIpi = '@@tabs-fiscal-ipi'
export const labelFiscalIpi = 'IPI'
