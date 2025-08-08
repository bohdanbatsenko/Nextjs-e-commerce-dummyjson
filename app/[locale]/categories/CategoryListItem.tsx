import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_PRODUCTS_COUNT } from '@/lib/queries/getProductsFromCategories';


// Define the type for the props
type CategoryListItemProps = {
  item: {
    id: number;
    name: string;
    children_count: number;
    product_count: number;
  };
  onPress?: () => void;
  color?: string;
  index: number;
};

const CategoryListItem: React.FC<CategoryListItemProps> = ({ item, onPress, color, index }) => {
    const locale = useParams()?.locale as LocaleTypes;
    const { t } = useTranslation(locale, "common");
    const categoryId = item.id;

    const { data: getCategoryProductsCount, loading, error } = useQuery(GET_CATEGORY_PRODUCTS_COUNT, {
      variables: { categoryId },
      skip: categoryId === null,
    });

  const totalCount = getCategoryProductsCount?.products?.total_count;


  return (
    <div
      className='flex flex-col items-center gap-3 justify-between p-10 my-5 border rounded-md'
      onClick={onPress}
    >
      <span className='text-2xl'>{item.name}</span>
      <Link
        href={{
          pathname: "categories/category",
          //query: {id: product.id},
          query: {categoryId: item.id}
        }}
        className="mt-2 lg:mt-0 px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
      >
      {t("shop.viewProduct")}
      </Link>
      <span>{totalCount}</span>
      <span style={{ fontSize: '12px', color: '#666' }}>
        {item.children_count > 0 ? `${item.children_count} Subcategories` : `${item.product_count} Products`}
      </span>
    </div>
  );
};

export default CategoryListItem;
