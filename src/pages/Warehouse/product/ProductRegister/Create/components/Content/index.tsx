import React, { useCallback, useEffect, useState } from 'react'
import { HeaderCreateProduct } from '../Header'
import {
  Container,
  ContentItem,
  RenderComponent,
  TabHeaderContainer,
  TabName,
  TabPanelContainer
} from './styles'
import { useTabs } from '../../../../../../../hooks/tabs'
import { makeTabs } from './tabs'
import { useLoading } from '../../../../../../../hooks/loading'
import { useTabCreate } from '../../providers/tabsProvider'
import { ToolsContainerProps } from '../../../../../../../components/Container'
import { useToast } from '../../../../../../../hooks/toast'
import { Alert } from '../../../../../../../components/Alert'
import { AlertContent } from './AlertContent'
import { Footer } from '../footer'
import { useHistory } from 'react-router'
import { nameSource } from '../../../domain/info'
import { ProductProvider } from '../../context'

export type TypeContentTabs = {
  name: string
  label: string
  isEnable: boolean
  Component?: JSX.Element
}

type TypeContentProps = {
  tools: ToolsContainerProps[]
}

type Link = {
  link: string
  name: string
}

export const Content = ({ tools }: TypeContentProps): JSX.Element => {
  const { activeLoading, disableLoading } = useLoading()
  const { addToast } = useToast()
  const [links, setLinks] = useState<Link[]>([{ link: '', name: '' }])
  const [alert, setAlert] = useState<{
    active: boolean
    message?: string
    component?: () => JSX.Element
  }>({
    active: false,
    message: ''
  })

  const {
    tabs,
    addTab,
    loadCurrentTab,
    changeCurrentTabForNext,
    changeCurrentTabForPrevious,
    changeCurrentTab
  } = useTabs()
  const { validation, save } = useTabCreate()

  const history = useHistory()

  useEffect(() => {
    async function load() {
      activeLoading()
      const tabs = await makeTabs()
      tabs.forEach(tab => addTab(tab))
      changeCurrentTab(tabs[0].name)
      disableLoading()
    }
    load()
  }, [])

  const handlerClickAlertConfirm = useCallback(() => {
    setAlert({ active: false, message: '' })
    setLinks([])
  }, [alert, links])

  const handlerClickOnSaveButton = async () => {
    const tabsErrorList = validation.validate()
    setLinks([])
    tabsErrorList.map(({ labelName, linkName }) => {
      setLinks(old => {
        return [
          ...old,
          {
            link: linkName,
            name: labelName
          }
        ]
      })
    })

    if (tabsErrorList.length !== 0) {
      setAlert({ active: true })
      return
    }

    const { error, data } = await save()

    if (!error) {
      addToast({
        type: 'success',
        title: 'Produto adicionado',
        description: 'Produto salvo com sucesso'
      })

      history.push(`/${nameSource}/view/${data?.id}`, {
        id: data?.id,
        value: data?.name
      })
    } else {
      addToast({
        type: 'error',
        title: 'Erro ao salvar o produto',
        description: error.message
      })
    }
  }

  return (
    <>
      <HeaderCreateProduct tools={tools} />
      <Container>
        <ContentItem>
          <TabHeaderContainer>
            {tabs.map(
              ({ label, name, isEnable }, index) =>
                isEnable && (
                  <TabName
                    key={index}
                    onClick={() => changeCurrentTab(name)}
                    isActive={name === loadCurrentTab().key}
                  >
                    {label}
                  </TabName>
                )
            )}
          </TabHeaderContainer>
          <TabPanelContainer>
            <ProductProvider>
              <>
                <hr />
                {tabs.map(({ Component, name }) => (
                  // eslint-disable-next-line react/jsx-key
                  <RenderComponent isActive={name === loadCurrentTab().key}>
                    {Component || <p></p>}
                  </RenderComponent>
                ))}
              </>
            </ProductProvider>
          </TabPanelContainer>
        </ContentItem>
        <Alert
          isActive={alert.active}
          onlyConfirm
          message={alert.message}
          RenderComponent={() => (
            <AlertContent
              onClickItem={handlerClickAlertConfirm}
              links={links}
            />
          )}
          onClickConfirmButton={handlerClickAlertConfirm}
          onClickCancellButton={handlerClickAlertConfirm}
        />
        <Footer
          onSave={handlerClickOnSaveButton}
          onClickButtonNext={() => changeCurrentTabForNext()}
          onClickButtonBack={() => changeCurrentTabForPrevious()}
        />
      </Container>
    </>
  )
}
