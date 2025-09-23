'use client';

import { useParams } from 'next/navigation';
import './page.module.css'
//import { useProductsContext } from '@/context/products_context';
//import { useFilterContext } from '@/context/filter_context';
//import Pagination from '@/components/Pagination';
//import ListProducts from './ListProducts';
import ProductCard from "@/components/ProductCard";
import type { Product } from '@/types/product';
import Pagination from './Pagination';
import GridProducts from './GridProducts';
import { Suspense, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCTS } from '@/lib/queries/getProducts';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

const Products = () => {
  //console.log(GET_PRODUCTS)
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  // const {data, loading, error} = useQuery(GET_PRODUCTS);

  const [getProducts, queryResponse] = useLazyQuery(
    GET_PRODUCTS,
    {
      variables: { search: '', pageSize, currentPage },
    },
  );
  const { loading, error, data } = queryResponse;

    useEffect(() => {
    if (!loading) {
      getProducts();
    }
  }, [currentPage, getProducts]);

 
  console.log('Products data', data?.products?.items)

  console.log('Products total_count', data?.products?.total_count)
    useEffect(() => {
      if (data?.products?.items && currentPage === 1) {
        // setProducts(data?.products?.items);
      } else if (
        data?.products?.items &&
        products.length < data.products.total_count &&
        products.length < currentPage * pageSize
      ) {
        // setProducts([...products, ...data?.products?.items]);
      }
    }, [data]);
    
  // useEffect(() => {
  //   if (data && data.products) {
  //     setProducts(data.products.items)
  //   }
  // }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
    
    return <>
    {/* <GridProducts products={products} /> */}
      {/* {grid_view 
        ? <Suspense fallback={<div>Loading...</div>}><GridProducts products={products} /></Suspense>
        : <Suspense fallback={<div>Loading...</div>}><ListProducts products={products} /></Suspense>
      } */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-0 md:px-5 lg:px-0 lg:pr-10">
      {data && data.products && data.products.items.length > 0 ? (
        data.products.items.map(product => (
          <ProductCard key={product.id} product={product}/>
        ))
      ) : (
        <p>{t('No products found')}</p>
      )}
    </div>

       <Pagination
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />
    </>
}

export default Products;