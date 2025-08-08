'use client';

import { useParams } from 'next/navigation';

import { useEffect, useState, Suspense, lazy, FC } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";
import { useSearchParams  } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_AND_CHILDREN, GET_PRODUCTS_FROM_CATEGORIES } from '@/lib/queries/getProductsFromCategories'
import ProductCard from '@/components/ProductCard';
import Pagination from '../Pagination';

const CategoryPage: FC = () => {
  const searchParams = useSearchParams();
  const urlKey = searchParams.get('categoryId');
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");

  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);


  const categoryId = urlKey ? parseInt(urlKey, 10) : null;

  const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(GET_CATEGORY_AND_CHILDREN, {
    variables: { categoryId },
    skip: categoryId === null,
  });

  const catName = categoryData?.category?.name

  console.log('categoryData', categoryData)

  const categoryIds = categoryData
    ? [categoryData.category.id, ...categoryData.category.children.map(child => child.id)]
    : [];

  const { data: productsData, loading: productsLoading, error: productsError } = useQuery(GET_PRODUCTS_FROM_CATEGORIES, {
    skip: categoryIds.length === 0,
    variables: {
      categoryIds,
      pageSize,
      currentPage,
    },
  });


  if (categoryLoading || productsLoading) return <p>Loading...</p>;
  if (categoryError) return <p>Error loading categories: {categoryError.message}</p>;
  if (productsError) return <p>Error loading products: {productsError.message}</p>;

  console.log('productsData is', productsData.products.items)

  return (
    <div className='px-5 py-10 md:px-10 lg:px-20'>
      <h1 className='text-2xl'>{catName} {t('Category product page')}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-0 md:px-5 lg:px-0 lg:pr-10 h-9/10">
      {productsData && productsData.products && productsData.products.items.length > 0 ? (
        productsData.products.items.map(product => (
          <ProductCard key={product.id} product={product}/>
        ))
      ) : (
        <p>{t('No products found')}</p>
      )}
      </div>

      <div className='pt-10'>
       <Pagination
        data={productsData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />
      </div>
    </div>
  );
}

export default CategoryPage;