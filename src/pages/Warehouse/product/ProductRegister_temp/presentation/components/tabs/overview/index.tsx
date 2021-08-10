import React, { useCallback, useState, useEffect } from 'react'

import { Input, Select } from '../../../../../../../../components/Form'
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent'
import { useTabs } from '../../../../../../../../hooks/tabs'
import { FinancialCategory } from '../../../../services/api'
import { useProduct } from '../../../providers/product/ProductProvider'

import { Container } from './styles'

export const OverviewTab = () => {
  const { activeTab, disableTab } = useTabs()
  const { typesProduct, categoriesCost, groupsProduct, setProductType } =
    useProduct()

  const [financialSubCategories, setFinancialSubCategories] = useState<
    FinancialCategory[]
  >([])
  const [hasVariation, setHasVariation] = useState('NO')

  useEffect(() => {
    if (hasVariation === 'YES') {
      activeTab('hasVariation')
      disableTab('stock')
    } else {
      disableTab('hasVariation')
      activeTab('stock')
    }
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
            name="overview.typeProduct"
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
            name="overview.groupProduct"
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
            name="overview.nameProduct"
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
            name="overview.categoryCost"
            className="form-control"
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
            name="overview.subcategoryCost"
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
            name="hasVariation"
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
