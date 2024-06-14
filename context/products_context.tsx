'use client';

import { createContext, useContext, useEffect, useReducer } from "react";

import {
  CLOSE_SIDEBAR,
  OPEN_SIDEBAR,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SINGLE_PRODUCT_SUCCESS
} from "./actions";

import { products_reducer as reducer } from "./products_reducer";

type ProductsContextType = {
  isSidebarOpen: boolean;
  products_loading: boolean;
  products_error: boolean;
  products: any[];
  popular_products: any[];
  single_product_loading: boolean;
  single_product_error: boolean;
  single_product: any;
  openSidebar: () => void;
  closeSidebar: () => void;
  fetchSingleProduct: (params: any) => void;
};

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  popular_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const API_ENDPOINT = "https://dummyjson.com/products?limit=400";

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await fetch(url);
      const data = await response.json();
      const products = data.products;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  const fetchSingleProduct = async (params) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await fetch(`https://dummyjson.com/products/${params}`);
      const singleProduct = await response.json();
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    fetchProducts(API_ENDPOINT);
  }, []);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch('api/products/products');
  //       const data = await response.json();
  //       setProducts(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  const openSidebar = () => {
    dispatch({ type: OPEN_SIDEBAR });
  };
  const closeSidebar = () => {
    dispatch({ type: CLOSE_SIDEBAR });
  };


  return (
    <ProductsContext.Provider
      value={{
         ...state, 
         openSidebar, 
         closeSidebar, 
         fetchSingleProduct
        }}
    >
      {children}  
    </ProductsContext.Provider>
  );
};

export const useProductsContext = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }

  return context;
};