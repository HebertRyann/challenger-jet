import React from 'react'
import { TabsModel } from '../../../domain/models/tabs'
import { Tab } from '../../components/tabs/index'
import { ProductProvider } from '../../providers/product/ProductProvider'
import { OverviewTab } from './components/tabs/overview'

const tab: TabsModel = {
  name: '',
  label: 'teste',
  isEnable: true,
  Component: <OverviewTab />
}

export const CreateProductPage = (): JSX.Element => {
  return (
    <ProductProvider>
      <Tab tabList={[tab]} />
    </ProductProvider>
  )
}
