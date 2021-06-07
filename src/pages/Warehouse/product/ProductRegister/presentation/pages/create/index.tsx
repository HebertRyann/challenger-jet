import React from 'react'
import { TabsModel } from '../../../domain/models/tabs'
import { Tab } from '../../components/tabs/index'
import { ProductProvider } from '../../providers/product/ProductProvider'
import { OverviewTab } from './components/tabs/overview'
import { DetailsTab } from './components/tabs/details'
import Container from '../../../../../../../components/Container'
import { breadcrumbCreate } from '../../../domain/data/breadcrumb/create'
import { namePageTitle, nameActions } from '../../../domain/data/info'
import { makeLoadProdutctsType } from '../../../main/factories/products/load/makeLoadProdutctsType'
import { FormProvider } from '../../providers/form/FormProvider'

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
  }
]

const RenderContentTabs = (): JSX.Element => {
  return (
    <FormProvider>
      <Tab tabList={tabs} />
    </FormProvider>
  )
}

export const CreateProductPage = (): JSX.Element => {
  return (
    <ProductProvider loadTypeProduct={makeLoadProdutctsType()}>
      <Container
        Content={RenderContentTabs}
        pageTitle={namePageTitle}
        portletTitle={nameActions.create.name}
        breadcrumb={breadcrumbCreate}
      />
    </ProductProvider>
  )
}
