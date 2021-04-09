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
} from './style';
import { Footer } from '../../footer';
import { NewInput } from '../../../../../../../../components/NewInput';

export const labelFiscal = 'Fiscal';
export const nameFiscal = '@@tabs-fiscal';

export type TypeContentTabsFiscal = {
  name: string;
  label: string;
  isEnable: boolean;
  Component: JSX.Element;
};

export const Fiscal = (): JSX.Element => {
  const { loadTabs, addTab } = useTabs();
  const tabs = makeTabsFiscal();
  const { fiscal } = useTabCreate();
  const { ncm, cfop } = fiscal.getData();
  const { changeNCM, changeCFOP } = fiscal.setData;

  useEffect(() => {
    tabs.map(tab => addTab(tab));
  }, []);

  const allTabsData = loadTabs();

  const [currentTab, setCurrentTab] = useState(tabs[0].name);

  return (
    <>
      <Container className="row">
        <div className="form-content col-md-6">
          <TooltipComponent label="NCM" message="Infome o peso em kg" />
          <NewInput
            name="ncm"
            error={ncm.error}
            onKeyPress={event => {
              const regex = /^[0-9]+$/;
              if (!regex.test(event.key)) event.preventDefault();
            }}
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
            onKeyPress={event => {
              const regex = /^[0-9]+$/;
              if (!regex.test(event.key)) event.preventDefault();
            }}
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
                    onClick={() => setCurrentTab(name)}
                    isActive={name === currentTab}
                  >
                    {label}
                  </TabNameFiscal>
                ),
            )}
          </TabHeaderContainerFiscal>
          <TabPanelContainerFiscal>
            <hr />
            {allTabsData.map(({ Component, name }, index) => {
              if (name === currentTab) {
                return <div key={index}>{Component}</div>;
              } else {
                return null;
              }
            })}
            <hr />
          </TabPanelContainerFiscal>
        </div>
      </Container>
      <div style={{ margin: '20px 3px 0 0' }}>
        <Footer onClickButtonNext={() => {}} onSave={() => fiscal.validate()} />
      </div>
    </>
  );
};
