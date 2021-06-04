import React, { useEffect, useState } from 'react'
import { NewSelect } from '../../../../../../../../../../components/NewSelect'
import { TooltipComponent } from '../../../../../../../../../../components/TooltipComponent'
import { useTabCreate } from '../../../../../providers/tabsProvider'
import { LoadNatureOperations } from '../../../../../../domain/useCases/FIscal/NatureOperations/Load'
import { useTabs } from '../../../../../../../../../../hooks/tabs'
import { LoadTaxSituations } from '../../../../../../domain/useCases/FIscal/TaxSituations/Load'

type TypeIcms = {
  natureOperationsLoader: LoadNatureOperations
  taxSituationsLoader: LoadTaxSituations
}

export const Icms = ({
  natureOperationsLoader,
  taxSituationsLoader
}: TypeIcms): JSX.Element => {
  const { loadCurrentTab } = useTabs()
  const [natureOperations, setNatureOperations] = useState<
    LoadNatureOperations.NatureOperationsResponse[]
  >([])
  const [taxSituations, setTaxSituations] = useState<
    LoadTaxSituations.LoadTaxSituationsResponse[]
  >([])
  const [loadingData, setLoadingData] = useState(false)
  const { fiscal } = useTabCreate()
  const { changeIcmsTaxeIssue, changeIcmsOrigem } = fiscal.setData
  const { icms } = fiscal.getData()
  const { overview } = useTabCreate()

  const { typeSelectProdut } = overview.getData()

  useEffect(() => {
    (async () => {
      const curretTab = loadCurrentTab()
      if (
        curretTab.key === nameFiscalIcms &&
        natureOperations.length < 1 &&
        (typeSelectProdut.value.name === 'Revenda' ||
          typeSelectProdut.value.name === 'Venda')
      ) {
        setLoadingData(true)
        const response = await natureOperationsLoader.loadAllNatureOperations()
        setNatureOperations(response)
        setLoadingData(false)
      }
    })()
  }, [loadCurrentTab(), typeSelectProdut])

  useEffect(() => {
    (async () => {
      const curretTab = loadCurrentTab()
      if (
        curretTab.key === nameFiscalIcms &&
        taxSituations.length < 1 &&
        (typeSelectProdut.value.name === 'Revenda' ||
          typeSelectProdut.value.name === 'Venda')
      ) {
        setLoadingData(true)
        const response = await taxSituationsLoader.loadTaxSituations()
        setTaxSituations(response)
        setLoadingData(false)
      }
    })()
  }, [loadCurrentTab(), typeSelectProdut])

  return (
    <div className="row">
      <div className="form-content col-md-6">
        <TooltipComponent
          label="Situação tributaria"
          message="Situação tributaria do produto"
        />
        <NewSelect
          loading={loadingData}
          onChange={event => {
            const split = event.target.value.split('+')
            const id = split[0]
            const name = split[1]
            changeIcmsTaxeIssue({ id, name })
          }}
          error={icms.taxesIssue.error}
        >
          {taxSituations.map(({ id, code, descriptions }) => (
            <option
              value={`${id}+${code}`}
            >{`${code} - ${descriptions}`}</option>
          ))}
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
          {natureOperations.map(({ id, name }) => (
            <option value={`${id}+${name}`}>{`${name}`}</option>
          ))}
        </NewSelect>
      </div>
    </div>
  )
}

export const nameFiscalIcms = '@@tabs-fiscal-icms'
export const labelFiscalIcms = 'ICMS'
