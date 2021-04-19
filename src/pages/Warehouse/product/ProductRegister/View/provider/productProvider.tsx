import React, { createContext, useCallback, useContext, useState } from 'react';
import { ProductResponse } from "../domain/response/productResponse";

interface ProductContext {
  setProduct: (product: ProductResponse) => void;
  getProduct: () => ProductResponse;
}

const ProductContext = createContext<ProductContext>({} as ProductContext);

const ProductProvider: React.FC = ({ children }) => {
  const [productState, setProductState] = useState<ProductResponse>({} as ProductResponse);

  const getProduct = () => productState;

  const setProduct = (product: ProductResponse) => setProductState(product);

  return (
    <ProductContext.Provider value={{ getProduct, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

function useProduct(): ProductContext {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProducu must be used witin a ProducuProvider');
  }

  return context;
}

export { ProductProvider, useProduct };
