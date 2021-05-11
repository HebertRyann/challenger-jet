import React, { useEffect, useState } from 'react';
import { Container } from './style';
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent';
import { useTabs } from '../../../../../../../../hooks/tabs';
import { makeTabsFiscal } from './tabs';
import { useTabCreate } from '../../../providers/tabsProvider';
import {
  TabHeaderContainerFiscal,
  TabNameFiscal,
  TabPanelContainerFiscal,
  RenderComponent,
} from './style';
import { NewInput } from '../../../../../../../../components/NewInput';
import { SearchComponentNcm } from './SearchComponent';
import { LoadAllNCM } from '../../../../domain/useCases/FIscal/NCM/Load';

export const labelFiscal = 'Fiscal';
export const nameFiscal = '@@tabs-fiscal';

export type TypeContentTabsFiscal = {
  name: string;
  label: string;
  isEnable: boolean;
  Component: JSX.Element;
};

type TypeFiscal = {
  loadAllNCM: LoadAllNCM;
};

export const Fiscal = ({ loadAllNCM }: TypeFiscal): JSX.Element => {
  const { loadTabs, addTab, loadCurrentTab, changeCurrentTab } = useTabs();
  const { fiscal } = useTabCreate();
  const { ncm, cfop } = fiscal.getData();
  const { changeNCM, changeCFOP } = fiscal.setData;
  const [tabs, setTabs] = useState<TypeContentTabsFiscal[]>([]);
  const [loadingNcm, setLoadingNcm] = useState(false);
  const [dataNcmList, setDataNcmList] = useState<LoadAllNCM.NCMResponse[]>([]);
  const [activeSearch, setActiveSearch] = useState(false);

  useEffect(() => {
    function load() {
      const tabs = makeTabsFiscal();
      tabs.map(tab => addTab(tab));
      changeCurrentTab(tabs[0].name);
      setTabs(loadTabs());
    }
    load();
  }, []);

  const allTabsData = loadTabs();

  const handlerChangeInputNCM = async (value: string) => {
    changeNCM(value);
    if (value.length > 1) {
      if (dataNcmList.length === 0) {
        setLoadingNcm(true);
        const result = await loadAllNCM.loadAllNCM();
        setDataNcmList(result);
        setLoadingNcm(false);
      }
      const matchList = dataNcmList.filter(({ code }) => {
        const regex = new RegExp(`^${value}`, 'gi');
        return code.match(regex);
      });
      if (matchList.length > 0) {
        console.log(matchList);
        setActiveSearch(true);
      } else {
        setActiveSearch(false);
      }
    } else {
      setActiveSearch(false);
    }
  };

  const handlerOnClickRowSearchNCM = (value: LoadAllNCM.NCMResponse) => {
    changeNCM(value.code);
    setActiveSearch(false);
  };

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
            search
            placeholder="Digíte o código"
            value={ncm.value}
            loading={loadingNcm}
            RenderSearchComponent={() => (
              <SearchComponentNcm
                active={activeSearch}
                data={dataNcmList}
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
                ),
            )}
          </TabHeaderContainerFiscal>
          <TabPanelContainerFiscal>
            <hr />
            {tabs.map(({ Component, name }) => (
              <RenderComponent isActive={name === loadCurrentTab().key}>
                {Component}
              </RenderComponent>
            ))}
            <hr />
          </TabPanelContainerFiscal>
        </div>
      </Container>
    </>
  );
};
