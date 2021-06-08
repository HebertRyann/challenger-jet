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

import { NewInput } from '../../../../../../../../components/NewInput'
import { SearchComponentNcm } from './SearchComponent/SearchComponentNcm'
import { SearchComponentCFOP } from './SearchComponent/SearchComponentCfop'
import { LoadAllNCM } from '../../../../domain/useCases/FIscal/NCM/Load'
import { LoadAllCFOP } from '../../../../domain/useCases/FIscal/CFOP/Load'

export const labelFiscal = 'Fiscal'
export const nameFiscal = '@@tabs-fiscal'

export type TypeContentTabsFiscal = {
  name: string
  label: string
  isEnable: boolean
  Component: JSX.Element
}

type TypeFiscal = {
  ncmLoader: LoadAllNCM
  cfopLoader: LoadAllCFOP
}

export const Fiscal = ({ ncmLoader, cfopLoader }: TypeFiscal): JSX.Element => {
  const { loadTabs, addTab, loadCurrentTab, changeCurrentTab } = useTabs()
  const { fiscal } = useTabCreate()
  const { ncm, cfop } = fiscal.getData()
  const { changeNCM, changeCFOP } = fiscal.setData
  const [tabs, setTabs] = useState<TypeContentTabsFiscal[]>([])
  const [loadingNcm, setLoadingNcm] = useState(false)
  const [loadingCfop, setLoadingCfop] = useState(false)
  const [dataNcmList, setDataNcmList] = useState<LoadAllNCM.NCMResponse[]>([])
  const [dataNcmListSearch, setDataNcmListSearch] = useState<
    LoadAllNCM.NCMResponse[]
  >([])
  const [dataCFOPListSearch, setDataCFOPListSearch] = useState<
    LoadAllCFOP.CFOPResponse[]
  >([])
  const [dataCFOPList, setDataCFOPList] = useState<LoadAllCFOP.CFOPResponse[]>(
    []
  )
  const [activeSearch, setActiveSearch] = useState(false)
  const [activeSearchCFOP, setActiveSearchCFOP] = useState(false)

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

  const handlerChangeInputNCM = async (value: string) => {
    changeNCM(value)
    if (value.length > 0) {
      if (dataNcmList.length === 0) {
        setLoadingNcm(true)
        const result = await ncmLoader.loadAllNCM()
        setDataNcmList(result)
        setLoadingNcm(false)
      }
      const matchList = dataNcmList.filter(({ code }) => {
        const codeMatch = code.toString()
        const regex = new RegExp(`^${value}`, 'gi')
        return code.match(codeMatch)
      })
      if (matchList.length > 0) {
        setActiveSearch(true)
        setDataNcmListSearch(matchList)
      } else {
        setActiveSearch(false)
      }
    } else {
      setActiveSearch(false)
    }
  }

  const handlerOnClickRowSearchNCM = (value: LoadAllNCM.NCMResponse) => {
    changeNCM(value.code.toString())
    setActiveSearch(false)
  }

  const handlerChangeInputCFOP = async (value: string) => {
    changeCFOP(value)
    if (value.length > 0) {
      if (dataCFOPList.length === 0) {
        setLoadingCfop(true)
        const result = await cfopLoader.loadAllCFOP()
        setDataCFOPList(result)
        setLoadingCfop(false)
      }
      const matchList = dataCFOPList.filter(({ code }) => {
        const codeFilter = code.toString()
        const regex = new RegExp(`^${value}`, 'gi')
        return codeFilter.match(regex)
      })
      if (matchList.length > 0) {
        setActiveSearchCFOP(true)
        setDataCFOPListSearch(matchList)
      } else {
        setActiveSearchCFOP(false)
      }
    } else {
      setActiveSearchCFOP(false)
    }
  }

  const handlerOnClickRowSearchCFOP = (value: LoadAllCFOP.CFOPResponse) => {
    changeCFOP(value.code.toString())
    setActiveSearchCFOP(false)
  }

  return (
    <>
      <Container className="row">
        <div className="form-content col-md-6">
          <TooltipComponent label="NCM" message="Infome o peso em kg" />
          <NewInput
            isNumber
            name="ncm"
            error={ncm.error}
            onChange={event => handlerChangeInputNCM(event.target.value)}
            className="form-control"
            type="text"
            placeholder="Digíte o código"
            value={ncm.value}
            loading={loadingNcm}
            search
            RenderSearchComponent={() => (
              <SearchComponentNcm
                active={activeSearch}
                data={dataNcmListSearch}
                disableSearch={() => setActiveSearch(false)}
                onClickRow={handlerOnClickRowSearchNCM}
              />
            )}
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
            value={cfop.value}
            onChange={event => handlerChangeInputCFOP(event.target.value)}
            placeholder="Digíte o código"
            loading={loadingCfop}
            search
            RenderSearchComponent={() => (
              <SearchComponentCFOP
                active={activeSearchCFOP}
                data={dataCFOPListSearch}
                disableSearch={() => setActiveSearchCFOP(false)}
                onClickRow={handlerOnClickRowSearchCFOP}
              />
            )}
          />
        </div>
      </Container>
      <Container className="row">
        <div className="form-content col-md-12">
          <TabHeaderContainerFiscal>
            {allTabsData.map(
              ({ label, name, isEnable }) =>
                isEnable && (
                  <TabNameFiscal
                    key={Math.random()}
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
            {tabs.map(({ Component, name }) => (
              <RenderComponent
                key={Math.random()}
                isActive={name === loadCurrentTab().key}
              >
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
