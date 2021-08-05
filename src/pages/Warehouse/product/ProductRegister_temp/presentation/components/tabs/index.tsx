import React, { useEffect, useState } from 'react'
import Button from '../../../../../../../components/Button'
import Form from '../../../../../../../components/Form'
import { useTabs } from '../../../../../../../hooks/tabs'
import { TabsModel } from '../../../domain/models/tabs'
import { OverviewTab } from './overview'
import { StockTab } from './stock'
import {
  Container,
  ContentItem,
  TabHeaderContainer,
  TabName,
  TabPanelContainer
} from './styles'

type TypeContentProps = {
  tabList: TabsModel[]
}

export const Tab = ({ tabList }: TypeContentProps): JSX.Element => {
  const { addTab, changeCurrentTab, loadCurrentTab, loadTabs } = useTabs()
  const overviewFields = OverviewTab()
  const stockFields = StockTab()

  useEffect(() => {
    tabList.forEach(({ name, isDefault, label, isEnable }) => {
      addTab({ default: isDefault, name, label, isEnable })
    })
  }, [tabList, addTab])

  const onClickNameTab = (name: string) => changeCurrentTab(name)

  async function handleSubmit(data: any) {
    console.log('data', data)
  }

  const [values, setValues] = useState({
    overview: { typeProduct: 'venda' },
    hasVariation: 'NAO'
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
            <div className={`${loadCurrentTab().key !== 'stock' && 'hidden'}`}>
              {stockFields}
            </div>
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
