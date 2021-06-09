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
import api from '../../../../../../../services/api'
import { listById } from '../../../domain/api'
import {
  AtributeResponseType,
  CompositionResponseType,
  DetailsResponseType,
  FiscalResponseType,
  PriceCompositionResponserType,
  ProductResponse
} from '../../domain/productResponse'
import { SEMI_FINISHED, SALE, RE_SALE } from '../../domain/products'
import { nameHasComposition } from '../Tabs/HasComposition'
import { namePriceComposition } from '../Tabs/PriceComposition'
import { nameFiscal } from '../Tabs/Fiscal'
import { nameHasVariation } from '../../../Update/components/Tabs/HasVariation'
import { nameStock } from '../Tabs/Stock'

export type TypeContentTabs = {
  name: string
  label: string
  isEnable: boolean
  Component: JSX.Element
}

type TypeContentProps = {
  tools: ToolsContainerProps[]
  id: string
}

type Link = {
  link: string
  name: string
}

type ContentState = {
  active: boolean
  message?: string
  component?: () => JSX.Element
}

export const Content = ({ tools, id }: TypeContentProps): JSX.Element => {
  const { activeLoading, disableLoading } = useLoading()
  const [tabs, setTabs] = useState<TypeContentTabs[]>([])
  const { addToast } = useToast()
  const [links, setLinks] = useState<Link[]>([{ link: '', name: '' }])
  const [alert, setAlert] = useState<ContentState>({
    active: false,
    message: ''
  })

  const {
    loadTabs,
    addTab,
    loadCurrentTab,
    changeCurrentTabForNext,
    changeCurrentTabForPrevious,
    changeCurrentTab,
    activeTab,
    disableTab
  } = useTabs()
  const {
    validation,
    save,
    addOverView,
    addDetails,
    addStock,
    addHasVariation,
    addHasComposition,
    addPriceComposition,
    addFiscal
  } = useTabCreate()

  const history = useHistory()

  useEffect(() => {
    async function load() {
      activeLoading()
      const tabs = await makeTabs()
      tabs.map(tab => addTab(tab))
      changeCurrentTab(tabs[0].name)
      setTabs(loadTabs())

      const { data } = await api.get<ProductResponse>(listById(id))

      if (data.type === SEMI_FINISHED.name || data.type === SALE.name) {
        activeTab(nameHasComposition)
        let compositionResult: CompositionResponseType[] = []

        if (data.composition) {
          compositionResult = JSON.parse(data.composition.toLowerCase())
        }

        compositionResult.forEach(
          ({ amount, cost, name, product_id, stock_id }) => {
            addHasComposition({
              amount: { error: { isError: false }, value: amount.toString() },
              cost: { error: { isError: false }, value: cost.toString() },
              nameProduct: { error: { isError: false }, value: name },
              subtotal: {
                error: { isError: false },
                value: (amount * cost).toFixed(2).toString()
              },
              product_id: product_id.toString(),
              stock_id: stock_id.toString()
            })
          }
        )
      }

      if (data.type === RE_SALE.name || data.type === SALE.name) {
        activeTab(namePriceComposition)
        activeTab(nameFiscal)
        let priceCompositionResponser: PriceCompositionResponserType =
          {} as PriceCompositionResponserType
        if (data.price_composition) {
          priceCompositionResponser = JSON.parse(
            data.price_composition.toLowerCase()
          )
        }
        addPriceComposition({
          cost: {
            error: { isError: false },
            value: priceCompositionResponser.fixed_cost.toString()
          },
          dif: {
            error: { isError: false },
            value: priceCompositionResponser.dif.toString()
          },
          ipi: {
            error: { isError: false },
            value: priceCompositionResponser.dif.toString()
          },
          profit: {
            error: { isError: false },
            value: priceCompositionResponser.margin_profit.toString()
          },
          simpleNational: {
            error: { isError: false },
            value: priceCompositionResponser.simple_national.toString()
          }
        })

        let fiscalResponse: FiscalResponseType

        if (data.fiscal) {
          fiscalResponse = JSON.parse(data.fiscal.toLowerCase())
          addFiscal({
            cfop: {
              error: { isError: false },
              value: fiscalResponse.cfop?.toString()
            },
            cofins: {
              taxesIssue: {
                error: { isError: false },
                value: {
                  id: fiscalResponse.cofins_tax_situation?.toString(),
                  name: fiscalResponse.cofins_tax_situation?.toString()
                }
              }
            },
            ipi: {
              taxesIssue: {
                error: { isError: false },
                value: {
                  id: fiscalResponse.ipi_tax_situation?.toString(),
                  name: fiscalResponse.ipi_tax_situation?.toString()
                }
              }
            },
            ncm: {
              error: { isError: false },
              value: fiscalResponse.ncm?.toString()
            },
            pis: {
              taxesIssue: {
                error: { isError: false },
                value: {
                  id: fiscalResponse.pis_tax_situation?.toString(),
                  name: fiscalResponse.pis_tax_situation?.toString()
                }
              }
            },
            icms: {
              origem: {
                error: { isError: false },
                value: {
                  id: fiscalResponse.icms_tax_origem.toString(),
                  name: fiscalResponse.icms_tax_origem.toString()
                }
              },
              taxesIssue: {
                error: { isError: false },
                value: {
                  id: fiscalResponse.ipi_tax_situation?.toString(),
                  name: fiscalResponse.ipi_tax_situation?.toString()
                }
              }
            }
          })
        }
      }

      let hasVariation = false

      if (data.stocks.length > 1 || data.stocks[0]) {
        if (
          data.stocks[0].atributes !== '[]' &&
          data.stocks[0].atributes &&
          data.stocks[0].atributes.length >= 1
        ) {
          hasVariation = true
        }
      }
      if (hasVariation) {
        activeTab(nameHasVariation)
        disableTab(nameStock)
        data.stocks.forEach(
          ({
            current_stock,
            product_units_measured,
            replacement_point,
            atributes,
            id
          }) => {
            let atributesResponse: AtributeResponseType[] = []
            if (atributes) {
              atributesResponse = JSON.parse(atributes)
            }
            addHasVariation({
              id: id?.toString(),
              atributes: atributesResponse.map(({ id, keyParent, name }) => {
                return {
                  error: { isError: false },
                  value: { id: '', keyParent, name: '' }
                }
              }),
              currentStock: {
                error: { isError: false },
                value: current_stock.toString()
              },
              replacementPoint: {
                error: { isError: false },
                value: replacement_point.toString()
              },
              unitMensured: {
                error: { isError: false },
                value: {
                  id: product_units_measured.id.toString(),
                  name: product_units_measured.name
                }
              },
              key: Math.random(),
              priceCost: {
                error: { isError: false },
                value: ''
              },
              priceSale: {
                error: { isError: false },
                value: ''
              }
            })
          }
        )
      } else {
        addStock({
          id: data.stocks[0]?.id.toString(),
          priceCost: {
            error: { isError: false },
            value: '0'
          },
          priceSale: {
            error: { isError: false },
            value: '0'
          },
          replacementPoint: {
            error: { isError: false },
            value: data.stocks[0].replacement_point.toString()
          },
          unitMensured: {
            error: { isError: false },
            value: {
              id: data.stocks[0].product_units_measured.id.toString(),
              name: data.stocks[0].product_units_measured.name
            }
          }
        })
      }

      addOverView({
        id: data.id.toString(),
        typeSelectProdut: {
          error: {
            isError: false
          },
          value: {
            id: '',
            name: data.type
          }
        },
        groupProduct: {
          error: { isError: false },
          value: {
            id: data.product_category.id.toString(),
            name: data.product_category.name
          }
        },
        categoryCost: {
          error: { isError: false },
          value: {
            id: data.financial_category.id.toString(),
            name: data.financial_category.name
          }
        },
        subCategoryCost: {
          error: {
            isError: false
          },
          value: {
            id: data.subfinancial_category.id.toString(),
            name: data.subfinancial_category.name
          }
        },
        hasVariation: {
          error: { isError: false },
          value: { name: hasVariation ? 'SIM' : 'NÃO', hasVariation }
        },
        nameProduct: {
          error: { isError: false },
          value: data.name
        }
      })

      const detailResponse: DetailsResponseType = JSON.parse(
        data.details.toLowerCase()
      )

      addDetails({
        thickness: {
          error: { isError: false },
          value: detailResponse?.thickness?.toString() || ''
        },
        measureWeight: {
          error: { isError: false },
          value: detailResponse?.measure_weight?.toString()
        },
        measure: {
          error: { isError: false },
          value: detailResponse?.measure?.toString()
        },
        height: {
          error: { isError: false },
          value: detailResponse.height.toString()
        },
        length: {
          error: { isError: false },
          value: detailResponse.length.toString()
        },
        weight: {
          error: { isError: false },
          value: detailResponse.weight.toString()
        },
        width: {
          error: { isError: false },
          value: detailResponse.width.toString()
        },
        descriptionAndDetails: {
          error: { isError: false },
          value: detailResponse.description_details
        },
        technicalSpecification: {
          error: { isError: false },
          value: detailResponse.technical_specification
        },
        wayOfUse: {
          error: { isError: false },
          value: detailResponse.way_use
        }
      })

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
    tabsErrorList.forEach(({ labelName, linkName }) => {
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

    const { code, data } = await save()

    if (code === 200) {
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
        description: 'Não foi possivel salvar o produto'
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
                  <RenderComponent
                    key={name}
                    isActive={name === loadCurrentTab().key}
                  >
                    {Component}
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
