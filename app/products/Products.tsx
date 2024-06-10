'use client';

import './page.module.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useContext } from "react";
import {useProductsContext} from '@/context/products_context';
import {useFilterContext} from '@/context/filter_context';
import Pagination from '@/components/Pagination';
import Button from '@/components/Button';
import SearchForm from '@/components/SearchForm';
import ProductCard from '@/components/ProductCard';
import ListProducts from './ListProducts';
import GridProducts from './GridProducts';

let PageSize = 8;

const Products = () => {
  const { filtered_products: products, grid_view } = useFilterContext();
  const {
    products_loading: loading,
    products_error: error,
    } = useProductsContext();

    if (error) {
      console.log('Error');
    }

    if (loading) {
      console.log('Loading');
    }

    if (products.length < 1) {
      return (
        <h4>Sorry, no products matched your search...</h4>
      );
    }

    if (grid_view === false) {
      return <ListProducts products={products} />;
    }
    return <GridProducts products={products} />;
}

export default Products;