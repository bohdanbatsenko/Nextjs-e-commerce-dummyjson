import { gql } from '@apollo/client';
import { MEDIA_GALLERY_FRAGMENT } from './mediaGalleryFragment';
import { PRODUCT_PRICE_FRAGMENT } from './productPriceFragment'; 

export const GET_PRODUCTS = gql`
  query getProductsQuery {
      products(search: "", pageSize: 50) {
        items {
          __typename
          id
          name
          url_key
          categories {
            id
            name
            url_key
          }
          description {
            html
          }
          sku
          ...ProductPrice
          image {
            url
          }
          small_image {
            url
          }
          thumbnail {
            label
            url
          }
          ...MediaGallery
          rating_summary
        }
      }
    }
    ${MEDIA_GALLERY_FRAGMENT}
    ${PRODUCT_PRICE_FRAGMENT}
`;