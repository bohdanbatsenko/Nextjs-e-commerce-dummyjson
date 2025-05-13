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

const AddToCart = ({ product, selectedVariant}) => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  
  //const { addToCart, openMiniCart } = useCartContext();
  const { cartId, addProductLoading, addToCart } = useCart();
  console.log('AddToCart CartId', cartId)
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

  const onAddToCart = (product, quantity) => {
    const sku = product.sku;
    if (product?.__typename === 'SimpleProduct') {
      addToCart({
        sku: product.sku,
        quantity: 1
      }, product.name)
    } else if (product?.__typename === 'ConfigurableProduct' && selectedVariant) {
      addToCart({
        parent_sku: product.sku,
        sku: selectedVariant.product.sku,
        quantity: 1
      }, product.name)
    }

    notifyAddedToCart(product)
    //openMiniCart()
    console.log('Product name', product)
  }

  return (
    <>
      <QuantityButtons quantity={quantity} increase={increase} decrease={decrease} />
      <Button
        onClick={() => 
          onAddToCart(product, quantity)
        }>
        {t("shop.addToCart")}
      </Button>
    </>
  );
};

export default AddToCart;