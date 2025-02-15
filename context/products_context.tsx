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

//const API_ENDPOINT = "https://dummyjson.com/products?limit=400";
const API_ENDPOINT = "https://m2.test/graphql/";

const GET_PRODUCTS_QUERY = `
query getProductsQuery {
    products(search: "", pageSize: 450) {
      items {
        __typename
        id
        name
        categories {
          id
          name
          url_key
        }
        description {
          html
        }
        sku
        price_range {
          minimum_price {
            final_price {
              value
            }
          }
        }
        image {
          url
        }
        small_image {
          url
        }
        rating_summary
      }
    }
  }
`;

const GET_SINGLE_PRODUCT_QUERY = (id) => `
query {
product(id: "${id}") {
  id
  name
  description {
    html
  }
  sku
  price {
    regularPrice {
      amount {
        value
        currency
      }
    }
  }
  image {
    url
  }
}
}
`;

// const transformMagentoProduct = (magentoProduct) => ({
//   id: magentoProduct.id,
//   title: magentoProduct.name,
//   description: magentoProduct.description.html,
//   price: magentoProduct.price.regularPrice.amount.value,
//   image: magentoProduct.image.url,

// });

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await fetch('https://m2.test/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authentication headers if needed
        },
        body: JSON.stringify({ query: GET_PRODUCTS_QUERY }),
      });
      const data = await response.json();
      // console.log('Data', data)
      const products = data.data.products.items;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  const fetchSingleProduct = async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await fetch('https://m2.test/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authentication headers if needed
        },
        body: JSON.stringify({ query: GET_SINGLE_PRODUCT_QUERY(id) }),
      });
      const data = await response.json();
      const singleProduct = data.data.product;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };
  // const fetchProducts = async (url) => {
  //   dispatch({ type: GET_PRODUCTS_BEGIN });
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     const products = data.products;
  //     dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
  //   } catch (error) {
  //     dispatch({ type: GET_PRODUCTS_ERROR });
  //   }
  // };

  // const fetchSingleProduct = async (params) => {
  //   dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
  //   try {
  //     const response = await fetch(`https://dummyjson.com/products/${params}`);
  //     const singleProduct = await response.json();
  //     dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
  //   } catch (error) {
  //     dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
  //   }
  // };

  useEffect(() => {
    fetchProducts();
  }, []);



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