import { gql } from '@apollo/client';
import { MEDIA_GALLERY_FRAGMENT } from './mediaGalleryFragment';

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
          price_range {
            minimum_price {
              final_price {
                value
              }
            }
          }
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
`;