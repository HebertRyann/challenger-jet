import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLoading } from '../../../../../../../hooks/loading'
import { TypeProductModel } from '../../../domain/models/typeProduct'
import { LoadTypeProduct } from '../../../domain/useCases/product/load/LoadTypeProduct'

type ProductContextType = {
  loadTypeProducts: () => TypeProductModel[]
  loadGroupProduct: () => Promise<void>
  loadCategoryCost: () => Promise<void>
  loadSubCategoryCost: () => Promise<void>
}

const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
)

type ProductProvider = {
  children: JSX.Element
  loadTypeProduct: LoadTypeProduct
}

export const ProductProvider = ({
  children,
  loadTypeProduct
}: ProductProvider): JSX.Element => {
  const [productType, setProducTypes] = useState<TypeProductModel[]>([])
  const { activeLoading, disableLoading } = useLoading()

  useEffect(() => {
    activeLoading()
    ;(async () => {
      const productTypes = await loadTypeProduct.loadTypeProduct()
      setProducTypes(productTypes)
    })()
    disableLoading()
  }, [activeLoading, disableLoading, loadTypeProduct])

  const loadTypeProducts = (): TypeProductModel[] => productType

  const loadGroupProduct = (): Promise<void> => {
    return Promise.resolve()
  }
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
