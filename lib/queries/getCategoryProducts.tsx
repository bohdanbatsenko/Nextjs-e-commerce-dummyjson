import { gql } from '@apollo/client';
import { MEDIA_GALLERY_FRAGMENT } from './mediaGalleryFragment';

export const GET_CATEGORY_PRODUCTS = gql`
  query GetCategoryProducts($id: Int!) {
    category(id: $id) {
      name
      products {
        total_count
        items {
          id
          name
          sku
          price {
            regularPrice {
              amount {
                value
                currency
              }
            }
          }
          image {
            url
          }
          small_image {
            url
          }
          price_range {
            minimum_price {
              final_price {
                currency
                value
              }
            }
          }
          ...MediaGallery
        }
      }
    }
  }
  ${MEDIA_GALLERY_FRAGMENT}
`;

export type GetCategoryProductsType = {
  products: {
    total_count: number;
    items: Array<ProductType>;
  };
};

export type PriceRange = {
  minimum_price: {
    final_price: {
      currency: string;
      value: number;
    };
  };
};

export type ProductType = {
  id: number;
  name: string;
  sku: string;
  small_image: {
    url: string;
  };
  price_range: PriceRange;
};