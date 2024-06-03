export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  quantity?: number;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock?: number;
  tags?: [];
  image: string;
  brand?: string;
  sku?: number;
  weight?: number;
  dimensions?: (number | string | boolean | object)[];
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: any[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: any[];
  thumbnail?: string;
  images?: any[];
}

export type Products = {
  products: Product[];
}

export type FilteredProducts = {
  products: Product[];
  category: string
}