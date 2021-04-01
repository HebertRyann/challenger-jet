import React, { useEffect, useState } from 'react';
import { Container } from './style';
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent';
import { useTabs } from '../../../../../../../../hooks/tabs';
import { makeTabsFiscal } from './tabs';
import {
  TabHeaderContainerFiscal,
  TabNameFiscal,
  TabPanelContainerFiscal,
} from './style';
import { FooterCreateProduct } from '../../footer';
import { SaveFooter } from '../../footer/saveFooter';

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
          <input
            className="form-control"
            type="text"
            placeholder="Digíte o código"
          />
        </div>
        <div className="form-content col-md-6">
          <TooltipComponent
            label="CFOP"
            message="Digíte um código ou descrição CEST"
          />
          <input
            className="form-control"
            type="text"
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
      <div >
        <hr />
        <FooterCreateProduct onClickButtonNext={() => {}} />
        <hr />
        <SaveFooter onSave={() => {}} />
      </div>
    </>
  );
};
