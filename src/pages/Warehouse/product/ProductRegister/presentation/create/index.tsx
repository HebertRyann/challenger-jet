import React from 'react'
import { TabsModel } from '../../domain/models/tabs'
import { Tab } from '../tabs/index'

const render = (): JSX.Element => <h1>teste</h1>

const tab: TabsModel = {
  name: '',
  label: 'teste',
  isEnable: true,
  Component: render()
}

export const CreateProductPage = (): JSX.Element => {
  return <Tab tabList={[tab]} />
}
