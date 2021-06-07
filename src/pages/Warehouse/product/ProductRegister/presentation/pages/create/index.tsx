import React from 'react'
import { TabsModel } from '../../../domain/models/tabs'
import { Tab } from '../../components/tabs/index'
import { ProductProvider } from '../../providers/product/ProductProvider'
import { OverviewTab } from './components/tabs/overview'
import Container from '../../../../../../../components/Container'
import { breadcrumbCreate } from '../../../domain/data/breadcrumb/create'
import { namePageTitle, nameActions } from '../../../domain/data/info'
import { toolsCreate } from '../../../domain/data/tools/create'

const tab: TabsModel = {
  name: '',
  label: 'teste',
  isEnable: true,
  Component: <OverviewTab />
}

export const CreateProductPage = (): JSX.Element => {
  return (
    <ProductProvider>
      <Container
        Content={() => <Tab tabList={[tab]} />}
        pageTitle={namePageTitle}
        portletTitle={nameActions.create.name}
        breadcrumb={breadcrumbCreate}
      />
    </ProductProvider>
  )
}
