import { Product } from '@/schemas';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ProductContextProps {
  products: Product[];
  addProduct: (product: Product) => void;
}
interface ProductProviderProps {
  children: ReactNode;
}

export const ProductContext = createContext<ProductContextProps | null>(null);

export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }

  return context;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
