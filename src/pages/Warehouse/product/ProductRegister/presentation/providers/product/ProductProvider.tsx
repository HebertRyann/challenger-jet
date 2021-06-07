import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLoading } from '../../../../../../../hooks/loading'
import { TypeProductModel } from '../../../domain/models/typeProduct'
import { GroupProductModel } from '../../../domain/models/groupProduct'
import { LoadTypeProduct } from '../../../domain/useCases/product/load/LoadTypeProduct'
import { LoadGroupProduct } from '../../../domain/useCases/product/load/LoadGroupProduct'

type ProductContextType = {
  loadTypeProducts: () => TypeProductModel[]
  loadGroupProduct: () => GroupProductModel[]
  loadCategoryCost: () => Promise<void>
  loadSubCategoryCost: () => Promise<void>
}

const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
)

type ProductProvider = {
  children: JSX.Element
  loadTypeProduct: LoadTypeProduct
  loadGroupProducts: LoadGroupProduct
}

export const ProductProvider = ({
  children,
  loadTypeProduct,
  loadGroupProducts
}: ProductProvider): JSX.Element => {
  const [productType, setProducTypes] = useState<TypeProductModel[]>([])
  const [groupProduct, setGroupProduct] = useState<GroupProductModel[]>([])
  const { activeLoading, disableLoading } = useLoading()

  useEffect(() => {
    ;(async () => {
      activeLoading()
      const productTypes = await loadTypeProduct.loadTypeProduct()
      setProducTypes(productTypes)
      const groupProduct = await loadGroupProducts.loadGroupProduct()
      setGroupProduct(groupProduct)
      disableLoading()
    })()
  }, [activeLoading, disableLoading, loadGroupProducts, loadTypeProduct])

  const loadTypeProducts = () => productType

  const loadGroupProduct = () => groupProduct

  const loadCategoryCost = (): Promise<void> => {
    return Promise.resolve()
  }
  const loadSubCategoryCost = (): Promise<void> => {
    return Promise.resolve()
  }

  return (
    <ProductContext.Provider
      value={{
        loadCategoryCost,
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
