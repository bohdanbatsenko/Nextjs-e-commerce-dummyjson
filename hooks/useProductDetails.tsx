import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  ConfigurableProductVariant,
  GET_PRODUCT_DETAILS,
  ProductDetailsResponseType,
  ProductDetailsType,
} from '@/lib/queries/getProductDetails';
import { useCart } from '@/hooks/useCart';
import { PriceRange } from '@/lib/queries/getCategoryProducts';
import { MediaGalleryItemType } from '@/lib/queries/mediaGalleryFragment';
import { log } from 'console';

export type SelectedConfigurableProductOptions = { [key: string]: number };
export type HandleSelectConfigurableOption = (optionCode: string, valueIndex: number) => void;

type Props = {
  sku?: string;
  url_key: string;
};

type Result = {
  getProductDetails: () => void;
  loading: boolean;
  productData: ProductDetailsType | null | undefined;
  selectedConfigurableProductOptions: SelectedConfigurableProductOptions;
  handleSelectConfigurableOption: HandleSelectConfigurableOption;
  price: PriceRange | null;
  mediaGallery: MediaGalleryItemType[];
  selectedVariant: any,
  addProductLoading: boolean;
  addToCart(): void;
};


const findSelectProductVariant = (
  selectedConfigurableProductOptions: SelectedConfigurableProductOptions,
  productData: ProductDetailsType,
): ConfigurableProductVariant | null => {
  if (productData.__typename !== 'ConfigurableProduct') {
    return null;
  }

  let variants = productData.variants;

  Object.keys(selectedConfigurableProductOptions).forEach(code => {
    console.log('code', code) // returns code: size
    
    variants = variants.filter(variant => {
      // console.log('variant.attributes', variant.attributes)
      const attribute = variant.attributes.find(attr => attr.code === code);
      // console.log('attribute', attribute)
      const valueIndex = variant.attributes.find(v => v.value_index === attribute.value_index);
      // console.log('valueIndex', valueIndex) 
      // return attribute?.value_index === selectedConfigurableProductOptions[code];

      return attribute?.value_index === valueIndex.value_index;
      
      // const isMatch = attribute?.value_index === selectedConfigurableProductOptions[code];
      // console.log(`Checking variant for code ${code}:`, attribute, 'Match:', isMatch);
      // return isMatch;
    });
  });
  // console.log('variants', variants) 
  // const selectedVariant = variants?.[0] || null;

  // return selectedVariant;
  console.log('variants?.[0]', variants?.[0]) // returns size: undefined
  return variants?.[0];
};

export const useProductDetails = ({ url_key }: Props): Result => {
  const [productData, setProductData] = useState<ProductDetailsType | null | undefined>(null);
  const [selectedConfigurableProductOptions, setSelectedConfigurableProductOptions] = useState<
    SelectedConfigurableProductOptions
  >({});
  const [selectedVariant, setSelectedVariant] = useState<ConfigurableProductVariant | null>(null);
  const [price, setPrice] = useState<PriceRange | null>(null);
  const [mediaGallery, setMediaGallery] = useState<MediaGalleryItemType[]>([]);

  const { addToCart, addProductLoading } = useCart();

  const [getProductDetailsQuery, responseObject] = useLazyQuery<ProductDetailsResponseType>(
    GET_PRODUCT_DETAILS,
    {
      variables: { url_key },
    },
  );

  const { loading, data } = responseObject;

  const getProductDetails = () => {
    getProductDetailsQuery();
  };

  useEffect(() => {
    setProductData(data?.products?.items?.[0]);
      //console.log('data', data?.products?.items?.[0].configurable_options[1].values)
  }, [data]);

  useEffect(() => {
    if (productData) {
      if (selectedVariant) {
        console.log('selectedVariant',selectedVariant)

        setPrice(selectedVariant.product.price_range);
        
        setMediaGallery([...selectedVariant.product.media_gallery, ...productData.media_gallery]);
      } else {
        setPrice(productData.price_range);
        setMediaGallery(productData.media_gallery);
      }
    }
  }, [selectedVariant, productData]);

  useEffect(() => {
    if (productData && Object.keys(selectedConfigurableProductOptions).length > 0) {
      const variant = findSelectProductVariant(selectedConfigurableProductOptions, productData);
      setSelectedVariant(variant);
      // console.log('Updated Variant:', variant);
    }
  }, [productData, selectedConfigurableProductOptions]);

  const handleSelectConfigurableOption: HandleSelectConfigurableOption = (
    optionCode,
    valueIndex,
  ) => {
    setSelectedConfigurableProductOptions({
      ...selectedConfigurableProductOptions,
      [optionCode]: valueIndex,
    });

    // setSelectedConfigurableProductOptions(prevState => {
    //   const newState = {
    //     ...prevState,
    //     [optionCode]: valueIndex,
    // };
    //   console.log('Updated Selected Options:', newState);
    //   return newState;
    // });

  };

  const addProductToCart = (productData) => {
    if (productData?.__typename === 'SimpleProduct') {
      addToCart(
        {
          sku: productData.sku,
          quantity: 1,
        },
        productData.name,
      );
    } else if (productData?.__typename === 'ConfigurableProduct' && selectedVariant) {
      console.log('selectedVariant', selectedVariant)
      addToCart(
        {
          parent_sku: productData.sku,
          sku: selectedVariant.product.sku,
          quantity: 1,
        },
        productData.name,
      );
    } else {
      console.error('No variant selected or product data is missing');
    }
  };

  return {
    getProductDetails,
    loading,
    productData,
    selectedConfigurableProductOptions,
    handleSelectConfigurableOption,
    price,
    mediaGallery,
    selectedVariant,
    addToCart: addProductToCart,
    addProductLoading,
  };
};