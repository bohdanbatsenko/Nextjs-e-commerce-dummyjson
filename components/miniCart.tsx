'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaRegTimesCircle } from "react-icons/fa";
import { useCartContext } from '@/context/cart_context';
import MiniCartItem from './MiniCartItem';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

const MiniCart = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  const [ isClient, setIsClient ] = useState(false)
  const { cart, total_items, total_price, isMiniCartOpen, closeMiniCart } = useCartContext();
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className={
        "fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out" +
        (isMiniCartOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0"
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }    
    >
      <section
        className={
          "md:w-screen md:max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isMiniCartOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative md:w-screen md:max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full text-black">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <header className="flex items-start justify-between">
              <h2 className="text-lg font-medium text-gray-900">{t("header.miniCart.shoppingCart")}</h2>
              <div className="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                  onClick={closeMiniCart}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">{t("header.miniCart.closeDrawer")}</span>
                  <FaRegTimesCircle className="h-6 w-6"/>
                </button>
              </div>
            </header>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {isClient && cart && cart.length ? cart.map((product) => (
                      <MiniCartItem key={product.id} product={product}/>
                  )) : (<div>{t("header.miniCart.noItemsMsg")}</div>)}
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>{t("header.miniCart.subTotal")}</p>
              <p>${total_price}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">{t("header.miniCart.miniCartMsg")}</p>
            <div className="mt-6">
            <Link 
              className="flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white hover:bg-gray-500" 
              href="/products/cart"
              onClick={closeMiniCart}
            >
              {t("header.miniCart.goToCart")}
            </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
              {t("header.miniCart.or")}{' '}
                <Link
                  href="/products"
                  className="font-medium text-gray-600 hover:text-gray-500"
                  onClick={closeMiniCart}
                >
                  {t("header.miniCart.continueShopping")}
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </article>
      </section>
      <section
        className="w-screen h-full cursor-pointer"
        onClick={closeMiniCart}
      ></section>
    </div>
  )
}

export default MiniCart;