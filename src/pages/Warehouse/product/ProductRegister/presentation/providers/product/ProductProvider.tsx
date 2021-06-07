import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLoading } from '../../../../../../../hooks/loading'
import { TypeProductModel } from '../../../domain/models/typeProduct'
import { GroupProductModel } from '../../../domain/models/groupProduct'
import { CategoryCostModel } from '../../../domain/models/categoryCost'
import { LoadTypeProduct } from '../../../domain/useCases/product/load/LoadTypeProduct'
import { LoadGroupProduct } from '../../../domain/useCases/product/load/LoadGroupProduct'
import { LoadCategoryCost } from '../../../domain/useCases/product/load/LoadCategoryCostProduct'

type ProductContextType = {
  loadTypeProducts: () => TypeProductModel[]
  loadGroupProduct: () => GroupProductModel[]
  loadCategoriesCost: () => CategoryCostModel[]
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
}

export const ProductProvider = ({
  children,
  loadTypeProduct,
  loadGroupProducts,
  loadCategoryCost
}: ProductProvider): JSX.Element => {
  const [productType, setProducTypes] = useState<TypeProductModel[]>([])
  const [groupProduct, setGroupProduct] = useState<GroupProductModel[]>([])
  const [categoriesCost, setCategoriesCost] = useState<CategoryCostModel[]>([])
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
      disableLoading()
    })()
  }, [
    activeLoading,
    disableLoading,
    loadCategoryCost,
    loadGroupProducts,
    loadTypeProduct
  ])

  const loadTypeProducts = () => productType

  const loadGroupProduct = () => groupProduct

  const loadCategoriesCost = () => categoriesCost

  const loadSubCategoryCost = (): Promise<void> => {
    return Promise.resolve()
  }

  return (
    <ProductContext.Provider
      value={{
        loadCategoriesCost,
        loadGroupProduct,
        loadSubCategoryCost,
        loadTypeProducts
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
