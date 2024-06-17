'use client';

import  { useState } from "react";
import Button from "./Button";
import AmountButtons from "./AmountButtons";
import { toasterNotifier } from '@/hooks/useToasterNotify';
import { useCartContext } from "@/context/cart_context";

const AddToCart = ({ product }) => {
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
        Add to cart
      </Button>
    </>
  );
};

export default AddToCart;