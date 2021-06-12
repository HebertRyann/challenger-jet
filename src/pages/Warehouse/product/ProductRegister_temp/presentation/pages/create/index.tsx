import React from 'react'
import { TabsModel } from '../../../domain/models/tabs'
import { Tab } from '../../components/tabs/index'
import { ProductProvider } from '../../providers/product/ProductProvider'
import { OverviewTab } from './components/tabs/overview'
import { DetailsTab } from './components/tabs/details'
import Container from '../../../../../../../components/Container'
import { breadcrumbCreate } from '../../../domain/data/breadcrumb/create'
import { namePageTitle, nameActions } from '../../../domain/data/info'
import { FormProvider } from '../../providers/form/FormProvider'
import { makeLoadProdutctsType } from '../../../main/factories/products/load/makeLoadProdutctsType'
import { makeLoadProdutctsGroups } from '../../../main/factories/products/load/makeLoadProdutctsGroups'
import { makeLoadProdutctsCategoryCost } from '../../../main/factories/products/load/makeLoadProdutctsCategoryCost'
import { makeLoadProdutctsUnitMensured } from '../../../main/factories/products/load/makeLoadProdutctsUnitMensured'
import { TabsProvider } from '../../../../../../../hooks/tabs'
import { StockTab } from './components/tabs/stock'

const tabs: TabsModel[] = [
  {
    name: 'overview',
    label: 'Dados',
    isEnable: true,
    isDefault: true,
    Component: <OverviewTab />
  },
  {
    name: 'details',
    label: 'Detalhes',
    isEnable: true,
    Component: <DetailsTab />
  },
  {
    name: 'stock',
    label: 'Estoque',
    isEnable: true,
    Component: <StockTab />
  }
]

const RenderContentTabs = (): JSX.Element => {
  return (
    <TabsProvider>
      <FormProvider>
        <Tab tabList={tabs} />
      </FormProvider>
    </TabsProvider>
  )
}

export const CreateProductPage = (): JSX.Element => {
  return (
    <ProductProvider
      loadTypeProduct={makeLoadProdutctsType()}
      loadGroupProducts={makeLoadProdutctsGroups()}
      loadCategoryCost={makeLoadProdutctsCategoryCost()}
      loadUnitMensureds={makeLoadProdutctsUnitMensured()}
    >
      <Container
        Content={RenderContentTabs}
        pageTitle={namePageTitle}
        portletTitle={nameActions.create.name}
        breadcrumb={breadcrumbCreate}
      />
    </ProductProvider>
  )
}