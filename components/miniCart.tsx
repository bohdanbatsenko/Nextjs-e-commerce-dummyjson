'use client'

import Link from 'next/link';
import { FaRegTimesCircle } from "react-icons/fa";
import { useCartContext } from '@/context/cart_context';
import AmountButtons from './AmountButtons';
import Image from 'next/image';

const MiniCart = () => {
  const { cart, total_items, total_price, toggleAmount, isMiniCartOpen, closeMiniCart } = useCartContext();

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
              <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
              <div className="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                  //onClick={() => setIsOpen(false)}
                  onClick={closeMiniCart}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close panel</span>
                  <FaRegTimesCircle className="h-6 w-6"/>
                </button>
              </div>
            </header>

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cart && cart.length
                  ? (cart.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        key={product.id}
                        src={product.image}
                        width={100}
                        height={100}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link 
                              href={{
                                pathname: "products/product",
                                query: {id: product.id},
                              }}
                            >{product.title}</Link>
                          </h3>
                          <p className="ml-4">{product.price}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {product.quantity}</p>
                        <AmountButtons 
                          amount={product.amount} 
                          increase={() => toggleAmount(product.id, "inc")} 
                          decrease={() => toggleAmount(product.id, "dec")} 
                        />
                      </div>
                    </div>
                  </li>
                 )))
                : (<div className="mt-4 lg:mt-6">No items in cart. Buy something!</div>)
                }
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${total_price}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
            <Link 
              className="flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white hover:bg-gray-500" 
              href="/products/cart"
              onClick={closeMiniCart}
            >
              Go to cart
            </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{' '}
                <Link
                  href="/products"
                  className="font-medium text-gray-600 hover:text-gray-500"
                  onClick={closeMiniCart}
                >
                  Continue Shopping
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