'use client';

import './header.css'
import MiniCart from './miniCart'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { useState, useContext } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaShoppingCart } from "react-icons/fa";
import CartContext from '@/context/CartContext';

const Header = () => {
  const cartCtx = useContext(CartContext)
  const pathname = usePathname()
  const [nav, setNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0)

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='bg-black flex justify-between items-center h-24 mx-auto px-4 text-white'>
      {/* Logo */}
      <h2 className='w-full text-3xl font-bold text-[#00df9a]'>NEXT SHOP</h2>

      {/* Desktop Navigation */}
      <nav className='nav'>
        <ul className='hidden md:flex md:items-center'>
          <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} href="/">Home</Link>
          <Link className={`nav-link ${pathname === '/products' ? 'active' : ''}`} href="/products">Products</Link>
          <Link className={`nav-link ${pathname === '/products/cart' ? 'active' : ''}`} href="/products/cart">Cart</Link>
          <Link className='nav-link shop-cart relative' href="#" onClick={() => setIsOpen(true)}>
            <FaShoppingCart/>
            <span className="absolute inset-0 object-right-top ml-8 -mt-3">
              <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                {totalCartItems}
              </div>
            </span>
          </Link>
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
          <h2 className='w-full text-3xl font-bold text-[#00df9a] m-4'>Next shop</h2>

          {/* Mobile Navigation Items */}
            <li
              className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
            >
              <Link href="/" onClick={() => setNav(false)}>Home</Link>
            </li>
            <li
              className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
            >
              <Link href="/products" onClick={() => setNav(false)}>Products</Link>
            </li>
            <li
              className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
            >
              <Link href="/products/cart" onClick={() => setNav(false)}>Cart</Link>
            </li>
        </ul>
        <section
          className="w-screen h-full cursor-pointer"
          onClick={() => {
            setNav(false);
          }}
        ></section>
      </div>
      <Link className='md:hidden nav-link shop-cart relative' href="#" onClick={() => setIsOpen(true)}>
        <FaShoppingCart/>
        <span className="absolute inset-0 object-right-top ml-2 -mt-4">
          <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
            {totalCartItems}
          </div>
        </span>
      </Link>
      <MiniCart isOpen={isOpen} setIsOpen={setIsOpen}></MiniCart>
    </div>
  );


    {/* <nav className={classes.nav}>
      <ul>
        <li><NavLink href="/">Home</NavLink></li>
        <li><NavLink href="/products">Products</NavLink></li>
        <li><NavLink href="/products/cart">Cart</NavLink></li>
      </ul>
    </nav>   */}

}


export default Header;