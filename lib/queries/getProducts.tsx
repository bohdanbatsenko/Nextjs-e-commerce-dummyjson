import { gql } from '@apollo/client';
import { MEDIA_GALLERY_FRAGMENT } from './mediaGalleryFragment';
import { PRODUCT_PRICE_FRAGMENT } from './productPriceFragment'; 

export const GET_PRODUCTS = gql`
  query getProductsQuery(
    $search: String,
    $pageSize: Int!, 
    $currentPage: Int!
    ) {
      products(
        search: $search, 
        pageSize: $pageSize,
        currentPage: $currentPage
        ) {
        total_count
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
        page_info {
          current_page
          page_size
          total_pages
        }

      }
    }
    ${MEDIA_GALLERY_FRAGMENT}
    ${PRODUCT_PRICE_FRAGMENT}
`;