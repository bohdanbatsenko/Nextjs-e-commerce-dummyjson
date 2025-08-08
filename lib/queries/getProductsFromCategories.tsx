import { gql } from '@apollo/client';

export const GET_CATEGORY_PRODUCTS_COUNT = gql`
  query getCategoryProductsCount($categoryId: String) {
    products(filter: { category_id: { eq: $categoryId } }) {
      total_count
  }
}

`;
export const GET_CATEGORY_AND_CHILDREN = gql`
  query GetCategoryAndChildren($categoryId: Int!) {
  category(id: $categoryId) {
    id
    name
    children {
      id
      name
    }
  }
}
`;

export const GET_PRODUCTS_FROM_CATEGORIES = gql`
query GetProductsFromCategories($categoryIds: [String!], $pageSize: Int!, $currentPage: Int!) {
  products(
    filter: { category_id: { in: $categoryIds } },
    pageSize: $pageSize,
    currentPage: $currentPage
  ) {
    total_count
    page_info {
      current_page
      page_size
      total_pages
    }
    aggregations {
      attribute_code
      label
      count
      options {
        count
        label
        value
      }
    }
    sort_fields {
      default
      options {
        label
        value
      }
    }
    items {
      id
      name
      sku
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
    }
  }
}

`;
