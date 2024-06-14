'use client';

import './page.module.css'
import { useProductsContext } from '@/context/products_context';
import { useFilterContext } from '@/context/filter_context';
import Pagination from '@/components/Pagination';
import ListProducts from './ListProducts';
import GridProducts from './GridProducts';

let PageSize = 8;

const Products = () => {
  const { 
    filtered_products_count,
    filtered_products: products, 
    grid_view,
    currentPage, 
    updateCurrentPage  
  } = useFilterContext();

  const {
    products_loading: loading,
    products_error: error,
    } = useProductsContext();

    if (error) {
      return (
        <h4>Oops, something went wrong...</h4>
      );
    }

    if (loading) {
      return (
        <h4>Wait, products are loading...</h4>
      );
    }

    if (products.length < 1) {
      return (
        <h4>Wait, products are loading...</h4>
      );
    }

    return <>
      {grid_view 
        ? <GridProducts products={products} />
        : <ListProducts products={products} />
      }
      <Pagination 
        onPageChange={updateCurrentPage} 
        currentPage={currentPage} 
        totalCount={filtered_products_count}
        pageSize={PageSize}
      />
    </>
}

export default Products;