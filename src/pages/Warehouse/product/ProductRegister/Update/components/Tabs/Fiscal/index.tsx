import React, { useEffect, useState } from 'react'
import {
  Container,
  TabHeaderContainerFiscal,
  TabNameFiscal,
  TabPanelContainerFiscal,
  RenderComponent
} from './style'
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent'
import { useTabs } from '../../../../../../../../hooks/tabs'
import { makeTabsFiscal } from './tabs'
import { useTabCreate } from '../../../providers/tabsProvider'

import { Footer } from '../../footer'
import { NewInput } from '../../../../../../../../components/NewInput'

export const labelFiscal = 'Fiscal'
export const nameFiscal = '@@tabs-fiscal'

export type TypeContentTabsFiscal = {
  name: string
  label: string
  isEnable: boolean
  Component?: JSX.Element
}

export const Fiscal = (): JSX.Element => {
  const {
    loadTabs,
    addTab,
    loadCurrentTab,
    changeCurrentTab,
    changeCurrentTabForNext,
    changeCurrentTabForPrevious
  } = useTabs()
  const { fiscal } = useTabCreate()
  const { ncm, cfop } = fiscal.getData()
  const { changeNCM, changeCFOP } = fiscal.setData
  const [tabs, setTabs] = useState<TypeContentTabsFiscal[]>([])

  useEffect(() => {
    function load() {
      const tabs = makeTabsFiscal()
      tabs.map(tab => addTab(tab))
      changeCurrentTab(tabs[0].name)
      setTabs(loadTabs())
    }
    load()
  }, [])

  const allTabsData = loadTabs()
  return (
    <>
      <Container className="row">
        <div className="form-content col-md-6">
          <TooltipComponent label="NCM" message="Infome o peso em kg" />
          <NewInput
            isNumber
            name="ncm"
            error={ncm.error}
            onChange={event => changeNCM(event.currentTarget.value)}
            className="form-control"
            type="text"
            placeholder="Digíte o código"
            value={ncm.value}
          />
        </div>
        <div className="form-content col-md-6">
          <TooltipComponent
            label="CFOP"
            message="Digíte um código ou descrição CEST"
          />
          <NewInput
            error={cfop.error}
            name="cfop"
            className="form-control"
            type="text"
            isNumber
            onChange={event => changeCFOP(event.currentTarget.value)}
            value={cfop.value}
            placeholder="Digíte o código"
          />
        </div>
      </Container>
      <Container className="row">
        <div className="form-content col-md-12">
          <TabHeaderContainerFiscal>
            {allTabsData.map(
              ({ label, name, isEnable }, index) =>
                isEnable && (
                  <TabNameFiscal
                    key={index}
                    onClick={() => changeCurrentTab(name)}
                    isActive={name === loadCurrentTab().key}
                  >
                    {label}
                  </TabNameFiscal>
                )
            )}
          </TabHeaderContainerFiscal>
          <TabPanelContainerFiscal>
            <hr />
            {loadTabs().map(({ Component, name }) => (
              <RenderComponent isActive={name === loadCurrentTab().key}>
                {Component}
              </RenderComponent>
            ))}
            <hr />
          </TabPanelContainerFiscal>
        </div>
      </Container>
    </>
  )
}
