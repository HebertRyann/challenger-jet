import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLoading } from '../../../../../../../hooks/loading'
import { TypeProductModel } from '../../../domain/models/typeProduct'
import { GroupProductModel } from '../../../domain/models/groupProduct'
import { CategoryCostModel } from '../../../domain/models/categoryCost'
import { UnitMensuredProductModel } from '../../../domain/models/unitMensuredProduct'
import { LoadTypeProduct } from '../../../domain/useCases/product/load/LoadTypeProduct'
import { LoadGroupProduct } from '../../../domain/useCases/product/load/LoadGroupProduct'
import { LoadCategoryCost } from '../../../domain/useCases/product/load/LoadCategoryCostProduct'
import { LoadUnitMensuredProduct } from '../../../domain/useCases/product/load/LoadUnitMensuredProduct'

type ProductContextType = {
  loadTypeProducts: () => TypeProductModel[]
  loadGroupProduct: () => GroupProductModel[]
  loadCategoriesCost: () => CategoryCostModel[]
  loadUnitMensured: () => UnitMensuredProductModel[]
  loadSubCategoryCost: () => Promise<void>
}

const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
)

type ProductProvider = {
  children: JSX.Element
  loadTypeProduct: LoadTypeProduct
  loadGroupProducts: LoadGroupProduct
  loadCategoryCost: LoadCategoryCost
  loadUnitMensureds: LoadUnitMensuredProduct
}

export const ProductProvider = ({
  children,
  loadTypeProduct,
  loadGroupProducts,
  loadCategoryCost,
  loadUnitMensureds
}: ProductProvider): JSX.Element => {
  const [productType, setProducTypes] = useState<TypeProductModel[]>([])
  const [groupProduct, setGroupProduct] = useState<GroupProductModel[]>([])
  const [categoriesCost, setCategoriesCost] = useState<CategoryCostModel[]>([])
  const [unitMensured, setUnitMensured] = useState<UnitMensuredProductModel[]>(
    []
  )
  const { activeLoading, disableLoading } = useLoading()

  useEffect(() => {
    ;(async () => {
      activeLoading()
      const productTypes = await loadTypeProduct.loadTypeProduct()
      setProducTypes(productTypes)
      const groupProduct = await loadGroupProducts.loadGroupProduct()
      setGroupProduct(groupProduct)
      const categoriesCost = await loadCategoryCost.loadTypeCategoryCost()
      setCategoriesCost(categoriesCost)
      const mensureds = await loadUnitMensureds.loadUnitMensuredProduct()
      setUnitMensured(mensureds)
      disableLoading()
    })()
  }, [
    activeLoading,
    disableLoading,
    loadCategoryCost,
    loadGroupProducts,
    loadTypeProduct,
    loadUnitMensureds
  ])

  const loadTypeProducts = () => productType

  const loadGroupProduct = () => groupProduct

  const loadCategoriesCost = () => categoriesCost

  const loadSubCategoryCost = (): Promise<void> => {
    return Promise.resolve()
  }

  const loadUnitMensured = () => unitMensured

  return (
    <ProductContext.Provider
      value={{
        loadCategoriesCost,
        loadGroupProduct,
        loadSubCategoryCost,
        loadTypeProducts,
        loadUnitMensured
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
