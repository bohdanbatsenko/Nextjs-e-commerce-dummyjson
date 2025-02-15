'use client';

import { useParams } from 'next/navigation';
import './page.module.css'
//import { useProductsContext } from '@/context/products_context';
//import { useFilterContext } from '@/context/filter_context';
//import Pagination from '@/components/Pagination';
//import ListProducts from './ListProducts';
import { Product } from '@/types/product';
import GridProducts from './GridProducts';
import { Suspense, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '@/lib/queries/getProducts';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

let PageSize = 8;

const Products = () => {
  //console.log(GET_PRODUCTS)
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  const [products, setProducts] = useState<Product[]>([]);

  const {data, loading, error} = useQuery(GET_PRODUCTS);
  //console.log('Products data', data)
  useEffect(() => {
    if (data && data.products) {
      setProducts(data.products.items)
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
    
    return <>
    <GridProducts products={products} />
      {/* {grid_view 
        ? <Suspense fallback={<div>Loading...</div>}><GridProducts products={products} /></Suspense>
        : <Suspense fallback={<div>Loading...</div>}><ListProducts products={products} /></Suspense>
      }
      <Pagination 
        onPageChange={updateCurrentPage} 
        currentPage={currentPage} 
        totalCount={filtered_products_count}
        pageSize={PageSize}
      /> */}
    </>
}

export default Products;