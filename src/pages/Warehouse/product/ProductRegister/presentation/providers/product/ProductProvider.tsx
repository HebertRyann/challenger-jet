import React, { createContext, useContext } from 'react'

type ProductContextType = {
  loadTypeProduct: () => Promise<void>
  loadGroupProduct: () => Promise<void>
  loadCategoryCost: () => Promise<void>
  loadSubCategoryCost: () => Promise<void>
}

const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
)

type ProductProvider = {
  children: JSX.Element
}

export const ProductProvider = ({ children }: ProductProvider): JSX.Element => {
  const loadTypeProduct = (): Promise<void> => {
    return Promise.resolve()
  }
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
        loadTypeProduct
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
