'use client';

import './header.css'
import MiniCart from '@/components/miniCart';
import {   
  useRouter,
  usePathname,
  useParams,
  useSelectedLayoutSegments,
  useSearchParams
} from 'next/navigation'
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaShoppingCart } from "react-icons/fa";
import { useCartContext } from '@/context/cart_context';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

const Header = () => {
  const { total_items, openMiniCart } = useCartContext();
//const pathname = usePathname()
  const [nav, setNav] = useState<boolean>(false);
  const locale = useParams()?.locale as LocaleTypes;
  const pathname = usePathname();
  const currentRoute = pathname;
  const { t } = useTranslation(locale, "common");
  const { push } = useRouter();
  const router = useRouter();
  const urlSegments = useSelectedLayoutSegments();

  const searchParams = useSearchParams()
  // console.log("router", router)
  // console.log("pathname", pathname)
  // console.log("searchParams", searchParams)

  // console.log("currentRoute", currentRoute)
  // console.log("urlSegments", urlSegments)
  // console.log("pathname", pathname)

  async function handleLocaleChange(event: any) {
    const newLocale = event;
    //console.log("newLocale", newLocale)
    

    const query = searchParams.get('id');
    //const queryString = new URLSearchParams(query);
    let id = searchParams.get('id');
    const newPath = `/${newLocale}/${urlSegments.join("/")}`;
    console.log("id", id)
    console.log("query", query)
    //console.log("queryString", queryString)
    console.log("newPath", newPath)
    console.log("urlSegments", urlSegments)
    console.log("searchParamsHasId", searchParams.has('id'))
  
    
    // If there are query parameters, include them in the new URL
    // if (queryString) {
    //   router.push(`${newPath}?${queryString}`);
    // } else {
    //   router.push(newPath);
    // }

    // if (urlSegments[1] === 'product') {
    //   router.push(`/${newLocale}/${urlSegments.join("/")}`);
    // }

    // This is used by the Header component which is used in `app/[locale]/layout.tsx` file,
    // urlSegments will contain the segments after the locale.
    // We replace the URL with the new locale and the rest of the segments.
    // PDP page: check if url has query id parameter. If it has, set the id on different language
    if (searchParams.has('id')) {
      router.push(`/${newLocale}/${urlSegments.join("/")}?id=${id}`);
    } else {
      router.push(`/${newLocale}/${urlSegments.join("/")}`);
    } 
  }

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='bg-gray-900 flex justify-between items-center h-24 mx-auto px-4 text-white'>
       <Link href="/">
          <h2 className='w-full text-xl lg:text-3xl font-bold text-amber-500'>{t("header.siteTitle")}</h2>
       </Link>

      {/* Desktop Navigation */}
      <nav className='nav'>
        <ul className='hidden md:flex md:items-center'>
          <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} href="/">{t("header.mainNav.home")}</Link>
          <Link className={`nav-link ${pathname === '/products' ? 'active' : ''}`} href="/products">{t("header.mainNav.shop")}</Link>
          <Link className={`nav-link ${pathname === '/articles' ? 'active' : ''}`} href="/articles">{t("header.mainNav.articles")}</Link>
          <Link className='nav-link shop-cart relative' href="#" onClick={openMiniCart}>
            <FaShoppingCart/>
            {total_items > 0 
              ? <span className="absolute inset-0 object-right-top ml-8 -mt-3">
              <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-semibold leading-4 bg-amber-500 text-black">
                {total_items}
              </div>
            </span>
            : ''}
          </Link>
          <select
            onChange={(e) => handleLocaleChange(e.target.value)}
            className="block px-2 py-2 text-sm bg-slate-600 text-gray-100"
          >
            <option value="en-US">🇺🇸 {t("languages.en")}</option>
            <option value="uk-UA">🇺🇦 {t("languages.uk")}</option>
        </select>
        </ul>
      </nav>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block mr-4 md:mr-0 md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 h-full bg-[#000300] ease-in-out duration-500'
            : 'fixed top-0 bottom-0 left-[-100%]'
        }>
        <ul
          className={
            nav
              ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
              : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
          }
        >
          {/* Mobile Logo */}
          <h2 className='w-full text-3xl font-bold text-amber-500 m-4'>{t("header.siteTitle")}</h2>

          {/* Mobile Navigation Items */}
            <li
              className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
            >
              <Link href="/" onClick={() => setNav(false)}>{t("header.mainNav.home")}</Link>
            </li>
            <li
              className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
            >
              <Link href="/products" onClick={() => setNav(false)}>{t("header.mainNav.shop")}</Link>
            </li>
            <li
              className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
            >
              <Link href="/articles" onClick={() => setNav(false)}>{t("header.mainNav.articles")}</Link>
            </li>
        </ul>
        <section
          className="w-screen h-full cursor-pointer"
          onClick={() => {
            setNav(false);
          }}
        ></section>
      </div>
      <Link className='md:hidden mr-4 nav-link shop-cart relative' href="#" onClick={openMiniCart}>
        <FaShoppingCart/>
        {total_items > 0 
         ? <span className="absolute inset-0 object-right-top ml-2 -mt-4">
          <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-amber-500 text-black">
            {total_items}
          </div>
        </span>
        : '' }
      </Link>
      <select
            onChange={(e) => handleLocaleChange(e.target.value)}
            className="block ml-2.5 md:hidden px-2 py-2 text-sm bg-slate-600 text-gray-100"
          >
            <option value="en-US">🇺🇸 {t("languages.en")}</option>
            <option value="uk-UA">🇺🇦 {t("languages.uk")}</option>
        </select>
      <MiniCart />
    </div>
  );
}

export default Header;