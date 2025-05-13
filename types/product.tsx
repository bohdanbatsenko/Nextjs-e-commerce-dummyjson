// export type Product = {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   quantity?: number;
//   price: number;
//   discountPercentage?: number;
//   rating: number;
//   stock?: number;
//   tags?: [];
//   image: string;
//   brand?: string;
//   sku?: number;
//   weight?: number;
//   dimensions?: (number | string | boolean | object)[];
//   warrantyInformation?: string;
//   shippingInformation?: string;
//   availabilityStatus?: string;
//   reviews?: any[];
//   returnPolicy?: string;
//   minimumOrderQuantity?: number;
//   meta?: any[];
//   thumbnail?: string;
//   images?: any[];
// }

export interface MediaGalleryItem {
  disabled?: boolean;
  url?: string;
  label?: string;
  position?: number;
  type?: string;
  __typename?: string;
}

export interface Product {
  __typename?: string;
  id?: number;
  name?: string;
  sku?: string;
  url_key: string;
  description?:{
    html?: string;
  };
  categories?:{
    id?: number;
    name?: string;
    url_key?: string;
  }[];
  small_image?:{
    url?: string;
  },
  image?:{
    url?: string;
  }[];
  thumbnail?: {
    label?: string;
    url?: string;
  };
  price?: {
    regularPrice?: {
      amount?: {
        value?: number;
        currency?: string;
      }
    }
  };
  price_range?: {
    minimum_price?: {
      final_price?: {
        value: number;
      }
    }
  };
  media_gallery?: MediaGalleryItem[];
  stock_status?: string;
  rating_summary?: number;
}

export type SelectedConfigurableProductOptions = { [key: string]: number };
export type HandleSelectConfigurableOption = (optionCode: string, valueIndex: number) => void;
  // discountPercentage?: number;
  // rating?: number;
  // stock?: number;
  // tags?: [];

  // brand?: string;
  // sku?: number;
  // weight?: number;
  // dimensions?: (number | string | boolean | object)[];
  // warrantyInformation?: string;
  // shippingInformation?: string;
  // availabilityStatus?: string;
  // reviews?: any[];
  // returnPolicy?: string;
  // minimumOrderQuantity?: number;
  // meta?: any[];
  // thumbnail?: string;
  // images?: any[];


export type Products = {
  products: Product[];
}

export type FilteredProducts = {
  products: Product[];
  category: string;
}

// export function transformMagentoProduct(magentoProduct: any): Product {
//   return {
//     id: magentoProduct.id, // Map externalId to id
//     name: magentoProduct.name, // Assuming name is the title in Magento
//     description: magentoProduct.description.html,
//     categories: magentoProduct.categories, // Adjust based on your category structure
//     quantity: magentoProduct.quantity || 0, // Default to 0 if not provided
//     price: magentoProduct?.price_range?.minimum_price?.final_price?.value, // Adjust based on price structure
//     discountPercentage: magentoProduct.discountPercentage || 0, // Default if not provided
//     rating: magentoProduct.rating_summary || 0, // Default if not provided
//     stock: magentoProduct.stock_status === 'IN_STOCK' ? magentoProduct.stock_quantity : 0,
//     tags: magentoProduct.tags || [],
//     image: magentoProduct.image.url, // Adjust based on image structure
//     brand: magentoProduct.brand || '',
//     sku: magentoProduct.sku,
//     weight: magentoProduct.weight || 0,
//     dimensions: magentoProduct.dimensions || [],
//     warrantyInformation: magentoProduct.warrantyInformation || '',
//     shippingInformation: magentoProduct.shippingInformation || '',
//     availabilityStatus: magentoProduct.availabilityStatus || '',
//     reviews: magentoProduct.reviews || [],
//     returnPolicy: magentoProduct.returnPolicy || '',
//     minimumOrderQuantity: magentoProduct.minimumOrderQuantity || 1,
//     meta: magentoProduct.meta || [],
//     thumbnail: magentoProduct?.media_gallery?.url || '',
//     images: magentoProduct.images || [],
//   };
// }