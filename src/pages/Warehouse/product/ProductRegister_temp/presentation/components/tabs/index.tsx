import React, { useEffect, useState } from 'react'
import Button from '../../../../../../../components/Button'
import Form from '../../../../../../../components/Form'
import { useTabs } from '../../../../../../../hooks/tabs'
import { TabsModel } from '../../../domain/models/tabs'
import { DetailsTab } from './details'
import { OverviewTab } from './overview'
import { HasVariationTab } from './HasVariation'
import { StockTab } from './stock'
import { PriceCompositionTab } from './PriceComposition'

import {
  Container,
  ContentItem,
  TabHeaderContainer,
  TabName,
  TabPanelContainer
} from './styles'
import api from '../../../../../../../services/api'
import { listById } from '../../../domain/data/api'
import { ProductResponse } from '../../../../ProductRegister/Update/domain/productResponse'

type TypeContentProps = {
  tabList: TabsModel[]
  id?: string
}

export const Tab = ({ tabList, id }: TypeContentProps): JSX.Element => {
  const { addTab, changeCurrentTab, loadCurrentTab, loadTabs } = useTabs()
  const overviewFields = OverviewTab()
  const detailsFields = DetailsTab()
  const hasVariationFields = HasVariationTab()
  const stockFields = StockTab()
  const priceCompositionFields = PriceCompositionTab()

  useEffect(() => {
    tabList.forEach(({ name, isDefault, label, isEnable }) => {
      addTab({ default: isDefault, name, label, isEnable })
    })
  }, [tabList, addTab])

  async function getProduct(id: string) {
    const { data } = await api.get<ProductResponse>(listById(id))
    console.log('product', data)
    return data
  }

  useEffect(() => {
    if (id) {
      const data = getProduct(id)
    }
  }, [id])

  const onClickNameTab = (name: string) => changeCurrentTab(name)

  async function handleSubmit(data: any) {
    console.log('data', data)
  }

  const [values, setValues] = useState({
    overview: { typeProduct: 'venda' },
    hasVariation: 'NO'
  })

  return (
    <Container>
      <ContentItem>
        <TabHeaderContainer>
          {loadTabs().map(
            ({ label, isEnable, name }, index) =>
              isEnable && (
                <TabName
                  onClick={() => onClickNameTab(name)}
                  key={index}
                  isActive={loadCurrentTab().key === name}
                >
                  {label}
                </TabName>
              )
          )}
        </TabHeaderContainer>
        <TabPanelContainer>
          <Form onSubmit={handleSubmit} defaultValues={values}>
            <div
              className={`${loadCurrentTab().key !== 'overview' && 'hidden'}`}
            >
              {overviewFields}
            </div>
            <div
              className={`${loadCurrentTab().key !== 'details' && 'hidden'}`}
            >
              {detailsFields}
            </div>
            <div
              className={`${
                loadCurrentTab().key !== 'priceComposition' && 'hidden'
              }`}
            >
              {priceCompositionFields}
            </div>
            <div
              className={`${
                loadCurrentTab().key !== 'hasVariation' && 'hidden'
              }`}
            >
              {hasVariationFields}
            </div>
            {loadCurrentTab().key === 'stock' && stockFields}
            <div className="form-actions right">
              <Button type="submit" className="btn dark btn-sm sbold uppercase">
                Salvar
              </Button>
            </div>
          </Form>
        </TabPanelContainer>
      </ContentItem>
    </Container>
  )
}
