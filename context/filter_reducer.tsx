'use client';

import {
  CLEAR_FILTERS,
  FILTER_PRODUCTS,
  UPDATE_SORT,
  LOAD_PRODUCTS,
  SET_GRID_VIEW,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  SET_LIST_VIEW,
  UPDATE_CURRENT_PAGE
} from "./actions";

let PageSize = 8;

export const filter_reducer = (state, action) => {
  const { type, payload } = action;

  if (type === LOAD_PRODUCTS) {
    let maxPrice = payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      all_products: [...payload],
      filtered_products: [...payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }

  if (type === SET_GRID_VIEW) {
    return { ...state, grid_view: true };
  }
  if (type === SET_LIST_VIEW) {
    return { ...state, grid_view: false };
  }

  if (type === UPDATE_SORT) {
    return { ...state, sort: payload };
  }

  if (type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    }

    return { ...state, filtered_products: tempProducts };
  }

  if (type === UPDATE_FILTERS) {
    const { name, value } = payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  const filterProducts =(state) => {
    let tempProducts = [...state.all_products];
    const { text, category, price } = state.filters;
    
    if (text) {
      tempProducts = tempProducts.filter((product) =>
        product.title.toLowerCase().includes(text)
      );
    }
  
    if (category.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        category.includes(product.category)
      );
    }
  
    tempProducts = tempProducts.filter((product) => product.price <= price);
    
    return tempProducts;
  }
  
  if (type === FILTER_PRODUCTS) {
    const filteredProducts = filterProducts(state);
    const firstPageIndex = (state.currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
  
    return {
      ...state, 
      filtered_products: filteredProducts.slice(firstPageIndex, lastPageIndex),
      filtered_products_count: filteredProducts.length
    };
  }

  if (type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        category: [],
        price: state.filters.max_price,
      },
    };
  }

  if (type === UPDATE_CURRENT_PAGE) {
    const filteredProducts = filterProducts(state);
    const firstPageIndex = (payload - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
  
    return { 
      ...state, 
      currentPage: payload,
      filtered_products: filteredProducts.slice(firstPageIndex, lastPageIndex),
      filtered_products_count: state.filtered_products_count
    };
  }

  throw new Error(`No Matching "${type}" - action type `);
};
