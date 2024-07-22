'use client';

import { useParams } from 'next/navigation';
import { useCartContext } from '@/context/cart_context';
import Button from '@/components/Button';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import CartItem from './CartItem';
import CartTotals from './CartTotals';
import EmptyCart from './EmptyCart';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

const Cart = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  const { cart, clearCart } = useCartContext();

  if (cart.length < 1) {
    return <EmptyCart />;
  }

  return (
    <main className='px-5 lg:px-20 py-5'>
    <Breadcrumb title={t("shop.cart.cart")} />
    <div className='grid md:grid-cols-3 mt-4 md:mt-8 lg:px-10 md:gap-6'>
      <div className='cart-content grid gap-1 md:gap-2 md:col-span-2'>
        <div className='cart__items p-2'>
        {/* {!cart || cart.length < 1 
        ? (<div>No items in cart</div>)
        : cart.map((item, index) => (
            <CartItem key={index} {...item} />
          ))} */}
          {cart && cart.map((item, index) => (
            <CartItem key={index} {...item} />
          ))}
        </div>
        <div className='cart__links flex items-center justify-between p-2'>
          <Button>
            <Link href='/products'>{t("shop.cart.buyMore")}</Link>
          </Button>
          <Button
            onClick={clearCart}
          >
            {t("shop.cart.clearCart")}
          </Button>
        </div>
      </div>
      <CartTotals />
    </div>
  </main>
  )
}

export default Cart;