import { gql } from '@apollo/client';
import { MEDIA_GALLERY_FRAGMENT } from './mediaGalleryFragment';
import { PRODUCT_PRICE_FRAGMENT } from './productPriceFragment';
import { MediaGalleryItemType } from './mediaGalleryFragment';
import { PriceRange } from './getCategoryProducts'

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
          ... on ConfigurableProduct {
            configurable_options {
              attribute_code
              label
              values {
                label
                uid
                swatch_data {
                  value
                }
              }
            }
          variants {
            attributes {
              code
              value_index
            }
            product {
              sku
              ...MediaGallery
              ...ProductPrice
            }
          }
        }
        }
      }
    }
  ${MEDIA_GALLERY_FRAGMENT}
  ${PRODUCT_PRICE_FRAGMENT}
`;

export type ProductInterfaceDetailsType = {
  id: number;
  sku: string;
  name: string;
  media_gallery: Array<MediaGalleryItemType>;
  price_range: PriceRange;
  description: {
    html: string;
  };
};

export type SimpleProductDetailsType = ProductInterfaceDetailsType & {
  __typename: 'Simple Product'
}

export type ConfigurableProductOptionValueType =  {
  label: string,
  //value_index: number;
  uid: string;
  swatch_data: {
    value: string;
    __typename: 'ImageSwatchData' | 'TextSwatchData' | 'ColorSwatchData';
  }
}

export type ConfigurableProductOptionsType = {
  attribute_code: string;
  label: string;
  values: ConfigurableProductOptionValueType[];
}

export type ConfigurableProductVariantAttribute = {
  code: string,
  value_index: number
}

export type ConfigurableProductVariantProduct = {
  sku: string,
  media_gallery: Array<MediaGalleryItemType>;
  price_range: PriceRange;
}

export type ConfigurableProductVariant = {
  attributes: ConfigurableProductVariantAttribute[]
  product: ConfigurableProductVariantProduct
}

export type ConfigurableProductDetailsType = ProductInterfaceDetailsType & {
  __typename: 'Configurable Product',
  configurable_options: ConfigurableProductOptionsType[],
  variants: ConfigurableProductVariant[],

}

export type ProductDetailsType = SimpleProductDetailsType | ConfigurableProductDetailsType;

export type ProductDetailsResponseType = {
  products: {
    total_count: number;
    items: Array<ProductDetailsType>;
  };
};