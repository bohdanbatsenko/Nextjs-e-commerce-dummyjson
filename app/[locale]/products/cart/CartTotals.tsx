'use client';

import { useParams } from 'next/navigation';
import { useCartContext } from '@/context/cart_context';
import Link from 'next/link';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

const CartTotals = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  const { total_items, total_price, checkout } = useCartContext();
  
  return (
    <article className='border-2 border-amber-500 p-4 lg:self-start'>
      <div>
        <h3 className='total__items'>
        {t("shop.cart.totalItems")} : <span>{total_items}</span>
        </h3>
        <br />
        <h4 className='total__price'>
        {t("shop.cart.totalPrice")} : <span>${total_price.toFixed(2)}</span>
        </h4>
      </div>
      <hr className='my-4'/>
      <Link
        href='/checkout'
        type='button'
        className='total__btn'
        onClick={checkout}
      >
        {t("shop.cart.checkout")}
      </Link>
    </article>
  );
};

export default CartTotals;