'use client';

import { useParams } from 'next/navigation'
import  { useState } from "react";
import Button from "./Button";
import QuantityButtons from "./QuantityButtons";
import { toasterNotifier } from '@/hooks/useToasterNotify';
//import { useCartContext } from "@/context/cart_context";

import { useCart } from '@/hooks/useCart';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";


const AddToCart = ({product}) => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  
  //const { addToCart, openMiniCart } = useCartContext();
  const { cartId, addProductLoading, addToCart, openMiniCart, closeMiniCart} = useCart();

  const { notifyAddedToCart } = toasterNotifier()
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity((oldQuantity) => oldQuantity + 1);
  };

  const decrease = () => {
    setQuantity((oldQuantity) => {
      let newQuantity = oldQuantity - 1;
      if (newQuantity < 1) {
        newQuantity = 1;
      }
      return newQuantity;
    });
  };

  const onAddToCart = () => {
    // if (product) {
    //   console.log('product.sku',product.sku)
    //   const payload = {
    //     sku: product.sku,
    //     quantity,
    //     ...(product.__typename === 'ConfigurableProduct' && selectedVariant
    //       ? { parent_sku: product.sku, sku: selectedVariant.product.sku }
    //       : {}),
    //   };
    //   addToCart(payload, product.name);
    // }

    //  if (!cartId) {
    //   console.error('Cart ID is not available. Cannot add product to cart.');
    //   return;
    // }
    
    // const sku = product.sku;
    // if (product?.__typename === 'SimpleProduct') {
    //   addToCart({
    //     sku: product.sku,
    //     quantity: quantity
    //   }, product.name)
    //   console.log('product simple', product)
    // } else if (product?.__typename === 'ConfigurableProduct' && selectedVariant) {
    //   addToCart({
    //     parent_sku: product.sku,
    //     sku: selectedVariant.product.sku,
    //     quantity: quantity
    //   }, product.name)
    //   console.log('product configurable', product)
    // }

    // notifyAddedToCart(product)
    // openMiniCart()
  
  }

  return (
    <>
      <QuantityButtons quantity={quantity} increase={increase} decrease={decrease} />
      <Button
        onClick={onAddToCart}
        disabled={addProductLoading}>
        {t("shop.addToCart")}
      </Button>
    </>
  );
};

export default AddToCart;