'use client';

import { createContext, useContext, useEffect, useReducer } from "react";

import {
  CLEAR_FILTERS,
  FILTER_PRODUCTS,
  UPDATE_SORT,
  LOAD_PRODUCTS,
  SET_GRID_VIEW,
  SET_LIST_VIEW,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  UPDATE_CURRENT_PAGE
} from "./actions";


import { filter_reducer as reducer } from "./filter_reducer";

import { useProductsContext } from "./products_context";

type FilterContextType = {
  filtered_products: any[];
  all_products: any[];
  grid_view: boolean;
  sort: string;
  currentPage: string;
  filtered_products_count: number;
  filters: {
    text: string;
    category: string[];
    min_price: number;
    price: number;
    max_price: number;
  };
  setGridView: () => void;
  setListView: () => void;
  updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  updateFilters: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  clearFilters: () => void;
  updateCurrentPage: () => void;
};

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  currentPage: 1,
  filtered_products_count: 0,
  filters: {
    text: "",
    category: [],
    min_price: 0,
    price: 0,
    max_price: 0,
  },
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  //? Handlers
  const setGridView = () => {
    dispatch({ type: SET_GRID_VIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LIST_VIEW });
  };

  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilters = (e) => {
    let { name, value, checked } = e.target;

    if (name === "category") {
      let newCategories = [...state.filters.category];
      if (checked && !newCategories.includes(value)) {
        newCategories.push(value);
      } else {
        newCategories = newCategories.filter((item) => item !== value);
      }
      dispatch({ type: UPDATE_FILTERS, payload: { name, value: newCategories } });
    } 

    console.log({ name, value }); 

    if (name === "text") {
      value = value.toLowerCase();
      dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
    }

    if (name === "price") {
      value = Number(value);
      dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
    }
    
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const updateCurrentPage = (pageNumber) => {
    dispatch({ type: UPDATE_CURRENT_PAGE, payload: pageNumber });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
        updateCurrentPage
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};


// 'use client';

// import { createContext, useContext, useEffect, useReducer } from "react";

// import {
//   CLEAR_FILTERS,
//   FILTER_PRODUCTS,
//   UPDATE_SORT,
//   LOAD_PRODUCTS,
//   SET_GRID_VIEW,
//   SET_LIST_VIEW,
//   SORT_PRODUCTS,
//   UPDATE_FILTERS,
// } from "./actions";


// import { filter_reducer as reducer } from "./filter_reducer";

// import { useProductsContext } from "./products_context";

// type FilterContextType = {
//   filtered_products: any[];
//   all_products: any[];
//   grid_view: boolean;
//   sort: string;
//   filters: {
//     text: string;
//     category: string;
//     min_price: number;
//     price: number;
//     max_price: number;
//   };
//   setGridView: () => void;
//   setListView: () => void;
//   updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//   updateFilters: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
//   clearFilters: () => void;
// };

// const initialState = {
//   filtered_products: [],
//   all_products: [],
//   grid_view: true,
//   sort: "price-lowest",
//   filters: {
//     text: "",
//     category: "all",
//     min_price: 0,
//     price: 0,
//     max_price: 0,
//   },
// };

// const FilterContext = createContext<FilterContextType | undefined>(undefined);

// export const FilterProvider = ({ children }) => {
//   const { products } = useProductsContext();
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     dispatch({ type: LOAD_PRODUCTS, payload: products });
//   }, [products]);

//   useEffect(() => {
//     dispatch({ type: FILTER_PRODUCTS });
//     dispatch({ type: SORT_PRODUCTS });
//   }, [products, state.sort, state.filters]);

//   //? Handlers
//   const setGridView = () => {
//     dispatch({ type: SET_GRID_VIEW });
//   };
//   const setListView = () => {
//     dispatch({ type: SET_LIST_VIEW });
//   };
//   const updateSort = (e) => {
//     const value = e.target.value;
//     dispatch({ type: UPDATE_SORT, payload: value });
//   };
//   const updateFilters = (e) => {
//     let name = e.target.name;
//     let value = e.target.value;
//     console.log({ name, value });
//     if (name === "category") {
//       value = e.target.dataset.category;
//     }
//     if (name === "price") {
//       value = Number(value);
//     }
//     dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
//   };
//   const clearFilters = () => {
//     dispatch({ type: CLEAR_FILTERS });
//   };
//   return (
//     <FilterContext.Provider
//       value={{
//         ...state,
//         setGridView,
//         setListView,
//         updateSort,
//         updateFilters,
//         clearFilters,
//       }}
//     >
//       {children}
//     </FilterContext.Provider>
//   );
// };

// export const useFilterContext = (): FilterContextType => {
//   const context = useContext(FilterContext);
//   if (!context) {
//     throw new Error('useFilterContext must be used within a FilterProvider');
//   }
//   return context;
// };