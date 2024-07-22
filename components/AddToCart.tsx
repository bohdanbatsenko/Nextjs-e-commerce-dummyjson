'use client';

import { useParams } from 'next/navigation'
import  { useState } from "react";
import Button from "./Button";
import AmountButtons from "./AmountButtons";
import { toasterNotifier } from '@/hooks/useToasterNotify';
import { useCartContext } from "@/context/cart_context";
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

const AddToCart = ({ product }) => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  
  const { addToCart, openMiniCart } = useCartContext();
  const { notifyAddedToCart } = toasterNotifier()
  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((oldAmount) => oldAmount + 1);
  };

  const decrease = () => {
    setAmount((oldAmount) => {
      let newAmount = oldAmount - 1;
      if (newAmount < 1) {
        newAmount = 1;
      }
      return newAmount;
    });
  };

  const handleAddToCart = (product, amount) => {
    addToCart(product, amount)
    notifyAddedToCart(product)
    openMiniCart()
  }

  return (
    <>
      <AmountButtons amount={amount} increase={increase} decrease={decrease} />
      <Button
        onClick={() => 
          handleAddToCart(product, amount)
        }>
        {t("shop.addToCart")}
      </Button>
    </>
  );
};

export default AddToCart;