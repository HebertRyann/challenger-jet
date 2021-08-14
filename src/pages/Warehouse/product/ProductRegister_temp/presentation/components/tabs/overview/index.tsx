import React, { useCallback, useState, useEffect } from 'react'

import { Input, Select } from '../../../../../../../../components/Form'
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent'
import { useTabs } from '../../../../../../../../hooks/tabs'
import { FinancialCategory } from '../../../../services/api'
import { useProduct } from '../../../providers/product/ProductProvider'

import { Container } from './styles'

export const OverviewTab = () => {
  const { activeTab, disableTab } = useTabs()
  const {
    typesProduct,
    categoriesCost,
    groupsProduct,
    setProductType,
    setHasVariation: setVariation
  } = useProduct()

  const [financialSubCategories, setFinancialSubCategories] = useState<
    FinancialCategory[]
  >([])
  const [hasVariation, setHasVariation] = useState('NO')

  useEffect(() => {
    if (hasVariation === 'YES') {
      activeTab('hasVariation')
      disableTab('stock')
      setVariation(true)
    } else {
      disableTab('hasVariation')
      activeTab('stock')
      setVariation(false)
    }
    setVariation(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasVariation])

  const loadFinancialSubCategories = useCallback(
    (parentId: string) => {
      if (parentId) {
        const subcategoryCost = categoriesCost.filter(
          ({ parent_id }) => parent_id?.toString() === parentId
        )
        setFinancialSubCategories(subcategoryCost)
      }
    },
    [categoriesCost]
  )

  return (
    <>
      <Container className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Tipo do produto"
            message="Selecione o tipo do produto"
          />
          <Select
            className="form-control"
            name="details_overview.type"
            options={typesProduct.map(({ name }) => ({
              value: name,
              name
            }))}
            onChange={({ target }) => setProductType(target.value)}
            blank
            controlled
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Grupo do produto"
            message="selecione o grupo do produto"
          />
          <Select
            className="form-control"
            name="details_overview.product_category_id"
            options={groupsProduct.map(({ id, name }) => ({
              value: id,
              name
            }))}
            controlled
            blank
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Nome do produto"
            message="Selecione o nome do produto"
          />
          <Input
            className="form-control"
            name="details_overview.name"
            rules={{ required: true }}
          />
        </div>
      </Container>
      <Container className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Categoria de custo"
            message="Selecione a categoria de custo"
          />
          <Select
            className="form-control"
            name="details_overview.category_cost_id"
            options={categoriesCost
              .filter(fc => fc.parent_id === null)
              .map(({ id, name }) => ({
                value: id,
                name: name
              }))}
            onChange={({ target }) => loadFinancialSubCategories(target.value)}
            controlled
            blank
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Subcategoria de custo"
            message="selecione o subcategoria de custo"
          />
          <Select
            name="details_overview.subcategory_cost_id"
            className="form-control"
            options={financialSubCategories.map(({ id, name }) => ({
              value: id,
              name
            }))}
            controlled
            blank
          />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Possui variação?"
            message="selecione se existe variação"
          />
          <Select
            name="details_overview.has_variation"
            className="form-control"
            options={[
              { name: 'SIM', value: 'YES' },
              { name: 'NÃO', value: 'NO' }
            ]}
            onChange={({ target }) => setHasVariation(target.value)}
            controlled
            blank
          />
        </div>
      </Container>
    </>
  )
}
