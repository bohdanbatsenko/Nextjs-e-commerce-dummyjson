'use client';

import { useParams } from 'next/navigation'
import { useCategories } from '@/hooks/useCategories';
import { CategoryType, CategoryListType } from '@/lib/queries/getCategories';
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";
import CategoryListItem from './CategoryListItem';
import { Suspense, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_AND_CHILDREN } from '@/lib/queries/getProductsFromCategories';

const Categories = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");

  const { getCategories, categories, loading } = useCategories({
    categoryId: 2
  })

  useEffect(() => {
    getCategories()
  }, [getCategories])

  const onCategoryItemPress = (item: CategoryType) => {
    console.log(item.id)
    if (item.children_count > 0) {
      console.log('item', item)
      console.log('categories', item.children_count > 0)
    } else if (item.product_count > 0) {
      console.log('categories no children')
    }
  };

  const renderItem = ({item, index}: { item: CategoryType, index: number}) => {
    return (
      <CategoryListItem 
            key={item.id}
            item={item}
            onPress={() => onCategoryItemPress(item)}
            index={index}
      />
    );
  } 

  // console.log('categories',categories)

return (
  <div className='px-5 py-10 md:px-10 lg:px-20'>
    <h2 className='text-2xl'>Categories page</h2>
    <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-x-8 gap-y-10 lg:grid-cols-3'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        categories.map((item, index) => (
          renderItem({ item, index })
        ))
      )}
    </div>
  </div>
  );
};

export default Categories;