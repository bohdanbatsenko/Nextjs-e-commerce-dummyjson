'use client';

import { useParams } from 'next/navigation';
import './page.module.css'
import { useProductsContext } from '@/context/products_context';
import { useFilterContext } from '@/context/filter_context';
import Pagination from '@/components/Pagination';
import ListProducts from './ListProducts';
import GridProducts from './GridProducts';
import { Suspense } from 'react';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

let PageSize = 8;

const Products = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");

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
        <h4>{t("shop.smthWentWrong")}</h4>
      );
    }
    
    return <>
      {grid_view 
        ? <Suspense fallback={<div>Loading...</div>}><GridProducts products={products} /></Suspense>
        : <Suspense fallback={<div>Loading...</div>}><ListProducts products={products} /></Suspense>
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