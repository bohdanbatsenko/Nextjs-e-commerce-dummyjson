import { gql } from '@apollo/client';

export const CART_DETAIL_ITEMS_FRAGMENT = gql`
  fragment CartDetailItems on Cart {
    # itemsV2 {
    #   total_count
      items {
        uid
        product {
          name
          url_key
          sku
          image {
            url
          }
        }
        prices {
          price {
            currency
            value
          }
        }
        quantity
        ... on ConfigurableCartItem {
          configurable_options {
            option_label
            value_label
          }
        }
      }
    # }
    prices {
      grand_total {
        currency
        value
      }
    }
  }
`;

export type CartDetailTotals = {
  grand_total: {
    currency: string;
    value: number;
  };
};

export type CartDetailItemType = {
  uid: string;
  product: {
    name: string;
    url_key: string;
    sku: string;
    image: {
      url: string;
    };
  }
    prices: {
    price: {
      currency: string;
      value: number;
    }
  }
  quantity: number;
  configurable_options: {
    option_label: string;
    value_label: string;
  }
}

export type CartDetailItemsType = {
  items: CartDetailItemType[];
}

// export type CartDetailItemsV2Type = {
//   itemsV2: CartDetailItemType[];
// }