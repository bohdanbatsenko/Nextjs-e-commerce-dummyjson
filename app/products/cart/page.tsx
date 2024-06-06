'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { toasterNotifier } from '@/hooks/useToasterNotify';
import ItemContent from './itemContent';

const Cart = () => {
  const { cartProducts, cartTotalQty, cartTotalAmount, handleClearCart } = useCart()
  const { notifyRemovedFromCart, notifyCartCleared } = toasterNotifier()

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className='flex flex-col items-center mt-8'>
        <div className='text-2xl'>Your cart is empty. Let's buy something!</div>
        <div>
          <Link
              className="flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white hover:bg-gray-500 mt-5" 
              href="/products"
            >
              Go to products
          </Link>
        </div>
      </div>
    )
  }

  // const handleRemoveFromCart = ({id, title}) => {
  //   cartCtx.removeItem(id)
  //   notifyRemovedFromCart(title)
  // }

  //const cartTotal = cartProducts.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

  return (
    <>
      <div className="p-6 lg:max-w-7xl max-w-2xl md:mx-auto">
      <h1 className="text-2xl font-bold text-center">Cart</h1>

      <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8 '>
        <div className='col-span-2 justify-self-start'>PRODUCT</div>
        <div className='justify-self-center'>PRICE</div>
        <div className='justify-self-center'>QUANTITY</div>
        <div className='justify-self-end'>TOTAL</div>
      </div>
      <div>
        {Array.isArray(cartProducts) && cartProducts.map((item, index) => {
          return <ItemContent key={index} item={item}/>
        })}
      </div>

      {
        cartProducts ? (
          <div className="flex flex-col justify-between items-center mt-8">
        <h2 className="text-lg font-bold">Total: ${cartTotalAmount}</h2>
        <h2 className="text-lg font-bold">Total items: {cartTotalQty}</h2>
        <button
          className="mt-5 px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          onClick={() => {
            handleClearCart()
            notifyCartCleared()
          }}
        >
          Clear cart
        </button>
      </div>
        ) : (
          <div className='mt-5'>
            <h1 className="text-lg font-bold">Your cart is empty</h1>
          </div>
        )
      }
    </div>
    </>
  )
}

export default Cart;