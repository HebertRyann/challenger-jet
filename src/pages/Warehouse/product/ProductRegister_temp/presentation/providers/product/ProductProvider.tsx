import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLoading } from '../../../../../../../hooks/loading'
import { TypeProductStock } from '../../../domain/models/typeProduct'

import {
  FinancialCategory,
  ProductCategory,
  ProductType,
  UnitMensured,
  Attributes,
  loadFinancialCategories,
  loadProductCategories,
  loadProductTypes,
  loadUnitMensured,
  loadAtributes
} from '../../../services/api'

type ProductContextType = {
  typesProduct: ProductType[]
  productType: string
  setProductType: React.Dispatch<React.SetStateAction<string>>
  hasVariation: boolean
  setHasVariation: React.Dispatch<React.SetStateAction<boolean>>
  groupsProduct: ProductCategory[]
  categoriesCost: FinancialCategory[]
  unitMensured: UnitMensured[]
  attributes: Attributes[]
}

const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
)

type ProductProviderParams = {
  children: JSX.Element
}

export const ProductProvider = ({ children }: ProductProviderParams) => {
  const [typesProduct, setTypesProduct] = useState<ProductType[]>([])
  const [productType, setProductType] = useState('')
  const [groupsProduct, setGroupsProduct] = useState<ProductCategory[]>([])
  const [categoriesCost, setCategoriesCost] = useState<FinancialCategory[]>([])
  const [unitMensured, setUnitMensured] = useState<UnitMensured[]>([])
  const [attributes, setAttributes] = useState<Attributes[]>([])
  const [hasVariation, setHasVariation] = useState<boolean>(false)
  const [stock, setStock] = useState<TypeProductStock[]>([])
  const { activeLoading, disableLoading } = useLoading()

  useEffect(() => {
    ;(async () => {
      activeLoading()
      const productsType = await loadProductTypes()
      setTypesProduct(productsType)
      const groupsProduct = await loadProductCategories()
      setGroupsProduct(groupsProduct)
      const categoriesCost = await loadFinancialCategories()
      setCategoriesCost(categoriesCost)
      const mensureds = await loadUnitMensured()
      setUnitMensured(mensureds)
      const attributes = await loadAtributes()
      setAttributes(attributes)
      disableLoading()
    })()
  }, [activeLoading, disableLoading])

  return (
    <ProductContext.Provider
      value={{
        typesProduct,
        productType,
        setProductType,
        hasVariation,
        setHasVariation,
        groupsProduct,
        categoriesCost,
        unitMensured,
        attributes
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext)
  if (!context) throw new Error('Context Product context not found')
  return context
}
