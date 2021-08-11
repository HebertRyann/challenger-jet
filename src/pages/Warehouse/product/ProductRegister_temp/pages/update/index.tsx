import React from 'react'
import { Tab } from '../../presentation/components/tabs/index'
import { ProductProvider } from '../../presentation/providers/product/ProductProvider'
import Container from '../../../../../../components/Container'
import { breadcrumbCreate } from '../../domain/data/breadcrumb/create'
import { namePageTitle, nameActions } from '../../domain/data/info'
import { TabsProvider } from '../../../../../../hooks/tabs'
import { tabsList } from '../../presentation/components/tabs/tabsList'
import { useParams } from 'react-router-dom'

const RenderContentTabs = ({ id }: { id: string }): JSX.Element => {
  return (
    <TabsProvider>
      <Tab tabList={tabsList} id={id} />
    </TabsProvider>
  )
}
export const UpdateProductPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()

  return (
    <ProductProvider>
      <Container
        pageTitle={namePageTitle}
        portletTitle={nameActions.update.name}
        breadcrumb={breadcrumbCreate}
      >
        <RenderContentTabs id={id} />
      </Container>
    </ProductProvider>
  )
}
