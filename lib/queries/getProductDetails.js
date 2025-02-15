import { gql } from '@apollo/client';
import { MEDIA_GALLERY_FRAGMENT } from './mediaGalleryFragment';

export const GET_PRODUCT_DETAILS = gql`
  query getProductDetailsQuery($url_key: String!) {
      products(filter: { url_key: { eq: $url_key } }) {
        items {
          __typename
          id
          name
          sku
          type_id
          stock_status
          url_key
          meta_title
          meta_keyword
          meta_description
          review_count
          rating_summary
          categories {
            id
            name
            url_key
          }
          description {
            html
          }
          price {
            regularPrice {
              amount {
                value
                currency
              }
            }
          }
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
        }
      }
    }
    
    ${MEDIA_GALLERY_FRAGMENT}
`;