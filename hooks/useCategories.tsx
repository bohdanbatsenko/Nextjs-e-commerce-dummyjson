import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CATEGORIES } from '@/lib/queries/getCategories';
import type { CategoryListType, CategoryType } from '@/lib/queries/getCategories';

type Props = {
  categoryId: number;
};

type Result = {
  getCategories(): void;
  categories: Array<CategoryType>;
  loading: boolean;
};

export const useCategories = (props: Props): Result => {
  const [categories, setCategories] = useState<Array<CategoryType>>([]);
  const [getCategories, { called, loading, data, error }] = useLazyQuery(GET_CATEGORIES, {
    variables: { id: props.categoryId },
  });

  useEffect(() => {
    if (data) {
      console.log('categories',{ data });
      const list: CategoryListType = data;
      if (list.categoryList?.[0]?.children?.length > 0) {
        setCategories(list.categoryList?.[0]?.children);
      }
    }
    if (error) {
      console.log({ error });
    }
  }, [data, error]);

  return {
    getCategories,
    categories,
    loading,
  };
};


