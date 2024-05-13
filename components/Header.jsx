'use client';
import classes from './header.module.css';
import NavLink from './NavLink';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

export default function Header() {
// State to manage the navbar's visibility
const [nav, setNav] = useState(false);

// Toggle function to handle the navbar's display
const handleNav = () => {
  setNav(!nav);
};

// Array containing navigation items
const navItems = [
  { id: 1, text: 'Home', href: '/' },
  { id: 2, text: 'Products', href: '/products' },
  { id: 3, text: 'Cart', href: '/products/cart' },
];

return (
  <div className='bg-black flex justify-between items-center h-24 mx-auto px-4 text-white'>
    {/* Logo */}
    <h1 className='w-full text-3xl font-bold text-[#00df9a]'>NEXT SHOP</h1>

    {/* Desktop Navigation */}
    <nav className={classes.nav}>
      <ul className='hidden md:flex'>
        <li><NavLink href="/">Home</NavLink></li>
        <li><NavLink href="/products">Products</NavLink></li>
        <li><NavLink href="/products/cart">Cart</NavLink></li>
      </ul>
    </nav>

    {/* Mobile Navigation Icon */}
    <div onClick={handleNav} className='block md:hidden'>
      {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
    </div>

    {/* Mobile Navigation Menu */}
    <ul
      className={
        nav
          ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
          : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
      }
    >
      {/* Mobile Logo */}
      <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>

      {/* Mobile Navigation Items */}
      {navItems.map(item => (
        <li
          key={item.id}
          className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
        >
           <NavLink href={item.href}>{item.text}</NavLink>
        </li>
      ))}
    </ul>
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